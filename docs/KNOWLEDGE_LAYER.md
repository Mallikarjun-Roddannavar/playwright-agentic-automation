# Knowledge Layer

The `knowledge/` directory is an offline-first, Git-versioned knowledge bundle for this Playwright repository. It helps a coding agent navigate the framework without rediscovering every relationship from source on each task.

## What it contains

```text
knowledge/
├── product/                  Product expectations grounded in application evidence
├── automated/                Automated Playwright scenarios and verification evidence
├── architecture/             Human-maintained architecture notes
├── decisions/                Durable design decisions
├── runbooks/                 Retrieval and refresh guidance
└── generated/                Deterministic static code facts and graphs
```

The current end-to-end example is Login:

```text
Product feature: Login
        ↓
Expected behavior: valid login reaches the workspace home
        ↓
Testing scenario: admin login succeeds
        ↓
ui/specs/login.spec.ts
        ↓
LoginPage → HomePage → visible home title assertion
```

## How it is built

The knowledge builder analyzes repository source and produces source-hash-backed Markdown concepts, a machine-readable static graph, and Mermaid diagrams. The graph describes static imports, declarations, Page Object construction, routes, fixtures, and related relationships. It is not a runtime call graph or test-coverage report.

Human-authored product and testing notes remain outside `generated/`. They include source references and explicit trust/freshness fields. Generated facts can be refreshed deterministically; verified product/testing claims are checked against independent repository evidence.

For batch testing discovery, `knowledge/test-inventory.json` records every UI/API spec and its extracted tests, Page Objects, services, fixtures, routes, relationships, and source hash. An external coding agent can use that inventory to create proposals under `knowledge/drafts/`; repository checks decide whether evidence is still present.

## Commands

```bash
npm run knowledge:build
npm run knowledge:check
npm run knowledge:query -- LoginPage
npm run knowledge:query -- --knowledge Login
npm run knowledge:impact -- Login
npm run knowledge:validate
npm run knowledge:verify
npm run knowledge:inventory
npm run knowledge:propose
npm run knowledge:verify-all
npm run knowledge:promote
npm run knowledge:eval
npm run knowledge:relationships
npm run knowledge:impact -- REQ-LOGIN-001
```

## Evaluate agent answers

Knowledge answer evaluations accept a question and response in a reviewable JSON
case under `knowledge/evaluations/`. They check required facts, forbidden claims,
and the existence of cited evidence files. They do not call an LLM or execute
Playwright; use the existing knowledge and test commands for those concerns.

If npm hits the known Windows `EPERM` realpath issue in an AI shell, use the direct Node commands documented in `knowledge/runbooks/refresh-codebase-knowledge.md`.

## Trust model

- `GROUNDED`: a claim has identifiable repository evidence, but may not have independent test verification.
- `VERIFIED`: the relevant source, Page Objects, test, and assertion evidence agree at validation time.
- `STALE or CONFLICTED`: the evidence needed by a stored claim no longer matches the repository. The verifier reports this state and does not rewrite the knowledge automatically.

The repository does not call an LLM. An external coding agent such as Codex, Claude, Cline, or another compatible tool writes proposals; deterministic scripts verify files, tests, relationships, and hashes. Semantic names and contradictions remain reviewable.

`knowledge/relationships.json` stores semantic traceability separately from the
static AST graph. It connects requirements to expected behavior, manual tests,
automated tests, Page Objects, services, fixtures, routes, and assertions.
`knowledge:relationships` validates its evidence links. Impact reports combine
these semantic edges with static source relationships and remain read-only.

## Requirement impact

Use `npm run knowledge:impact -- <term>` to produce a read-only candidate impact
report for a requirement, feature, Page Object, service, or source file. The
report combines matching knowledge pages with related static graph relationships.
It does not modify approved knowledge or tests; semantic impact decisions remain
reviewable.

Workflow stages append audit events to `knowledge/workflow-runs.jsonl`. Events include a run ID, stage, status, affected knowledge file, artifact, source digest, and missing evidence where applicable. Use `npm run knowledge:trace -- <term>` to investigate a run, file, stage, or status. Credentials and application payloads are not logged.

Open this directory in Obsidian if a human graph view is useful. Git and Markdown remain the durable source of truth.
