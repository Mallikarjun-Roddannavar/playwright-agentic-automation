# Static graph model

The canonical persistent knowledge is the OKF Markdown bundle. `knowledge/generated/code-graph.json` is a deterministic derived index used for narrow retrieval and visualization.

The extractor creates a type-aware TypeScript program for `.ts`, `.tsx`, `.mts`, and `.cts` files. JavaScript tooling files are syntax-indexed for declarations and imports, but do not produce checker-dependent relationship assertions. Python backend files under `app/backend/` are analyzed by a deterministic adapter using Python's built-in `ast` module.

## Node kinds

- `file`: indexed TypeScript, JavaScript, or JSON source file.
- `class`, `method`, `function`, `interface`, `type`, `enum`, `variable`: AST declarations.
- `fixture`: Playwright fixtures from `base.extend(...)`.
- `route`: object properties declared in `BasePage.routes` or `BaseApiService.routes`.
- `package` and `node-builtin`: package manifest and import usage facts.
- Python FastAPI decorators are represented as `route` nodes alongside TypeScript route nodes.

## Exact edge kinds

- `IMPORTS`, `IMPORTS_PACKAGE`, `EXPORTS`, `CONTAINS`, `DECLARES_PACKAGE`
- `EXTENDS`, `IMPLEMENTS`, `RETURNS_PAGE`, `INSTANTIATES`
- `NAVIGATES_TO`, `USES_PAGE`, `USES_SERVICE`, `USES_FIXTURE`
- `DECLARES_ROUTE`, `USES_UI_ROUTE`, `USES_API_ROUTE`
- `CALLS`, `ENFORCES_RBAC`, `USES_AUTH_DEPENDENCY`, `USES_PERSISTENCE`

`NAVIGATES_TO` requires a concrete page-object construction inside a page object. `USES_*` edges prove static syntactic usage, not that a path executed. Each edge has source path and line evidence; `sourceDigest` and per-file `source_sha256` support freshness checks.
