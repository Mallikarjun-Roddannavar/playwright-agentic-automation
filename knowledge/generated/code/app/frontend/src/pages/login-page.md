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
source_sha256: 9228088de9b8e9739a1c192a1e24e0ac18106ab6b5d5d5d79fb5798b2ebcdbe2
code_graph_id: file:app/frontend/src/pages/LoginPage.tsx
analysis_scope: static-ast
fact_sha256: 9d973518a8e19a7bb6351b697a5b2d61c63c3e06f0da1fbab4b60e418728ffab
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-16T08:39:27.990Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-16T08:39:27.990Z"
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

The facts above are machine-confirmed from the TypeScript AST and source hash `9228088de9b8e9739a1c192a1e24e0ac18106ab6b5d5d5d79fb5798b2ebcdbe2`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
