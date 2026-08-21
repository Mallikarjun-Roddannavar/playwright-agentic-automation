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
3. Create or refresh Markdown proposals under `knowledge/drafts/` without overwriting approved notes.
4. Run `npm run knowledge:verify-all` and report `GROUNDED`, `STALE`, or `REVIEW_REQUIRED` results.
5. Resolve semantic naming and contradiction questions with the user; do not silently rewrite approved knowledge.
6. Run `npm run knowledge:promote` only for evidence-supported proposals.

The agent may propose meaning, but only deterministic repository checks may assign trusted verification. `knowledge/conflicts/` records unresolved evidence conflicts.

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
