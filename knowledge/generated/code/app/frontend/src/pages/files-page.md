---
type: Code Module
title: FilesPage
description: Application frontend extracted from app/frontend/src/pages/FilesPage.tsx by deterministic static analysis.
resource: repo://playwright-agentic-automation/app/frontend/src/pages/FilesPage.tsx
tags:
  - generated
  - static-ast
  - frontend
  - tsx
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/app/frontend/src/pages/FilesPage.tsx
    title: app/frontend/src/pages/FilesPage.tsx
    author: process:codebase-knowledge/1.0.0
source_path: app/frontend/src/pages/FilesPage.tsx
source_sha256: ae35429e32412a68a2c85cd2a7815025ede564dcf7af37565e997519a2592cda
code_graph_id: file:app/frontend/src/pages/FilesPage.tsx
analysis_scope: static-ast
fact_sha256: 9359231b62bda141ee616181e67a175a3ce242d3db3c9735e463820f894a6f61
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-09-04T05:15:44.685Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-09-04T05:15:44.685Z"
---

# Purpose

Application frontend extracted from app/frontend/src/pages/FilesPage.tsx by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `function` **FilesPage** exported (lines 12-615)
- `function` **deleteFile** (lines 87-97)
- `function` **deleteSelectedFiles** (lines 99-110)
- `function` **downloadFile** (lines 201-205)
- `function` **downloadMultipleFiles** (lines 207-211)
- `function` **ensureCardActionsVisible** (lines 112-136)
- `function` **handleFileCardPointerEnter** (lines 169-173)
- `function` **handleFileCardPointerLeave** (lines 188-193)
- `function` **handleFileCardPointerMove** (lines 175-186)
- `function` **handleViewModeSelect** (lines 161-167)
- `function` **previewFile** (lines 195-199)
- `function` **refresh** (lines 33-48)
- `function` **renameFile** (lines 74-85)
- `function` **toggleAllFiles** (lines 153-159)
- `function` **toggleFileSelection** (lines 138-151)
- `function` **upload** (lines 61-72)

# Imports

- [app/frontend/src/components/AppLayout.tsx](../components/app-layout.md) via `../components/AppLayout`
- [app/frontend/src/components/Modal.tsx](../components/modal.md) via `../components/Modal`
- [app/frontend/src/context/AuthContext.tsx](../context/auth-context.md) via `../context/AuthContext`
- `react` via `react`
- [app/frontend/src/components/ConfirmDialog.tsx](../components/confirm-dialog.md) via `../components/ConfirmDialog`
- `react-router-dom` via `react-router-dom`
- `react-toastify` via `react-toastify`
- [app/frontend/src/api.ts](../api.md) via `../api`
- [app/frontend/src/types.ts](../types.md) via `../types`

# Static relationships

- None detected by static analysis.

# Dependents

- [app/frontend/src/App.tsx](../app.md) imports this module.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `ae35429e32412a68a2c85cd2a7815025ede564dcf7af37565e997519a2592cda`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
