---
name: codebase-second-brain
description: Explain features, architecture, and test coverage in playwright-agentic-automation using simple project notes and linked source; update those notes when behavior changes.
---

# Codebase Second Brain

Use this skill for questions about how a feature works, what its tests check, missing coverage, architecture, or maintaining project notes. Users can ask naturally without naming files or commands.

## Read and explain

1. Start at [project knowledge](../../../knowledge/README.md) and open the relevant feature note or architecture note.
2. Follow its source links. Confirm the concrete UI/API flow and test assertions; a matching filename is not enough.
3. Explain requirements, current implementation, and coverage gaps separately. Report test execution only when it actually occurred.
4. If a note and source disagree, describe the mismatch. Do not turn observed behavior into a new business rule.

No knowledge command or generated index is required. Use the UI/API owning skill if the task also calls for implementation changes.

## Update notes

When authorized to change behavior or documentation, update the affected feature note with useful source links and actual assertion coverage. Keep the existing requirement IDs and unresolved questions. Update architecture only when shared structure changes and decisions only when a meaningful design choice changes.

Keep raw new requirements in `requirements/incoming/`. Place new business interpretations in a **Pending review** section of the feature note and obtain user confirmation before treating them as requirements. Ordinary source-backed documentation updates need no promotion process.
