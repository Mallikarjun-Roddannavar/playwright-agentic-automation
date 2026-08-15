---
type: Code Module
title: queryKnowledge
description: Framework tooling extracted from scripts/queryKnowledge.mjs by deterministic static analysis.
resource: repo://playwright-pom-agent-skills/scripts/queryKnowledge.mjs
tags:
  - generated
  - static-ast
  - tooling
  - mjs
status: stable
sources:
  - id: source
    resource: repo://playwright-pom-agent-skills/scripts/queryKnowledge.mjs
    title: scripts/queryKnowledge.mjs
    author: process:codebase-knowledge/1.0.0
source_path: scripts/queryKnowledge.mjs
source_sha256: b06f92390b4286c148ca34a5711e382cb900d551d756a579a8b98a64b27b2af6
code_graph_id: file:scripts/queryKnowledge.mjs
analysis_scope: static-ast
fact_sha256: 147ca3a58a056ddfeecaeee8c684eba99f6c9a5357d36a2e24a6e243f41d2f47
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-07-31T11:37:54.189Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-07-31T11:37:54.189Z"
---

# Purpose

Framework tooling extracted from scripts/queryKnowledge.mjs by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `function` **edgeSearchText** (lines 35-39)
- `function` **matchesTerms** (lines 30-33)
- `function` **parseArguments** (lines 11-28)
- `function` **usage** (lines 5-9)

# Imports

- [scripts/knowledge/CodebaseKnowledge.mjs](./knowledge/codebase-knowledge.md) via `./knowledge/CodebaseKnowledge.mjs`
- `node:process` via `node:process`

# Static relationships

- None detected by static analysis.

# Dependents

- None detected by static analysis.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `b06f92390b4286c148ca34a5711e382cb900d551d756a579a8b98a64b27b2af6`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
