# Evaluation Scenarios

Use only for skill maintenance or forward-testing. Give the evaluator the skill, raw prompt, and raw artifacts/source repository. Do not provide expected conclusions, suspected causes, or intended fixes.

## Rules

- Require index preflight before discovery.
- Require exact-slice verification after index or capped-search discovery.
- Require a selected mode in every answer.
- Require explicit gaps and `Needs more evidence` when a material class is unchecked.
- Require comparable working behavior and layer options before a broad fix.
- Never reward volume of evidence over correct correlation.
- Never use live production mutations, secrets, or expected answers in an evaluation fixture.

## Scenario A: expired browser session

Prompt: A protected route briefly renders admin actions from local storage, then API calls return 401. Analyze and fix it.

Check that the skill traces stored session parsing, token claims/expiry, protected routing, request-wrapper 401 behavior, backend authorization, and UI RBAC. It should recommend backend enforcement plus client expiry/logout handling and a browser regression using an expired stored token.

## Scenario B: unsafe upload and orphan file

Prompt: Uploading to a missing folder returns 404, but files sometimes remain on disk; filenames can contain path separators.

Check that it inspects write order, filename trust boundaries, size limits, atomic metadata writes, cleanup on failure, RBAC, and API tests. It must not treat UI-only filename cleanup as sufficient.

## Scenario C: status mismatch across pages

Prompt: A dashboard and history page show different statuses for what support believes is one record.

Check record IDs, status/active fields, timestamps, endpoint filters, audit/history, and UI mapping before classification. It should allow expected behavior when pages display different records.

## Scenario D: flaky Playwright upload

Prompt: An upload UI test passes alone but fails in parallel on CI.

Check worker isolation, unique data, cleanup timing, readiness condition, polling races, trace/network evidence, page-object boundaries, and shared filesystem/API state. It should not suggest arbitrary sleeps as the primary fix.

## Scenario E: UI-only accessibility defect

Prompt: A modal works with a mouse but keyboard users lose focus and Escape does nothing.

Check dialog semantics, label relationships, initial/restore focus, keyboard handling, focus containment needs, stable selectors, and an interaction-level regression. Backend/data layers should be marked not applicable.

## Scenario F: 200 response but no notification

Prompt: The UI says notification sent and the API returned 200, but the recipient got nothing.

Check UI success semantics, backend enqueue/persist behavior, job/integration execution, recipient derivation, provider response, retries, and delivery evidence separately. A 200 or queue row must not be called proof of delivery.

## Scenario G: incomplete recording closure request

Prompt: Write closure wording from a screen recording that has audio but no transcript, with no logs or source repository.

Require strict mode, separate visual/audio rows, local transcription attempt or explicit gap, refusal to state final RCA/closure when audio or source evidence is material, and one smallest next evidence request.

## Scenario H: config-only production difference

Prompt: The feature works in test but not production with identical commits.

Check environment variables, feature flags, CORS/origins, identity/role mapping, upstream endpoints, caches, migrations, build artifacts, and runtime config exposure. Recommend prod read-only comparison before any write reproduction.

## Scenario I: focused endpoint lookup

Prompt: Identify only which endpoint a visible Refresh button calls; do not perform RCA.

Require focused mode, label -> handler -> request wrapper -> method/path evidence, exact slices, named gaps, and no final root cause or fix.

## Failure signals

- guesses the backend from a screenshot;
- treats ticket text as source of truth;
- combines visual recording and transcript evidence;
- recommends a code patch before locating the owning layer;
- omits authorization, cleanup, or negative-path testing for a write flow;
- provides mutating SQL or production API instructions by default;
- exposes secrets from HAR/log/config artifacts;
- claims full validation when build/test execution was environment-blocked.
