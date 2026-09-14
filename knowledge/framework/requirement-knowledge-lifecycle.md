---
type: Architecture Decision
title: Requirement-centered knowledge lifecycle
description: Every requirement follows a controlled path from proposal to reviewed product meaning, test knowledge, traceability, validation, and archived history.
tags:
  - decision
  - knowledge-lifecycle
  - requirements
  - traceability
status: stable
---

# Decision

Use one generic lifecycle for every product requirement:

```text
requirement
    → product proposal
    → human approval
    → product promotion
    → manual/automated knowledge
    → relationship synchronization
    → validation
    → archive
```

Product knowledge is the source of business meaning. Manual and automated
knowledge are downstream verification perspectives. Relationships connect the
requirement to its approved evidence, and validation confirms that active links
and generated artifacts remain consistent.

# Consequences

- New features use the same workflow instead of feature-specific scripts.
- Human review remains the approval gate for semantic business meaning.
- Promotion and archiving preserve a clear active-versus-historical boundary.
- Relationship synchronization prevents approved notes from becoming isolated.
- Validation can detect missing targets, stale evidence, and broken generated
  knowledge without requiring an LLM runtime.
- A promoted knowledge note is not automatically runtime-verified; execution
  status remains separate from static/source grounding.

# Implementation

- Product proposal: `npm run knowledge:product:propose`
- Product promotion: `npm run knowledge:product:promote`
- Manual proposal: `npm run knowledge:manual:propose`
- Automated proposal: `npm run knowledge:automated:propose`
- Relationship synchronization: `npm run knowledge:relationships:sync`
- Validation and freshness: `npm run knowledge:validate` and
  `npm run knowledge:check`
- Historical drafts: `knowledge/archive/`
