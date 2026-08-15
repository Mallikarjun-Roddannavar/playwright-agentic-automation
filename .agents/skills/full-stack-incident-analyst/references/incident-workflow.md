# Incident Workflow

## 1. Intake and scope

Capture what is available without inventing missing detail:

- issue, expected behavior, actual behavior, impact, affected roles/users;
- environment, build/version/commit, timestamp and timezone;
- exact navigation/action sequence;
- visible error, request ID, endpoint, test title, record ID, or config key;
- ticket text, screenshots, recording/transcript, HAR, logs, traces, and test reports;
- whether the user requested analysis only, a recommendation, or implementation.

Start at exact named paths and recent evidence. Ask for the smallest missing example only when it materially changes the conclusion.

## 2. Repository topology

Identify the actual stack rather than assuming a framework. Locate:

- UI routes, pages, components, styling, accessibility primitives, and stable selectors;
- client state/session/cache code and request wrappers;
- API schemas, controllers/routes, services, auth/RBAC, jobs, and integrations;
- persistence models/migrations/queries or file/config stores;
- unit, integration, API, and browser test boundaries;
- runtime configuration and environment-variable ownership;
- applicable `AGENTS.md`, local skills, formatting, and validation commands.

Record missing layers as `not present` instead of forcing a full-stack model.

## 3. Evidence ledger

For strict mode, track only material classes:

- reporter/ticket narrative;
- screenshot/image evidence;
- recording visual evidence;
- transcript/audio evidence;
- console/browser logs;
- HAR/network/APM trace;
- UI/component/style source;
- frontend state/request source;
- API contract/backend rule;
- persistence/config/integration source;
- runtime read-only validation;
- automated test/report evidence;
- comparable working repository behavior.

Use `checked`, `not present`, `not applicable`, `not checked - <reason>`, or `pending user-run validation`.

## 4. Cross-layer trace

Trace only the layers relevant to the symptom, in this order:

1. User-visible route, label, control, selector, and role state.
2. Component handler, validation, state transition, cache/session behavior, and rendering condition.
3. Request wrapper, method/path, parameters/body, auth headers, retry/error handling, and response mapping.
4. API route/schema, auth/RBAC dependency, business rule, concurrency boundary, and error response.
5. Persistence/config/integration reads and writes, transaction/atomicity behavior, cleanup, and side effects.
6. Existing tests that claim the contract and missing negative, edge, or cross-role cases.

At each hop record the input, transformation, output, and evidence path. Do not jump from visible UI behavior directly to a database conclusion.

## 5. Business behavior confidence gate

Check sources in descending authority for the repository:

1. accepted requirements/design/API schema;
2. closest working implementation and shared conventions;
3. current code path across all material layers;
4. current runtime evidence;
5. ticket narrative or reporter expectation.

Use `Confirmed` only when authoritative behavior and implementation/runtime evidence align. Use `Code-backed, runtime validation pending` when source is clear but a live record/request must still be proven. Name conflicting sources and use `Needs clarification` when they disagree.

## 6. Safe reproduction sequence

- `prod UI read-only acceptable`: observation, screenshots, console/network capture, and GET/read-only inspection.
- `prod read-only first`: incident depends on live identity, assignment, feature flag, status, effective date, cache, or configuration.
- `dev/test first`: action creates, changes, deletes, submits, uploads, notifies, schedules, or calls an integration.

Never treat a successful HTTP response alone as proof of correct persistence, delivery, authorization, or UI state.

## 7. Classification

Use one primary classification and optional contributors:

- `Valid issue - UI/accessibility`
- `Valid issue - frontend/state`
- `Valid issue - API/backend`
- `Valid issue - data/configuration`
- `Valid issue - infrastructure/integration`
- `Valid issue - test/tooling`
- `Expected behavior / invalid issue`
- `Needs more evidence`

Support classification with correlated evidence, not counts of artifacts reviewed.

## 8. Implementation workflow

Use only when implementation is authorized:

1. Preserve unrelated worktree changes and establish a baseline.
2. Reproduce deterministically or encode the failing contract as a regression test.
3. Apply the smallest durable fix at the owning layer.
4. Update adjacent UI/API/test contracts together when required.
5. Validate syntax/typecheck/lint/build, then the narrow regression, then the broader relevant suite.
6. Inspect generated output, persisted files/rows, cleanup, and role behavior where applicable.
7. Report any validation blocked by environment constraints without calling it a product failure.

## 9. Evidence request when blocked

Ask for one high-value, safe check at a time:

- `Current finding:` what is already proven.
- `Missing evidence:` the exact blocking gap.
- `Please run this:` one read-only SQL, GET/API, UI observation, HAR, or log query.
- `Share back:` exact fields/status/count/timestamp/screenshot needed.
- `Do not share/do:` credentials or an unsafe production write action.
