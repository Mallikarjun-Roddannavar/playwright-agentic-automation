---
type: Code Module
title: AppLayout
description: Application frontend extracted from app/frontend/src/components/AppLayout.tsx by deterministic static analysis.
resource: repo://playwright-agentic-automation/app/frontend/src/components/AppLayout.tsx
tags:
  - generated
  - static-ast
  - frontend
  - tsx
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/app/frontend/src/components/AppLayout.tsx
    title: app/frontend/src/components/AppLayout.tsx
    author: process:codebase-knowledge/1.0.0
source_path: app/frontend/src/components/AppLayout.tsx
source_sha256: d18932526f957d776c55030ce87718e6cddeadfb516d81cba5d9ab41f504e8ed
code_graph_id: file:app/frontend/src/components/AppLayout.tsx
analysis_scope: static-ast
fact_sha256: e8bc99883aed58c5b3251677205057e8cf032e011fc90b535253b7deb812ac51
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-16T08:39:27.990Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-16T08:39:27.990Z"
---

# Purpose

Application frontend extracted from app/frontend/src/components/AppLayout.tsx by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `function` **AppLayout** exported (lines 8-126)

# Imports

- `react-router-dom` via `react-router-dom`
- `react` via `react`
- [app/frontend/src/context/AuthContext.tsx](../context/auth-context.md) via `../context/AuthContext`
- [app/frontend/src/components/Sidebar.tsx](./sidebar.md) via `./Sidebar`

# Static relationships

- None detected by static analysis.

# Dependents

- [app/frontend/src/pages/FilesPage.tsx](../pages/files-page.md) imports this module.
- [app/frontend/src/pages/FoldersPage.tsx](../pages/folders-page.md) imports this module.
- [app/frontend/src/pages/HomePage.tsx](../pages/home-page.md) imports this module.
- [app/frontend/src/pages/PreferencesPage.tsx](../pages/preferences-page.md) imports this module.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `d18932526f957d776c55030ce87718e6cddeadfb516d81cba5d9ab41f504e8ed`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
