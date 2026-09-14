---
type: Code Module
title: qaGuardrails
description: Framework tooling extracted from scripts/qaGuardrails.mjs by deterministic static analysis.
resource: repo://playwright-agentic-automation/scripts/qaGuardrails.mjs
tags:
  - generated
  - static-ast
  - tooling
  - mjs
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/scripts/qaGuardrails.mjs
    title: scripts/qaGuardrails.mjs
    author: process:codebase-knowledge/1.0.0
source_path: scripts/qaGuardrails.mjs
source_sha256: efefc68bfe96e64354c510f90b0dedd160dca378064bb788c2cc91c8e340bf23
code_graph_id: file:scripts/qaGuardrails.mjs
analysis_scope: static-ast
fact_sha256: 0c327f124e0615d5389c8474ea20c57a023e82f085b33751d6ff2be9846b9023
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-09-10T15:54:55.036Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-09-10T15:54:55.036Z"
---

# Purpose

Framework tooling extracted from scripts/qaGuardrails.mjs by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `function` **collectFiles** (lines 55-67)
- `function` **inspectSpec** (lines 69-129)
- `function` **inspectTarget** (lines 40-53)
- `function` **reportIf** (lines 115-119)

# Imports

- `node:path` via `node:path`
- `node:process` via `node:process`
- `node:fs` via `node:fs`

# Static relationships

- None detected by static analysis.

# Dependents

- None detected by static analysis.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `efefc68bfe96e64354c510f90b0dedd160dca378064bb788c2cc91c8e340bf23`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
