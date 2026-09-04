---
type: Code Module
title: guardrails
description: Framework tooling extracted from scripts/guardrails.mjs by deterministic static analysis.
resource: repo://playwright-agentic-automation/scripts/guardrails.mjs
tags:
  - generated
  - static-ast
  - tooling
  - mjs
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/scripts/guardrails.mjs
    title: scripts/guardrails.mjs
    author: process:codebase-knowledge/1.0.0
source_path: scripts/guardrails.mjs
source_sha256: 06320b9a36a52b7bb83484f05f7359c5f90227ebce0bb39d9be815d3ae204922
code_graph_id: file:scripts/guardrails.mjs
analysis_scope: static-ast
fact_sha256: 449b21545a07ee2a6680f19bc180b707b2d21d4e5e5213abded6c5f7a42d0075
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-09-04T05:15:44.685Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-09-04T05:15:44.685Z"
---

# Purpose

Framework tooling extracted from scripts/guardrails.mjs by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `function` **checkFile** (lines 20-88)
- `function` **walkDir** (lines 11-18)

# Imports

- `fs` via `fs`
- `path` via `path`

# Static relationships

- None detected by static analysis.

# Dependents

- None detected by static analysis.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `06320b9a36a52b7bb83484f05f7359c5f90227ebce0bb39d9be815d3ae204922`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
