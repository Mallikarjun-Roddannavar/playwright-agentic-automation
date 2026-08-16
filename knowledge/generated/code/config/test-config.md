---
type: Configuration
title: test-config
description: Configuration extracted from config/test-config.json by deterministic static analysis.
resource: repo://playwright-agentic-automation/config/test-config.json
tags:
  - generated
  - static-ast
  - configuration
  - json
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/config/test-config.json
    title: config/test-config.json
    author: process:codebase-knowledge/1.0.0
source_path: config/test-config.json
source_sha256: f3a4eb530a16eec2ef30dba7ea35d1542195445563657a1df763cae1d15850ff
code_graph_id: file:config/test-config.json
analysis_scope: static-ast
fact_sha256: 5ebca3817ee2e7ee42fd970cf075c4a93305c0f0d1a542de7f9f20aad6c26b26
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-16T08:39:27.990Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-16T08:39:27.990Z"
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

The facts above are machine-confirmed from the TypeScript AST and source hash `f3a4eb530a16eec2ef30dba7ea35d1542195445563657a1df763cae1d15850ff`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
