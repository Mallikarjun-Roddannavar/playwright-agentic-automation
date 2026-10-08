# Decisions

## Use plain Markdown for this learning project

Keep one note per feature, with requirements, implementation, manual checks, test mappings, and gaps together. This makes a feature understandable without learning a separate documentation platform. Architecture explains shared layers; this file records reasons for choices.

The notes are local, readable in any Markdown editor, and need no model API, database, graph builder, or promotion scripts. Source links replace generated indexes. The tradeoff is manual upkeep: update the relevant note when behavior changes and verify important claims against source.

## Keep the three concepts separate

`AGENTS.md` contains project rules. A skill contains a task workflow. Knowledge contains project explanations. Rules should have one home rather than being repeated in feature notes.

## Preserve meaning and evidence

Raw requirements remain in `requirements/incoming/`. Existing requirement IDs are retained; successful login (`REQ-LOGIN-001`) is included in authentication (`REQ-AUTH-001`). Current implementation and requirement expectations remain separate, especially when role rules or persistence expectations are unresolved.

New interpretations of business meaning need user confirmation in a Pending review section. Source-backed note maintenance needs no separate approval or file-promotion process. Test mappings describe assertions, not successful executions or complete coverage.

## Keep QA discipline

The failure taxonomy, evidence contract, guardrails, and executable tests continue to govern diagnosis and repair. Automatic graph-based impact commands have been removed; review the feature note, follow source references, and choose relevant tests from their actual assertions.

## Preserve the previous system locally

The old knowledge machinery, optional agent experiments, and generated reports were removed during simplification. Investigation now uses direct source reads and `rg`, without a separate incident index.
