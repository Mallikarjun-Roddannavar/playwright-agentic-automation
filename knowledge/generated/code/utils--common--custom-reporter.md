---
type: Code Module
title: CustomReporter
description: Shared utility extracted from utils/common/CustomReporter.ts by deterministic static analysis.
resource: repo://playwright-agentic-automation/utils/common/CustomReporter.ts
tags:
  - generated
  - static-ast
  - utility
  - ts
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/utils/common/CustomReporter.ts
    title: utils/common/CustomReporter.ts
    author: process:codebase-knowledge/1.0.0
source_path: utils/common/CustomReporter.ts
source_sha256: 6a44b33ac6ac4413e5fb235f6313cf122efc950fb743fb027deea8af5dd56e3b
code_graph_id: file:utils/common/CustomReporter.ts
analysis_scope: static-ast
fact_sha256: 099f44e61bcccdca2eba1c2dc09acbe2da14beeac0dc4e9b744ceec9891c90c4
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-09-10T15:54:55.036Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-09-10T15:54:55.036Z"
---

# Purpose

Shared utility extracted from utils/common/CustomReporter.ts by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `class` **CustomReporter** exported (lines 35-126)
- `method` **CustomReporter.onBegin** (lines 50-53)
- `method` **CustomReporter.onEnd** (lines 108-125)
- `method` **CustomReporter.onTestEnd** (lines 55-106)
- `type` **Summary** (lines 15-33)

# Imports

- `node:fs` via `node:fs`
- [utils/common/Logger.ts](./utils--common--logger.md) via `@utils/common/Logger`
- `@playwright/test` via `@playwright/test/reporter`
- `node:path` via `node:path`

# Static relationships

- None detected by static analysis.

# Dependents

- None detected by static analysis.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `6a44b33ac6ac4413e5fb235f6313cf122efc950fb743fb027deea8af5dd56e3b`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
