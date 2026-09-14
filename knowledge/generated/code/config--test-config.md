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
fact_sha256: 5cda0584b73ad586a14deb722ef7170267435f671c7d5afefcb8e1864ad9a97a
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-09-10T15:54:55.036Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-09-10T15:54:55.036Z"
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

- [ui/setup/auth.setup.ts](./ui--setup--auth-setup.md) imports this module.
- [utils/fixtures/TestFixtures.ts](./utils--fixtures--test-fixtures.md) imports this module.
- [utils/common/Waits.ts](./utils--common--waits.md) imports this module.
- [playwright.config.ts](./playwright-config.md) imports this module.
- [ui/specs/login.spec.ts](./ui--specs--login-spec.md) imports this module.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `25e6510aca7df397faac39eb380d08236f90db0ba03f96973cbbb9dfdb4d92bf`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
