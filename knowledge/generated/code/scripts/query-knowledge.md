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
source_sha256: 892e9b2209b6b17f73b2e78c12b0283a9f327b05da5064f619a66d8599a50803
code_graph_id: file:scripts/queryKnowledge.mjs
analysis_scope: static-ast
fact_sha256: 3ff6f19dd06c3ad54d8c450030ce0d36e2e0e02de2ec2d1f60a1249a6c831a07
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-17T11:17:56.443Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-17T11:17:56.443Z"
---

# Purpose

Framework tooling extracted from scripts/queryKnowledge.mjs by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `function` **edgeSearchText** (lines 58-62)
- `function` **matchesTerms** (lines 53-56)
- `function` **parseArguments** (lines 14-33)
- `function` **queryLoginKnowledge** (lines 41-51)
- `function` **readConcept** (lines 35-39)
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

The facts above are machine-confirmed from the TypeScript AST and source hash `892e9b2209b6b17f73b2e78c12b0283a9f327b05da5064f619a66d8599a50803`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
