#!/usr/bin/env python
"""Ensure the generic incident-analysis source index is compatible and current."""

from __future__ import annotations

import argparse
import os
import sqlite3
import subprocess
import sys
from pathlib import Path

from build_source_index import (
    BUILDER_VERSION,
    DEFAULT_INDEX,
    SCHEMA_VERSION,
    file_hash,
    iter_indexable_files,
)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repo", default=".")
    parser.add_argument("--index", default=str(DEFAULT_INDEX))
    parser.add_argument("--force", action="store_true")
    parser.add_argument("--no-rebuild", action="store_true")
    parser.add_argument("--quiet", action="store_true")
    return parser.parse_args()


def resolve_index(value: str, root: Path) -> Path:
    path = Path(value)
    return path if path.is_absolute() else root / path


def inspect(index: Path, root: Path) -> tuple[str, list[str]]:
    if not index.is_file():
        return "missing", [str(index)]
    try:
        conn = sqlite3.connect(f"file:{index.as_posix()}?mode=ro", uri=True)
        metadata = dict(conn.execute("SELECT key, value FROM metadata"))
        if metadata.get("schema_version") != str(SCHEMA_VERSION):
            conn.close()
            return "incompatible", ["schema version changed"]
        if metadata.get("builder_version") != BUILDER_VERSION:
            conn.close()
            return "incompatible", ["builder version changed"]
        indexed = dict(conn.execute("SELECT path, sha256 FROM files"))
        conn.close()
    except (OSError, sqlite3.DatabaseError) as exc:
        return "invalid", [str(exc)]

    current = {path.relative_to(root).as_posix(): path for path in iter_indexable_files(root)}
    reasons: list[str] = []
    for relative in sorted(current.keys() - indexed.keys()):
        reasons.append(f"added: {relative}")
        if len(reasons) >= 8:
            return "stale", reasons
    for relative in sorted(indexed.keys() - current.keys()):
        reasons.append(f"missing: {relative}")
        if len(reasons) >= 8:
            return "stale", reasons
    for relative in sorted(current.keys() & indexed.keys()):
        try:
            if file_hash(current[relative]) != indexed[relative]:
                reasons.append(f"changed: {relative}")
        except OSError as exc:
            reasons.append(f"unreadable: {relative}: {exc}")
        if len(reasons) >= 8:
            break
    return ("stale", reasons) if reasons else ("current", [])


def rebuild(index: Path, root: Path) -> tuple[int, int, int]:
    index.parent.mkdir(parents=True, exist_ok=True)
    temporary = index.with_name(f"{index.name}.tmp-{os.getpid()}")
    command = [
        sys.executable,
        str(Path(__file__).with_name("build_source_index.py")),
        "--repo",
        str(root),
        "--output",
        str(temporary),
    ]
    try:
        result = subprocess.run(
            command,
            text=True,
            encoding="utf-8",
            errors="replace",
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
        )
        if result.returncode != 0:
            raise RuntimeError(result.stderr.strip() or result.stdout.strip())
        conn = sqlite3.connect(temporary)
        integrity = conn.execute("PRAGMA integrity_check").fetchone()[0]
        counts = (
            conn.execute("SELECT COUNT(*) FROM files").fetchone()[0],
            conn.execute("SELECT COUNT(*) FROM symbols").fetchone()[0],
            conn.execute("SELECT COUNT(*) FROM edges").fetchone()[0],
        )
        conn.close()
        if integrity != "ok" or counts[0] == 0:
            raise RuntimeError(f"invalid rebuilt index: integrity={integrity}, files={counts[0]}")
        os.replace(temporary, index)
        return counts
    finally:
        temporary.unlink(missing_ok=True)


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    args = parse_args()
    root = Path(args.repo).resolve()
    index = resolve_index(args.index, root)
    state, reasons = inspect(index, root)
    if state == "current" and not args.force:
        print("index: current")
        return 0
    if args.no_rebuild:
        print(f"index: {state}")
        if not args.quiet:
            for reason in reasons:
                print(f"  {reason}")
        return 2
    try:
        counts = rebuild(index, root)
    except (OSError, RuntimeError, sqlite3.DatabaseError) as exc:
        print("index: unavailable", file=sys.stderr)
        if not args.quiet:
            print(f"  {exc}", file=sys.stderr)
        return 1
    print(f"index: rebuilt ({counts[0]} files, {counts[1]} symbols, {counts[2]} edges)")
    if not args.quiet and reasons:
        print(f"rebuild_reason: {state}")
        for reason in reasons:
            print(f"  {reason}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
