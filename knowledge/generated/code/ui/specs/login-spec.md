---
type: Test Specification
title: login.spec
description: UI specification extracted from ui/specs/login.spec.ts by deterministic static analysis.
resource: repo://playwright-pom-agent-skills/ui/specs/login.spec.ts
tags:
  - generated
  - static-ast
  - ui-spec
  - ts
status: stable
sources:
  - id: source
    resource: repo://playwright-pom-agent-skills/ui/specs/login.spec.ts
    title: ui/specs/login.spec.ts
    author: process:codebase-knowledge/1.0.0
source_path: ui/specs/login.spec.ts
source_sha256: 757e24c0dad0be5b410a3716177c7c05904812c151ce55f3457677e2082b2748
code_graph_id: file:ui/specs/login.spec.ts
analysis_scope: static-ast
fact_sha256: 88a69f6e98d4ae90e31c7d5137d428122d02fbadba728f7001d0f0bec1c2ba36
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-07-31T11:37:54.189Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-07-31T11:37:54.189Z"
---

# Purpose

UI specification extracted from ui/specs/login.spec.ts by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- None detected by static analysis.

# Imports

- `@playwright/test` via `@playwright/test`
- [ui/pages/LoginPage.ts](../pages/login-page.md) via `@pages/LoginPage`
- [config/test-config.json](../../config/test-config.md) via `@config/test-config.json`

# Static relationships

- **ui/specs/login.spec.ts** uses page object [LoginPage](../pages/login-page.md).
- **ui/specs/login.spec.ts** instantiates [LoginPage](../pages/login-page.md).

# Dependents

- None detected by static analysis.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `757e24c0dad0be5b410a3716177c7c05904812c151ce55f3457677e2082b2748`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
