---
name: qa-safe-healing
description: Diagnose Playwright and cross-layer application failures from repository evidence, then apply only policy-permitted repairs and targeted validation.
---

# QA Safe Healing

Use this skill for failed tests, application incidents involving UI/API behavior,
diagnosis-only reports, and evidence-backed repair requests. Read applicable
`AGENTS.md` instructions before editing and use the UI/API owning skill for
implementation details.

## Diagnose from evidence

1. Use the failure policy below. Preserve original test output, traces/screenshots, network/API evidence, logs, source, and requirements. Keep generated summaries separate from original evidence.
2. State the failing action, role, expected behavior, actual behavior, and test intent. Inspect exact named files first; use `rg` and direct source reads as needed. No source index is required.
3. Follow the relevant path: UI action/state -> frontend request/session -> backend route/authorization -> persistence/configuration -> test assertion. Identify the responsible layer and compare with the closest working repository pattern.
4. Separate facts, inferences, and pending runtime checks. Source inspection is not proof that a request ran. Name conflicting requirements or missing evidence; use `UNKNOWN` when evidence cannot support classification.
5. Report classification, confidence, evidence locations, cause or supported hypothesis, modification decision, and remaining gaps. In diagnosis-only mode, change nothing. Do not claim final root cause while material evidence is missing.

Do not expose credentials, cookies, tokens, or private payloads. Use local dev/test
for mutating reproduction. For production, use authorized read-only observation;
data changes require explicit authorization and verification/rollback guidance.

## Repair only when supported

`APPLICATION_DEFECT`, `API_CONTRACT`, `ENVIRONMENT`, and `UNKNOWN` preserve the
failing test. `LOCATOR_DRIFT` permits only a high-confidence locator-only repair.
`TIMING`, `TEST_DATA`, and `ASSERTION_ERROR` require human review under the policy below.

When the user authorizes an application fix, repair the proven application layer
and preserve the regression expectation. A product defect is not permission to
heal its failing test.

- Make the smallest supported change. Never weaken assertions, skip/fixme/delete tests, swallow errors, or force interactions to obtain green output.
- For an application fix, add or retain a focused regression that demonstrates the defective contract and repaired behavior, including the relevant role or error path. Preserve stable selectors and registered cleanup.
- Run `npm run qa:guardrails`, relevant quality checks, and the affected test. Report commands, actual results, environment limitations, changed files, and remaining risks.
- Keep original evidence and a short Markdown diagnosis under ignored `qa-results/<run>/`. Include classification, confidence, evidence links, cause or hypothesis, gaps, and repair decision. Record required human approval and its reason; a saved report does not grant approval.

## Failure policy

Minimum confidence is required for the stated classification. Insufficient evidence remains `UNKNOWN`.

### LOCATOR_DRIFT

The product behavior remains supported, but a test locator no longer identifies the intended element.

- Evidence: failed-test, current-ui-or-dom, test-intent, product-behavior.
- Minimum confidence: HIGH. Test modification: PERMITTED_WITH_HIGH_CONFIDENCE.
- Validation: Run the failing test and the closest affected scenario after the smallest locator-only repair.
- Escalation: Escalate if the replacement changes the interaction target or product behavior.

### TIMING

A deterministic readiness condition is missing or an asynchronous dependency is genuinely unstable.

- Evidence: failed-test, trace-or-log, readiness-condition, rerun.
- Minimum confidence: HIGH. Test modification: REVIEW_REQUIRED.
- Validation: Reproduce at least twice; replace only with a web-first or domain readiness condition.
- Escalation: Escalate persistent nondeterminism or product latency regressions.

### TEST_DATA

The test's required data, ownership, uniqueness, or cleanup state is invalid.

- Evidence: failed-test, data-state, fixture-or-setup, rerun.
- Minimum confidence: HIGH. Test modification: REVIEW_REQUIRED.
- Validation: Re-run with isolated data and confirm cleanup.
- Escalation: Escalate when the application cannot create or isolate required data.

### ENVIRONMENT

A dependency, service, browser, configuration, or infrastructure condition prevents valid execution.

- Evidence: failed-test, environment-log-or-health-check, configuration.
- Minimum confidence: MEDIUM. Test modification: NOT_PERMITTED.
- Validation: Re-run only after the environment is restored.
- Escalation: Report the owning environment and preserve the failure evidence.

### APPLICATION_DEFECT

The test expectation is supported and the product violates the expected behavior.

- Evidence: failed-test, requirement-or-approved-behavior, runtime-or-api-evidence.
- Minimum confidence: HIGH. Test modification: NOT_PERMITTED.
- Validation: Preserve the failing regression and rerun after an application fix.
- Escalation: Create or link an application defect; do not heal the test.

### API_CONTRACT

The observed API status, payload, schema, or authorization contract conflicts with its supported expectation.

- Evidence: failed-test, api-request-response, contract-or-requirement.
- Minimum confidence: HIGH. Test modification: NOT_PERMITTED.
- Validation: Preserve the failure and rerun after contract resolution.
- Escalation: Require API owner or product review.

### ASSERTION_ERROR

The test assertion does not express supported product behavior.

- Evidence: failed-test, assertion-source, requirement-or-approved-behavior.
- Minimum confidence: HIGH. Test modification: REVIEW_REQUIRED.
- Validation: Human review the changed expectation, then rerun the targeted test.
- Escalation: Never change an assertion merely to make a failure pass.

### UNKNOWN

Available evidence cannot distinguish a test problem, product problem, or environmental problem.

- Evidence: failed-test, evidence-gap.
- Minimum confidence: LOW. Test modification: NOT_PERMITTED.
- Validation: Collect the named missing evidence before any modification.
- Escalation: Stop and report the uncertainty.
