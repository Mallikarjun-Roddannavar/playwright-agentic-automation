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
source_sha256: f94aeb499b84a03818f5a96790a422dad14378126842341fbb7033b09fe94023
code_graph_id: file:app/frontend/src/pages/LoginPage.tsx
analysis_scope: static-ast
fact_sha256: 285a781ba937f930200a76ebbc06b944f9a355b190c971b0c1fe04359f648641
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-18T10:16:28.092Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-18T10:16:28.092Z"
---

# Purpose

Application frontend extracted from app/frontend/src/pages/LoginPage.tsx by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `function` **LoginPage** exported (lines 8-136)
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

The facts above are machine-confirmed from the TypeScript AST and source hash `f94aeb499b84a03818f5a96790a422dad14378126842341fbb7033b09fe94023`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
