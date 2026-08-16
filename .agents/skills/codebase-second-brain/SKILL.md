---
name: codebase-second-brain
description: Retrieve, verify, and refresh the persistent Open Knowledge Format v0.2 codebase memory for playwright-agentic-automation. Use when an agent needs architecture discovery, source ownership, page/API/fixture relationships, static AST graph queries, knowledge freshness checks, Mermaid/Obsidian navigation, or durable knowledge updates after repository changes.
---

# Codebase Second Brain

Use `knowledge/` as the first discovery layer. It is a portable, offline-first OKF v0.2 bundle; `generated/` contains deterministic AST facts and `architecture/`, `decisions/`, and `runbooks/` hold durable human-readable knowledge.

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
