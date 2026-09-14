# QA operating layer

This directory is the single source of truth for agentic-QA failure decisions. It does not call a model or heal a test.

1. Collect real Playwright, API, log, source, and requirement evidence.
2. Read test intent and supported product behavior.
3. Classify in `failure-taxonomy.json` and record a result that conforms to `evidence-schema.json`.
4. Follow the modification decision. `NOT_PERMITTED` and `UNKNOWN` mean preserve the failure.
5. When a repair is permitted or reviewed, run `npm run qa:guardrails`, rerun the affected test, and retain evidence outside version control in `qa-results/<run>/`.

Suggested result layout:

```text
qa-results/<run>/
  result.json
  evidence-manifest.json
  summary.md
  changes.md
```

`qa-results/` is intentionally ignored: it may contain traces, screenshots, logs, and environment-specific evidence.

For adoption, copy the pieces listed in [the starter](../adoption/README.md).
The result validator requires non-empty typed fields, the evidence categories
listed in the failure policy, existing local artifact files when provided, and
a policy-consistent modification decision. Evidence labels are an index to
reasoning, not proof that the underlying evidence supports the diagnosis.

Only a HIGH-confidence failed LOCATOR_DRIFT result may set
`testModificationAllowed: true` directly. For review-required categories, keep
it false until a separate actual human review is recorded. A review JSON uses:

```json
{
  "result": "qa-results/run-001/result.json",
  "decision": "REVIEW_REQUIRED",
  "reviewedBy": "actual reviewer",
  "reviewedAt": "2026-09-10T10:00:00Z",
  "reason": "Explain the evidence and the specific proposed change."
}
```

Replace example values with a real review. `result` is a repository-relative
JSON path. Review cannot override NOT_PERMITTED categories; approval records
are not authenticated by the script. The agent must verify actual user consent
and the specific change under review before proceeding.
