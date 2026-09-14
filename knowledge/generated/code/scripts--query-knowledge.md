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
source_sha256: a6d1caea92f634d7858147db77280a08d7c967190d3cbe7090aea7c4d66b6c14
code_graph_id: file:scripts/queryKnowledge.mjs
analysis_scope: static-ast
fact_sha256: 85935cf6b43e6d410d425b97fb49bba04a1b34bb3d66016adebe9344cc0a9199
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-09-10T15:54:55.036Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-09-10T15:54:55.036Z"
---

# Purpose

Framework tooling extracted from scripts/queryKnowledge.mjs by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `function` **edgeSearchText** (lines 74-78)
- `function` **matchesTerms** (lines 69-72)
- `function` **parseArguments** (lines 12-40)
- `function` **queryKnowledgePages** (lines 42-67)
- `function` **usage** (lines 6-10)

# Imports

- [scripts/knowledge/CodebaseKnowledge.mjs](./scripts--knowledge--codebase-knowledge.md) via `./knowledge/CodebaseKnowledge.mjs`
- `node:path` via `node:path`
- `node:fs` via `node:fs`
- `node:process` via `node:process`

# Static relationships

- None detected by static analysis.

# Dependents

- None detected by static analysis.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `a6d1caea92f634d7858147db77280a08d7c967190d3cbe7090aea7c4d66b6c14`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
