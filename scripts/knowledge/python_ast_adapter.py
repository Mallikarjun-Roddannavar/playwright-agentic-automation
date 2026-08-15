"""Emit deterministic Python AST facts for the learning codebase graph."""

from __future__ import annotations

import ast
import json
import sys
from pathlib import Path


def line_end(node: ast.AST) -> int:
    return getattr(node, "end_lineno", getattr(node, "lineno", 1))


def call_name(node: ast.Call) -> str | None:
    function = node.func
    if isinstance(function, ast.Name):
        return function.id
    if isinstance(function, ast.Attribute):
        return function.attr
    return None


def endpoint_from_decorator(node: ast.AST) -> tuple[str, str, int] | None:
    if not isinstance(node, ast.Call) or not isinstance(node.func, ast.Attribute):
        return None
    if not isinstance(node.func.value, ast.Name) or node.func.value.id != "app":
        return None
    if not node.args or not isinstance(node.args[0], ast.Constant):
        return None
    if not isinstance(node.args[0].value, str):
        return None
    method = node.func.attr.upper()
    if method not in {"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"}:
        return None
    return method, node.args[0].value, node.lineno


def analyze_file(root: Path, file_path: Path) -> tuple[list[dict], list[dict]]:
    relative = file_path.relative_to(root).as_posix()
    tree = ast.parse(file_path.read_text(encoding="utf-8"), filename=relative)
    functions: list[dict] = []
    imports: list[dict] = []

    for node in ast.walk(tree):
        if isinstance(node, ast.Import):
            for alias in node.names:
                if alias.name in {"auth", "models"}:
                    imports.append({"path": relative, "target": f"app/backend/{alias.name}.py", "line": node.lineno})
        elif isinstance(node, ast.ImportFrom) and node.module in {"auth", "models"}:
            imports.append({"path": relative, "target": f"app/backend/{node.module}.py", "line": node.lineno})

    for node in ast.walk(tree):
        if not isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)):
            continue
        endpoints = []
        for decorator in node.decorator_list:
            endpoint = endpoint_from_decorator(decorator)
            if endpoint:
                method, route, line = endpoint
                endpoints.append({"method": method, "path": route, "line": line})

        auth_dependencies = []
        calls = []
        for nested in ast.walk(node):
            if isinstance(nested, ast.Name) and nested.id == "get_current_user":
                auth_dependencies.append({"path": "app/backend/auth.py", "name": nested.id, "line": nested.lineno})
            if isinstance(nested, ast.Call):
                name = call_name(nested)
                if name == "get_current_user":
                    auth_dependencies.append({"path": "app/backend/auth.py", "name": name, "line": nested.lineno})
                elif name in {"require_admin", "require_editor_or_admin"}:
                    calls.append({"path": relative, "name": name, "line": nested.lineno, "kind": "rbac"})
                elif name in {"load_db", "save_db"}:
                    calls.append({"path": relative, "name": name, "line": nested.lineno, "kind": "persistence"})

        functions.append(
            {
                "path": relative,
                "name": node.name,
                "line": node.lineno,
                "endLine": line_end(node),
                "endpoints": endpoints,
                "authDependencies": auth_dependencies,
                "calls": calls,
            }
        )
    return functions, imports


def main() -> None:
    root = Path(sys.argv[1]).resolve()
    functions: list[dict] = []
    imports: list[dict] = []
    for file_path in sorted((root / "app" / "backend").glob("*.py")):
        found_functions, found_imports = analyze_file(root, file_path)
        functions.extend(found_functions)
        imports.extend(found_imports)
    print(json.dumps({"functions": functions, "imports": imports}, sort_keys=True))


if __name__ == "__main__":
    main()
