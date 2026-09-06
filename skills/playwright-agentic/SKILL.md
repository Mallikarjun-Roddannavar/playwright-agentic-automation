---
name: playwright-agentic
description: Safely understand, change, or validate this Playwright UI/API framework using its local Agent Skills and evidence-backed codebase knowledge.
---

# Playwright Agentic

Use this entry skill inside a checkout of `playwright-agentic-automation` when a task spans framework conventions, product behavior, UI/API automation, or impact analysis. It is a routing guide for an external coding agent; it does not invoke an LLM or make changes automatically.

## Start safely

1. Read `AGENTS.md` for repository-wide ownership and validation rules.
2. Run `npm run agent:doctor` before runtime work when the environment may be new or stale.
3. For a feature question or impact analysis, read `knowledge/index.md`, run `npm run knowledge:check`, and query the narrowest relevant term with `npm run knowledge:query -- <term>` or `npm run knowledge:impact -- <term>`.

## Route by work type

- UI Page Objects, UI specs, selectors, or navigation: read `.agents/skills/pw-ui-pom/SKILL.md`.
- API services/specs, fixtures, or authentication: read `.agents/skills/pw-api-pom/SKILL.md`.
- Scripts, Playwright configuration, linting, reporting, or README tooling claims: read `.agents/skills/pw-framework-tooling/SKILL.md`.
- Knowledge freshness, source relationships, traceability, or impact: read `.agents/skills/codebase-second-brain/SKILL.md`.
- A cross-layer failure involving UI, API, data, or Playwright evidence: read `.agents/skills/full-stack-incident-analyst/SKILL.md`.
- A failed Playwright test, diagnosis-only request, or guarded test repair: read `.agents/skills/qa-safe-healing/SKILL.md`, then treat `qa/failure-taxonomy.json` and `qa/evidence-schema.json` as the policy source of truth.

Use the narrowest relevant skill. When a task spans layers, use the knowledge skill first and then the owning implementation skill.

## Evidence boundary

Treat source code, configuration, and executed tests as authoritative. The generated knowledge graph is static evidence, not proof that a path ran. Keep selectors in Page Objects, assertions in tests, and business-meaning changes under human review before they enter active product knowledge.

For a failure, diagnose before modifying. Preserve evidence, classify it, and obey the resulting modification decision. Never weaken assertions, skip/fixme/delete tests, swallow failures, or force actions merely to obtain green output. Run `npm run qa:guardrails` before accepting a repair.

## Demonstration

Run `npm run agent:demo` for the RBAC impact example. It produces a read-only impact report; inspect the returned evidence before editing or running targeted validation.

Run `npm run qa:demo` for the QA operating-layer walkthrough. It reports declared coverage gaps, graph-resolved test impact, guardrail status, and benchmark-fixture status without fabricating an agent result.
