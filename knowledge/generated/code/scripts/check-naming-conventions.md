---
type: Code Module
title: checkNamingConventions
description: Framework tooling extracted from scripts/checkNamingConventions.mjs by deterministic static analysis.
resource: repo://playwright-agentic-automation/scripts/checkNamingConventions.mjs
tags:
  - generated
  - static-ast
  - tooling
  - mjs
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/scripts/checkNamingConventions.mjs
    title: scripts/checkNamingConventions.mjs
    author: process:codebase-knowledge/1.0.0
source_path: scripts/checkNamingConventions.mjs
source_sha256: 9d3773f8256af9d33e6d34d72561526b3c3855734269b9927504966acad36409
code_graph_id: file:scripts/checkNamingConventions.mjs
analysis_scope: static-ast
fact_sha256: 619177311b4df8cc65abc0925088d883d1311580dc20b1375982ccc7013cffb3
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-16T08:39:27.990Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-16T08:39:27.990Z"
---

# Purpose

Framework tooling extracted from scripts/checkNamingConventions.mjs by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `function` **relative** (lines 147-149)
- `function` **validateConfigKeys** (lines 119-127)
- `function` **validateDirectory** (lines 76-101)
- `function` **validatePrimaryExportName** (lines 103-117)
- `function` **walkConfig** (lines 129-145)

# Imports

- `node:path` via `node:path`
- `node:process` via `node:process`
- `node:fs` via `node:fs`

# Static relationships

- None detected by static analysis.

# Dependents

- None detected by static analysis.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `9d3773f8256af9d33e6d34d72561526b3c3855734269b9927504966acad36409`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
