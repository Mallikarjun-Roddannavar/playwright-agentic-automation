---
type: Knowledge Evaluation Guide
id: knowledge-evaluation-guide
title: Knowledge answer evaluations
status: stable
---

# Knowledge answer evaluations

These cases evaluate a user-supplied Codex answer against existing repository
knowledge and source evidence. They are deterministic checks, not LLM-as-judge
calls and not Playwright runtime tests.

To evaluate an answer:

1. Copy the question and Codex response into a JSON case.
2. Keep the expected facts in `requiredPhrases`.
3. Keep unsupported or dangerous claims in `forbiddenPhrases`.
4. List authoritative files in `evidencePaths`.
5. Run:

```powershell
npm run knowledge:eval
```

To run another case file:

```powershell
node ./scripts/knowledge/evaluateAnswers.mjs --file knowledge/evaluations/my-case.json
```

The evaluator checks answer content and evidence-file availability. It does not
judge prose quality, execute the application, or claim that a Playwright test
passed. Those concerns remain separate checks.
