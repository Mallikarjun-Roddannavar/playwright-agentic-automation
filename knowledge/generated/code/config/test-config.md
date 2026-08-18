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
source_sha256: 25e6510aca7df397faac39eb380d08236f90db0ba03f96973cbbb9dfdb4d92bf
code_graph_id: file:config/test-config.json
analysis_scope: static-ast
fact_sha256: 497bb0e264b45f0beab94d80a7d5f5f39445871eb65eef7f35c72bd79e0aee9f
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-18T10:16:28.092Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-18T10:16:28.092Z"
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

The facts above are machine-confirmed from the TypeScript AST and source hash `25e6510aca7df397faac39eb380d08236f90db0ba03f96973cbbb9dfdb4d92bf`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
