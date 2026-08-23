# Agentic Playwright Workflow

This repository provides the structure and evidence an external coding agent can use while working on Playwright automation. It does not autonomously invoke an LLM.

## Example: investigate the Login flow

### 1. Human request

> Explain what the successful Login test verifies and identify the Page Objects involved.

### 2. Agent discovery

The agent reads:

- `AGENTS.md` for repository rules;
- `.agents/skills/codebase-second-brain/SKILL.md` for knowledge retrieval;
- `knowledge/index.md` for the smallest relevant entry points.

### 3. Knowledge query

```bash
node ./scripts/queryKnowledge.mjs --knowledge Login
```

The saved knowledge connects the Login feature, expected behavior, testing scenario, test file, Page Objects, and assertion.

### 4. Source verification

The agent verifies the important claims against:

- `ui/specs/login.spec.ts`;
- `ui/pages/LoginPage.ts`;
- `ui/pages/HomePage.ts`;
- `app/frontend/src/pages/LoginPage.tsx`;
- `app/backend/main.py`.

### 5. Validation

```bash
node ./scripts/buildKnowledge.mjs --check
node ./scripts/validateKnowledge.mjs
node ./scripts/knowledge/syncRelationships.mjs
npm run test:list
```

Relationship synchronization connects promoted requirement knowledge to existing manual and automated notes. Validation reports unresolved or stale relationships without rewriting approved knowledge.

## Batch testing-knowledge workflow

For an existing repository with many tests, use:

```bash
npm run knowledge:inventory
npm run knowledge:propose
npm run knowledge:verify-all
npm run knowledge:promote
```

The inventory is deterministic. The external agent creates Markdown proposals. Verification checks repository evidence and reports stale or conflicting proposals. Promotion does not silently resolve semantic conflicts and does not allow the agent to self-assign `VERIFIED`.

## Boundaries

The repository supplies guidance, skills, knowledge, scripts, and executable tests. The external agent is responsible for selecting the workflow, making changes, running commands, and explaining the evidence. A passing static verifier does not prove every runtime behavior; run the relevant Playwright tests when runtime evidence is required.
