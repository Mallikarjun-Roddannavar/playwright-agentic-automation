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
source_sha256: e2bee6d1888a6ed892b6341f11505d0b71e20a7b486504c59351c495b728c4e3
code_graph_id: file:scripts/agentDoctor.mjs
analysis_scope: static-ast
fact_sha256: 4a8767cf61b2ee7df7a2c582eeabf6e691689dbcd5dcb5287bd98a4055c7d257
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-28T12:33:08.260Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-28T12:33:08.260Z"
---

# Purpose

Framework tooling extracted from scripts/agentDoctor.mjs by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `function` **fail** (lines 139-143)
- `function` **pass** (lines 134-137)
- `function` **recordBackendEnvironment** (lines 62-91)
- `function` **recordChromium** (lines 93-110)
- `function` **recordKnowledgeFreshness** (lines 112-124)
- `function` **recordNodeVersion** (lines 39-51)
- `function` **recordPath** (lines 53-60)
- `function` **run** (lines 126-132)

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

The facts above are machine-confirmed from the TypeScript AST and source hash `e2bee6d1888a6ed892b6341f11505d0b71e20a7b486504c59351c495b728c4e3`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
