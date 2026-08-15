---
type: Architecture Decision
title: Offline-first, model-neutral codebase second brain
description: The repository persists portable OKF notes and deterministic AST-derived graph artifacts instead of requiring an LLM service or vector database.
tags:
  - decision
  - okf
  - offline-first
  - agent-memory
status: stable
sources:
  - id: repository
    resource: /AGENTS.md
    title: Repository instructions
---

# Decision

Store durable repository knowledge as standard Markdown with YAML frontmatter, following Google Cloud's Open Knowledge Format v0.2. Generate code facts from the TypeScript AST rather than asking a model to rediscover them.

# Consequences

- The bundle is readable in a terminal, Git diff, Markdown viewer, or Obsidian vault.
- Source hashes, provenance, and machine verification distinguish extracted facts from human-reviewed notes.
- `knowledge:query` reads the saved graph without reparsing the repository.
- `knowledge:check` detects when a source change makes generated knowledge stale.
- No Gemini key, vendor SDK, cloud service, embedding model, or vector database is required.

# External reference

The bundle targets [Open Knowledge Format v0.2](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md).
