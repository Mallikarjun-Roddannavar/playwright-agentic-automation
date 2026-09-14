---
type: Code Module
title: extractTestInventory
description: Framework tooling extracted from scripts/knowledge/extractTestInventory.mjs by deterministic static analysis.
resource: repo://playwright-agentic-automation/scripts/knowledge/extractTestInventory.mjs
tags:
  - generated
  - static-ast
  - tooling
  - mjs
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/scripts/knowledge/extractTestInventory.mjs
    title: scripts/knowledge/extractTestInventory.mjs
    author: process:codebase-knowledge/1.0.0
source_path: scripts/knowledge/extractTestInventory.mjs
source_sha256: e614c6758dbae9fcdcf14ef2b0342215428623000d8d1765f32b3666a67eb182
code_graph_id: file:scripts/knowledge/extractTestInventory.mjs
analysis_scope: static-ast
fact_sha256: 34f431badf582b73b4de558a6aec4b294eb02c67163f6a8fc10bf3ad97c14efc
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-09-10T15:54:55.036Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-09-10T15:54:55.036Z"
---

# Purpose

Framework tooling extracted from scripts/knowledge/extractTestInventory.mjs by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `function` **inventoryFor** (lines 26-54)
- `function` **read** (lines 19-21)
- `function` **unique** (lines 22-24)

# Imports

- [scripts/knowledge/WorkflowLog.mjs](./scripts--knowledge--workflow-log.md) via `./WorkflowLog.mjs`
- `node:process` via `node:process`
- [scripts/knowledge/CodebaseKnowledge.mjs](./scripts--knowledge--codebase-knowledge.md) via `./CodebaseKnowledge.mjs`
- `node:fs` via `node:fs`
- `node:path` via `node:path`

# Static relationships

- None detected by static analysis.

# Dependents

- None detected by static analysis.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `e614c6758dbae9fcdcf14ef2b0342215428623000d8d1765f32b3666a67eb182`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
