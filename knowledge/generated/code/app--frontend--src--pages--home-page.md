---
type: Code Module
title: HomePage
description: Application frontend extracted from app/frontend/src/pages/HomePage.tsx by deterministic static analysis.
resource: repo://playwright-agentic-automation/app/frontend/src/pages/HomePage.tsx
tags:
  - generated
  - static-ast
  - frontend
  - tsx
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/app/frontend/src/pages/HomePage.tsx
    title: app/frontend/src/pages/HomePage.tsx
    author: process:codebase-knowledge/1.0.0
source_path: app/frontend/src/pages/HomePage.tsx
source_sha256: 97225eaf6199fa70ab5b92d865ffcf7d1ebf6a437a95d5b8ac668daa25350d54
code_graph_id: file:app/frontend/src/pages/HomePage.tsx
analysis_scope: static-ast
fact_sha256: e8b899b2765f2195b1b9ac77f9e1258f116b8ec8372fb52ce4290e5ac2a6fcc0
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-09-10T15:54:55.036Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-09-10T15:54:55.036Z"
---

# Purpose

Application frontend extracted from app/frontend/src/pages/HomePage.tsx by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `function` **HomePage** exported (lines 10-277)
- `type` **Stats** (lines 8-8)

# Imports

- [app/frontend/src/api.ts](./app--frontend--src--api.md) via `../api`
- [app/frontend/src/components/AppLayout.tsx](./app--frontend--src--components--app-layout.md) via `../components/AppLayout`
- `react` via `react`
- [app/frontend/src/context/AuthContext.tsx](./app--frontend--src--context--auth-context.md) via `../context/AuthContext`
- `.` via `./HomePage.css`

# Static relationships

- None detected by static analysis.

# Dependents

- [app/frontend/src/App.tsx](./app--frontend--src--app.md) imports this module.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `97225eaf6199fa70ab5b92d865ffcf7d1ebf6a437a95d5b8ac668daa25350d54`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
