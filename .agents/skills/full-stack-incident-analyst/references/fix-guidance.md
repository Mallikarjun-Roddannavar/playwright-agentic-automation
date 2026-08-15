# Fix Guidance

Use before recommending or implementing a UI, frontend, backend, data/config, integration, or test/tooling change.

## Existing Pattern Gate

1. Classify the behavior: rendering/accessibility, permissions, validation, state/session/cache, request mapping, API schema, business rule, persistence/atomicity, configuration, integration, or automation.
2. Search the same feature area first, then shared primitives and adjacent working flows.
3. Cite an exact comparable implementation when one exists.
4. If only a near match exists, label the recommendation `repository-convention-backed, behavior confirmation pending`.
5. If none exists, name the searched sources and label it `new design/implementation proposal`.

Include one line in every fix answer:

- `Comparable working behavior: checked - <path and pattern>`; or
- `Comparable working behavior: checked - no exact match; nearest is <path/pattern>`; or
- `Comparable working behavior: checked - none found in <sources>; new proposal`.

## Layer options

For broad incidents, evaluate these layers compactly:

| Layer | Typical durable use | Common risk |
|---|---|---|
| UI/display/accessibility | semantics, focus, affordance, responsive rendering | hides rather than fixes wrong data/state |
| Frontend/state/request | validation, session/cache, mapping, client-owned filtering | duplicates backend rules or trusts client security |
| API/backend | authorization, schema, business rules, atomicity, safe storage | contract changes affect multiple clients |
| Data/config | incorrect flags, mappings, feature settings, corrupt rows | tactical correction without preventing recurrence |
| Infrastructure/integration | timeouts, queues, upstream identity/data, delivery | ownership and environment variability |
| Test/tooling | missing coverage, flaky waits/selectors, validator defects | test-only change can mask product defects |

For each relevant layer state the approach, when it works, owner/scope, risk, and rank: `easy/tactical`, `best/recommended`, or `not recommended`.

## Durable-fix rules

- Enforce security and authorization on the backend; UI hiding is only a matching affordance.
- Validate and normalize at trust boundaries. Store user-controlled filenames/paths safely.
- Keep persistence changes atomic and clean up partial side effects.
- Expire invalid client sessions and make 401 handling consistent.
- Prevent stale async responses from overwriting newer state when races are material.
- Preserve accessibility semantics, keyboard behavior, focus, and stable automation selectors.
- Prefer deterministic readiness conditions over arbitrary sleeps in Playwright.
- Keep selectors/actions in page objects and assertions in specs when that is the repository convention.
- Test negative RBAC, invalid input, failure cleanup, and cross-layer error propagation—not only happy paths.

## Regression gate

The regression should:

1. fail against the defective contract;
2. assert user-visible or API behavior, not implementation trivia;
3. use stable selectors and isolated data;
4. register cleanup immediately after resource creation;
5. cover the role/failure/edge condition that allowed the defect;
6. remain narrow enough to diagnose when it fails.

## Validation after implementation

Run the smallest credible sequence:

1. syntax/typecheck;
2. repository invariant scripts;
3. lint/format check;
4. narrow unit/API/UI regression;
5. relevant suite or browser matrix proportional to risk;
6. build/package check;
7. manual visual/accessibility inspection when layout or interaction changed.

Separate application failures from sandbox, dependency, browser, credential, or environment failures.
