---
name: codebase-second-brain
description: Retrieve, verify, and refresh the persistent Open Knowledge Format v0.2 codebase memory for playwright-agentic-automation. Use when an agent needs architecture discovery, source ownership, page/API/fixture relationships, static AST graph queries, knowledge freshness checks, Mermaid/Obsidian navigation, or durable knowledge updates after repository changes.
---

# Codebase Second Brain

Use `knowledge/` as the first discovery layer. It is a portable, offline-first OKF v0.2 bundle; `generated/` contains deterministic AST facts and `architecture/`, `decisions/`, and `runbooks/` hold durable human-readable knowledge.

## Route Knowledge Questions Automatically

Use this skill as the primary skill for natural-language questions about:

- how a feature works;
- how product behavior maps to tests;
- what tests, page objects, services, fixtures, or assertions cover a feature;
- whether a documented behavior is stale, missing, or contradictory;
- architecture, ownership, navigation, or API relationships.

Users should not need to name knowledge files, commands, or this skill. Start with
the knowledge bundle, then use `pw-ui-pom` or `pw-api-pom` only as supporting
context when the retrieved relationships point to UI or API implementation.

For a knowledge question, follow this order:

1. Read `knowledge/index.md` and run the relevant freshness/validation check.
2. Query the requested feature, symbol, route, or relationship.
3. Open the returned knowledge notes and their direct evidence links.
4. Inspect only the authoritative source lines needed to confirm an important
   claim or resolve a conflict; do not broadly rediscover the repository first.
5. Report the answer naturally, separating known knowledge, source verification,
   runtime test results, and missing evidence.

If source and knowledge disagree, explicitly report `STALE` or `CONFLICTED`.
Treat source as authoritative, but do not silently rewrite the knowledge bundle.
`VERIFIED` knowledge evidence does not imply that a Playwright test was executed;
report runtime execution separately.

When multiple endpoints, implementations, or authentication paths exist, trace
the one actually used by the requested feature or test. Distinguish it from
alternate supported endpoints. A route mentioned in a product note is not proof
that the current UI or test uses that route; follow the concrete call site,
service method, fixture, or graph relationship. If the note and call site differ,
report the claim as `STALE` or `CONFLICTED` and explain which path is authoritative
for the requested flow.

## Retrieve Before Rediscovering

1. Read `knowledge/index.md`.
2. Run `npm run knowledge:check`. If it reports stale artifacts, treat the source code as authoritative and refresh before relying on generated facts.
3. Run `npm run knowledge:query -- <symbol, path, route, fixture, package, or term>`.
4. Open only the returned concept notes and their direct links. Read source only to verify an important claim, resolve a stale fact, or make the requested change.

Use `--relation` for exact relationship retrieval:

```bash
npm run knowledge:query -- --relation NAVIGATES_TO
npm run knowledge:query -- --relation USES_API_ROUTE
npm run knowledge:query -- --relation USES_FIXTURE
```

## Build Testing Knowledge

The repository does not call an LLM directly. When asked to build testing knowledge, the agent is the semantic writer and repository scripts are the evidence gates:

1. Run `npm run knowledge:inventory` to refresh the deterministic test inventory.
2. Read `knowledge/test-inventory.json` and relevant generated graph concepts.
3. Create or refresh Markdown proposals under the stage-specific draft directory
   `knowledge/drafts/automated/` without overwriting approved notes. Automated
   test knowledge must never be placed directly under `knowledge/drafts/`.
4. Run `npm run knowledge:verify-all` and report `GROUNDED`, `STALE`, or `REVIEW_REQUIRED` results.
5. Resolve semantic naming and contradiction questions with the user; do not silently rewrite approved knowledge.
6. Run `npm run knowledge:promote` only for evidence-supported proposals.

The agent may propose meaning, but only deterministic repository checks may assign trusted verification. `knowledge/conflicts/` records unresolved evidence conflicts.

