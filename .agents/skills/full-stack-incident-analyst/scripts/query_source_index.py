#!/usr/bin/env python
"""Query symbols or relationship edges in the generic incident source index."""

from __future__ import annotations

import argparse
import sqlite3
import sys
from pathlib import Path

from build_source_index import DEFAULT_INDEX


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("query")
    parser.add_argument("--repo", default=".")
    parser.add_argument("--index", default=str(DEFAULT_INDEX))
    parser.add_argument("--limit", type=int, default=8)
    parser.add_argument("--kind")
    parser.add_argument("--path-prefix")
    parser.add_argument("--compact", action="store_true")
    parser.add_argument("--edges", action="store_true")
    return parser.parse_args()


def resolve_index(value: str, root: Path) -> Path:
    path = Path(value)
    if not path.is_absolute():
        path = root / path
    if not path.is_file():
        raise SystemExit(f"Index not found: {path}\nRun ensure_source_index.py first.")
    return path


def query_symbols(conn: sqlite3.Connection, args: argparse.Namespace) -> None:
    like = f"%{args.query}%"
    clauses = ["(name LIKE ? OR file_path LIKE ? OR snippet LIKE ?)"]
    params: list[object] = [like, like, like]
    if args.kind:
        clauses.append("kind = ?")
        params.append(args.kind)
    if args.path_prefix:
        clauses.append("file_path LIKE ?")
        params.append(args.path_prefix.replace("\\", "/").strip("/") + "%")
    params.append(args.limit)
    rows = conn.execute(
        f"""SELECT kind, name, file_path, line_no, snippet FROM symbols
        WHERE {' AND '.join(clauses)}
        ORDER BY CASE kind
          WHEN 'test_id_definition' THEN 1 WHEN 'test_id_usage' THEN 2
          WHEN 'api_route' THEN 3 WHEN 'class' THEN 4 WHEN 'python_function' THEN 5
          WHEN 'js_function' THEN 6 WHEN 'test' THEN 7 ELSE 8 END,
          file_path, line_no LIMIT ?""",
        params,
    ).fetchall()
    for kind, name, path, line_no, source in rows:
        if args.compact:
            print(f"{kind}:{name} | {path}:{line_no}")
        else:
            print(f"{kind}: {name}\n  {path}:{line_no}: {source}")


def query_edges(conn: sqlite3.Connection, args: argparse.Namespace) -> None:
    like = f"%{args.query}%"
    clauses = ["(from_name LIKE ? OR to_name LIKE ? OR file_path LIKE ? OR reason LIKE ?)"]
    params: list[object] = [like, like, like, like]
    if args.path_prefix:
        clauses.append("file_path LIKE ?")
        params.append(args.path_prefix.replace("\\", "/").strip("/") + "%")
    params.append(args.limit)
    rows = conn.execute(
        f"""SELECT from_kind, from_name, to_kind, to_name, file_path, line_no, reason
        FROM edges WHERE {' AND '.join(clauses)} ORDER BY file_path, line_no LIMIT ?""",
        params,
    ).fetchall()
    for from_kind, from_name, to_kind, to_name, path, line_no, reason in rows:
        if args.compact:
            print(f"{from_kind}:{from_name} -> {to_kind}:{to_name} | {path}:{line_no} | {reason}")
        else:
            print(f"{from_kind}:{from_name} -> {to_kind}:{to_name}\n  {path}:{line_no}: {reason}")


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    args = parse_args()
    if args.limit <= 0:
        raise SystemExit("--limit must be positive")
    root = Path(args.repo).resolve()
    conn = sqlite3.connect(resolve_index(args.index, root))
    try:
        query_edges(conn, args) if args.edges else query_symbols(conn, args)
    finally:
        conn.close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
