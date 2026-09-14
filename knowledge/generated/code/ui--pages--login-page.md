---
type: Code Module
title: LoginPage
description: UI page object extracted from ui/pages/LoginPage.ts by deterministic static analysis.
resource: repo://playwright-agentic-automation/ui/pages/LoginPage.ts
tags:
  - generated
  - static-ast
  - ui-page
  - ts
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/ui/pages/LoginPage.ts
    title: ui/pages/LoginPage.ts
    author: process:codebase-knowledge/1.0.0
source_path: ui/pages/LoginPage.ts
source_sha256: 1dbb11a1e664e2b285bc4d27f85fb59b8f52ec347abe6f142ab41dd440a1e752
code_graph_id: file:ui/pages/LoginPage.ts
analysis_scope: static-ast
fact_sha256: 42a44d7aa0fea637e8187bd82248068ef482d78370746a59ca7b482055aca391
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-09-10T15:54:55.036Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-09-10T15:54:55.036Z"
---

# Purpose

UI page object extracted from ui/pages/LoginPage.ts by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `class` **LoginPage** exported (lines 6-50)
- `method` **LoginPage.goto** (lines 13-17)
- `method` **LoginPage.gotoProtectedHome** (lines 19-23)
- `method` **LoginPage.login** (lines 25-33)
- `method` **LoginPage.loginExpectingFailure** (lines 35-40)
- `method` **LoginPage.waitForPageLoad** (lines 42-49)

# Imports

- [ui/pages/HomePage.ts](./ui--pages--home-page.md) via `@pages/HomePage`
- `@playwright/test` via `@playwright/test`
- [ui/pages/BasePage.ts](./ui--pages--base-page.md) via `@pages/BasePage`

# Static relationships

- **LoginPage.goto** uses ui route [/login](./ui--pages--base-page.md).
- **LoginPage** extends [BasePage](./ui--pages--base-page.md).
- **LoginPage.login** instantiates [HomePage](./ui--pages--home-page.md).
- **LoginPage.login** returns page [HomePage](./ui--pages--home-page.md).
- **LoginPage.login** uses page object [HomePage](./ui--pages--home-page.md).
- **LoginPage.gotoProtectedHome** uses ui route [/](./ui--pages--base-page.md).
- **LoginPage** navigates to [HomePage](./ui--pages--home-page.md).

# Dependents

- [ui/specs/login.spec.ts](./ui--specs--login-spec.md) uses page object this module.
- [ui/specs/login.spec.ts](./ui--specs--login-spec.md) imports this module.
- [ui/specs/login.spec.ts](./ui--specs--login-spec.md) instantiates this module.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `1dbb11a1e664e2b285bc4d27f85fb59b8f52ec347abe6f142ab41dd440a1e752`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
