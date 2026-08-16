---
type: Code Module
title: CommonUtils
description: Shared utility extracted from utils/common/CommonUtils.ts by deterministic static analysis.
resource: repo://playwright-agentic-automation/utils/common/CommonUtils.ts
tags:
  - generated
  - static-ast
  - utility
  - ts
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/utils/common/CommonUtils.ts
    title: utils/common/CommonUtils.ts
    author: process:codebase-knowledge/1.0.0
source_path: utils/common/CommonUtils.ts
source_sha256: d0e3aa531a515bf19c6ace1e9cca588f3d70d6fb693b35fd22243f547601f9de
code_graph_id: file:utils/common/CommonUtils.ts
analysis_scope: static-ast
fact_sha256: e18db9f668b59e7668d5829b1351e4a941beeb5d61aeb8ee2541afca1a5b9262
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-16T08:39:27.990Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-16T08:39:27.990Z"
---

# Purpose

Shared utility extracted from utils/common/CommonUtils.ts by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `variable` **authDir** (lines 5-5)
- `variable` **authStatePath** (lines 6-10)
- `function` **fileName** exported (lines 22-24)
- `function` **folderName** exported (lines 18-20)
- `function` **uniqueId** exported (lines 12-16)

# Imports

- `node:path` via `node:path`

# Static relationships

- None detected by static analysis.

# Dependents

- [api/specs/files.spec.ts](../../api/specs/files-spec.md) imports this module.
- [ui/specs/files.spec.ts](../../ui/specs/files-spec.md) imports this module.
- [utils/fixtures/TestFixtures.ts](../fixtures/test-fixtures.md) imports this module.
- [ui/setup/auth.setup.ts](../../ui/setup/auth-setup.md) imports this module.
- [api/specs/rbac.spec.ts](../../api/specs/rbac-spec.md) imports this module.
- [ui/specs/multi-role.spec.ts](../../ui/specs/multi-role-spec.md) imports this module.
- [ui/specs/viewer-rbac.spec.ts](../../ui/specs/viewer-rbac-spec.md) imports this module.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `d0e3aa531a515bf19c6ace1e9cca588f3d70d6fb693b35fd22243f547601f9de`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
