---
type: Code Module
title: LoginPage
description: Source module extracted from app/frontend/src/pages/LoginPage.tsx by deterministic static analysis.
resource: repo://playwright-pom-agent-skills/app/frontend/src/pages/LoginPage.tsx
tags:
  - generated
  - static-ast
  - source
  - tsx
status: stable
sources:
  - id: source
    resource: repo://playwright-pom-agent-skills/app/frontend/src/pages/LoginPage.tsx
    title: app/frontend/src/pages/LoginPage.tsx
    author: process:codebase-knowledge/1.0.0
source_path: app/frontend/src/pages/LoginPage.tsx
source_sha256: 9228088de9b8e9739a1c192a1e24e0ac18106ab6b5d5d5d79fb5798b2ebcdbe2
code_graph_id: file:app/frontend/src/pages/LoginPage.tsx
analysis_scope: static-ast
fact_sha256: 7d32e8c474817b08200439d119972e6876777487536eaa5a0427055b3eb85e15
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-15T11:47:52.662Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-15T11:47:52.662Z"
---

# Purpose

Source module extracted from app/frontend/src/pages/LoginPage.tsx by deterministic static analysis. The underlying source code remains authoritative.

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
