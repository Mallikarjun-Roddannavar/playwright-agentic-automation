---
type: Code Module
title: types
description: Application frontend extracted from app/frontend/src/types.ts by deterministic static analysis.
resource: repo://playwright-agentic-automation/app/frontend/src/types.ts
tags:
  - generated
  - static-ast
  - frontend
  - ts
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/app/frontend/src/types.ts
    title: app/frontend/src/types.ts
    author: process:codebase-knowledge/1.0.0
source_path: app/frontend/src/types.ts
source_sha256: 62eff509fae0ced9704c7383f061632a3917d90342583bddfdb7ba03b93dca1a
code_graph_id: file:app/frontend/src/types.ts
analysis_scope: static-ast
fact_sha256: 403017a6a046a0e8922fdad72c0a938fd470544dcc3ec5364edce8c8b6eeae53
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-16T08:39:27.990Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-16T08:39:27.990Z"
---

# Purpose

Application frontend extracted from app/frontend/src/types.ts by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `type` **FileItem** exported (lines 17-24)
- `type` **Folder** exported (lines 9-15)
- `type` **Role** exported (lines 1-1)
- `type` **User** exported (lines 3-7)

# Imports

- None detected by static analysis.

# Static relationships

- None detected by static analysis.

# Dependents

- [app/frontend/src/api.ts](./api.md) imports this module.
- [app/frontend/src/context/AuthContext.tsx](./context/auth-context.md) imports this module.
- [app/frontend/src/pages/FoldersPage.tsx](./pages/folders-page.md) imports this module.
- [app/frontend/src/pages/FilesPage.tsx](./pages/files-page.md) imports this module.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `62eff509fae0ced9704c7383f061632a3917d90342583bddfdb7ba03b93dca1a`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
