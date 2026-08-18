---
type: Code Module
title: Logger
description: Shared utility extracted from utils/common/Logger.ts by deterministic static analysis.
resource: repo://playwright-agentic-automation/utils/common/Logger.ts
tags:
  - generated
  - static-ast
  - utility
  - ts
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/utils/common/Logger.ts
    title: utils/common/Logger.ts
    author: process:codebase-knowledge/1.0.0
source_path: utils/common/Logger.ts
source_sha256: 2260e3c15b200659cfdc1015496a7ca8e05f30d5cfa4b901ac47c92ca7855f12
code_graph_id: file:utils/common/Logger.ts
analysis_scope: static-ast
fact_sha256: 59b6c1f614aa78cd0ddfce8aa6a626754449668e700ab3fa881a2be7495a8d9a
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-18T10:07:43.531Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-18T10:07:43.531Z"
---

# Purpose

Shared utility extracted from utils/common/Logger.ts by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `type` **LogLevel** exported (lines 1-1)
- `type` **LogMetadata** (lines 3-3)
- `class` **Logger** exported (lines 12-58)
- `method` **Logger.constructor** (lines 13-16)
- `method` **Logger.debug** (lines 22-24)
- `method` **Logger.error** (lines 34-36)
- `method` **Logger.info** (lines 26-28)
- `method` **Logger.warn** (lines 30-32)
- `method` **Logger.withScope** (lines 18-20)
- `method` **Logger.write** (lines 38-57)
- `variable` **logger** (lines 60-60)

# Imports

- None detected by static analysis.

# Static relationships

- **Logger.withScope** instantiates [Logger](./logger.md).
- **logger** instantiates [Logger](./logger.md).

# Dependents

- [ui/setup/auth.setup.ts](../../ui/setup/auth-setup.md) imports this module.
- [ui/pages/BasePage.ts](../../ui/pages/base-page.md) imports this module.
- [Logger.withScope](./logger.md) instantiates this module.
- [logger](./logger.md) instantiates this module.
- [api/services/BaseApiService.ts](../../api/services/base-api-service.md) imports this module.
- [utils/fixtures/TestFixtures.ts](../fixtures/test-fixtures.md) imports this module.
- [utils/common/CustomReporter.ts](./custom-reporter.md) imports this module.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `2260e3c15b200659cfdc1015496a7ca8e05f30d5cfa4b901ac47c92ca7855f12`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
