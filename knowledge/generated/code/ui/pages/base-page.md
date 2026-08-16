---
type: Code Module
title: BasePage
description: UI page object extracted from ui/pages/BasePage.ts by deterministic static analysis.
resource: repo://playwright-agentic-automation/ui/pages/BasePage.ts
tags:
  - generated
  - static-ast
  - ui-page
  - ts
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/ui/pages/BasePage.ts
    title: ui/pages/BasePage.ts
    author: process:codebase-knowledge/1.0.0
source_path: ui/pages/BasePage.ts
source_sha256: f3c0076f184b2488b24ceb03073213937d2a06f2f0ec56d21fe465ef3547dc6f
code_graph_id: file:ui/pages/BasePage.ts
analysis_scope: static-ast
fact_sha256: 76fe51b8f7323aabee7b3d46c6d8db4cffcddb1fcf3284487a3029ffbf59ca35
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-16T08:39:27.990Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-16T08:39:27.990Z"
---

# Purpose

UI page object extracted from ui/pages/BasePage.ts by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `class` **BasePage** exported (lines 6-30)
- `method` **BasePage.constructor** (lines 19-22)
- `method` **BasePage.gotoRoute** (lines 24-27)
- `method` **BasePage.waitForPageLoad** (lines 29-29)

# Imports

- [utils/common/Logger.ts](../../utils/common/logger.md) via `@utils/common/Logger`
- [utils/common/Waits.ts](../../utils/common/waits.md) via `@utils/common/Waits`
- `@playwright/test` via `@playwright/test`

# Static relationships

- **BasePage** declares route [/folders/{parameter}](./base-page.md).
- **BasePage** declares route [/](./base-page.md).
- **BasePage** declares route [/folders](./base-page.md).
- **BasePage** declares route [/login](./base-page.md).

# Dependents

- [ui/pages/FoldersPage.ts](./folders-page.md) imports this module.
- [playwright.config.ts](../../playwright-config.md) imports this module.
- [ui/pages/FolderFilesPage.ts](./folder-files-page.md) imports this module.
- [ui/pages/HomePage.ts](./home-page.md) imports this module.
- [ui/pages/LoginPage.ts](./login-page.md) imports this module.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `f3c0076f184b2488b24ceb03073213937d2a06f2f0ec56d21fe465ef3547dc6f`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
