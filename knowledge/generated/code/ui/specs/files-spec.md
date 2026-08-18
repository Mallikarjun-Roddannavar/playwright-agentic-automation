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
source_sha256: 84a10ffd05955ca55460b791054c98850747c085ccd3f4bb1889e29c33707f31
code_graph_id: file:ui/specs/files.spec.ts
analysis_scope: static-ast
fact_sha256: e0d88a2c875f0501bf4529c82806bb5518d85aff3cc8dfcaf5ae2d1bea9fe932
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-18T10:16:28.092Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-18T10:16:28.092Z"
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

The facts above are machine-confirmed from the TypeScript AST and source hash `84a10ffd05955ca55460b791054c98850747c085ccd3f4bb1889e29c33707f31`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
