---
type: Code Module
title: FoldersPage
description: UI page object extracted from ui/pages/FoldersPage.ts by deterministic static analysis.
resource: repo://playwright-pom-agent-skills/ui/pages/FoldersPage.ts
tags:
  - generated
  - static-ast
  - ui-page
  - ts
status: stable
sources:
  - id: source
    resource: repo://playwright-pom-agent-skills/ui/pages/FoldersPage.ts
    title: ui/pages/FoldersPage.ts
    author: process:codebase-knowledge/1.0.0
source_path: ui/pages/FoldersPage.ts
source_sha256: 5ea19087364eb28a006cd231c2296399ac23d6ad5ff517b4d48e130dd847ffe5
code_graph_id: file:ui/pages/FoldersPage.ts
analysis_scope: static-ast
fact_sha256: b6d28d09d5eec47146e70c86f681e2925368869ffca1a84e3282b2874fdb88b5
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-07-31T11:37:54.189Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-07-31T11:37:54.189Z"
---

# Purpose

UI page object extracted from ui/pages/FoldersPage.ts by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `function` **escapeRegExp** (lines 6-8)
- `class` **FoldersPage** exported (lines 10-55)
- `method` **FoldersPage.createFolder** (lines 41-45)
- `method` **FoldersPage.folderName** (lines 27-31)
- `method` **FoldersPage.folderOpenButton** (lines 37-39)
- `method` **FoldersPage.folderSelectCheckbox** (lines 33-35)
- `method` **FoldersPage.openFolder** (lines 47-54)
- `method` **FoldersPage.waitForPageLoad** (lines 18-25)

# Imports

- [ui/pages/BasePage.ts](./base-page.md) via `@pages/BasePage`
- [ui/pages/FolderFilesPage.ts](./folder-files-page.md) via `@pages/FolderFilesPage`
- `@playwright/test` via `@playwright/test`

# Static relationships

- **FoldersPage.openFolder** instantiates [FolderFilesPage](./folder-files-page.md).
- **FoldersPage** extends [BasePage](./base-page.md).
- **FoldersPage.openFolder** uses page object [FolderFilesPage](./folder-files-page.md).
- **FoldersPage** navigates to [FolderFilesPage](./folder-files-page.md).
- **FoldersPage.openFolder** returns page [FolderFilesPage](./folder-files-page.md).

# Dependents

- [HomePage.openFolders](./home-page.md) instantiates this module.
- [ui/pages/HomePage.ts](./home-page.md) imports this module.
- [HomePage.openFolders](./home-page.md) uses page object this module.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `5ea19087364eb28a006cd231c2296399ac23d6ad5ff517b4d48e130dd847ffe5`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
