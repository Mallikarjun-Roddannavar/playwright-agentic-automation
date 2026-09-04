---
type: Code Module
title: ThemeContext
description: Application frontend extracted from app/frontend/src/context/ThemeContext.tsx by deterministic static analysis.
resource: repo://playwright-agentic-automation/app/frontend/src/context/ThemeContext.tsx
tags:
  - generated
  - static-ast
  - frontend
  - tsx
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/app/frontend/src/context/ThemeContext.tsx
    title: app/frontend/src/context/ThemeContext.tsx
    author: process:codebase-knowledge/1.0.0
source_path: app/frontend/src/context/ThemeContext.tsx
source_sha256: ee54f0dd1d85bf0d373893214cdfb8430870f3f7e09b4f085858a6d30f57fb52
code_graph_id: file:app/frontend/src/context/ThemeContext.tsx
analysis_scope: static-ast
fact_sha256: 1064384109c47c33cb1cf6f99f451860f0255332c80288f9e31dc07153b36794
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-09-04T05:15:44.685Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-09-04T05:15:44.685Z"
---

# Purpose

Application frontend extracted from app/frontend/src/context/ThemeContext.tsx by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `type` **ThemeContextValue** (lines 6-10)
- `type` **ThemeMode** exported (lines 4-4)
- `function` **ThemeProvider** exported (lines 24-43)
- `function` **getInitialTheme** (lines 16-22)
- `function` **useTheme** exported (lines 45-51)

# Imports

- `react` via `react`

# Static relationships

- None detected by static analysis.

# Dependents

- [app/frontend/src/components/ThemeToggle.tsx](../components/theme-toggle.md) imports this module.
- [app/frontend/src/main.tsx](../main.md) imports this module.
- [app/frontend/src/pages/PreferencesPage.tsx](../pages/preferences-page.md) imports this module.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `ee54f0dd1d85bf0d373893214cdfb8430870f3f7e09b4f085858a6d30f57fb52`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
