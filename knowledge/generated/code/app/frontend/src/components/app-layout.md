---
type: Code Module
title: AppLayout
description: Source module extracted from app/frontend/src/components/AppLayout.tsx by deterministic static analysis.
resource: repo://playwright-pom-agent-skills/app/frontend/src/components/AppLayout.tsx
tags:
  - generated
  - static-ast
  - source
  - tsx
status: stable
sources:
  - id: source
    resource: repo://playwright-pom-agent-skills/app/frontend/src/components/AppLayout.tsx
    title: app/frontend/src/components/AppLayout.tsx
    author: process:codebase-knowledge/1.0.0
source_path: app/frontend/src/components/AppLayout.tsx
source_sha256: d18932526f957d776c55030ce87718e6cddeadfb516d81cba5d9ab41f504e8ed
code_graph_id: file:app/frontend/src/components/AppLayout.tsx
analysis_scope: static-ast
fact_sha256: f5e27273e9a7042c57cddba695979edfdd6b912db9855852584b94fe52228df3
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-15T11:47:52.662Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-15T11:47:52.662Z"
---

# Purpose

Source module extracted from app/frontend/src/components/AppLayout.tsx by deterministic static analysis. The underlying source code remains authoritative.

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
