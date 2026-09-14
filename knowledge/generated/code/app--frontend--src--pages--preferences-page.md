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
source_sha256: 1a7b0766ccd670ee99bb0c4b1afd209f4d414bab7877c5363c964170704010e9
code_graph_id: file:app/frontend/src/pages/PreferencesPage.tsx
analysis_scope: static-ast
fact_sha256: 4e3411aa259f9a8954dfc052af04860a22d4af8543167fb8367bc057a3c7ece4
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-09-10T15:54:55.036Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-09-10T15:54:55.036Z"
---

# Purpose

Application frontend extracted from app/frontend/src/pages/PreferencesPage.tsx by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `function` **PreferencesPage** exported (lines 8-110)
- `function` **onProfileIconChange** (lines 20-32)
- `function` **removeProfileIcon** (lines 34-38)

# Imports

- [app/frontend/src/context/AuthContext.tsx](./app--frontend--src--context--auth-context.md) via `../context/AuthContext`
- `react` via `react`
- [app/frontend/src/context/ThemeContext.tsx](./app--frontend--src--context--theme-context.md) via `../context/ThemeContext`
- [app/frontend/src/components/ThemeToggle.tsx](./app--frontend--src--components--theme-toggle.md) via `../components/ThemeToggle`
- [app/frontend/src/components/AppLayout.tsx](./app--frontend--src--components--app-layout.md) via `../components/AppLayout`

# Static relationships

- None detected by static analysis.

# Dependents

- [app/frontend/src/App.tsx](./app--frontend--src--app.md) imports this module.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `1a7b0766ccd670ee99bb0c4b1afd209f4d414bab7877c5363c964170704010e9`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
