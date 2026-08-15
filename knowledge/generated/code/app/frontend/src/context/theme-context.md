---
type: Code Module
title: ThemeContext
description: Source module extracted from app/frontend/src/context/ThemeContext.tsx by deterministic static analysis.
resource: repo://playwright-pom-agent-skills/app/frontend/src/context/ThemeContext.tsx
tags:
  - generated
  - static-ast
  - source
  - tsx
status: stable
sources:
  - id: source
    resource: repo://playwright-pom-agent-skills/app/frontend/src/context/ThemeContext.tsx
    title: app/frontend/src/context/ThemeContext.tsx
    author: process:codebase-knowledge/1.0.0
source_path: app/frontend/src/context/ThemeContext.tsx
source_sha256: 54a2aebabe702b8d7ee21bf987de72aa89e08b31c224ae2a26df2d6b4d88657c
code_graph_id: file:app/frontend/src/context/ThemeContext.tsx
analysis_scope: static-ast
fact_sha256: e0ef95ca84d82f7b619b3d45b5fe3673dbefded3d0e534c48bab486835a5473f
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-15T11:47:52.662Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-15T11:47:52.662Z"
---

# Purpose

Source module extracted from app/frontend/src/context/ThemeContext.tsx by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `function` **getInitialTheme** (lines 16-22)
- `type` **ThemeContextValue** (lines 6-10)
- `type` **ThemeMode** exported (lines 4-4)
- `function` **ThemeProvider** exported (lines 24-43)
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

The facts above are machine-confirmed from the TypeScript AST and source hash `54a2aebabe702b8d7ee21bf987de72aa89e08b31c224ae2a26df2d6b4d88657c`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
