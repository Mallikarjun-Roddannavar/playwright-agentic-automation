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
