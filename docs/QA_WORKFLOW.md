# Agentic QA workflow

The agent supplies reasoning. Playwright supplies browser/test capabilities. This repository supplies local QA discipline.

```text
Requirement and repository knowledge
  -> understand test intent and risk
  -> execute Playwright
  -> preserve test evidence
  -> classify with qa/failure-taxonomy.json
  -> decide whether modification is allowed
  -> repair OR preserve failure
  -> guardrails and targeted rerun
  -> auditable report
```

## Diagnosis-only prompt

```text
Analyze the latest Playwright failures. Do not modify files.
For each failure provide classification, confidence, evidence, root-cause hypothesis,
and whether test modification is permitted. Use qa/failure-taxonomy.json.
```

## Guarded-repair prompt

```text
Fix only HIGH-confidence LOCATOR_DRIFT failures. Preserve assertions; do not skip,
fixme, delete, swallow errors, force actions, or change product expectations.
Run npm run qa:guardrails and rerun every repaired test.
```

`npm run qa:guardrails` scans spec files (or supplied paths) for guarded anti-patterns. It is a transparent static check, not proof that behavior is correct. `npm run qa:eval` validates benchmark fixtures by default; provide `--results=<file>` to score actual agent decisions.

## Review and impact

For any assertion, contract, or uncertain decision, record a human `APPROVED`, `REJECTED`, or `REVIEW_REQUIRED` decision with who reviewed it, when, and why. The repository validates the record but never grants approval itself.

```bash
npm run qa:coverage
npm run qa:impact -- api/services/FoldersService.ts
npm run qa:validate-result -- qa-results/run-001/result.json
npm run qa:review -- qa-results/run-001/review.json
```
