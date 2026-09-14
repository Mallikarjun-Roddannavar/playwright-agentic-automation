---
okf_version: "0.2"
---

# Living QA + Product Knowledge

Start with one useful explanation, then verify its evidence. Product requirements
express intent, source describes implementation, and runtime artifacts show what
happened. Report conflicts rather than silently making those layers agree.

- [Why the Viewer test expects 403](03-automated/scenarios/viewer-read-only.md):
  requirement, role, API, UI, implementation, test and failure lesson in one note.
- [Five-minute demo](../docs/FIVE_MINUTE_DEMO.md): preserve an authorization failure.
- [Adopt in your framework](../adoption/README.md): two skills and a small note;
  no generated graph or numbered knowledge directories required.

The rest of this index is the optional reference bundle, using Git-friendly
Markdown and Open Knowledge Format (OKF) v0.2 metadata. Retrieve only the smallest
relevant concept. Existing review markers are not proof of attributable approval.

## Architecture

- [Overview](framework/overview.md) - How the framework layers fit together.
- [Generated graph concepts](generated/graphs/index.md) - Static AST-derived diagrams and machine-readable graph.

## Product knowledge

- [Product knowledge](01-product/index.md) - Grounded expectations for the sample application's features and flows.
- [Product requirements](01-product/requirements/index.md) - Business intent and acceptance criteria.
- [Incoming requirements](../requirements/incoming/README.md) - Raw requirement input before review.
- [Product knowledge drafts](drafts/product/README.md) - Agent proposals awaiting human review.

## Manual test knowledge

- [Manual tests](02-manual/index.md) - Human verification procedures linked to requirements.

## Framework knowledge

- [Playwright framework knowledge](framework/index.md) - Automation relationships and supporting-application boundaries.
- [Semantic relationships](relationships.json) - Requirement-to-test traceability registry.

## Automated test knowledge

- [Automated tests](03-automated/index.md) - Verified Playwright UI/API scenarios and their product relationships.
- [Test inventory](test-inventory.json) - Deterministic inventory of UI/API specs and extracted relationships.
- [Testing knowledge drafts](drafts) - Agent-generated proposals awaiting semantic review or promotion.
- [Knowledge answer evaluations](evaluations/README.md) - Deterministic checks for user-supplied agent answers.

## Decisions

- [Offline-first second brain](framework/offline-first-second-brain.md) - Why the knowledge bundle is portable and model-neutral.

## Runbooks

- [Refresh codebase knowledge](framework/refresh-codebase-knowledge.md) - Query, validate, and refresh the saved knowledge safely.
- [Using the testing second brain](framework/using-testing-second-brain.md) - Ask questions, analyze requirement impact, and update knowledge.
- [Knowledge layer workflow](../docs/KNOWLEDGE_LAYER.md) - Inventory, proposal, verification, promotion, and trace commands.

## Obsidian

Open this `knowledge/` directory as an Obsidian vault for native backlinks, Graph view, properties, and Mermaid rendering. No Obsidian plugin, account, sync service, LLM key, or cloud service is required.
