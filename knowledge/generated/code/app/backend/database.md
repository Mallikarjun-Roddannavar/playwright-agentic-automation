---
type: Code Module
title: database.py
description: Python backend extracted from app/backend/database.py by deterministic static analysis.
resource: repo://playwright-pom-agent-skills/app/backend/database.py
tags:
  - generated
  - static-ast
  - backend
  - py
status: stable
sources:
  - id: source
    resource: repo://playwright-pom-agent-skills/app/backend/database.py
    title: app/backend/database.py
    author: process:codebase-knowledge/1.0.0
source_path: app/backend/database.py
source_sha256: 264bd0e5a443bd54d7ad115bc08854f71dfa4ff186fa0365f8fef143d5215a5c
code_graph_id: file:app/backend/database.py
analysis_scope: static-ast
fact_sha256: 3b3cd9b2c855c2dc9faa6582a8d3e2ece7ca6121e500c7596e8da5e3bac40cbb
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-15T12:24:04.139Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-15T12:24:04.139Z"
---

# Purpose

Python backend extracted from app/backend/database.py by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `function` **_connect** (lines 29-33)
- `function` **_replace_data** (lines 84-106)
- `function` **initialize_database** (lines 36-39)
- `function` **load_database** (lines 42-76)
- `function` **save_database** (lines 79-81)

# Imports

- None detected by static analysis.

# Static relationships

- None detected by static analysis.

# Dependents

- None detected by static analysis.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `264bd0e5a443bd54d7ad115bc08854f71dfa4ff186fa0365f8fef143d5215a5c`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
