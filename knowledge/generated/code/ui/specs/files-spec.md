---
type: Test Specification
title: files.spec
description: UI specification extracted from ui/specs/files.spec.ts by deterministic static analysis.
resource: repo://playwright-agentic-automation/ui/specs/files.spec.ts
tags:
  - generated
  - static-ast
  - ui-spec
  - ts
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/ui/specs/files.spec.ts
    title: ui/specs/files.spec.ts
    author: process:codebase-knowledge/1.0.0
source_path: ui/specs/files.spec.ts
source_sha256: 01102de3a4b6e9a32ddb872bc4576d08e397b18b1d1b18b872c4930c0a8d0786
code_graph_id: file:ui/specs/files.spec.ts
analysis_scope: static-ast
fact_sha256: 2d5c221b5cf62ce6f75e74d718d11571256d25fb1d982695f5c78beda18d370d
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-18T10:07:43.531Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-18T10:07:43.531Z"
---

# Purpose

UI specification extracted from ui/specs/files.spec.ts by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `type` **CreatedFolderResponse** (lines 9-11)
- `type` **UploadScenario** (lines 13-19)
- `function` **expectRoleCanUploadFile** (lines 24-55)

# Imports

- [utils/fixtures/TestFixtures.ts](../../utils/fixtures/test-fixtures.md) via `@utils/fixtures/TestFixtures`
- `node:path` via `node:path`
- [utils/common/CommonUtils.ts](../../utils/common/common-utils.md) via `@utils/common/CommonUtils`
- `@playwright/test` via `@playwright/test`
- [ui/pages/HomePage.ts](../pages/home-page.md) via `@pages/HomePage`
- [api/services/FoldersService.ts](../../api/services/folders-service.md) via `@api/services/FoldersService`

# Static relationships

- **ui/specs/files.spec.ts** uses fixture [cleanup](../../utils/fixtures/test-fixtures.md).
- **ui/specs/files.spec.ts** uses fixture [adminPage](../../utils/fixtures/test-fixtures.md).
- **expectRoleCanUploadFile** uses fixture [cleanup](../../utils/fixtures/test-fixtures.md).
- **ui/specs/files.spec.ts** uses fixture [editorRequest](../../utils/fixtures/test-fixtures.md).
- **expectRoleCanUploadFile** uses api service [FoldersService](../../api/services/folders-service.md).
- **expectRoleCanUploadFile** uses page object [HomePage](../pages/home-page.md).
- **ui/specs/files.spec.ts** uses fixture [editorPage](../../utils/fixtures/test-fixtures.md).
- **expectRoleCanUploadFile** instantiates [FoldersService](../../api/services/folders-service.md).
- **ui/specs/files.spec.ts** uses fixture [adminRequest](../../utils/fixtures/test-fixtures.md).
- **expectRoleCanUploadFile** instantiates [HomePage](../pages/home-page.md).

# Dependents

- None detected by static analysis.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `01102de3a4b6e9a32ddb872bc4576d08e397b18b1d1b18b872c4930c0a8d0786`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