## Build Product Knowledge From Requirements

Use this workflow when a new requirement is provided:

```text
requirements/incoming/
        ↓
knowledge/drafts/product/
        ↓ human review
knowledge/01-product/requirements/
```

1. Read the raw requirement from `requirements/incoming/` and preserve its source meaning.
2. Run `npm run knowledge:product:propose -- --file=<incoming requirement>` to create a draft.
3. Complete the draft with a feature overview, business requirement, acceptance criteria, expected behavior, business rules, and ambiguities.
4. Keep the draft marked `status: draft` and `review_status: pending`.
5. Ask the human to review business meaning, missing rules, acceptance criteria, and conflicts. Do not infer approval from valid Markdown, YAML, or source-file existence.
6. Run `npm run knowledge:product:validate` to verify the draft and its raw requirement evidence.
7. Only after explicit human approval run
   `npm run knowledge:product:promote`. The command promotes the requirement,
   archives the reviewed draft, removes duplicated product text from active
   downstream notes, synchronizes relationships, and runs validation.

After approved knowledge is promoted and validated, the promotion command moves
the original reviewed draft to `knowledge/archive/product/`. Do not archive a
draft before explicit approval and successful validation. Archived drafts
preserve the proposal and review history but are not active knowledge sources.

After promoting any approved product or automated knowledge, do not stop at the
file move. The promotion workflow automatically refreshes and verifies the
generated bundle. If promotion is performed manually or the automatic refresh
needs to be repeated, run:

```text
npm run knowledge:build
npm run knowledge:validate
npm run knowledge:check
```

Report the promoted file, generated artifacts refreshed, validation result, and
freshness result separately. A promoted Markdown file does not by itself prove
that generated knowledge is current.

After promoting a requirement's product, manual, or automated knowledge, update
`knowledge/relationships.json` with the supported semantic links. Connect the
requirement to its approved manual and automated knowledge and to any directly
supported evidence; do not invent relationships from filename similarity alone.

Before adding any relationship, verify that its `from` and `to` identifiers
resolve to an existing requirement, knowledge note, test, source file, or other
registered graph target. `EXPECTED_BEHAVIOR` is optional: add it only when a
real expected-behavior note exists. Never create a target identifier merely
because its name sounds appropriate. If a target is missing, report the gap
instead of adding a dangling relationship.
Then run:

```text
npm run knowledge:relationships:sync
npm run knowledge:relationships
npm run knowledge:validate
npm run knowledge:check
```

Report missing targets, stale evidence, or conflicting relationships separately.
A schema-valid relationship file is not sufficient; every active relationship
must also resolve to an existing target with direct supporting evidence.

Promotion workflows run relationship synchronization automatically. Use the
same generic workflow for every requirement; do not create feature-specific
verification scripts or rely on Login-only checks.

Lifecycle state is determined by frontmatter and location, not by the identifier
text. Active promoted notes must use stable IDs such as `manual-REQ-FEATURE-001`
or `automated-REQ-FEATURE-001`; only files under `knowledge/drafts/` may use
`draft-*` IDs. Do not report an active note as a draft merely because an old ID
contains the word `draft`.

Do not create manual-test knowledge, automated-test knowledge, or Playwright
changes as part of product-draft creation unless the user explicitly starts the
next workflow stage. Product requirements are the source of business meaning;
application code and tests are supporting evidence, not replacements for human
review.

## Explicit Product-to-Manual-Test Flow

Manual-test knowledge is a separate, user-initiated stage after product
approval. Follow this flow explicitly:

```text
approved product requirement
        ↓
knowledge/drafts/manual/
        ↓ human review and explicit approval
knowledge/02-manual/
```

When the user asks to create manual-test knowledge for an approved requirement:

1. Use the approved requirement as the source of business meaning and inspect
   implementation evidence only to ground the proposed scenarios.
