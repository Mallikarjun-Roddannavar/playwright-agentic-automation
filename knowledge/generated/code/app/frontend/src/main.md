---
type: Code Module
title: main
description: Application frontend extracted from app/frontend/src/main.tsx by deterministic static analysis.
resource: repo://playwright-agentic-automation/app/frontend/src/main.tsx
tags:
  - generated
  - static-ast
  - frontend
  - tsx
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/app/frontend/src/main.tsx
    title: app/frontend/src/main.tsx
    author: process:codebase-knowledge/1.0.0
source_path: app/frontend/src/main.tsx
source_sha256: 948c6c4e5dce049d0fd55f479d48510da97f0af12d1c4819b6cc3e5376b11976
code_graph_id: file:app/frontend/src/main.tsx
analysis_scope: static-ast
fact_sha256: c6cf03ed8aa6b50ba22d077d0ade798cb5fb0a1bf8cd277bb8bd4e69433ebe30
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-16T08:39:27.990Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-16T08:39:27.990Z"
---

# Purpose

Application frontend extracted from app/frontend/src/main.tsx by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- None detected by static analysis.

# Imports

- `react-router-dom` via `react-router-dom`
- `.` via `./index.css`
- [app/frontend/src/context/ThemeContext.tsx](./context/theme-context.md) via `./context/ThemeContext`
- `react-dom` via `react-dom/client`
- `react` via `react`
- [app/frontend/src/context/AuthContext.tsx](./context/auth-context.md) via `./context/AuthContext`
- `react-toastify` via `react-toastify`
- [app/frontend/src/App.tsx](./app.md) via `./App`

# Static relationships

- None detected by static analysis.

# Dependents

- None detected by static analysis.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `948c6c4e5dce049d0fd55f479d48510da97f0af12d1c4819b6cc3e5376b11976`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
