---
type: Code Module
title: App
description: Application frontend extracted from app/frontend/src/App.tsx by deterministic static analysis.
resource: repo://playwright-agentic-automation/app/frontend/src/App.tsx
tags:
  - generated
  - static-ast
  - frontend
  - tsx
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/app/frontend/src/App.tsx
    title: app/frontend/src/App.tsx
    author: process:codebase-knowledge/1.0.0
source_path: app/frontend/src/App.tsx
source_sha256: 81b6eaa176cdb1992e987a1a1bbdb9b8f2c3b61dc7a7b7e4f297918b1b7e2ffb
code_graph_id: file:app/frontend/src/App.tsx
analysis_scope: static-ast
fact_sha256: fc94dc5a927e5f802d07c22c43ecb7897b985e47d4202bc580c36e1f1c4abb2c
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-09-04T05:15:44.685Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-09-04T05:15:44.685Z"
---

# Purpose

Application frontend extracted from app/frontend/src/App.tsx by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `function` **App** exported (lines 16-66)
- `function` **PrivateRoute** (lines 11-14)

# Imports

- `react-router-dom` via `react-router-dom`
- [app/frontend/src/context/AuthContext.tsx](./context/auth-context.md) via `./context/AuthContext`
- [app/frontend/src/pages/FoldersPage.tsx](./pages/folders-page.md) via `./pages/FoldersPage`
- [app/frontend/src/pages/PreferencesPage.tsx](./pages/preferences-page.md) via `./pages/PreferencesPage`
- [app/frontend/src/pages/HomePage.tsx](./pages/home-page.md) via `./pages/HomePage`
- [app/frontend/src/pages/FilesPage.tsx](./pages/files-page.md) via `./pages/FilesPage`
- [app/frontend/src/pages/LoginPage.tsx](./pages/login-page.md) via `./pages/LoginPage`
- [app/frontend/src/pages/OAuthCallbackPage.tsx](./pages/oauth-callback-page.md) via `./pages/OAuthCallbackPage`

# Static relationships

- None detected by static analysis.

# Dependents

- [app/frontend/src/main.tsx](./main.md) imports this module.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `81b6eaa176cdb1992e987a1a1bbdb9b8f2c3b61dc7a7b7e4f297918b1b7e2ffb`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
