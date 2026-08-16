---
type: Code Module
title: PreferencesPage
description: Application frontend extracted from app/frontend/src/pages/PreferencesPage.tsx by deterministic static analysis.
resource: repo://playwright-agentic-automation/app/frontend/src/pages/PreferencesPage.tsx
tags:
  - generated
  - static-ast
  - frontend
  - tsx
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/app/frontend/src/pages/PreferencesPage.tsx
    title: app/frontend/src/pages/PreferencesPage.tsx
    author: process:codebase-knowledge/1.0.0
source_path: app/frontend/src/pages/PreferencesPage.tsx
source_sha256: 5a1b702f2068f9f6804fac4f003396c3005a51bbf23ef18d2376f40f94c002a7
code_graph_id: file:app/frontend/src/pages/PreferencesPage.tsx
analysis_scope: static-ast
fact_sha256: cdaf03a02414a7ad6e486c5b0c6152bae79f27eb715db094da71e0da60f74692
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-16T08:39:27.990Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-16T08:39:27.990Z"
---

# Purpose

Application frontend extracted from app/frontend/src/pages/PreferencesPage.tsx by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `function` **onProfileIconChange** (lines 20-32)
- `function` **PreferencesPage** exported (lines 8-111)
- `function` **removeProfileIcon** (lines 34-38)

# Imports

- [app/frontend/src/context/AuthContext.tsx](../context/auth-context.md) via `../context/AuthContext`
- `react` via `react`
- [app/frontend/src/context/ThemeContext.tsx](../context/theme-context.md) via `../context/ThemeContext`
- [app/frontend/src/components/ThemeToggle.tsx](../components/theme-toggle.md) via `../components/ThemeToggle`
- [app/frontend/src/components/AppLayout.tsx](../components/app-layout.md) via `../components/AppLayout`

# Static relationships

- None detected by static analysis.

# Dependents

- [app/frontend/src/App.tsx](../app.md) imports this module.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `5a1b702f2068f9f6804fac4f003396c3005a51bbf23ef18d2376f40f94c002a7`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
