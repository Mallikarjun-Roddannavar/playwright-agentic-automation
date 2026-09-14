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
fact_sha256: 5a5c9bd7afae256effad523051d7eb76a7d240bbc1458563289a53302268d993
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-09-10T15:54:55.036Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-09-10T15:54:55.036Z"
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

- [app/frontend/src/api.ts](./app--frontend--src--api.md) imports this module.
- [app/frontend/src/context/AuthContext.tsx](./app--frontend--src--context--auth-context.md) imports this module.
- [app/frontend/src/pages/FoldersPage.tsx](./app--frontend--src--pages--folders-page.md) imports this module.
- [app/frontend/src/pages/FilesPage.tsx](./app--frontend--src--pages--files-page.md) imports this module.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `62eff509fae0ced9704c7383f061632a3917d90342583bddfdb7ba03b93dca1a`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
