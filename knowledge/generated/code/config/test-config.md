---
type: Configuration
title: test-config
description: Configuration extracted from config/test-config.json by deterministic static analysis.
resource: repo://playwright-pom-agent-skills/config/test-config.json
tags:
  - generated
  - static-ast
  - configuration
  - json
status: stable
sources:
  - id: source
    resource: repo://playwright-pom-agent-skills/config/test-config.json
    title: config/test-config.json
    author: process:codebase-knowledge/1.0.0
source_path: config/test-config.json
source_sha256: 163715254fb5696e79af964e16867e764b5afafd317dbbdc97ea2aac80afa429
code_graph_id: file:config/test-config.json
analysis_scope: static-ast
fact_sha256: d938925d001fa50e52d5a05e009c4be3592b157795d2cdc3fb75b5b659a2ff3e
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-07-31T11:37:54.189Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-07-31T11:37:54.189Z"
---

# Purpose

Configuration extracted from config/test-config.json by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- None detected by static analysis.

# Imports

- None detected by static analysis.

# Static relationships

- None detected by static analysis.

# Dependents

- [ui/setup/auth.setup.ts](../ui/setup/auth-setup.md) imports this module.
- [utils/fixtures/TestFixtures.ts](../utils/fixtures/test-fixtures.md) imports this module.
- [utils/common/Waits.ts](../utils/common/waits.md) imports this module.
- [playwright.config.ts](../playwright-config.md) imports this module.
- [ui/specs/login.spec.ts](../ui/specs/login-spec.md) imports this module.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `163715254fb5696e79af964e16867e764b5afafd317dbbdc97ea2aac80afa429`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
