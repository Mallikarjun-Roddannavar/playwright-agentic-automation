---
type: Code Module
title: api
description: Application frontend extracted from app/frontend/src/api.ts by deterministic static analysis.
resource: repo://playwright-pom-agent-skills/app/frontend/src/api.ts
tags:
  - generated
  - static-ast
  - frontend
  - ts
status: stable
sources:
  - id: source
    resource: repo://playwright-pom-agent-skills/app/frontend/src/api.ts
    title: app/frontend/src/api.ts
    author: process:codebase-knowledge/1.0.0
source_path: app/frontend/src/api.ts
source_sha256: 77a377b4d43e598f3ff40a9c1c6ba8e02514f7e1e5a6ce56bfb0922d50f1d50d
code_graph_id: file:app/frontend/src/api.ts
analysis_scope: static-ast
fact_sha256: 75bb2d52e70f275bb2391d03e65f8ab255f54a58986c3c7a91d9e4dc24845b06
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-15T12:01:02.517Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-15T12:01:02.517Z"
---

# Purpose

Application frontend extracted from app/frontend/src/api.ts by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `variable` **api** (lines 108-178)
- `variable` **AUTH_SESSION_EXPIRED_EVENT** (lines 25-25)
- `function` **decodeJwtPayload** (lines 49-58)
- `type` **JwtClaims** (lines 17-23)
- `function` **parseErrorDetail** (lines 28-47)
- `function` **request** (lines 77-106)
- `type` **Stats** (lines 7-10)
- `type` **TokenResponse** (lines 12-15)
- `function` **userFromAccessToken** exported (lines 60-75)

# Imports

- [app/frontend/src/types.ts](./types.md) via `./types`

# Static relationships

- None detected by static analysis.

# Dependents

- [app/frontend/src/pages/OAuthCallbackPage.tsx](./pages/oauth-callback-page.md) imports this module.
- [app/frontend/src/pages/HomePage.tsx](./pages/home-page.md) imports this module.
- [app/frontend/src/context/AuthContext.tsx](./context/auth-context.md) imports this module.
- [app/frontend/src/pages/LoginPage.tsx](./pages/login-page.md) imports this module.
- [app/frontend/src/pages/FoldersPage.tsx](./pages/folders-page.md) imports this module.
- [app/frontend/src/pages/FilesPage.tsx](./pages/files-page.md) imports this module.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `77a377b4d43e598f3ff40a9c1c6ba8e02514f7e1e5a6ce56bfb0922d50f1d50d`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
