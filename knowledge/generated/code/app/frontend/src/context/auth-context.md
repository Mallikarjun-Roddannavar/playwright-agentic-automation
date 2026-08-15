---
type: Code Module
title: AuthContext
description: Source module extracted from app/frontend/src/context/AuthContext.tsx by deterministic static analysis.
resource: repo://playwright-pom-agent-skills/app/frontend/src/context/AuthContext.tsx
tags:
  - generated
  - static-ast
  - source
  - tsx
status: stable
sources:
  - id: source
    resource: repo://playwright-pom-agent-skills/app/frontend/src/context/AuthContext.tsx
    title: app/frontend/src/context/AuthContext.tsx
    author: process:codebase-knowledge/1.0.0
source_path: app/frontend/src/context/AuthContext.tsx
source_sha256: 43a197c384adf709930ab856d41e05864abfe414831b0ac1185ade454eec0c98
code_graph_id: file:app/frontend/src/context/AuthContext.tsx
analysis_scope: static-ast
fact_sha256: ac0300d37a4797a50d195016e52c3ac406c72b0a2a286fe7a95751624a2010d9
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-15T11:47:52.662Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-15T11:47:52.662Z"
---

# Purpose

Source module extracted from app/frontend/src/context/AuthContext.tsx by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `type` **AuthContextValue** (lines 7-14)
- `function` **AuthProvider** exported (lines 39-71)
- `function` **getStoredUser** (lines 20-33)
- `function` **hasRole** (lines 35-37)
- `function` **useAuth** exported (lines 73-79)

# Imports

- `react` via `react`
- [app/frontend/src/api.ts](../api.md) via `../api`
- [app/frontend/src/types.ts](../types.md) via `../types`

# Static relationships

- None detected by static analysis.

# Dependents

- [app/frontend/src/pages/PreferencesPage.tsx](../pages/preferences-page.md) imports this module.
- [app/frontend/src/pages/FilesPage.tsx](../pages/files-page.md) imports this module.
- [app/frontend/src/App.tsx](../app.md) imports this module.
- [app/frontend/src/pages/LoginPage.tsx](../pages/login-page.md) imports this module.
- [app/frontend/src/pages/FoldersPage.tsx](../pages/folders-page.md) imports this module.
- [app/frontend/src/main.tsx](../main.md) imports this module.
- [app/frontend/src/components/AppLayout.tsx](../components/app-layout.md) imports this module.
- [app/frontend/src/pages/HomePage.tsx](../pages/home-page.md) imports this module.
- [app/frontend/src/pages/OAuthCallbackPage.tsx](../pages/oauth-callback-page.md) imports this module.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `43a197c384adf709930ab856d41e05864abfe414831b0ac1185ade454eec0c98`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
