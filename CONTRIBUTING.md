# Contributing

This is a personal learning repository, but focused improvements are welcome as exercises in Playwright architecture, agent skills, and evidence-backed knowledge.

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
node ./scripts/knowledge/syncRelationships.mjs
node ./scripts/knowledge/validateRelationships.mjs
npm run lint
npm run typecheck
npm run test:list
```

Run `npm test` when the change affects runtime behavior or Playwright tests.

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
