---
type: Code Module
title: playwright.config
description: Framework tooling extracted from playwright.config.ts by deterministic static analysis.
resource: repo://playwright-agentic-automation/playwright.config.ts
tags:
  - generated
  - static-ast
  - tooling
  - ts
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/playwright.config.ts
    title: playwright.config.ts
    author: process:codebase-knowledge/1.0.0
source_path: playwright.config.ts
source_sha256: 7450cbd1c78a18c970c4462b7f7b327ca33520da0dfaf31914fedbf410cd0f98
code_graph_id: file:playwright.config.ts
analysis_scope: static-ast
fact_sha256: 4fcd326587643f4da810573cca1993efebd951aa5244f486a49b9236291f8d8b
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-16T08:39:27.990Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-16T08:39:27.990Z"
---

# Purpose

Framework tooling extracted from playwright.config.ts by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- None detected by static analysis.

# Imports

- [utils/common/Waits.ts](./utils/common/waits.md) via `@utils/common/Waits`
- `node:path` via `node:path`
- [ui/pages/BasePage.ts](./ui/pages/base-page.md) via `@pages/BasePage`
- [api/services/BaseApiService.ts](./api/services/base-api-service.md) via `@api/services/BaseApiService`
- `@playwright/test` via `@playwright/test`
- [config/test-config.json](./config/test-config.md) via `@config/test-config.json`

# Static relationships

- **playwright.config.ts** uses api route [/health](./api/services/base-api-service.md).

# Dependents

- None detected by static analysis.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `7450cbd1c78a18c970c4462b7f7b327ca33520da0dfaf31914fedbf410cd0f98`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
