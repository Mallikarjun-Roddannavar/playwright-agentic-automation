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
source_sha256: 933aaecc55f66b6af8fc1674375aea4b0af5d4d9858906daa211c42682732734
code_graph_id: file:app/frontend/src/components/AppLayout.tsx
analysis_scope: static-ast
fact_sha256: ae5a62b2e899a798944bf4f36ad310b203be9eed2b84420e234b8976c5877d78
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-18T10:16:28.092Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-18T10:16:28.092Z"
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

The facts above are machine-confirmed from the TypeScript AST and source hash `933aaecc55f66b6af8fc1674375aea4b0af5d4d9858906daa211c42682732734`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
