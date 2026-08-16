---
type: Code Module
title: FolderFilesPage
description: UI page object extracted from ui/pages/FolderFilesPage.ts by deterministic static analysis.
resource: repo://playwright-agentic-automation/ui/pages/FolderFilesPage.ts
tags:
  - generated
  - static-ast
  - ui-page
  - ts
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/ui/pages/FolderFilesPage.ts
    title: ui/pages/FolderFilesPage.ts
    author: process:codebase-knowledge/1.0.0
source_path: ui/pages/FolderFilesPage.ts
source_sha256: 7b176ca356aa93d95e7f28506beaa3524e5d81f192167cb65066c2f04c18483c
code_graph_id: file:ui/pages/FolderFilesPage.ts
analysis_scope: static-ast
fact_sha256: c111e929ab7a44c6ea0d3ef83b16ea6bdf49f9630ce995f6ceb1afbd41352e15
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-16T08:39:27.990Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-16T08:39:27.990Z"
---

# Purpose

UI page object extracted from ui/pages/FolderFilesPage.ts by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `function` **escapeRegExp** (lines 5-7)
- `class` **FolderFilesPage** exported (lines 9-42)
- `method` **FolderFilesPage.uploadedFileName** (lines 30-34)
- `method` **FolderFilesPage.uploadFile** (lines 36-41)
- `method` **FolderFilesPage.waitForPageLoad** (lines 21-28)

# Imports

- [ui/pages/BasePage.ts](./base-page.md) via `@pages/BasePage`
- `@playwright/test` via `@playwright/test`

# Static relationships

- **FolderFilesPage** extends [BasePage](./base-page.md).

# Dependents

- [FoldersPage.openFolder](./folders-page.md) instantiates this module.
- [FoldersPage.openFolder](./folders-page.md) uses page object this module.
- [ui/pages/FoldersPage.ts](./folders-page.md) imports this module.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `7b176ca356aa93d95e7f28506beaa3524e5d81f192167cb65066c2f04c18483c`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
