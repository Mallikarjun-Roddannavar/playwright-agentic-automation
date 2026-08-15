---
type: Architecture Overview
title: Playwright framework architecture
description: Stable ownership boundaries for the UI, API, fixtures, configuration, and tooling layers.
tags:
  - architecture
  - playwright
  - static-analysis
status: stable
sources:
  - id: repository
    resource: /AGENTS.md
    title: Repository instructions
---

# Layers

- UI specifications use page objects in `ui/pages`.
- API specifications use services in `api/services`.
- Shared role sessions and cleanup behavior live in `utils/fixtures/TestFixtures.ts`.
- UI routes belong to `BasePage`; API routes belong to `BaseApiService`.
- `config/test-config.json` owns runtime URLs, demo credentials, and shared waits.

# Evidence-backed maps

Use the [generated static architecture graph](../generated/graphs/architecture.md) for current module relationships and [code-graph.json](../generated/code-graph.json) for the full typed graph. These outputs are AST-derived static code graphs, not runtime call graphs.
