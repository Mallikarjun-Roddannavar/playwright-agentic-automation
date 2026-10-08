# QA workflow

Preserve evidence, understand the expected behavior, classify the failure, then
repair only when supported by [the failure policy](../.agents/skills/qa-safe-healing/SKILL.md).
Use [qa-safe-healing](../.agents/skills/qa-safe-healing/SKILL.md) for the workflow.

## Diagnose without changing files

```text
Analyze the latest Playwright failures. Do not modify files.
For each failure report classification, confidence, evidence, supported cause or
hypothesis, missing evidence, and whether test modification is permitted.
Use the failure policy in .agents/skills/qa-safe-healing/SKILL.md; UNKNOWN is valid.
```

Trace the relevant UI action, frontend request/session, backend authorization,
data/configuration, and assertion. An application defect or contract failure
preserves the test. An environment problem requires restoring the environment.

## Guarded repair

```text
Fix only HIGH-confidence LOCATOR_DRIFT failures. Preserve assertions.
Do not skip, fixme, delete tests, swallow failures, force actions, or change
product expectations. Run npm run qa:guardrails and rerun each repaired test.
```

Timing, data, and assertion changes require human review specified by the skill.
When an application fix is authorized, repair the application and retain the
regression expectation. Run the smallest relevant quality and runtime checks.

## Keep evidence and a short diagnosis

Save original reports, traces, screenshots, and network/log evidence under
ignored `qa-results/<run>/`. Add a short Markdown summary with the failure,
classification, confidence, evidence links, cause or hypothesis, missing evidence,
and repair decision. Record any required human approval and its reason.

Never invent evidence or report a test as run from source inspection alone.
No JSON diagnosis format or record validation command is required.

```powershell
npm run qa:guardrails
```

For change impact, read the [feature note](../knowledge/README.md), follow its
source links, and choose tests from their actual assertions.
