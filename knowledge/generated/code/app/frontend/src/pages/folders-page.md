---
type: Code Module
title: FoldersPage
description: Source module extracted from app/frontend/src/pages/FoldersPage.tsx by deterministic static analysis.
resource: repo://playwright-pom-agent-skills/app/frontend/src/pages/FoldersPage.tsx
tags:
  - generated
  - static-ast
  - source
  - tsx
status: stable
sources:
  - id: source
    resource: repo://playwright-pom-agent-skills/app/frontend/src/pages/FoldersPage.tsx
    title: app/frontend/src/pages/FoldersPage.tsx
    author: process:codebase-knowledge/1.0.0
source_path: app/frontend/src/pages/FoldersPage.tsx
source_sha256: 820c11d616fbccee383f1bd77f62bece7dc42fccefdbd7a6dae2aca87bbfccaf
code_graph_id: file:app/frontend/src/pages/FoldersPage.tsx
analysis_scope: static-ast
fact_sha256: d13160f6f405bc890c4812b07c6722c84c1aa7dd60b74324d8e75ae8832c8d86
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-15T11:47:52.662Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-15T11:47:52.662Z"
---

# Purpose

Source module extracted from app/frontend/src/pages/FoldersPage.tsx by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `function` **createFolder** (lines 59-77)
- `function` **deleteFolder** (lines 98-114)
- `function` **deleteSelectedFolders** (lines 116-133)
- `function` **ensureCardActionsVisible** (lines 135-159)
- `function` **FoldersPage** exported (lines 12-597)
- `function` **handleFolderCardPointerEnter** (lines 189-193)
- `function` **handleFolderCardPointerLeave** (lines 208-213)
- `function` **handleFolderCardPointerMove** (lines 195-206)
- `function` **handleViewModeSelect** (lines 184-187)
- `function` **refresh** (lines 32-46)
- `function` **renameFolder** (lines 79-96)
- `function` **toggleAllFolders** (lines 176-182)
- `function` **toggleFolderSelection** (lines 161-174)

# Imports

- `react-toastify` via `react-toastify`
- [app/frontend/src/components/ConfirmDialog.tsx](../components/confirm-dialog.md) via `../components/ConfirmDialog`
- [app/frontend/src/components/AppLayout.tsx](../components/app-layout.md) via `../components/AppLayout`
- [app/frontend/src/context/AuthContext.tsx](../context/auth-context.md) via `../context/AuthContext`
- `react` via `react`
- [app/frontend/src/api.ts](../api.md) via `../api`
- [app/frontend/src/components/Modal.tsx](../components/modal.md) via `../components/Modal`
- [app/frontend/src/types.ts](../types.md) via `../types`
- `react-router-dom` via `react-router-dom`

# Static relationships

- None detected by static analysis.

# Dependents

- [app/frontend/src/App.tsx](../app.md) imports this module.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `820c11d616fbccee383f1bd77f62bece7dc42fccefdbd7a6dae2aca87bbfccaf`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
