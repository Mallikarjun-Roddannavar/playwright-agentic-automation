---
type: Code Module
title: queryKnowledge
description: Framework tooling extracted from scripts/queryKnowledge.mjs by deterministic static analysis.
resource: repo://playwright-agentic-automation/scripts/queryKnowledge.mjs
tags:
  - generated
  - static-ast
  - tooling
  - mjs
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/scripts/queryKnowledge.mjs
    title: scripts/queryKnowledge.mjs
    author: process:codebase-knowledge/1.0.0
source_path: scripts/queryKnowledge.mjs
source_sha256: 8949af260998add6f4c5ac047f8da771321f315dd8d63f74ea1da6acdd53b734
code_graph_id: file:scripts/queryKnowledge.mjs
analysis_scope: static-ast
fact_sha256: 6f99104e61a96313249c92922fe79fd9270dfa589d92a1d9635d556a3b973184
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-20T14:18:52.716Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-20T14:18:52.716Z"
---

# Purpose

Framework tooling extracted from scripts/queryKnowledge.mjs by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `function` **edgeSearchText** (lines 71-75)
- `function` **matchesTerms** (lines 66-69)
- `function` **parseArguments** (lines 14-42)
- `function` **queryLoginKnowledge** (lines 50-64)
- `function` **readConcept** (lines 44-48)
- `function` **usage** (lines 8-12)

# Imports

- `js-yaml` via `js-yaml`
- [scripts/knowledge/CodebaseKnowledge.mjs](./knowledge/codebase-knowledge.md) via `./knowledge/CodebaseKnowledge.mjs`
- `node:path` via `node:path`
- `node:fs` via `node:fs`
- `node:process` via `node:process`

# Static relationships

- None detected by static analysis.

# Dependents

- None detected by static analysis.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `8949af260998add6f4c5ac047f8da771321f315dd8d63f74ea1da6acdd53b734`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
