---
type: Test Specification
title: rbac.spec
description: API specification extracted from api/specs/rbac.spec.ts by deterministic static analysis.
resource: repo://playwright-agentic-automation/api/specs/rbac.spec.ts
tags:
  - generated
  - static-ast
  - api-spec
  - ts
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/api/specs/rbac.spec.ts
    title: api/specs/rbac.spec.ts
    author: process:codebase-knowledge/1.0.0
source_path: api/specs/rbac.spec.ts
source_sha256: cdc605d447716f2c47f8bd695165aa82f22b568141c103b12ef19430fdee41f1
code_graph_id: file:api/specs/rbac.spec.ts
analysis_scope: static-ast
fact_sha256: 6d7998d0e9fc3d54d2ecf0707072e3e1a93c3a792acea60ad856da70f8ef2d89
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-16T08:39:27.990Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-16T08:39:27.990Z"
---

# Purpose

API specification extracted from api/specs/rbac.spec.ts by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- None detected by static analysis.

# Imports

- [api/services/FoldersService.ts](../services/folders-service.md) via `@api/services/FoldersService`
- [utils/common/CommonUtils.ts](../../utils/common/common-utils.md) via `@utils/common/CommonUtils`
- [utils/fixtures/TestFixtures.ts](../../utils/fixtures/test-fixtures.md) via `@utils/fixtures/TestFixtures`

# Static relationships

- **api/specs/rbac.spec.ts** uses api service [FoldersService](../services/folders-service.md).
- **api/specs/rbac.spec.ts** uses fixture [cleanup](../../utils/fixtures/test-fixtures.md).
- **api/specs/rbac.spec.ts** uses fixture [viewerRequest](../../utils/fixtures/test-fixtures.md).
- **api/specs/rbac.spec.ts** instantiates [FoldersService](../services/folders-service.md).
- **api/specs/rbac.spec.ts** uses fixture [editorRequest](../../utils/fixtures/test-fixtures.md).
- **api/specs/rbac.spec.ts** uses fixture [adminRequest](../../utils/fixtures/test-fixtures.md).

# Dependents

- None detected by static analysis.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `cdc605d447716f2c47f8bd695165aa82f22b568141c103b12ef19430fdee41f1`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
