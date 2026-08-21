---
type: Code Module
title: evaluateAnswers
description: Framework tooling extracted from scripts/knowledge/evaluateAnswers.mjs by deterministic static analysis.
resource: repo://playwright-agentic-automation/scripts/knowledge/evaluateAnswers.mjs
tags:
  - generated
  - static-ast
  - tooling
  - mjs
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/scripts/knowledge/evaluateAnswers.mjs
    title: scripts/knowledge/evaluateAnswers.mjs
    author: process:codebase-knowledge/1.0.0
source_path: scripts/knowledge/evaluateAnswers.mjs
source_sha256: 3e40fd7b1c93c92fe11b1ca9571c3b34c2daed2a461dd332b97027fd984659eb
code_graph_id: file:scripts/knowledge/evaluateAnswers.mjs
analysis_scope: static-ast
fact_sha256: cf60fc0c14102938c4a9e78606e5fb0b9a8ecd077087861e9b9994eb7a9b8151
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-21T07:48:08.445Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-21T07:48:08.445Z"
---

# Purpose

Framework tooling extracted from scripts/knowledge/evaluateAnswers.mjs by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `function` **evaluateCase** (lines 39-67)
- `function` **findForbiddenPhrases** (lines 34-37)
- `function` **findMissingPhrases** (lines 29-32)
- `function` **normalize** (lines 25-27)
- `function` **parseArgs** (lines 8-19)
- `function` **usage** (lines 21-23)

# Imports

- `node:fs` via `node:fs`
- `node:process` via `node:process`
- `node:path` via `node:path`

# Static relationships

- None detected by static analysis.

# Dependents

- None detected by static analysis.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `3e40fd7b1c93c92fe11b1ca9571c3b34c2daed2a461dd332b97027fd984659eb`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
