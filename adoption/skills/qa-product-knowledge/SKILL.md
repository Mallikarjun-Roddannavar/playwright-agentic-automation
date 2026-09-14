---
name: qa-product-knowledge
description: Explain product behavior, test intent, permissions, coverage and change impact using small repository knowledge notes; propose durable learning after investigations without inventing product approval.
---

# QA + Product Knowledge

Use the destination repository's own framework conventions. This skill requires
only Markdown and source files; no generated index, model API or service.

1. Read `knowledge/index.md`, then the smallest relevant note and its evidence.
   If knowledge is missing, use targeted source/test searches and say what is
   unknown. Do not create a graph or document the whole product as a prerequisite.
2. Separate intended behavior (requirements and human-reviewed decisions),
   implementation facts (code), and observations (executed test/API evidence).
   Check exact test titles, calls and assertions before claiming coverage.
3. Verify that cited evidence still exists and supports the claim. A renamed
   symbol, changed source or conflicting requirement makes the note stale or
   conflicted until resolved. File existence alone does not verify meaning.
4. Answer the user's question with useful links and any evidence gaps. Candidate
   affected tests are a starting point, not complete runtime coverage.
5. After a useful investigation, propose one small note or update with the fact,
   why it matters, supporting requirement/test/source/evidence, review state and
   open questions. Store drafts in `knowledge/drafts/` when writing is requested.
6. Product/business meaning needs explicit human confirmation before promotion
   to `knowledge/notes/`. Record who approved it, when, and the review reference.
   Technical observations may be recorded as observations; never call them
   approved requirements. Preserve unresolved conflicts and update the index
   only for reviewed active notes.

For a failing test, also read the repository's `qa/failure-taxonomy.json` and
`.agents/skills/qa-safe-healing/SKILL.md`. Knowledge gives context; runtime
evidence establishes the observed failure. Do not modify tests merely to agree
with faulty current behavior. Never treat fixture demonstrations as evidence
against the actual product. Redact secrets before retaining or sharing evidence.
