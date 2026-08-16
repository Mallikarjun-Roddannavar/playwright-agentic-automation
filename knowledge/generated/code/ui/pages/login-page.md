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
fact_sha256: 574defbc1c8a07ce33252c765ac6cb5e61fbac5ccb946f9c6a260cafed084dff
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-16T08:39:27.990Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-16T08:39:27.990Z"
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

- [ui/pages/HomePage.ts](./home-page.md) via `@pages/HomePage`
- `@playwright/test` via `@playwright/test`
- [ui/pages/BasePage.ts](./base-page.md) via `@pages/BasePage`

# Static relationships

- **LoginPage.goto** uses ui route [/login](./base-page.md).
- **LoginPage** extends [BasePage](./base-page.md).
- **LoginPage.login** instantiates [HomePage](./home-page.md).
- **LoginPage.login** returns page [HomePage](./home-page.md).
- **LoginPage.login** uses page object [HomePage](./home-page.md).
- **LoginPage.gotoProtectedHome** uses ui route [/](./base-page.md).
- **LoginPage** navigates to [HomePage](./home-page.md).

# Dependents

- [ui/specs/login.spec.ts](../specs/login-spec.md) uses page object this module.
- [ui/specs/login.spec.ts](../specs/login-spec.md) imports this module.
- [ui/specs/login.spec.ts](../specs/login-spec.md) instantiates this module.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `1dbb11a1e664e2b285bc4d27f85fb59b8f52ec347abe6f142ab41dd440a1e752`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
