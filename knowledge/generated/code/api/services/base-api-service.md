---
type: Code Module
title: BaseApiService
description: API service extracted from api/services/BaseApiService.ts by deterministic static analysis.
resource: repo://playwright-pom-agent-skills/api/services/BaseApiService.ts
tags:
  - generated
  - static-ast
  - api-service
  - ts
status: stable
sources:
  - id: source
    resource: repo://playwright-pom-agent-skills/api/services/BaseApiService.ts
    title: api/services/BaseApiService.ts
    author: process:codebase-knowledge/1.0.0
source_path: api/services/BaseApiService.ts
source_sha256: ad2d46865a0f57befa5a70bf2c57539d6eee80cb17d0bdd9b41bd567bf12c4e7
code_graph_id: file:api/services/BaseApiService.ts
analysis_scope: static-ast
fact_sha256: e0e4933037d1c5f041b1f781df038e2b0320619aa6232451829ef11a3fc07c70
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-07-31T11:37:54.189Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-07-31T11:37:54.189Z"
---

# Purpose

API service extracted from api/services/BaseApiService.ts by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `class` **BaseApiService** exported (lines 5-21)
- `method` **BaseApiService.constructor** (lines 17-20)

# Imports

- [utils/common/Logger.ts](../../utils/common/logger.md) via `@utils/common/Logger`
- `@playwright/test` via `@playwright/test`

# Static relationships

- **BaseApiService** declares route [/health](./base-api-service.md).
- **BaseApiService** declares route [/token](./base-api-service.md).
- **BaseApiService** declares route [/folders](./base-api-service.md).
- **BaseApiService** declares route [/folders/{parameter}](./base-api-service.md).
- **BaseApiService** declares route [/folders/{parameter}/files](./base-api-service.md).

# Dependents

- [ui/setup/auth.setup.ts](../../ui/setup/auth-setup.md) imports this module.
- [api/services/FoldersService.ts](./folders-service.md) imports this module.
- [api/specs/health.spec.ts](../specs/health-spec.md) imports this module.
- [playwright.config.ts](../../playwright-config.md) imports this module.
- [api/services/AuthService.ts](./auth-service.md) imports this module.
- [api/services/FilesService.ts](./files-service.md) imports this module.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `ad2d46865a0f57befa5a70bf2c57539d6eee80cb17d0bdd9b41bd567bf12c4e7`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
