---
name: qa-safe-healing
description: Diagnose Playwright failures using repository evidence and apply only policy-permitted, guarded repairs.
---

# QA Safe Healing

Use this skill for a failed Playwright test, a request to heal a test, or a diagnosis-only QA report. It complements `full-stack-incident-analyst`; use that skill when source-to-runtime tracing needs a full cross-layer RCA.

1. Read `qa/failure-taxonomy.json` and `qa/evidence-schema.json`.
2. Preserve test output, trace/screenshot when available, API/network evidence, source, and relevant product knowledge.
3. Explain test intent and supported behavior separately; emit classification, confidence, evidence, root-cause hypothesis, and `testModificationAllowed`.
4. In diagnosis-only mode, change nothing. Missing evidence means `UNKNOWN`, not a guess.
5. Modify only if policy permits it. Never weaken assertions, skip/fixme/delete tests, swallow errors, or force actions.
6. Make the smallest repair, run `npm run qa:guardrails`, rerun the affected test, and report the exact change and evidence location.

`APPLICATION_DEFECT`, `API_CONTRACT`, `ENVIRONMENT`, and `UNKNOWN` preserve the failure. `LOCATOR_DRIFT` permits only a high-confidence locator-only repair. `TIMING`, `TEST_DATA`, and `ASSERTION_ERROR` require review.
