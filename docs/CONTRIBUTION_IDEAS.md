# Contribution Ideas

These are deliberately scoped learning tasks. They are suggestions only; no GitHub issues are created automatically.

## Starter tasks

### Add a knowledge query example

Document one additional query against existing generated graph relationships.

- Difficulty: beginner
- Relevant files: `scripts/queryKnowledge.mjs`, `knowledge/`, `README.md`
- Suggested labels: `documentation`, `good first issue`

### Add a Page Object usage example

Write a short walkthrough for an existing folder or file flow without changing framework behavior.

- Difficulty: beginner
- Relevant files: `ui/pages/`, `ui/specs/`, `docs/`
- Suggested labels: `documentation`, `good first issue`

### Add a backend setup troubleshooting note

Document Python 3.14 virtual-environment setup and the common Windows launcher problem.

- Difficulty: beginner
- Relevant files: `README.md`, `docs/GETTING_STARTED.md`
- Suggested labels: `documentation`, `good first issue`

## Intermediate tasks

### Add verified knowledge for an existing folder scenario

Extend the minimal product/testing knowledge model using existing folder evidence.

- Difficulty: intermediate
- Relevant files: `knowledge/01-product/`, `knowledge/02-manual/`, `knowledge/03-automated/`, `scripts/knowledge/syncRelationships.mjs`
- Suggested labels: `knowledge`, `testing`

### Add an API-service relationship query

Expose one useful saved relationship from the existing static graph through the query command.

- Difficulty: intermediate
- Relevant files: `scripts/queryKnowledge.mjs`, `knowledge/generated/code-graph.json`
- Suggested labels: `tooling`, `knowledge`

### Add a focused Playwright API scenario

Use an existing service and fixture to cover a meaningful missing API case while preserving service/spec ownership.

- Difficulty: intermediate
- Relevant files: `api/services/`, `api/specs/`, `utils/fixtures/TestFixtures.ts`
- Suggested labels: `api-testing`, `testing`

## Advanced tasks

### Add evidence-backed failure knowledge

Define a small durable format for a real, reproducible failure pattern and validate its referenced evidence.

- Difficulty: advanced
- Relevant files: `knowledge/03-automated/failures/`, `.agents/skills/full-stack-incident-analyst/`, `scripts/`
- Suggested labels: `agentic-testing`, `knowledge`

### Add a controlled test-maintenance example

Demonstrate how a changed locator or expected destination is detected without silently rewriting verified knowledge.

- Difficulty: advanced
- Relevant files: `docs/`, `scripts/`, `knowledge/03-automated/`
- Suggested labels: `agentic-testing`, `test-maintenance`

### Add CI diagnostics for Playwright artifacts

Improve CI artifact naming or failure summaries without making the workflow dependent on external services.

- Difficulty: advanced
- Relevant files: `.github/workflows/ci.yml`, `utils/common/CustomReporter.ts`
- Suggested labels: `ci`, `developer-experience`
