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
fact_sha256: bb0552ea3c70367ae5edaea0c579e2a2070d093dcfa0e591021ad49fad0d4d2f
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-09-10T15:54:55.036Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-09-10T15:54:55.036Z"
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
- [app/frontend/src/context/AuthContext.tsx](./app--frontend--src--context--auth-context.md) via `../context/AuthContext`
- [app/frontend/src/api.ts](./app--frontend--src--api.md) via `../api`

# Static relationships

- None detected by static analysis.

# Dependents

- [app/frontend/src/App.tsx](./app--frontend--src--app.md) imports this module.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `fc7b03ede2e59b6c4e4d84a9d2a3c3519e53a55c22f51c0483a314a66c2635fe`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
