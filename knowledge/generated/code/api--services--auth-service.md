---
type: Code Module
title: AuthService
description: API service extracted from api/services/AuthService.ts by deterministic static analysis.
resource: repo://playwright-agentic-automation/api/services/AuthService.ts
tags:
  - generated
  - static-ast
  - api-service
  - ts
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/api/services/AuthService.ts
    title: api/services/AuthService.ts
    author: process:codebase-knowledge/1.0.0
source_path: api/services/AuthService.ts
source_sha256: 33d1641c6e48e65bd1008fd9802efe6508e4a1838ab1ec3d24b7672f8f7b2171
code_graph_id: file:api/services/AuthService.ts
analysis_scope: static-ast
fact_sha256: 03d6968616e77c18c3f2ead14eb9eb6c26facb048bb655124176271a1d8210a4
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-09-10T15:54:55.036Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-09-10T15:54:55.036Z"
---

# Purpose

API service extracted from api/services/AuthService.ts by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `class` **AuthService** exported (lines 5-27)
- `method` **AuthService.getAccessToken** (lines 6-26)

# Imports

- `@playwright/test` via `@playwright/test`
- [api/services/BaseApiService.ts](./api--services--base-api-service.md) via `@api/services/BaseApiService`

# Static relationships

- **AuthService** extends [BaseApiService](./api--services--base-api-service.md).
- **AuthService.getAccessToken** uses api route [/token](./api--services--base-api-service.md).

# Dependents

- [utils/fixtures/TestFixtures.ts](./utils--fixtures--test-fixtures.md) imports this module.
- [createApiRoleContext](./utils--fixtures--test-fixtures.md) uses api service this module.
- [createApiRoleContext](./utils--fixtures--test-fixtures.md) instantiates this module.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `33d1641c6e48e65bd1008fd9802efe6508e4a1838ab1ec3d24b7672f8f7b2171`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
