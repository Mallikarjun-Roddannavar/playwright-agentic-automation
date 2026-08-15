#!/usr/bin/env python
"""Build a small generic SQLite source index for incident discovery."""

from __future__ import annotations

import argparse
import hashlib
import os
import re
import sqlite3
from datetime import datetime, timezone
from pathlib import Path


SCHEMA_VERSION = 1
BUILDER_VERSION = "1.0"
DEFAULT_INDEX = Path(".derived/incident-analysis/source-index.sqlite")
TEXT_SUFFIXES = {
    ".css", ".go", ".graphql", ".html", ".java", ".js", ".json", ".jsx",
    ".kt", ".md", ".mjs", ".py", ".rb", ".rs", ".scss", ".sh", ".sql",
    ".toml", ".ts", ".tsx", ".txt", ".xml", ".yaml", ".yml",
}
IGNORED_DIRS = {
    ".git", "_git", ".hg", ".svn", ".venv", "venv", "node_modules", "dist",
    "build", "coverage", "playwright-report", "test-results", "__pycache__", ".mypy_cache",
    ".pytest_cache", ".next", ".nuxt", "target", ".derived",
}
MAX_FILE_BYTES = 2 * 1024 * 1024

SYMBOL_PATTERNS = [
    ("class", re.compile(r"^\s*(?:export\s+)?(?:abstract\s+)?class\s+([A-Za-z_$][\w$]*)")),
    ("python_function", re.compile(r"^\s*(?:async\s+)?def\s+([A-Za-z_]\w*)\s*\(")),
    ("js_function", re.compile(r"^\s*(?:export\s+)?(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(")),
    ("js_export", re.compile(r"^\s*export\s+(?:const|let|var)\s+([A-Za-z_$][\w$]*)")),
    ("api_route", re.compile(r"@\w+\.(?:get|post|put|patch|delete)\(\s*[\"']([^\"']+)")),
    ("test", re.compile(r"\b(?:test|it)(?:\.\w+)?\(\s*[\"'`]([^\"'`]+)")),
    ("test_id_definition", re.compile(r"data-testid\s*=\s*(?:\{)?[\"'`]([^\"'`]+)")),
    ("test_id_usage", re.compile(r"getByTestId\(\s*[\"'`]([^\"'`]+)")),
    ("css_selector", re.compile(r"^\s*([.#][A-Za-z_-][\w-]*)\s*(?:[,>{:]|$)")),
    ("config_key", re.compile(r"^\s*[\"']?([A-Z][A-Z0-9_]{2,})[\"']?\s*[:=]")),
]

ENV_PATTERNS = [
    re.compile(r"os\.getenv\(\s*[\"']([A-Z][A-Z0-9_]*)"),
    re.compile(r"process\.env\.([A-Z][A-Z0-9_]*)"),
    re.compile(r"import\.meta\.env\.([A-Z][A-Z0-9_]*)"),
]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repo", default=".")
    parser.add_argument("--output", default=str(DEFAULT_INDEX))
    return parser.parse_args()


def iter_indexable_files(root: Path):
    for current, dirnames, filenames in os.walk(root):
        dirnames[:] = sorted(name for name in dirnames if name not in IGNORED_DIRS)
        current_path = Path(current)
        for filename in sorted(filenames):
            path = current_path / filename
            try:
                if path.suffix.lower() in TEXT_SUFFIXES and path.stat().st_size <= MAX_FILE_BYTES:
                    yield path
            except OSError:
                continue


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="replace")


