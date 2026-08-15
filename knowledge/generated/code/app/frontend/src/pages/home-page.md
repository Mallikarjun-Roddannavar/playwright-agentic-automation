---
type: Code Module
title: HomePage
description: Application frontend extracted from app/frontend/src/pages/HomePage.tsx by deterministic static analysis.
resource: repo://playwright-pom-agent-skills/app/frontend/src/pages/HomePage.tsx
tags:
  - generated
  - static-ast
  - frontend
  - tsx
status: stable
sources:
  - id: source
    resource: repo://playwright-pom-agent-skills/app/frontend/src/pages/HomePage.tsx
    title: app/frontend/src/pages/HomePage.tsx
    author: process:codebase-knowledge/1.0.0
source_path: app/frontend/src/pages/HomePage.tsx
source_sha256: d9184c22d507d23dfa503e388f74eb38c0480622ed48cc5ef6ffd682615bd0fc
code_graph_id: file:app/frontend/src/pages/HomePage.tsx
analysis_scope: static-ast
fact_sha256: 3c1612ef1079f337fd3dd54dceab2c535fd32a817603a45bb7be20afb2343836
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-15T12:01:02.517Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-15T12:01:02.517Z"
---

# Purpose

Application frontend extracted from app/frontend/src/pages/HomePage.tsx by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `function` **HomePage** exported (lines 10-270)
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

The facts above are machine-confirmed from the TypeScript AST and source hash `d9184c22d507d23dfa503e388f74eb38c0480622ed48cc5ef6ffd682615bd0fc`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
