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
source_sha256: 9bf86a59681a6afb5ec7a36e2d5632dba095e5468b9c20c95187112e53e53aa7
code_graph_id: file:app/frontend/src/pages/FilesPage.tsx
analysis_scope: static-ast
fact_sha256: 96cb1fbe5e275bd094a356614828d7c58641d841547212697153a0d096c0468d
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-16T08:39:27.990Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-16T08:39:27.990Z"
---

# Purpose

Application frontend extracted from app/frontend/src/pages/FilesPage.tsx by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `function` **deleteFile** (lines 87-97)
- `function` **deleteSelectedFiles** (lines 99-110)
- `function` **downloadFile** (lines 198-202)
- `function` **downloadMultipleFiles** (lines 204-208)
- `function` **ensureCardActionsVisible** (lines 112-136)
- `function` **FilesPage** exported (lines 12-608)
- `function` **handleFileCardPointerEnter** (lines 166-170)
- `function` **handleFileCardPointerLeave** (lines 185-190)
- `function` **handleFileCardPointerMove** (lines 172-183)
- `function` **handleViewModeSelect** (lines 161-164)
- `function` **previewFile** (lines 192-196)
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

The facts above are machine-confirmed from the TypeScript AST and source hash `9bf86a59681a6afb5ec7a36e2d5632dba095e5468b9c20c95187112e53e53aa7`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
