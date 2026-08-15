---
type: Code Module
title: AuthService
description: API service extracted from api/services/AuthService.ts by deterministic static analysis.
resource: repo://playwright-pom-agent-skills/api/services/AuthService.ts
tags:
  - generated
  - static-ast
  - api-service
  - ts
status: stable
sources:
  - id: source
    resource: repo://playwright-pom-agent-skills/api/services/AuthService.ts
    title: api/services/AuthService.ts
    author: process:codebase-knowledge/1.0.0
source_path: api/services/AuthService.ts
source_sha256: 33d1641c6e48e65bd1008fd9802efe6508e4a1838ab1ec3d24b7672f8f7b2171
code_graph_id: file:api/services/AuthService.ts
analysis_scope: static-ast
fact_sha256: 7f93ec73cce19c7ebd6f7a7850924a39f312c4279b23e572a53524f7b82df1b8
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-07-31T11:37:54.189Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-07-31T11:37:54.189Z"
---

# Purpose

API service extracted from api/services/AuthService.ts by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `class` **AuthService** exported (lines 5-27)
- `method` **AuthService.getAccessToken** (lines 6-26)

# Imports

- `@playwright/test` via `@playwright/test`
- [api/services/BaseApiService.ts](./base-api-service.md) via `@api/services/BaseApiService`

# Static relationships

- **AuthService** extends [BaseApiService](./base-api-service.md).
- **AuthService.getAccessToken** uses api route [/token](./base-api-service.md).

# Dependents

- [utils/fixtures/TestFixtures.ts](../../utils/fixtures/test-fixtures.md) imports this module.
- [createApiRoleContext](../../utils/fixtures/test-fixtures.md) uses api service this module.
- [createApiRoleContext](../../utils/fixtures/test-fixtures.md) instantiates this module.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `33d1641c6e48e65bd1008fd9802efe6508e4a1838ab1ec3d24b7672f8f7b2171`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
