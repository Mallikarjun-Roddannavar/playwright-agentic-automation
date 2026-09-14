---
type: Code Module
title: qa-safety.test
description: Framework tooling extracted from scripts/tests/qa-safety.test.mjs by deterministic static analysis.
resource: repo://playwright-agentic-automation/scripts/tests/qa-safety.test.mjs
tags:
  - generated
  - static-ast
  - tooling
  - mjs
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/scripts/tests/qa-safety.test.mjs
    title: scripts/tests/qa-safety.test.mjs
    author: process:codebase-knowledge/1.0.0
source_path: scripts/tests/qa-safety.test.mjs
source_sha256: ed58ffee699a6db85f143e2d17ef248481c6654be45e59623165778941994fba
code_graph_id: file:scripts/tests/qa-safety.test.mjs
analysis_scope: static-ast
fact_sha256: 3dbb4b3a86c52dd00c5cb2da6a308cdc84bd3f38dd910f1438e5d6125e879bf7
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-09-10T15:54:55.036Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-09-10T15:54:55.036Z"
---

# Purpose

Framework tooling extracted from scripts/tests/qa-safety.test.mjs by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `function` **result** (lines 27-38)
- `function` **run** (lines 21-26)
- `function` **sandbox** (lines 10-20)
- `function` **write** (lines 39-41)

# Imports

- [scripts/knowledge/ReviewGate.mjs](./scripts--knowledge--review-gate.md) via `../knowledge/ReviewGate.mjs`
- `node:child_process` via `node:child_process`
- `node:assert/strict` via `node:assert/strict`
- `node:test` via `node:test`
- `node:path` via `node:path`
- `node:fs` via `node:fs`
- `node:process` via `node:process`

# Static relationships

- None detected by static analysis.

# Dependents

- None detected by static analysis.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `ed58ffee699a6db85f143e2d17ef248481c6654be45e59623165778941994fba`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
