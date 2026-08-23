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
source_sha256: 354250e513c9aab4ce130d6b13f1011c58a8f7616609688a81a5e991db2f627b
code_graph_id: file:scripts/queryKnowledge.mjs
analysis_scope: static-ast
fact_sha256: cc6cf2eef6257bbdfc2e58ca13ec868704643ce1d872ea13aa8a662cfcf2b6e3
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-21T11:27:49.699Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-21T11:27:49.699Z"
---

# Purpose

Framework tooling extracted from scripts/queryKnowledge.mjs by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `function` **edgeSearchText** (lines 72-76)
- `function` **matchesTerms** (lines 67-70)
- `function` **parseArguments** (lines 12-40)
- `function` **queryKnowledgePages** (lines 42-65)
- `function` **usage** (lines 6-10)

# Imports

- [scripts/knowledge/CodebaseKnowledge.mjs](./knowledge/codebase-knowledge.md) via `./knowledge/CodebaseKnowledge.mjs`
- `node:path` via `node:path`
- `node:fs` via `node:fs`
- `node:process` via `node:process`

# Static relationships

- None detected by static analysis.

# Dependents

- None detected by static analysis.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `354250e513c9aab4ce130d6b13f1011c58a8f7616609688a81a5e991db2f627b`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
