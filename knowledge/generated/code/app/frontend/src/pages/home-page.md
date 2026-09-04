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
fact_sha256: 279149701c8d481b8f5bc25f79e900ed4057af5ab2e560df94bd4f8a5319f509
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-09-04T05:15:44.685Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-09-04T05:15:44.685Z"
---

# Purpose

Application frontend extracted from app/frontend/src/pages/HomePage.tsx by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `function` **HomePage** exported (lines 10-277)
- `type` **Stats** (lines 8-8)

# Imports

- [app/frontend/src/api.ts](../api.md) via `../api`
- [app/frontend/src/components/AppLayout.tsx](../components/app-layout.md) via `../components/AppLayout`
- `react` via `react`
- [app/frontend/src/context/AuthContext.tsx](../context/auth-context.md) via `../context/AuthContext`
- `.` via `./HomePage.css`

# Static relationships

- None detected by static analysis.

# Dependents

- [app/frontend/src/App.tsx](../app.md) imports this module.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `97225eaf6199fa70ab5b92d865ffcf7d1ebf6a437a95d5b8ac668daa25350d54`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
