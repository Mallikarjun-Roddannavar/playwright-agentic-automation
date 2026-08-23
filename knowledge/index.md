---
okf_version: "0.2"
---

# Playwright Agentic Automation knowledge

This is a portable, offline-first Open Knowledge Format (OKF) v0.2 bundle. Start here, then retrieve only the smallest relevant concept. The committed source code remains authoritative.

## Architecture

- [Overview](architecture/overview.md) - How the framework layers fit together.
- [Generated graph concepts](generated/graphs/index.md) - Static AST-derived diagrams and machine-readable graph.

## Product knowledge

- [Product knowledge](01-product/index.md) - Grounded expectations for the sample application's features and flows.
- [Product requirements](01-product/requirements/index.md) - Business intent and acceptance criteria.
- [Incoming requirements](../requirements/incoming/README.md) - Raw requirement input before review.
- [Product knowledge drafts](drafts/product/README.md) - Agent proposals awaiting human review.

## Manual test knowledge

- [Manual tests](02-manual/index.md) - Human verification procedures linked to requirements.

## Framework knowledge

- [Playwright framework knowledge](04-framework/index.md) - Automation relationships and supporting-application boundaries.
- [Semantic relationships](relationships.json) - Requirement-to-test traceability registry.

## Automated test knowledge

- [Automated tests](03-automated/index.md) - Verified Playwright UI/API scenarios and their product relationships.
- [Test inventory](test-inventory.json) - Deterministic inventory of UI/API specs and extracted relationships.
- [Testing knowledge drafts](drafts/) - Agent-generated proposals awaiting semantic review or promotion.
- [Knowledge answer evaluations](evaluations/README.md) - Deterministic checks for user-supplied agent answers.

## Decisions

- [Offline-first second brain](decisions/offline-first-second-brain.md) - Why the knowledge bundle is portable and model-neutral.

## Runbooks

- [Refresh codebase knowledge](runbooks/refresh-codebase-knowledge.md) - Query, validate, and refresh the saved knowledge safely.
- [Using the testing second brain](runbooks/using-testing-second-brain.md) - Ask questions, analyze requirement impact, and update knowledge.
- [Knowledge layer workflow](../docs/KNOWLEDGE_LAYER.md) - Inventory, proposal, verification, promotion, and trace commands.

## Obsidian

Open this `knowledge/` directory as an Obsidian vault for native backlinks, Graph view, properties, and Mermaid rendering. No Obsidian plugin, account, sync service, LLM key, or cloud service is required.
