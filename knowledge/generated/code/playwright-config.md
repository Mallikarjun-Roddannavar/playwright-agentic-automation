---
type: Code Module
title: playwright.config
description: Framework tooling extracted from playwright.config.ts by deterministic static analysis.
resource: repo://playwright-pom-agent-skills/playwright.config.ts
tags:
  - generated
  - static-ast
  - tooling
  - ts
status: stable
sources:
  - id: source
    resource: repo://playwright-pom-agent-skills/playwright.config.ts
    title: playwright.config.ts
    author: process:codebase-knowledge/1.0.0
source_path: playwright.config.ts
source_sha256: 8228f4f46c41116ddfa26c8729165d88cac6735aa8ccf0c2d50533bcdd71380b
code_graph_id: file:playwright.config.ts
analysis_scope: static-ast
fact_sha256: b31b1d5b91e10965cad898cfffd59bd5afced1eb3bb985fbb26dad771e51b9f6
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-07-31T11:37:54.189Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-07-31T11:37:54.189Z"
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

The facts above are machine-confirmed from the TypeScript AST and source hash `8228f4f46c41116ddfa26c8729165d88cac6735aa8ccf0c2d50533bcdd71380b`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
