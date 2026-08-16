---
type: Code Module
title: auth.setup
description: Test setup extracted from ui/setup/auth.setup.ts by deterministic static analysis.
resource: repo://playwright-agentic-automation/ui/setup/auth.setup.ts
tags:
  - generated
  - static-ast
  - setup
  - ts
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/ui/setup/auth.setup.ts
    title: ui/setup/auth.setup.ts
    author: process:codebase-knowledge/1.0.0
source_path: ui/setup/auth.setup.ts
source_sha256: 6a745c96200b1b8c0f7b0b414c384c9e8275e17876121fde7244f7d67276a97f
code_graph_id: file:ui/setup/auth.setup.ts
analysis_scope: static-ast
fact_sha256: fc05895dabfafa43f450fd6c562a31a9df759229eae4f9da2eff8db7311d5750
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-16T08:39:27.990Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-16T08:39:27.990Z"
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
