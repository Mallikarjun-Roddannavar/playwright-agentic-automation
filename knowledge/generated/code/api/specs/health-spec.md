---
type: Test Specification
title: health.spec
description: API specification extracted from api/specs/health.spec.ts by deterministic static analysis.
resource: repo://playwright-agentic-automation/api/specs/health.spec.ts
tags:
  - generated
  - static-ast
  - api-spec
  - ts
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/api/specs/health.spec.ts
    title: api/specs/health.spec.ts
    author: process:codebase-knowledge/1.0.0
source_path: api/specs/health.spec.ts
source_sha256: 0ea2bfe2da534b5279ffdccc0977096f4fb93d1392876c929284e7805e7fb2d4
code_graph_id: file:api/specs/health.spec.ts
analysis_scope: static-ast
fact_sha256: c56a22a08adfb51539f7e473e0960410d69ad83a5ac4ef8a61c3bd707c0adf92
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-16T08:39:27.990Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-16T08:39:27.990Z"
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
