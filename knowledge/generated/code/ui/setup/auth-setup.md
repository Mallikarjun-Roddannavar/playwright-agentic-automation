---
type: Code Module
title: auth.setup
description: Test setup extracted from ui/setup/auth.setup.ts by deterministic static analysis.
resource: repo://playwright-pom-agent-skills/ui/setup/auth.setup.ts
tags:
  - generated
  - static-ast
  - setup
  - ts
status: stable
sources:
  - id: source
    resource: repo://playwright-pom-agent-skills/ui/setup/auth.setup.ts
    title: ui/setup/auth.setup.ts
    author: process:codebase-knowledge/1.0.0
source_path: ui/setup/auth.setup.ts
source_sha256: 6a745c96200b1b8c0f7b0b414c384c9e8275e17876121fde7244f7d67276a97f
code_graph_id: file:ui/setup/auth.setup.ts
analysis_scope: static-ast
fact_sha256: c0e8f316bd9cf278233b2fa9d8704a14966f1576a385591db11b72d6c83e701f
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-07-31T11:37:54.189Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-07-31T11:37:54.189Z"
---

# Purpose

Test setup extracted from ui/setup/auth.setup.ts by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `function` **createRoleStorageState** (lines 36-82)
- `type` **RoleName** (lines 10-10)
- `type` **TokenResponse** (lines 14-16)

# Imports

- [utils/common/Logger.ts](../../utils/common/logger.md) via `@utils/common/Logger`
- [config/test-config.json](../../config/test-config.md) via `@config/test-config.json`
- `@playwright/test` via `@playwright/test`
- `node:fs/promises` via `node:fs/promises`
- [api/services/BaseApiService.ts](../../api/services/base-api-service.md) via `@api/services/BaseApiService`
- [utils/common/CommonUtils.ts](../../utils/common/common-utils.md) via `@utils/common/CommonUtils`

# Static relationships

- **createRoleStorageState** uses api route [/token](../../api/services/base-api-service.md).

# Dependents

- None detected by static analysis.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `6a745c96200b1b8c0f7b0b414c384c9e8275e17876121fde7244f7d67276a97f`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
