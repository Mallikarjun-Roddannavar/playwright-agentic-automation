---
type: Code Module
title: LoginPage
description: Application frontend extracted from app/frontend/src/pages/LoginPage.tsx by deterministic static analysis.
resource: repo://playwright-agentic-automation/app/frontend/src/pages/LoginPage.tsx
tags:
  - generated
  - static-ast
  - frontend
  - tsx
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/app/frontend/src/pages/LoginPage.tsx
    title: app/frontend/src/pages/LoginPage.tsx
    author: process:codebase-knowledge/1.0.0
source_path: app/frontend/src/pages/LoginPage.tsx
source_sha256: fc7b03ede2e59b6c4e4d84a9d2a3c3519e53a55c22f51c0483a314a66c2635fe
code_graph_id: file:app/frontend/src/pages/LoginPage.tsx
analysis_scope: static-ast
fact_sha256: 62b80cf6d1a89bd33867e2524d0dbb6690026cf389b9b0b4b8660b34a7c418d6
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-09-04T05:15:44.685Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-09-04T05:15:44.685Z"
---

# Purpose

Application frontend extracted from app/frontend/src/pages/LoginPage.tsx by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `function` **LoginPage** exported (lines 8-140)
- `function` **onOAuthLogin** (lines 35-47)
- `function` **onSubmit** (lines 17-33)

# Imports

- `react` via `react`
- `react-toastify` via `react-toastify`
- `react-router-dom` via `react-router-dom`
- [app/frontend/src/context/AuthContext.tsx](../context/auth-context.md) via `../context/AuthContext`
- [app/frontend/src/api.ts](../api.md) via `../api`

# Static relationships

- None detected by static analysis.

# Dependents

- [app/frontend/src/App.tsx](../app.md) imports this module.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `fc7b03ede2e59b6c4e4d84a9d2a3c3519e53a55c22f51c0483a314a66c2635fe`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
