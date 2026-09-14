---
name: codebase-second-brain
description: Explain product behavior, test intent, coverage and change impact from this repository's living knowledge; verify evidence and propose reviewed updates. Use the generated static index only when useful.
---

# Living QA + Product Knowledge

Route natural questions here: “Why 403?”, “What covers this requirement?”,
“What do we know about Viewer?”, “What might this service change affect?”
Users should not need to name a skill or understand the knowledge layout.

1. Read `knowledge/index.md`, then the smallest relevant note and its direct
   evidence. Missing knowledge is a gap to report, not permission to invent it.
2. Separate requirement intent, implementation facts, test assertions and actual
   runtime observations. Source is authoritative for implementation; it does not
   override product meaning. A static `VERIFIED` flag does not mean a test ran.
3. Verify important claims against exact source/test call sites and current
   evidence. Trace the path actually used, including role/session and routes.
   If a note and its evidence disagree, report `STALE` or `CONFLICTED`.
4. Use the optional reference index when needed: `npm run knowledge:check`,
   `npm run knowledge:query -- <term>` or `npm run knowledge:impact -- <term>`.
   Stale generated facts must be refreshed before relying on them. If tooling is
   unavailable, use targeted source searches and disclose the missing check.
   Imports and graph edges identify candidates, not complete runtime coverage.
5. After useful engineering work, propose only the small durable explanation
   that would help the next task. Link requirement, role, UI/API, implementation,
   test and sanitized failure evidence where supported. Record unknowns.
6. New business meaning stays in `knowledge/drafts/product/` with raw input in
   `requirements/incoming/`. Explicit human confirmation is required before
   promotion to `knowledge/01-product/requirements/`. Record the actual reviewer,
   date and review reference. Do not fabricate historical approval. Manual and
   automated knowledge are separately requested, reviewed stages.

For reference proposal/promotion workflows, read
`references/knowledge-lifecycle.md` and `docs/KNOWLEDGE_LAYER.md`. The promotion
scripts enforce recorded review and evidence presence, not consent or semantics.
For edge interpretation or extractor changes, read
`references/static-graph-model.md`. Do not load these details for a simple note
lookup. For another team's framework, use `adoption/README.md`; the generated
bundle, numbered directories and full lifecycle are optional.

After indexed source/config/scripts change, run `knowledge:build`,
`knowledge:validate` and `knowledge:check`. Keep generated artifacts with the
change; never edit them by hand. Add human reasoning outside `generated/`, with
valid frontmatter in this reference bundle. Preserve unresolved links and
conflicts. `knowledge:relationships` checks active endpoints and their evidence.

For Windows npm launcher failures, run `node scripts/buildKnowledge.mjs --check`
and `node scripts/validateKnowledge.mjs` directly. For failures, use
`qa-safe-healing` and `qa/failure-taxonomy.json` before modifying automation.
