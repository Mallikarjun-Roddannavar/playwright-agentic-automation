---
type: Code Module
title: FilesService
description: API service extracted from api/services/FilesService.ts by deterministic static analysis.
resource: repo://playwright-agentic-automation/api/services/FilesService.ts
tags:
  - generated
  - static-ast
  - api-service
  - ts
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/api/services/FilesService.ts
    title: api/services/FilesService.ts
    author: process:codebase-knowledge/1.0.0
source_path: api/services/FilesService.ts
source_sha256: c097debbcb8353a2af4b8b31f1dc40a038074f5afe1e18f5ab9ae86c647cd12b
code_graph_id: file:api/services/FilesService.ts
analysis_scope: static-ast
fact_sha256: c25eb407b06240bc215cb37b55679be44eb4dbf66d4a6fe8ab4cfb5f27364ca9
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-16T08:39:27.990Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-16T08:39:27.990Z"
---

# Purpose

API service extracted from api/services/FilesService.ts by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `class` **FilesService** exported (lines 5-41)
- `method` **FilesService.list** (lines 6-15)
- `method` **FilesService.upload** (lines 17-40)

# Imports

- `@playwright/test` via `@playwright/test`
- [api/services/BaseApiService.ts](./base-api-service.md) via `@api/services/BaseApiService`

# Static relationships

- **FilesService** extends [BaseApiService](./base-api-service.md).
- **FilesService.list** uses api route [/folders/{parameter}/files](./base-api-service.md).
- **FilesService.upload** uses api route [/folders/{parameter}/files](./base-api-service.md).

# Dependents

- [api/specs/files.spec.ts](../specs/files-spec.md) imports this module.
- [api/specs/files.spec.ts](../specs/files-spec.md) instantiates this module.
- [api/specs/files.spec.ts](../specs/files-spec.md) uses api service this module.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `c097debbcb8353a2af4b8b31f1dc40a038074f5afe1e18f5ab9ae86c647cd12b`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
