---
type: Runbook
title: Retrieve and refresh codebase knowledge
description: Use the saved graph first, verify freshness, and regenerate only deterministic AST facts after code changes.
tags:
  - runbook
  - knowledge
  - okf
  - obsidian
status: stable
sources:
  - id: repository
    resource: /AGENTS.md
    title: Repository instructions
---

# Before investigating or changing code

1. Read [the bundle index](../index.md).
2. Run `npm run knowledge:check`.
3. Query only relevant facts: `npm run knowledge:query -- LoginPage`.
4. Open the returned concept notes before reading broader source files.

If npm hits the known Windows `EPERM`/realpath issue, run `node ./scripts/buildKnowledge.mjs --check` and `node ./scripts/validateKnowledge.mjs` directly.

# After changing indexed source code

1. Run `npm run knowledge:build`.
2. Run `npm run knowledge:validate`.
3. Review generated Markdown, Mermaid diagrams, and `generated/code-graph.json` in the diff.
4. Run the smallest relevant framework checks, then commit the updated `knowledge/` artifacts with the source change.

# Obsidian use

Open the `knowledge` folder as a vault. Its normal Markdown links populate Obsidian's backlink and Graph views; Mermaid code fences render without a community plugin. Do not edit generated concepts manually—put human decisions and runbooks outside `generated/`.
