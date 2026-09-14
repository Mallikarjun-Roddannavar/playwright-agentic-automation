---
type: Code Module
title: api
description: Application frontend extracted from app/frontend/src/api.ts by deterministic static analysis.
resource: repo://playwright-agentic-automation/app/frontend/src/api.ts
tags:
  - generated
  - static-ast
  - frontend
  - ts
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/app/frontend/src/api.ts
    title: app/frontend/src/api.ts
    author: process:codebase-knowledge/1.0.0
source_path: app/frontend/src/api.ts
source_sha256: f0d540ec26d5f440e9f1ce7d128edeabf06b9ffada72e4abc5ad238880b7eab7
code_graph_id: file:app/frontend/src/api.ts
analysis_scope: static-ast
fact_sha256: 27ea53946b76614e5301f92a50ff343496a1b984678018f0b0438d66c28b9a5c
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-09-10T15:54:55.036Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-09-10T15:54:55.036Z"
---

# Purpose

Application frontend extracted from app/frontend/src/api.ts by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `variable` **AUTH_SESSION_EXPIRED_EVENT** (lines 25-25)
- `type` **JwtClaims** (lines 17-23)
- `type` **Stats** (lines 7-10)
- `type` **TokenResponse** (lines 12-15)
- `variable` **api** (lines 104-174)
- `function` **decodeJwtPayload** (lines 49-58)
- `function` **parseErrorDetail** (lines 28-47)
- `function` **request** (lines 77-102)
- `function` **userFromAccessToken** exported (lines 60-75)

# Imports

- [app/frontend/src/types.ts](./app--frontend--src--types.md) via `./types`

# Static relationships

- None detected by static analysis.

# Dependents

- [app/frontend/src/pages/OAuthCallbackPage.tsx](./app--frontend--src--pages--oauth-callback-page.md) imports this module.
- [app/frontend/src/pages/HomePage.tsx](./app--frontend--src--pages--home-page.md) imports this module.
- [app/frontend/src/context/AuthContext.tsx](./app--frontend--src--context--auth-context.md) imports this module.
- [app/frontend/src/pages/LoginPage.tsx](./app--frontend--src--pages--login-page.md) imports this module.
- [app/frontend/src/pages/FoldersPage.tsx](./app--frontend--src--pages--folders-page.md) imports this module.
- [app/frontend/src/pages/FilesPage.tsx](./app--frontend--src--pages--files-page.md) imports this module.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `f0d540ec26d5f440e9f1ce7d128edeabf06b9ffada72e4abc5ad238880b7eab7`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