2. Run `npm run knowledge:manual:propose -- --requirement=REQ-FEATURE-001`
   to create one requirement-focused proposal under
   `knowledge/drafts/manual/`. Repeat for each approved requirement; do not use
   the old per-spec proposal generator for this workflow.
3. Validate the proposals and automatically stop for human review; the user
   does not need to request a stop. Draft creation does not imply approval or
   promotion.
4. Promote proposals into `knowledge/02-manual/` only after the user gives
   explicit approval (for example, “Approve and promote the manual tests”).

After successful promotion, move the original reviewed draft to
`knowledge/archive/manual/`. Keep the approved note as the active source and
retain the archived draft for audit history.

Do not create or modify Playwright tests, automated-test knowledge, or approved
manual-test knowledge during the draft stage. If the user has not explicitly
started this manual-test stage, stop after product-requirement processing.

## Explicit Automated-Test Knowledge Flow

Automated-test knowledge is a separate, user-initiated stage after product
requirements are approved. Store proposals at:

```text
knowledge/drafts/automated/
        ↓ human review and explicit approval
knowledge/03-automated/
```

When the user asks to create automated-test knowledge for a requirement:

1. Use the approved product requirement for business meaning and the
   deterministic test inventory plus source specs for implementation evidence.
2. Run `npm run knowledge:automated:propose -- --requirement=REQ-FEATURE-001`
   to create one requirement-focused proposal under
   `knowledge/drafts/automated/`. Repeat for each approved requirement; do not
   use the old per-spec proposal generator for this workflow.
3. Link the proposal to the requirement and list covered scenarios, fixtures,
   Page Objects/services, assertions, and explicit coverage gaps.
4. Mark the proposal `status: draft`; use `verification_status: grounded` only
   when all referenced evidence exists, and use `feature_status: review_required`
   until semantic coverage is reviewed.
5. Stop for human review. Promote into `knowledge/03-automated/` only after
   explicit approval; do not treat deterministic verification as semantic
   approval.

After successful promotion and refresh, move the original reviewed draft to
`knowledge/archive/automated/`. Never archive a draft merely because it is
grounded; explicit approval and successful promotion are required.

## Windows Shell Fallback

If `npm run knowledge:check` hits the known Windows `EPERM`/realpath issue, run the underlying commands directly:

```bash
node ./scripts/buildKnowledge.mjs --check
node ./scripts/validateKnowledge.mjs
```

For a direct query, omit npm's extra delimiter: `node ./scripts/queryKnowledge.mjs LoginPage`.

## Trust the Right Layer

- Treat TypeScript source, config, and tests as authoritative.
- Treat `knowledge/generated/code-graph.json` as machine-confirmed static analysis with source-hash provenance.
- Do not describe graph edges as runtime behavior. They are static imports, declarations, resolved inheritance, concrete `new` expressions, type returns, route references, fixtures, and package usage.
- Preserve unknown OKF frontmatter fields and tolerate broken Markdown links when consuming knowledge; do not silently invent missing facts.
- Load `references/static-graph-model.md` only when changing the extractor or interpreting an edge type.

## Refresh After a Relevant Change

When changing indexed TypeScript, JavaScript, JSON configuration, package metadata, or knowledge scripts:

1. Run `npm run knowledge:build`.
2. Run `npm run knowledge:validate`.
3. Review the generated concepts, `knowledge/generated/code-graph.json`, and Mermaid graphs for factual changes.
4. Keep the generated artifacts with the code change. Do not hand-edit files under `knowledge/generated/`.
5. Add human reasoning, decisions, exceptions, and runbooks outside `generated/`, using valid OKF frontmatter with a non-empty `type`.

## Obsidian

Open `knowledge/` as an Obsidian vault when a visual link graph or Mermaid rendering is useful. Use normal Markdown links so the bundle stays portable to any Markdown/OKF consumer. Do not add user-specific `.obsidian` settings to the repository unless explicitly requested.
