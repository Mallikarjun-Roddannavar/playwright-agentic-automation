#!/usr/bin/env python
"""Run ripgrep with grouped and capped output for bounded discovery."""

from __future__ import annotations

import argparse
import subprocess
import sys
from collections import OrderedDict
from pathlib import Path


DEFAULT_GLOBS = [
    "!**/node_modules/**",
    "!**/.git/**",
    "!**/_git/**",
    "!**/.venv/**",
    "!**/dist/**",
    "!**/build/**",
    "!**/coverage/**",
    "!**/playwright-report/**",
    "!**/test-results/**",
    "!**/*.map",
]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("pattern")
    parser.add_argument("roots", nargs="+", help="Paths relative to --repo.")
    parser.add_argument("--repo", default=".")
    parser.add_argument("--max-files", type=int, default=6)
    parser.add_argument("--max-lines-per-file", type=int, default=3)
    parser.add_argument("--max-snippet-chars", type=int, default=140)
    parser.add_argument("--fixed-strings", action="store_true")
    parser.add_argument("--ignore-case", action="store_true")
    parser.add_argument("--hidden", action="store_true")
    return parser.parse_args()


def compact(value: str, limit: int) -> str:
    value = " ".join(value.split())
    return value if len(value) <= limit else value[: max(0, limit - 3)] + "..."


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    args = parse_args()
    if min(args.max_files, args.max_lines_per_file, args.max_snippet_chars) <= 0:
        raise SystemExit("output caps must be positive")

    command = ["rg", "-n", "--no-heading", "--color", "never"]
    if args.fixed_strings:
        command.append("--fixed-strings")
    if args.ignore_case:
        command.append("--ignore-case")
    if args.hidden:
        command.append("--hidden")
    for glob in DEFAULT_GLOBS:
        command.extend(["-g", glob])
    command.extend([args.pattern, *args.roots])
    result = subprocess.run(
        command,
        cwd=Path(args.repo).resolve(),
        text=True,
        encoding="utf-8",
        errors="replace",
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    if result.returncode not in {0, 1}:
        sys.stderr.write(result.stderr)
        return result.returncode

    grouped: OrderedDict[str, list[tuple[str, str]]] = OrderedDict()
    counts: dict[str, int] = {}
    for raw_line in result.stdout.splitlines():
        parts = raw_line.split(":", 2)
        if len(parts) != 3:
            continue
        path, number, snippet = parts
        counts[path] = counts.get(path, 0) + 1
        grouped.setdefault(path, [])
        if len(grouped[path]) < args.max_lines_per_file:
            grouped[path].append((number, compact(snippet, args.max_snippet_chars)))

    if not grouped:
        print("No matches.")
        return 0

    ranked = sorted(grouped, key=lambda path: (-counts[path], path))[: args.max_files]
    print(f"pattern: {args.pattern}")
    print(f"total_matches: {sum(counts.values())}")
    print(f"total_files: {len(grouped)}")
    print(f"files_shown: {len(ranked)}")
    for path in ranked:
        print(f"\n{path} ({counts[path]} hits)")
        for number, snippet in grouped[path]:
            print(f"  {number}: {snippet}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
