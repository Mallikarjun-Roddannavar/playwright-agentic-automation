---
type: Test Specification
title: health.spec
description: API specification extracted from api/specs/health.spec.ts by deterministic static analysis.
resource: repo://playwright-pom-agent-skills/api/specs/health.spec.ts
tags:
  - generated
  - static-ast
  - api-spec
  - ts
status: stable
sources:
  - id: source
    resource: repo://playwright-pom-agent-skills/api/specs/health.spec.ts
    title: api/specs/health.spec.ts
    author: process:codebase-knowledge/1.0.0
source_path: api/specs/health.spec.ts
source_sha256: 0ea2bfe2da534b5279ffdccc0977096f4fb93d1392876c929284e7805e7fb2d4
code_graph_id: file:api/specs/health.spec.ts
analysis_scope: static-ast
fact_sha256: ff1e95c6ebad8ad8e5ab21e2f0e469b93f54bb210ebfbc1481673142ab547932
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-07-31T11:37:54.189Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-07-31T11:37:54.189Z"
---

# Purpose

API specification extracted from api/specs/health.spec.ts by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- None detected by static analysis.

# Imports

- `@playwright/test` via `@playwright/test`
- [api/services/BaseApiService.ts](../services/base-api-service.md) via `@api/services/BaseApiService`

# Static relationships

- **api/specs/health.spec.ts** uses api route [/health](../services/base-api-service.md).

# Dependents

- None detected by static analysis.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `0ea2bfe2da534b5279ffdccc0977096f4fb93d1392876c929284e7805e7fb2d4`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