def file_hash(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def snippet(line: str) -> str:
    compact = " ".join(line.strip().split())
    return compact if len(compact) <= 220 else compact[:217] + "..."


def symbols_for_line(line: str):
    seen = set()
    for kind, pattern in SYMBOL_PATTERNS:
        for match in pattern.finditer(line):
            item = (kind, match.group(1))
            if item not in seen:
                seen.add(item)
                yield item
    for pattern in ENV_PATTERNS:
        for match in pattern.finditer(line):
            item = ("environment_key", match.group(1))
            if item not in seen:
                seen.add(item)
                yield item


def edges_for_line(relative: str, line: str):
    python_import = re.match(r"^\s*(?:from\s+([\w.]+)\s+import|import\s+([\w.]+))", line)
    if python_import:
        target = python_import.group(1) or python_import.group(2)
        yield ("file", relative, "import", target, "imports module")

    js_import = re.search(r"\bfrom\s+[\"']([^\"']+)[\"']", line)
    if js_import:
        yield ("file", relative, "import", js_import.group(1), "imports module")

    for match in re.finditer(
        r"\b(?:fetch|request\.(?:get|post|put|patch|delete)|axios\.(?:get|post|put|patch|delete))"
        r"\(\s*[\"'`]([^\"'`]+)",
        line,
    ):
        yield ("file", relative, "http_call", match.group(1), "issues HTTP request")

    for match in re.finditer(r"data-testid\s*=\s*(?:\{)?[\"'`]([^\"'`]+)", line):
        yield ("file", relative, "test_id", match.group(1), "defines test id")
    for match in re.finditer(r"getByTestId\(\s*[\"'`]([^\"'`]+)", line):
        yield ("file", relative, "test_id", match.group(1), "uses test id")


def create_schema(conn: sqlite3.Connection) -> None:
    conn.executescript(
        """
        CREATE TABLE metadata (key TEXT PRIMARY KEY, value TEXT NOT NULL);
        CREATE TABLE files (path TEXT PRIMARY KEY, sha256 TEXT NOT NULL);
        CREATE TABLE symbols (
          kind TEXT NOT NULL, name TEXT NOT NULL, file_path TEXT NOT NULL,
          line_no INTEGER NOT NULL, snippet TEXT NOT NULL
        );
        CREATE TABLE edges (
          from_kind TEXT NOT NULL, from_name TEXT NOT NULL,
          to_kind TEXT NOT NULL, to_name TEXT NOT NULL,
          file_path TEXT NOT NULL, line_no INTEGER NOT NULL, reason TEXT NOT NULL
        );
        CREATE INDEX symbols_lookup ON symbols(name, kind);
        CREATE INDEX symbols_path ON symbols(file_path, line_no);
        CREATE INDEX edges_lookup ON edges(from_name, to_name);
        """
    )


def build(root: Path, output: Path) -> tuple[int, int, int]:
    output.parent.mkdir(parents=True, exist_ok=True)
    output.unlink(missing_ok=True)
    conn = sqlite3.connect(output)
    create_schema(conn)
    conn.executemany(
        "INSERT INTO metadata(key, value) VALUES (?, ?)",
        [
            ("schema_version", str(SCHEMA_VERSION)),
            ("builder_version", BUILDER_VERSION),
            ("built_at", datetime.now(timezone.utc).isoformat()),
            ("repo_root", str(root)),
        ],
    )

    file_count = symbol_count = edge_count = 0
    for path in iter_indexable_files(root):
        relative = path.relative_to(root).as_posix()
        try:
            text = read_text(path)
            digest = file_hash(path)
        except OSError:
            continue
        conn.execute("INSERT INTO files(path, sha256) VALUES (?, ?)", (relative, digest))
        file_count += 1
        for line_no, line in enumerate(text.splitlines(), start=1):
            short = snippet(line)
            for kind, name in symbols_for_line(line):
                conn.execute(
                    "INSERT INTO symbols VALUES (?, ?, ?, ?, ?)",
                    (kind, name, relative, line_no, short),
                )
                symbol_count += 1
            for edge in edges_for_line(relative, line):
                conn.execute(
                    "INSERT INTO edges VALUES (?, ?, ?, ?, ?, ?, ?)",
                    (edge[0], edge[1], edge[2], edge[3], relative, line_no, edge[4]),
                )
                edge_count += 1
    conn.commit()
    conn.close()
    return file_count, symbol_count, edge_count


def main() -> int:
    args = parse_args()
    root = Path(args.repo).resolve()
    output = Path(args.output)
    if not output.is_absolute():
        output = root / output
    counts = build(root, output)
    print(f"index: built ({counts[0]} files, {counts[1]} symbols, {counts[2]} edges)")
    print(f"output: {output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
