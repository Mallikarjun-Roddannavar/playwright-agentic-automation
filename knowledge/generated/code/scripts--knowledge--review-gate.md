---
type: Code Module
title: ReviewGate
description: Framework tooling extracted from scripts/knowledge/ReviewGate.mjs by deterministic static analysis.
resource: repo://playwright-agentic-automation/scripts/knowledge/ReviewGate.mjs
tags:
  - generated
  - static-ast
  - tooling
  - mjs
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/scripts/knowledge/ReviewGate.mjs
    title: scripts/knowledge/ReviewGate.mjs
    author: process:codebase-knowledge/1.0.0
source_path: scripts/knowledge/ReviewGate.mjs
source_sha256: ef5d45c2a272cb6d98af2c1ce8c15b77c804ed713235a81b2c0b0e658f7f547b
code_graph_id: file:scripts/knowledge/ReviewGate.mjs
analysis_scope: static-ast
fact_sha256: 3d6eb18931f8f023d1c281bc885d16264b232ba944b324e9d7d0a21ba24dcc33
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-09-10T15:54:55.036Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-09-10T15:54:55.036Z"
---

# Purpose

Framework tooling extracted from scripts/knowledge/ReviewGate.mjs by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `function` **reviewedDrafts** exported (lines 7-57)

# Imports

- `js-yaml` via `js-yaml`
- `node:path` via `node:path`
- `node:fs` via `node:fs`

# Static relationships

- None detected by static analysis.

# Dependents

- [scripts/tests/qa-safety.test.mjs](./scripts--tests--qa-safety-test.md) imports this module.
- [scripts/knowledge/promoteProductKnowledge.mjs](./scripts--knowledge--promote-product-knowledge.md) imports this module.
- [scripts/knowledge/promoteKnowledge.mjs](./scripts--knowledge--promote-knowledge.md) imports this module.
- [scripts/knowledge/promoteManualKnowledge.mjs](./scripts--knowledge--promote-manual-knowledge.md) imports this module.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `ef5d45c2a272cb6d98af2c1ce8c15b77c804ed713235a81b2c0b0e658f7f547b`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
