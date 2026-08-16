---
type: Code Module
title: HomePage
description: UI page object extracted from ui/pages/HomePage.ts by deterministic static analysis.
resource: repo://playwright-agentic-automation/ui/pages/HomePage.ts
tags:
  - generated
  - static-ast
  - ui-page
  - ts
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/ui/pages/HomePage.ts
    title: ui/pages/HomePage.ts
    author: process:codebase-knowledge/1.0.0
source_path: ui/pages/HomePage.ts
source_sha256: 36832f588d9ae6c6f69248dd78a841df2f99c116cfbec123b3c69d073deb6244
code_graph_id: file:ui/pages/HomePage.ts
analysis_scope: static-ast
fact_sha256: d51a50f4d6a39c5812f6a7363a4ce8915d9acda57d1a70a15451a60202a953be
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-16T08:39:27.990Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-16T08:39:27.990Z"
---

# Purpose

UI page object extracted from ui/pages/HomePage.ts by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `class` **HomePage** exported (lines 6-34)
- `method` **HomePage.goto** (lines 11-15)
- `method` **HomePage.openFolders** (lines 17-24)
- `method` **HomePage.waitForPageLoad** (lines 26-33)

# Imports

- [ui/pages/FoldersPage.ts](./folders-page.md) via `@pages/FoldersPage`
- [ui/pages/BasePage.ts](./base-page.md) via `@pages/BasePage`
- `@playwright/test` via `@playwright/test`

# Static relationships

- **HomePage.openFolders** returns page [FoldersPage](./folders-page.md).
- **HomePage** navigates to [FoldersPage](./folders-page.md).
- **HomePage** extends [BasePage](./base-page.md).
- **HomePage.openFolders** instantiates [FoldersPage](./folders-page.md).
- **HomePage.openFolders** uses page object [FoldersPage](./folders-page.md).
- **HomePage.goto** uses ui route [/](./base-page.md).

# Dependents

- [ui/specs/multi-role.spec.ts](../specs/multi-role-spec.md) imports this module.
- [ui/pages/LoginPage.ts](./login-page.md) imports this module.
- [ui/specs/viewer-rbac.spec.ts](../specs/viewer-rbac-spec.md) instantiates this module.
- [ui/specs/multi-role.spec.ts](../specs/multi-role-spec.md) instantiates this module.
- [LoginPage.login](./login-page.md) instantiates this module.
- [expectRoleCanUploadFile](../specs/files-spec.md) uses page object this module.
- [ui/specs/viewer-rbac.spec.ts](../specs/viewer-rbac-spec.md) uses page object this module.
- [LoginPage.login](./login-page.md) uses page object this module.
- [ui/specs/files.spec.ts](../specs/files-spec.md) imports this module.
- [ui/specs/multi-role.spec.ts](../specs/multi-role-spec.md) uses page object this module.
- [expectRoleCanUploadFile](../specs/files-spec.md) instantiates this module.
- [ui/specs/viewer-rbac.spec.ts](../specs/viewer-rbac-spec.md) imports this module.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `36832f588d9ae6c6f69248dd78a841df2f99c116cfbec123b3c69d073deb6244`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
