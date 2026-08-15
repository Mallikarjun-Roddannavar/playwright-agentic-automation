---
type: Code Module
title: App
description: Source module extracted from app/frontend/src/App.tsx by deterministic static analysis.
resource: repo://playwright-pom-agent-skills/app/frontend/src/App.tsx
tags:
  - generated
  - static-ast
  - source
  - tsx
status: stable
sources:
  - id: source
    resource: repo://playwright-pom-agent-skills/app/frontend/src/App.tsx
    title: app/frontend/src/App.tsx
    author: process:codebase-knowledge/1.0.0
source_path: app/frontend/src/App.tsx
source_sha256: 2b03322dce7e7a02ae54ebfceb85d51b4ad771d5d36ee3263e90514f1e086314
code_graph_id: file:app/frontend/src/App.tsx
analysis_scope: static-ast
fact_sha256: 457e280149fd52da164081627b1d33c8689810479c128eb150bbc8a8ce495c6f
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-15T11:47:52.662Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-15T11:47:52.662Z"
---

# Purpose

Source module extracted from app/frontend/src/App.tsx by deterministic static analysis. The underlying source code remains authoritative.

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

The facts above are machine-confirmed from the TypeScript AST and source hash `2b03322dce7e7a02ae54ebfceb85d51b4ad771d5d36ee3263e90514f1e086314`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
