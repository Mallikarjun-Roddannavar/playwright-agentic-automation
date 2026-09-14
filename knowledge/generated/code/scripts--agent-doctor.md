---
type: Code Module
title: agentDoctor
description: Framework tooling extracted from scripts/agentDoctor.mjs by deterministic static analysis.
resource: repo://playwright-agentic-automation/scripts/agentDoctor.mjs
tags:
  - generated
  - static-ast
  - tooling
  - mjs
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/scripts/agentDoctor.mjs
    title: scripts/agentDoctor.mjs
    author: process:codebase-knowledge/1.0.0
source_path: scripts/agentDoctor.mjs
source_sha256: f0b8bd4b335f3f7e022610799c806fd0bc8d3be8e021481dce7d4924fee2889b
code_graph_id: file:scripts/agentDoctor.mjs
analysis_scope: static-ast
fact_sha256: c9b68d05bab8a700fd44aa866092d15905a2623cc4b94152a16d71a6bb52c13a
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-09-10T15:54:55.036Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-09-10T15:54:55.036Z"
---

# Purpose

Framework tooling extracted from scripts/agentDoctor.mjs by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `function` **fail** (lines 143-147)
- `function` **pass** (lines 138-141)
- `function` **recordBackendEnvironment** (lines 66-95)
- `function` **recordChromium** (lines 97-114)
- `function` **recordKnowledgeFreshness** (lines 116-128)
- `function` **recordNodeVersion** (lines 43-55)
- `function` **recordPath** (lines 57-64)
- `function` **run** (lines 130-136)

# Imports

- `node:fs` via `node:fs`
- `node:child_process` via `node:child_process`
- `node:path` via `node:path`
- `node:module` via `node:module`
- `node:process` via `node:process`

# Static relationships

- None detected by static analysis.

# Dependents

- None detected by static analysis.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `f0b8bd4b335f3f7e022610799c806fd0bc8d3be8e021481dce7d4924fee2889b`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
