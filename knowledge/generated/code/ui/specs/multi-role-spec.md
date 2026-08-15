---
type: Test Specification
title: multi-role.spec
description: UI specification extracted from ui/specs/multi-role.spec.ts by deterministic static analysis.
resource: repo://playwright-pom-agent-skills/ui/specs/multi-role.spec.ts
tags:
  - generated
  - static-ast
  - ui-spec
  - ts
status: stable
sources:
  - id: source
    resource: repo://playwright-pom-agent-skills/ui/specs/multi-role.spec.ts
    title: ui/specs/multi-role.spec.ts
    author: process:codebase-knowledge/1.0.0
source_path: ui/specs/multi-role.spec.ts
source_sha256: 3450191ff39037a1d9fff57fb184bf542aa6f5a1486b95705bd913e15dd22e31
code_graph_id: file:ui/specs/multi-role.spec.ts
analysis_scope: static-ast
fact_sha256: cbe2e02504d9f0db983dd2237b6eb2f2492dbcbbbb1201f61129f36026791241
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-07-31T11:37:54.189Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-07-31T11:37:54.189Z"
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

The facts above are machine-confirmed from the TypeScript AST and source hash `3450191ff39037a1d9fff57fb184bf542aa6f5a1486b95705bd913e15dd22e31`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
