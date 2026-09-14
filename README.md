# Living QA + Product Knowledge for coding agents

> **Keep your existing Playwright framework. Add a lightweight QA + Product Knowledge layer that gets smarter as your team works.**

A failing test is evidence, not automatically a broken test. This project helps
coding agents connect product intent to tests, investigate what happened, and
preserve a failing regression when the product is wrong.

The Playwright/POM framework and sample app here are a **reference implementation**.
Your team can adopt the useful pieces without changing fixtures, page objects,
configuration, CI or test layout.

```text
Existing Playwright repository
  + AGENTS.md guidance
  + two focused skills
  + small deterministic guardrails
  + a few linked knowledge notes
```

## Why keep knowledge?

A test can tell an agent `expect(response.status()).toBe(403)`. A small note can
explain **why**: Viewer is read-only, this request creates a folder, and these
requirement, implementation and test files support that interpretation.

```text
Product behavior / requirement <-> Role / permission <-> UI / API
                                       |
                              Implementation <-> Tests
                                       |
                              Failure / regression knowledge
```

Inspired by the LLM-Wiki idea, the durable memory is ordinary Git-friendly
Markdown and JSON. After useful engineering work, an agent proposes a small
update with evidence. People confirm changes to product meaning. Future agents
reuse the explanation, check whether its evidence is still current, and add the
next useful connection. Start with one behavior; documenting the whole product
is unnecessary.

## Try it in five minutes

With a compatible Node installation (20.19+, 22.13+, or 24+), from the repo root:

```bash
npm ci
npm run agent:doctor
npm run qa:demo
```

The demo needs only root dependencies. It runs real Playwright API requests
against an isolated, in-memory fixture on loopback; no browser download, Python,
sample app, model key or external API is needed. Dependency download time is
separate from the five-minute walkthrough.

You should see:

```text
correct: test passed; POST 403; stored folders 0.
faulty: test failed; POST 200; stored folders 1.
```

The same test catches the injected unauthorized write. The command succeeds only
when both observations match the experiment; the failed regression remains in
the report. No test is skipped or rewritten. This is a controlled demonstration,
not a finding against the sample app or a measured agent benchmark.

Then ask Codex:

```text
Read knowledge/03-automated/scenarios/viewer-read-only.md and the evidence
folder printed by npm run qa:demo. Why does the test expect 403? Is this a
product bug or automation bug in the controlled fixture? Should you change the
test? Cite the requirement, actual API response and resulting data state.
Do not modify files. Separate product intent, current implementation and runtime evidence.
```

[Exact five-minute walkthrough](docs/FIVE_MINUTE_DEMO.md) ·
[Setup and optional reference app](docs/GETTING_STARTED.md)

## Adopt it in your existing framework

[Copy the small starter](adoption/README.md). Merge its guidance into your own
`AGENTS.md`, copy two skills and the QA policy, then add one note linking a
requirement to a test. Run the portable guardrail against your existing test
directory. No package migration or dependency additions are needed for that
starter.

The larger generated graph, reference app, POM conventions, stage-specific
knowledge directories and promotion scripts are optional examples. They are
not part of the starter.

## Ask naturally

- What tests cover this requirement?
- Why does this test expect 403?
- What do we know about Viewer permissions?
- I changed FoldersService. What might be affected?
- Why did this Playwright test fail? Is it safe to repair?
- What useful knowledge did we learn from this investigation?

Users ask about their work; the repository instructions route the agent.
Knowledge supplies context. Runtime evidence establishes what actually happened.

## Trust and QA safety

The [failure policy](qa/failure-taxonomy.json) distinguishes locator drift,
timing and test-data faults, incorrect assertions, environment failures,
application defects, API contract failures and unknown causes.

Only high-confidence locator drift permits a narrow automatic test repair.
Timing, test-data and assertion changes require review. Product defects, contract
failures, environment failures and unknown causes preserve the failure. Never
weaken assertions, skip tests, swallow errors, force actions or add arbitrary
waits merely to get green output.

Notes retain source links, review state and gaps. A static validator can check
files, hashes and policy consistency; it cannot certify human consent, business
meaning or complete coverage. Existing sample RBAC knowledge explicitly leaves
the exact HTTP rejection status open. The demo explains this limitation instead
of inventing an approved contract.

## Repository layout

```text
adoption/       copyable starter for an existing framework
.agents/        repository-local skills
knowledge/      product/test notes, review history and generated evidence
  framework/    architecture, decisions and maintenance guides
  generated/    flat source notes plus static graphs
qa/             failure policy, evidence schema and evaluations/demo
scripts/        deterministic checks and knowledge workflows
docs/           setup, demo, QA workflow and sharing guidance
requirements/   raw requirement inputs
ui/ + api/      reference Playwright tests, page objects and services
utils/ + config/ reference fixtures, helpers and configuration
app/            optional sample application
```

Use the generated code index for navigation; generated source notes now share
one folder instead of mirroring the whole source directory tree. Product,
manual-test, automated-test, draft and archive boundaries remain separate to
preserve review state and provenance. Existing package commands remain valid.

## More detail, when useful

- [Living knowledge workflow](docs/KNOWLEDGE_LAYER.md) and [reference knowledge](knowledge/index.md)
- [QA workflow](docs/QA_WORKFLOW.md) and [QA policy/results](qa/README.md)
- [Audit findings](docs/ADOPTION_AUDIT.md) and [validation results](docs/VALIDATION.md)
- [Sharing hygiene](docs/SHARING.md), [contributing](CONTRIBUTING.md), [roadmap](ROADMAP.md)

No knowledge database, embeddings, hosted service, mandatory MCP or external LLM
API is involved. The coding agent you already use supplies the reasoning.
