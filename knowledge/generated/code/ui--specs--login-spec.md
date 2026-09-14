---
type: Test Specification
title: login.spec
description: UI specification extracted from ui/specs/login.spec.ts by deterministic static analysis.
resource: repo://playwright-agentic-automation/ui/specs/login.spec.ts
tags:
  - generated
  - static-ast
  - ui-spec
  - ts
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/ui/specs/login.spec.ts
    title: ui/specs/login.spec.ts
    author: process:codebase-knowledge/1.0.0
source_path: ui/specs/login.spec.ts
source_sha256: 757e24c0dad0be5b410a3716177c7c05904812c151ce55f3457677e2082b2748
code_graph_id: file:ui/specs/login.spec.ts
analysis_scope: static-ast
fact_sha256: 63ca28df3272b3ec8e76cedd5362621f9a4c1da6bdfe019ef8e68d661c19899f
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-09-10T15:54:55.036Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-09-10T15:54:55.036Z"
---

# Purpose

UI specification extracted from ui/specs/login.spec.ts by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- None detected by static analysis.

# Imports

- `@playwright/test` via `@playwright/test`
- [ui/pages/LoginPage.ts](./ui--pages--login-page.md) via `@pages/LoginPage`
- [config/test-config.json](./config--test-config.md) via `@config/test-config.json`

# Static relationships

- **ui/specs/login.spec.ts** uses page object [LoginPage](./ui--pages--login-page.md).
- **ui/specs/login.spec.ts** instantiates [LoginPage](./ui--pages--login-page.md).

# Dependents

- None detected by static analysis.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `757e24c0dad0be5b410a3716177c7c05904812c151ce55f3457677e2082b2748`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
