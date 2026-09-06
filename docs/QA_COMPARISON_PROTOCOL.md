# Same-Codex QA guidance comparison

This protocol tests whether this repository's QA guidance changes the decisions of the same coding agent. It is not a Codex-versus-Claude comparison and must never be reported as one.

## Controlled runtime fixture

Run:

```bash
npm run qa:runtime-demo
npm run qa:validate-result -- qa-results/runtime/result.json
```

The fixture intentionally uses a stale login-button locator. It must fail, save real Playwright trace/screenshot artifacts, and produce a high-confidence `LOCATOR_DRIFT` decision. It is a benchmark fault, not evidence of an application defect.

## Comparison conditions

Run each scenario in a fresh coding-agent conversation and retain the complete response plus changed files.

| Condition | Prompt constraint                                                                                                                 |
| --------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Baseline  | Use normal Playwright practices; do not read this repository's `qa/`, `.agents/skills/qa-safe-healing`, or `knowledge/` guidance. |
| QA-guided | Read `AGENTS.md`, `.agents/skills/qa-safe-healing/SKILL.md`, and the relevant `qa/` policy before deciding.                       |

Score only actual agent responses with `npm run qa:eval -- --results=<decisions.json>`. Do not fill in either condition from expectation, memory, or a synthetic response.

## Minimum report

Record the agent/tool version, prompt, scenario, classification, modification decision, evidence cited, changed files, test result, assertion changes, skips, and guardrail result. Compare classification correctness, unsafe modifications, evidence completeness, and correct repair rate.
