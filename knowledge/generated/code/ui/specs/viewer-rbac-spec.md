---
type: Test Specification
title: viewer-rbac.spec
description: UI specification extracted from ui/specs/viewer-rbac.spec.ts by deterministic static analysis.
resource: repo://playwright-agentic-automation/ui/specs/viewer-rbac.spec.ts
tags:
  - generated
  - static-ast
  - ui-spec
  - ts
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/ui/specs/viewer-rbac.spec.ts
    title: ui/specs/viewer-rbac.spec.ts
    author: process:codebase-knowledge/1.0.0
source_path: ui/specs/viewer-rbac.spec.ts
source_sha256: 79cff691d9d4a85bf7239a6b9861c09e627153bb61880e6886796a8d2f93347d
code_graph_id: file:ui/specs/viewer-rbac.spec.ts
analysis_scope: static-ast
fact_sha256: aa9dc9aac70ecf1160c1b42117cfcfc5d3246ce94889cb40bfcc8a8bc5276b2a
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-16T08:39:27.990Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-16T08:39:27.990Z"
---

# Purpose

UI specification extracted from ui/specs/viewer-rbac.spec.ts by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- None detected by static analysis.

# Imports

- [api/services/FoldersService.ts](../../api/services/folders-service.md) via `@api/services/FoldersService`
- [utils/common/CommonUtils.ts](../../utils/common/common-utils.md) via `@utils/common/CommonUtils`
- [ui/pages/HomePage.ts](../pages/home-page.md) via `@pages/HomePage`
- [utils/fixtures/TestFixtures.ts](../../utils/fixtures/test-fixtures.md) via `@utils/fixtures/TestFixtures`

# Static relationships

- **ui/specs/viewer-rbac.spec.ts** uses api service [FoldersService](../../api/services/folders-service.md).
- **ui/specs/viewer-rbac.spec.ts** instantiates [HomePage](../pages/home-page.md).
- **ui/specs/viewer-rbac.spec.ts** uses fixture [cleanup](../../utils/fixtures/test-fixtures.md).
- **ui/specs/viewer-rbac.spec.ts** uses page object [HomePage](../pages/home-page.md).
- **ui/specs/viewer-rbac.spec.ts** instantiates [FoldersService](../../api/services/folders-service.md).
- **ui/specs/viewer-rbac.spec.ts** uses fixture [viewerPage](../../utils/fixtures/test-fixtures.md).
- **ui/specs/viewer-rbac.spec.ts** uses fixture [adminRequest](../../utils/fixtures/test-fixtures.md).

# Dependents

- None detected by static analysis.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `79cff691d9d4a85bf7239a6b9861c09e627153bb61880e6886796a8d2f93347d`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
