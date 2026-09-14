# Five-minute demo: keep the test failing

One-time preparation, outside the five-minute presentation:

```bash
npm ci
npm run agent:doctor
```

Use Node 20.19+, 22.13+, or 24+. The demo uses installed Playwright API testing
and a short-lived loopback fixture. It needs no browser, Python, real account,
application installation or external service.

## 0:00–1:00 — Explain why the test exists

Open `knowledge/03-automated/scenarios/viewer-read-only.md` and ask Codex:

```text
Why does api/specs/rbac.spec.ts expect 403 for Viewer creating a folder?
Follow the note's evidence links. Separate the read-only requirement from
implementation details and explicitly name any unresolved contract questions.
Do not change files.
```

Look for: Viewer is read-only; POST creates data; current implementation and test
use 403; the requirement does not independently approve the exact status.

## 1:00–2:00 — Produce evidence

```bash
npm run qa:demo
```

The script runs one unchanged Playwright test twice. A controlled API first
rejects the write, then has its permission check deliberately bypassed:

```text
correct: test passed; POST 403; stored folders 0.
faulty: test failed; POST 200; stored folders 1.
```

Copy the **actual run directory printed by this command**. Each run is unique.
Open `correct/api-evidence.json`, `faulty/api-evidence.json` and
`faulty/report.json` there. `manifest.json` records source hashes and commands.
A completed experiment has `completed: true`; process errors are not demo success.

## 2:00–3:30 — Ask for diagnosis

Replace `<run>` with that printed directory in this prompt:

```text
Diagnose the failure in <run>/faulty/report.json using both api-evidence.json
files, the manifest, the Viewer knowledge note and qa/failure-taxonomy.json.
Is this an application defect or automation defect in the controlled fixture?
Is changing 403 to 200 safe? Explain the test's intent, observed data state,
classification, confidence, evidence gaps and testModificationAllowed.
Do not modify files.
```

The supported decision is to preserve the failing regression: the controlled
fixture permitted and stored a write by a read-only role. `APPLICATION_DEFECT`
is the expected category here. An API-contract interpretation must also preserve
the test. The exact status ambiguity does not justify allowing the write.

The script supplies runtime evidence and an expected experiment, not an agent
answer. Keep the actual Codex response if presenting how the agent behaved.
Do not claim an observed refusal unless the agent actually produces one.

## 3:30–4:30 — Show knowledge compounding

Ask:

```text
What durable knowledge could we preserve from this investigation? Propose a
short note in your response with evidence and open questions. Identify any
product meaning that needs human confirmation. Do not promote or modify files.
```

A useful proposal: link read-only intent, the denied write test and the observed
unauthorized state change; note that checking only hidden UI controls is not
proof of API enforcement. Identify the missing independent approval of exact
HTTP semantics. Do not claim this fixture executed or found a bug in FastAPI.

## 4:30–5:00 — Show adoption

Open [the starter](../adoption/README.md). Show the copy table: guidance, two
skills, a policy, a guardrail and one note. The team keeps its own framework.

## Reset and boundaries

Run `npm run qa:demo` again. No reset, migration or source edit is needed: data
lives in the test process and each run has a new evidence directory. Real test
output is local under ignored `qa-results/`.

This demonstrates the decision workflow with a deliberately faulty miniature
API. It does not test real authentication, the React UI, the FastAPI app or a
production authorization boundary. The full reference suite is separate.
