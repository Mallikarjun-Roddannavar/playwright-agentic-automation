---
type: Code Module
title: FoldersPage
description: Application frontend extracted from app/frontend/src/pages/FoldersPage.tsx by deterministic static analysis.
resource: repo://playwright-agentic-automation/app/frontend/src/pages/FoldersPage.tsx
tags:
  - generated
  - static-ast
  - frontend
  - tsx
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/app/frontend/src/pages/FoldersPage.tsx
    title: app/frontend/src/pages/FoldersPage.tsx
    author: process:codebase-knowledge/1.0.0
source_path: app/frontend/src/pages/FoldersPage.tsx
source_sha256: e23cf626f607170a2305698c82c988a7d38ac7fa1f2f9dbc9144f19a80ba62cf
code_graph_id: file:app/frontend/src/pages/FoldersPage.tsx
analysis_scope: static-ast
fact_sha256: 98b0137f455b62a8fdc28365d206b06a5358c2f3b3950b20b45237356db7129d
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-09-04T05:15:44.685Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-09-04T05:15:44.685Z"
---

# Purpose

Application frontend extracted from app/frontend/src/pages/FoldersPage.tsx by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `function` **FoldersPage** exported (lines 12-606)
- `function` **createFolder** (lines 59-77)
- `function` **deleteFolder** (lines 98-114)
- `function` **deleteSelectedFolders** (lines 116-133)
- `function` **ensureCardActionsVisible** (lines 135-159)
- `function` **handleFolderCardPointerEnter** (lines 192-196)
- `function` **handleFolderCardPointerLeave** (lines 211-216)
- `function` **handleFolderCardPointerMove** (lines 198-209)
- `function` **handleViewModeSelect** (lines 184-190)
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

The facts above are machine-confirmed from the TypeScript AST and source hash `e23cf626f607170a2305698c82c988a7d38ac7fa1f2f9dbc9144f19a80ba62cf`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
