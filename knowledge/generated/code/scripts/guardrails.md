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
source_sha256: 6fea80fc82a3ae58137da25a4a1682a1f0ebd46bdcddf31220bd1a50f2f1977f
code_graph_id: file:scripts/guardrails.mjs
analysis_scope: static-ast
fact_sha256: c85021d4244767b48e6448c6cb261de280b057af3e860502d1417a43c5c8f625
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-09-04T08:08:46.327Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-09-04T08:08:46.327Z"
---

# Purpose

Framework tooling extracted from scripts/guardrails.mjs by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `function` **checkFile** (lines 25-93)
- `function` **walkDir** (lines 12-23)

# Imports

- `fs` via `fs`
- `path` via `path`

# Static relationships

- None detected by static analysis.

# Dependents

- None detected by static analysis.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `6fea80fc82a3ae58137da25a4a1682a1f0ebd46bdcddf31220bd1a50f2f1977f`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
