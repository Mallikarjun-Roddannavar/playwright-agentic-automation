# Contributing

Help teams add useful QA + Product Knowledge to their existing Playwright
repositories. Prefer a clearer first run, a smaller adoption step or an
evidence-backed test explanation over a new subsystem. The POM framework and
sample app are reference examples.

## Before changing files

1. Read `AGENTS.md`.
2. Read the narrowest applicable skill under `.agents/skills/`.
3. Inspect existing Page Objects, services, fixtures, and knowledge before adding new ones.
4. Keep the change focused and preserve the sample application's behavior.

## Validation

Run the smallest relevant checks:

```bash
node ./scripts/checkNamingConventions.mjs
node ./scripts/buildKnowledge.mjs --check
node ./scripts/validateKnowledge.mjs
node ./scripts/knowledge/validateRelationships.mjs
npm run lint
npm run typecheck
npm run format:check
npm run qa:guardrails
npm run qa:eval
npm run qa:tooling-test
npm run test:list
```

Run affected Playwright tests when changing runtime behavior. Use `npm run
qa:demo` for the controlled adoption demo. Run the full app suite only when
relevant. Refresh indexed facts before checking freshness; relationship
synchronization is a mutation, not a read-only validation command.

## Ownership rules

- Selectors belong in Page Objects.
- Assertions belong in specs.
- API services return raw responses and remain assertion-free.
- Routes remain in the appropriate base class.
- Human-authored knowledge belongs outside `knowledge/generated/`.
- Do not mark an unsupported interpretation as verified knowledge.

## Pull requests

Describe:

- what changed and why;
- which layer owns the change;
- validation commands and results;
- any runtime or environment limitations;
- whether generated knowledge artifacts changed.

Keep commits small enough to review independently.

## Useful small contributions

- Try the adoption starter in another repository and report the first confusing step.
- Explain one existing test with requirement, source and runtime evidence links.
- Preserve a sanitized investigation where keeping a product failure was correct.
- Improve a guardrail using a demonstrated missed unsafe edit or false positive.
