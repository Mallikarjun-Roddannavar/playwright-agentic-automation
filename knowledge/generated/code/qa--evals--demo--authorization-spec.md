---
type: Code Module
title: authorization.spec
description: Source module extracted from qa/evals/demo/authorization.spec.ts by deterministic static analysis.
resource: repo://playwright-agentic-automation/qa/evals/demo/authorization.spec.ts
tags:
  - generated
  - static-ast
  - source
  - ts
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/qa/evals/demo/authorization.spec.ts
    title: qa/evals/demo/authorization.spec.ts
    author: process:codebase-knowledge/1.0.0
source_path: qa/evals/demo/authorization.spec.ts
source_sha256: 19941d2be8a84b8ab165c687a68d2d3f535cda7b6249832358f1b402a82b7464
code_graph_id: file:qa/evals/demo/authorization.spec.ts
analysis_scope: static-ast
fact_sha256: 5a3ba428938f6d2b611f40e2b2c00a19813c4a226b121539973a9a83713e9e2d
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-09-10T15:54:55.036Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-09-10T15:54:55.036Z"
---

# Purpose

Source module extracted from qa/evals/demo/authorization.spec.ts by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- None detected by static analysis.

# Imports

- [api/services/FoldersService.ts](./api--services--folders-service.md) via `@api/services/FoldersService`
- `node:http` via `node:http`
- `node:net` via `node:net`
- `@playwright/test` via `@playwright/test`

# Static relationships

- **qa/evals/demo/authorization.spec.ts** uses api service [FoldersService](./api--services--folders-service.md).
- **qa/evals/demo/authorization.spec.ts** uses api route [/folders](./api--services--base-api-service.md).
- **qa/evals/demo/authorization.spec.ts** instantiates [FoldersService](./api--services--folders-service.md).

# Dependents

- None detected by static analysis.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `19941d2be8a84b8ab165c687a68d2d3f535cda7b6249832358f1b402a82b7464`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
