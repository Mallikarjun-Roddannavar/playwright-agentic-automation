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
fact_sha256: 829c2930a14788d6de53d388ef87446db3e8807ffa7824fa23395cd638809947
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-09-10T15:54:55.036Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-09-10T15:54:55.036Z"
---

# Purpose

Application frontend extracted from app/frontend/src/components/AppLayout.tsx by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `function` **AppLayout** exported (lines 8-126)

# Imports

- `react-router-dom` via `react-router-dom`
- `react` via `react`
- [app/frontend/src/context/AuthContext.tsx](./app--frontend--src--context--auth-context.md) via `../context/AuthContext`
- [app/frontend/src/components/Sidebar.tsx](./app--frontend--src--components--sidebar.md) via `./Sidebar`

# Static relationships

- None detected by static analysis.

# Dependents

- [app/frontend/src/pages/FilesPage.tsx](./app--frontend--src--pages--files-page.md) imports this module.
- [app/frontend/src/pages/FoldersPage.tsx](./app--frontend--src--pages--folders-page.md) imports this module.
- [app/frontend/src/pages/HomePage.tsx](./app--frontend--src--pages--home-page.md) imports this module.
- [app/frontend/src/pages/PreferencesPage.tsx](./app--frontend--src--pages--preferences-page.md) imports this module.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `933aaecc55f66b6af8fc1674375aea4b0af5d4d9858906daa211c42682732734`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
