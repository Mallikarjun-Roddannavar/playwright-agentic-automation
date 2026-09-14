---
type: Code Module
title: AuthContext
description: Application frontend extracted from app/frontend/src/context/AuthContext.tsx by deterministic static analysis.
resource: repo://playwright-agentic-automation/app/frontend/src/context/AuthContext.tsx
tags:
  - generated
  - static-ast
  - frontend
  - tsx
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/app/frontend/src/context/AuthContext.tsx
    title: app/frontend/src/context/AuthContext.tsx
    author: process:codebase-knowledge/1.0.0
source_path: app/frontend/src/context/AuthContext.tsx
source_sha256: 4152d3f27bdd57c583dbf6ea87fef2841d9facefcbb5f2d73a0e071fef2418bb
code_graph_id: file:app/frontend/src/context/AuthContext.tsx
analysis_scope: static-ast
fact_sha256: 67f2255e564953a503c2c7ecdb5d73b07c5e33d5cbdeef4d39710ed58c955ce6
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-09-10T15:54:55.036Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-09-10T15:54:55.036Z"
---

# Purpose

Application frontend extracted from app/frontend/src/context/AuthContext.tsx by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `type` **AuthContextValue** (lines 7-14)
- `function` **AuthProvider** exported (lines 39-71)
- `function` **getStoredUser** (lines 20-33)
- `function` **hasRole** (lines 35-37)
- `function` **useAuth** exported (lines 73-79)

# Imports

- `react` via `react`
- [app/frontend/src/api.ts](./app--frontend--src--api.md) via `../api`
- [app/frontend/src/types.ts](./app--frontend--src--types.md) via `../types`

# Static relationships

- None detected by static analysis.

# Dependents

- [app/frontend/src/pages/PreferencesPage.tsx](./app--frontend--src--pages--preferences-page.md) imports this module.
- [app/frontend/src/pages/FilesPage.tsx](./app--frontend--src--pages--files-page.md) imports this module.
- [app/frontend/src/App.tsx](./app--frontend--src--app.md) imports this module.
- [app/frontend/src/pages/LoginPage.tsx](./app--frontend--src--pages--login-page.md) imports this module.
- [app/frontend/src/pages/FoldersPage.tsx](./app--frontend--src--pages--folders-page.md) imports this module.
- [app/frontend/src/main.tsx](./app--frontend--src--main.md) imports this module.
- [app/frontend/src/components/AppLayout.tsx](./app--frontend--src--components--app-layout.md) imports this module.
- [app/frontend/src/pages/HomePage.tsx](./app--frontend--src--pages--home-page.md) imports this module.
- [app/frontend/src/pages/OAuthCallbackPage.tsx](./app--frontend--src--pages--oauth-callback-page.md) imports this module.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `4152d3f27bdd57c583dbf6ea87fef2841d9facefcbb5f2d73a0e071fef2418bb`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
