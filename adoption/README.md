# Adopt the layer in your existing Playwright repository

Start with one feature and one test. Keep your current Playwright version,
fixtures, page objects, config, secrets handling and CI.

## Copy only these pieces

Run commands from your own repository root after copying. Merge with existing
files; do not replace your team's instructions or policy without review.

| Source in this repository                                | Destination in your repository         | Purpose                                     |
| -------------------------------------------------------- | -------------------------------------- | ------------------------------------------- |
| `adoption/AGENTS.md`                                     | Merge into `AGENTS.md`                 | Natural-language routing and evidence rules |
| `adoption/skills/qa-product-knowledge/`                  | `.agents/skills/qa-product-knowledge/` | Retrieve and grow small linked notes        |
| `.agents/skills/qa-safe-healing/`                        | `.agents/skills/qa-safe-healing/`      | Diagnose before repairing                   |
| `qa/failure-taxonomy.json` and `qa/evidence-schema.json` | `qa/`                                  | Failure categories and result contract      |
| `scripts/qaGuardrails.mjs`                               | `scripts/qaGuardrails.mjs`             | Dependency-free static checks               |
| `adoption/knowledge/index.md` and `note-template.md`     | `knowledge/`                           | One entry point and an optional note shape  |

That is two skills and one script. The root `AGENTS.md` in the reference repo
contains framework-specific conventions; use the smaller adoption fragment here.
The starter does not depend on the sample app, generated graph, Python, OKF,
numbered folders or promotion commands.

If your coding agent does not discover `.agents/skills/`, reference the copied
skill files explicitly in its existing repository instruction mechanism.
No new agent installation is needed to use the Markdown directly.

## Wire the guardrail to your layout

In your existing `package.json`, add or merge:

```json
{
  "scripts": {
    "qa:guardrails": "node scripts/qaGuardrails.mjs --portable tests"
  }
}
```

Replace `tests` with your test folder(s), for example `e2e api-tests`. No npm
package is needed for this script. It recognizes `.spec` and `.test` files in
JS/TS, including module and JSX variants. An empty or missing target fails.

`--portable` keeps QA checks while leaving locator placement to your framework.
Without it, this reference repository also requires selectors in page objects.
The scanner is line-based: review false positives and multiline/aliased patterns;
it cannot detect arbitrary assertion weakening, deleted tests or semantic bugs.
Keep your current lint, test review and targeted Playwright runs.

## Get the first useful answer

1. Pick one existing test that often needs explanation.
2. Add `knowledge/drafts/<behavior>.md` from the note template. Link to the real
   requirement/ticket, exact test title, source symbols and any sanitized runtime
   evidence. Record uncertainty; do not borrow the sample app's permissions.
3. Ask your agent: “Why does this test exist, and what requirement supports it?”
4. Review the proposed meaning. Only after explicit human confirmation move the
   approved note into `knowledge/notes/` and link it from `knowledge/index.md`.
   Record reviewer, date and review reference in the note or reviewed PR.
5. Ask the same question in a fresh conversation. The answer should cite the
   saved explanation, recheck its evidence and report gaps rather than guessing.

Raw new requirements can stay in `requirements/incoming/`. A Git-reviewed note
is enough; there is no requirement to populate a schema or document all features.

## Grow through normal work

After a useful incident, requirement change or test review, propose only the
small fact that will help the next investigation. Product meaning needs human
confirmation. Implementation-only observations may be recorded as observations,
with evidence and date, without inventing product approval.

For “I changed this service; what might be affected?”, start with note links and
ordinary import/source searches. If these become slow at your scale, study the
reference `knowledge:impact` tooling. Its extractor, inventory and promotion
scripts assume this repository's layout and require adaptation; copying them
is not the initial adoption path.

Optional structured diagnosis: also copy `scripts/qaResult.mjs` and
`scripts/qaReview.mjs`. Run `node scripts/qaResult.mjs <result.json>` with the
copied policy/schema. Review records reference a result JSON path. Validators
check structure and policy, not whether evidence is true or a person consented.

## Team check before merging

Run the guardrail on a real test folder, your normal checks, and the affected
Playwright test. Verify that the agent can explain one test and can say
“insufficient evidence” or “preserve this product failure” without editing it.
Add `/qa-results/` and your own auth/artifact directories to `.gitignore`.
Share sanitized evidence links; never copy auth states, tokens or customer data
into durable knowledge. See [sharing hygiene](../docs/SHARING.md).
