---
type: Code Module
title: FoldersService
description: API service extracted from api/services/FoldersService.ts by deterministic static analysis.
resource: repo://playwright-agentic-automation/api/services/FoldersService.ts
tags:
  - generated
  - static-ast
  - api-service
  - ts
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/api/services/FoldersService.ts
    title: api/services/FoldersService.ts
    author: process:codebase-knowledge/1.0.0
source_path: api/services/FoldersService.ts
source_sha256: 14bf178d9f8665b5cf62a276f3e68b92de8a02fd54a316d29a44f1126f0fbc02
code_graph_id: file:api/services/FoldersService.ts
analysis_scope: static-ast
fact_sha256: 1adf11b105c0e134a2a759d40623933c1bd89e5f183e535d44ed03e9c058528e
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-16T08:39:27.990Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-16T08:39:27.990Z"
---

# Purpose

API service extracted from api/services/FoldersService.ts by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `type` **FolderResponse** exported (lines 5-14)
- `class` **FoldersService** exported (lines 16-50)
- `method` **FoldersService.create** (lines 27-38)
- `method` **FoldersService.list** (lines 17-25)
- `method` **FoldersService.remove** (lines 40-49)

# Imports

- [api/services/BaseApiService.ts](./base-api-service.md) via `@api/services/BaseApiService`
- `@playwright/test` via `@playwright/test`

# Static relationships

- **FoldersService.list** uses api route [/folders](./base-api-service.md).
- **FoldersService.remove** uses api route [/folders/{parameter}](./base-api-service.md).
- **FoldersService** extends [BaseApiService](./base-api-service.md).
- **FoldersService.create** uses api route [/folders](./base-api-service.md).

# Dependents

- [api/specs/files.spec.ts](../specs/files-spec.md) uses api service this module.
- [ui/specs/multi-role.spec.ts](../../ui/specs/multi-role-spec.md) uses api service this module.
- [api/specs/rbac.spec.ts](../specs/rbac-spec.md) uses api service this module.
- [ui/specs/viewer-rbac.spec.ts](../../ui/specs/viewer-rbac-spec.md) uses api service this module.
- [api/specs/rbac.spec.ts](../specs/rbac-spec.md) imports this module.
- [ui/specs/viewer-rbac.spec.ts](../../ui/specs/viewer-rbac-spec.md) imports this module.
- [api/specs/files.spec.ts](../specs/files-spec.md) imports this module.
- [api/specs/rbac.spec.ts](../specs/rbac-spec.md) instantiates this module.
- [expectRoleCanUploadFile](../../ui/specs/files-spec.md) uses api service this module.
- [ui/specs/multi-role.spec.ts](../../ui/specs/multi-role-spec.md) imports this module.
- [expectRoleCanUploadFile](../../ui/specs/files-spec.md) instantiates this module.
- [ui/specs/multi-role.spec.ts](../../ui/specs/multi-role-spec.md) instantiates this module.
- [ui/specs/viewer-rbac.spec.ts](../../ui/specs/viewer-rbac-spec.md) instantiates this module.
- [ui/specs/files.spec.ts](../../ui/specs/files-spec.md) imports this module.
- [api/specs/files.spec.ts](../specs/files-spec.md) instantiates this module.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `14bf178d9f8665b5cf62a276f3e68b92de8a02fd54a316d29a44f1126f0fbc02`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
