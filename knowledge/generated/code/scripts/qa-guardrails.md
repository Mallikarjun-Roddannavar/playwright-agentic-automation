---
type: Code Module
title: qaGuardrails
description: Framework tooling extracted from scripts/qaGuardrails.mjs by deterministic static analysis.
resource: repo://playwright-agentic-automation/scripts/qaGuardrails.mjs
tags:
  - generated
  - static-ast
  - tooling
  - mjs
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/scripts/qaGuardrails.mjs
    title: scripts/qaGuardrails.mjs
    author: process:codebase-knowledge/1.0.0
source_path: scripts/qaGuardrails.mjs
source_sha256: 65e582511581ae7f84c1365f75fb6eaa1f45a23f3b0deb206009418f45184987
code_graph_id: file:scripts/qaGuardrails.mjs
analysis_scope: static-ast
fact_sha256: 3e7b2978032e884f26cabf939e54966059bc6f06a57289bcc6a4a0c57f09973a
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-09-06T10:26:38.920Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-09-06T10:26:38.920Z"
---

# Purpose

Framework tooling extracted from scripts/qaGuardrails.mjs by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `function` **collectFiles** (lines 43-48)
- `function` **inspectSpec** (lines 50-110)
- `function` **inspectTarget** (lines 29-41)
- `function` **reportIf** (lines 96-100)

# Imports

- `node:path` via `node:path`
- `node:process` via `node:process`
- `node:fs` via `node:fs`

# Static relationships

- None detected by static analysis.

# Dependents

- None detected by static analysis.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `65e582511581ae7f84c1365f75fb6eaa1f45a23f3b0deb206009418f45184987`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
