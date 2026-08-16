---
type: Code Module
title: TestFixtures
description: Shared fixture extracted from utils/fixtures/TestFixtures.ts by deterministic static analysis.
resource: repo://playwright-agentic-automation/utils/fixtures/TestFixtures.ts
tags:
  - generated
  - static-ast
  - fixture
  - ts
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/utils/fixtures/TestFixtures.ts
    title: utils/fixtures/TestFixtures.ts
    author: process:codebase-knowledge/1.0.0
source_path: utils/fixtures/TestFixtures.ts
source_sha256: bdbc158860b165c0b89851845be47d89998aed86d58f303660f2ab383381300b
code_graph_id: file:utils/fixtures/TestFixtures.ts
analysis_scope: static-ast
fact_sha256: 5c9c4d15f43d27c4bce2af8e6f24d3bd539d0a5d432f4751d279e782e36d99ec
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-16T08:39:27.990Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-16T08:39:27.990Z"
---

# Purpose

Shared fixture extracted from utils/fixtures/TestFixtures.ts by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `fixture` **adminContext** (lines 115-undefined)
- `fixture` **adminPage** (lines 142-undefined)
- `fixture` **adminRequest** (lines 166-undefined)
- `fixture` **cleanup** (lines 101-undefined)
- `type` **Cleanup** exported (lines 39-41)
- `type` **CleanupTask** (lines 37-37)
- `function` **createApiRoleContext** (lines 67-98)
- `function` **createBrowserRoleContext** (lines 58-65)
- `fixture` **editorContext** (lines 124-undefined)
- `fixture` **editorPage** (lines 150-undefined)
- `fixture` **editorRequest** (lines 176-undefined)
- `type` **RoleName** (lines 31-31)
- `variable` **test** (lines 100-196)
- `type` **TestFixtures** exported (lines 43-54)
- `type` **TokenResponse** (lines 33-35)
- `fixture` **viewerContext** (lines 133-undefined)
- `fixture` **viewerPage** (lines 158-undefined)
- `fixture` **viewerRequest** (lines 186-undefined)

# Imports

- `@playwright/test` via `@playwright/test`
- [config/test-config.json](../../config/test-config.md) via `@config/test-config.json`
- [api/services/AuthService.ts](../../api/services/auth-service.md) via `@api/services/AuthService`
- [utils/common/CommonUtils.ts](../common/common-utils.md) via `@utils/common/CommonUtils`
- [utils/common/Logger.ts](../common/logger.md) via `@utils/common/Logger`

# Static relationships

- **utils/fixtures/TestFixtures.ts** declares fixture [adminRequest](./test-fixtures.md).
- **editorPage** uses fixture [editorContext](./test-fixtures.md).
- **utils/fixtures/TestFixtures.ts** declares fixture [viewerPage](./test-fixtures.md).
- **utils/fixtures/TestFixtures.ts** declares fixture [adminContext](./test-fixtures.md).
- **utils/fixtures/TestFixtures.ts** declares fixture [editorContext](./test-fixtures.md).
- **utils/fixtures/TestFixtures.ts** declares fixture [viewerRequest](./test-fixtures.md).
- **createApiRoleContext** uses api service [AuthService](../../api/services/auth-service.md).
- **utils/fixtures/TestFixtures.ts** declares fixture [viewerContext](./test-fixtures.md).
- **utils/fixtures/TestFixtures.ts** declares fixture [editorRequest](./test-fixtures.md).
- **utils/fixtures/TestFixtures.ts** declares fixture [cleanup](./test-fixtures.md).
- **createApiRoleContext** instantiates [AuthService](../../api/services/auth-service.md).
- **utils/fixtures/TestFixtures.ts** declares fixture [adminPage](./test-fixtures.md).
- **adminPage** uses fixture [adminContext](./test-fixtures.md).
- **utils/fixtures/TestFixtures.ts** declares fixture [editorPage](./test-fixtures.md).
- **viewerPage** uses fixture [viewerContext](./test-fixtures.md).

# Dependents

- [editorPage](./test-fixtures.md) uses fixture this module.
- [ui/specs/files.spec.ts](../../ui/specs/files-spec.md) uses fixture this module.
- [ui/specs/files.spec.ts](../../ui/specs/files-spec.md) imports this module.
- [ui/specs/files.spec.ts](../../ui/specs/files-spec.md) uses fixture this module.
- [expectRoleCanUploadFile](../../ui/specs/files-spec.md) uses fixture this module.
- [api/specs/rbac.spec.ts](../../api/specs/rbac-spec.md) uses fixture this module.
- [api/specs/files.spec.ts](../../api/specs/files-spec.md) uses fixture this module.
- [ui/specs/multi-role.spec.ts](../../ui/specs/multi-role-spec.md) imports this module.
- [api/specs/files.spec.ts](../../api/specs/files-spec.md) uses fixture this module.
- [ui/specs/files.spec.ts](../../ui/specs/files-spec.md) uses fixture this module.
- [api/specs/rbac.spec.ts](../../api/specs/rbac-spec.md) uses fixture this module.
- [api/specs/files.spec.ts](../../api/specs/files-spec.md) uses fixture this module.
- [ui/specs/multi-role.spec.ts](../../ui/specs/multi-role-spec.md) uses fixture this module.
- [ui/specs/viewer-rbac.spec.ts](../../ui/specs/viewer-rbac-spec.md) uses fixture this module.
- [ui/specs/files.spec.ts](../../ui/specs/files-spec.md) uses fixture this module.
- [api/specs/rbac.spec.ts](../../api/specs/rbac-spec.md) imports this module.
- [api/specs/rbac.spec.ts](../../api/specs/rbac-spec.md) uses fixture this module.
- [ui/specs/multi-role.spec.ts](../../ui/specs/multi-role-spec.md) uses fixture this module.
- [api/specs/rbac.spec.ts](../../api/specs/rbac-spec.md) uses fixture this module.
- [ui/specs/multi-role.spec.ts](../../ui/specs/multi-role-spec.md) uses fixture this module.
- [api/specs/files.spec.ts](../../api/specs/files-spec.md) uses fixture this module.
- [ui/specs/files.spec.ts](../../ui/specs/files-spec.md) uses fixture this module.
- [api/specs/files.spec.ts](../../api/specs/files-spec.md) imports this module.
- [ui/specs/viewer-rbac.spec.ts](../../ui/specs/viewer-rbac-spec.md) uses fixture this module.
- [adminPage](./test-fixtures.md) uses fixture this module.
- [ui/specs/multi-role.spec.ts](../../ui/specs/multi-role-spec.md) uses fixture this module.
- [ui/specs/viewer-rbac.spec.ts](../../ui/specs/viewer-rbac-spec.md) imports this module.
- [viewerPage](./test-fixtures.md) uses fixture this module.
- [ui/specs/viewer-rbac.spec.ts](../../ui/specs/viewer-rbac-spec.md) uses fixture this module.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `bdbc158860b165c0b89851845be47d89998aed86d58f303660f2ab383381300b`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
