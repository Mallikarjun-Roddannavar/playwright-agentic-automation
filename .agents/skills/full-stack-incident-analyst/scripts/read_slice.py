#!/usr/bin/env python
"""Print bounded, line-numbered source excerpts by range or anchor."""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("path", help="File path relative to --repo or the current directory.")
    parser.add_argument("--repo", default=".", help="Repository root. Defaults to cwd.")
    selector = parser.add_mutually_exclusive_group(required=True)
    selector.add_argument("--lines", help="Inclusive start:end range, for example 20:45.")
    selector.add_argument("--around", help="Anchor text or regular expression.")
    parser.add_argument("--context", type=int, default=12)
    parser.add_argument("--max-matches", type=int, default=2)
    parser.add_argument("--fixed-strings", action="store_true")
    return parser.parse_args()


def resolve_path(value: str, repo: Path) -> Path:
    candidate = Path(value)
    if not candidate.is_absolute():
        candidate = repo / candidate
    if not candidate.is_file():
        raise SystemExit(f"File not found: {candidate}")
    return candidate.resolve()


def parse_range(value: str, total: int) -> tuple[int, int]:
    match = re.fullmatch(r"\s*(\d+)\s*:\s*(\d+)\s*", value)
    if not match:
        raise SystemExit("--lines must use start:end form")
    start, end = int(match.group(1)), int(match.group(2))
    if start <= 0 or end <= 0 or start > end:
        raise SystemExit("--lines must be positive and start must not exceed end")
    return start, min(end, total)


def merge_ranges(ranges: list[tuple[int, int]]) -> list[tuple[int, int]]:
    merged: list[tuple[int, int]] = []
    for start, end in ranges:
        if merged and start <= merged[-1][1] + 1:
            merged[-1] = (merged[-1][0], max(merged[-1][1], end))
        else:
            merged.append((start, end))
    return merged


def print_range(path: Path, lines: list[str], start: int, end: int) -> None:
    print(f"--- {path}:{start}-{end} ---")
    for number in range(start, end + 1):
        print(f"{number}: {lines[number - 1]}")


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    args = parse_args()
    if args.context < 0 or args.max_matches <= 0:
        raise SystemExit("--context must be non-negative and --max-matches must be positive")
    path = resolve_path(args.path, Path(args.repo).resolve())
    lines = path.read_text(encoding="utf-8", errors="replace").splitlines()

    if args.lines:
        start, end = parse_range(args.lines, len(lines))
        print_range(path, lines, start, end)
        return 0

    matcher = (
        (lambda line: args.around in line)
        if args.fixed_strings
        else (lambda line: re.search(args.around, line) is not None)
    )
    ranges = []
    for number, line in enumerate(lines, start=1):
        if matcher(line):
            ranges.append((max(1, number - args.context), min(len(lines), number + args.context)))
            if len(ranges) >= args.max_matches:
                break
    if not ranges:
        print(f"No anchor matches found in {path}: {args.around}")
        return 1
    for index, (start, end) in enumerate(merge_ranges(ranges)):
        if index:
            print()
        print_range(path, lines, start, end)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
