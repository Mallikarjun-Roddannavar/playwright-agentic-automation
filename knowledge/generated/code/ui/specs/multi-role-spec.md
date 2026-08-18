---
type: Test Specification
title: multi-role.spec
description: UI specification extracted from ui/specs/multi-role.spec.ts by deterministic static analysis.
resource: repo://playwright-agentic-automation/ui/specs/multi-role.spec.ts
tags:
  - generated
  - static-ast
  - ui-spec
  - ts
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/ui/specs/multi-role.spec.ts
    title: ui/specs/multi-role.spec.ts
    author: process:codebase-knowledge/1.0.0
source_path: ui/specs/multi-role.spec.ts
source_sha256: c4b94c071d58cd375f5044a507ddb5c34bf600c9d853872b8aa7935a8a9f9e67
code_graph_id: file:ui/specs/multi-role.spec.ts
analysis_scope: static-ast
fact_sha256: 3cf654fe1465083478b4dd11251502dd8781ca1ed5da4cc6a80f07bf957d8c05
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-18T10:16:28.092Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-18T10:16:28.092Z"
---

# Purpose

UI specification extracted from ui/specs/multi-role.spec.ts by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- None detected by static analysis.

# Imports

- [utils/fixtures/TestFixtures.ts](../../utils/fixtures/test-fixtures.md) via `@utils/fixtures/TestFixtures`
- [ui/pages/HomePage.ts](../pages/home-page.md) via `@pages/HomePage`
- [utils/common/CommonUtils.ts](../../utils/common/common-utils.md) via `@utils/common/CommonUtils`
- [api/services/FoldersService.ts](../../api/services/folders-service.md) via `@api/services/FoldersService`

# Static relationships

- **ui/specs/multi-role.spec.ts** uses api service [FoldersService](../../api/services/folders-service.md).
- **ui/specs/multi-role.spec.ts** instantiates [HomePage](../pages/home-page.md).
- **ui/specs/multi-role.spec.ts** uses fixture [adminPage](../../utils/fixtures/test-fixtures.md).
- **ui/specs/multi-role.spec.ts** instantiates [FoldersService](../../api/services/folders-service.md).
- **ui/specs/multi-role.spec.ts** uses fixture [viewerPage](../../utils/fixtures/test-fixtures.md).
- **ui/specs/multi-role.spec.ts** uses page object [HomePage](../pages/home-page.md).
- **ui/specs/multi-role.spec.ts** uses fixture [cleanup](../../utils/fixtures/test-fixtures.md).
- **ui/specs/multi-role.spec.ts** uses fixture [adminRequest](../../utils/fixtures/test-fixtures.md).

# Dependents

- None detected by static analysis.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `c4b94c071d58cd375f5044a507ddb5c34bf600c9d853872b8aa7935a8a9f9e67`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
