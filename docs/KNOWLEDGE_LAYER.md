# Living knowledge workflow

Start with a question you actually need to answer: “Why does this test expect
403?” Save a small explanation with evidence so the next investigation starts
with context. The [portable starter](../adoption/README.md) needs only an index,
a note and review through your existing Git workflow.

## What belongs in a note

Connect a behavior to its requirement or decision, applicable roles, UI/API
path, implementation and exact test/assertion. Include the last source check,
any runtime evidence, review state and open questions. Avoid copying full source
files, logs or requirements into multiple notes.

After a failure investigation, the agent can propose an update. Human review is
required when it defines or changes business meaning. Technical observations
can be recorded as observations without turning them into product rules.

For example, an investigation may connect Viewer read-only intent to a folder
write rejection and a missing delete regression. Future agents can distinguish
“the test expects 403” from “this assertion protects read-only access,” and can
name the coverage gap. A future reviewed requirement may settle the exact error
contract. That approval supplies new evidence; the agent must not invent it.

## Trust the right evidence

| Evidence                                  | Supports                                  | Does not establish                            |
| ----------------------------------------- | ----------------------------------------- | --------------------------------------------- |
| Requirement and attributable human review | Intended behavior within reviewed scope   | That the product implements it                |
| Source and current static relationships   | Implementation facts and candidate impact | Correct product behavior or executed coverage |
| Test source and assertions                | What a test intends to check              | That it ran or passed                         |
| Test run, request/response and data state | Observations in that run/environment      | Universal behavior or complete security       |
| Draft note                                | A proposal or hypothesis                  | Approved business meaning                     |

If these disagree, report `STALE` or `CONFLICTED` and preserve the evidence.
Treat code as authoritative for implementation, not as authority to redefine a
requirement. File existence and valid Markdown cannot verify a semantic claim.
Do not self-assign human review, and do not silently drop broken evidence links.

## Optional reference bundle

This repository retains a larger worked example:

```text
requirements/incoming/               raw inputs
knowledge/drafts/product/            product proposals
knowledge/01-product/requirements/   existing product notes
knowledge/02-manual/                 manual-test knowledge
knowledge/03-automated/              automated scenarios and coverage notes
knowledge/framework/                 architecture, decisions and maintenance guides
knowledge/generated/                 deterministic source facts and graphs
knowledge/archive/                   historical proposals, not active truth
```

The numbered folders, OKF metadata, generated graph, inventory and stage-specific
scripts serve this reference implementation. Adopters do not need them. The
extractor includes TypeScript/JavaScript and a Python backend adapter, with
repository-specific route, fixture and test assumptions.

Useful reference commands:

```bash
npm run knowledge:check
npm run knowledge:query -- FoldersService
npm run knowledge:impact -- REQ-RBAC-001
```

These are static discovery commands. A missing relationship does not prove that
nothing is affected. Run relevant tests separately for runtime evidence.

## Optional proposal and promotion commands

Preserve a new raw requirement under `requirements/incoming/`, then:

```bash
npm run knowledge:product:propose -- --file=requirements/incoming/REQ-EXAMPLE-001.md
npm run knowledge:product:validate
```

The agent completes the proposal and requests review of its business meaning.
After actual explicit approval, record the following in YAML frontmatter:

```yaml
review_status: reviewed
reviewed_by: "actual reviewer"
reviewed_at: "2026-09-10T10:00:00Z"
review_reference: "actual review or PR reference"
```

These are a record of approval, not a way to grant approval. Never copy example
values into a real review. The promotion gate requires a review record and
existing source evidence, but cannot authenticate a reviewer or verify consent.
Existing sample notes lack this attributable review history in some cases;
retain that limitation rather than backfilling invented provenance.

Only then run `npm run knowledge:product:promote`. Manual and automated knowledge
are separate, user-requested stages:

```bash
npm run knowledge:manual:propose -- --requirement=REQ-EXAMPLE-001
npm run knowledge:automated:propose -- --requirement=REQ-EXAMPLE-001
```

Review each stage before `knowledge:manual:promote` or `knowledge:promote`.
Automated drafts additionally need grounded evidence and reviewed
`feature_status: existing_match`. Pending or missing review records block
promotion. Product-draft validation alone does not imply approval.

Promotion scripts are local file workflows, not transactions or an access-control
system. Review the diff, retain a Git recovery point and check results. They do
not authenticate review records. Do not bulk-promote to make validators green.

After changing indexed source or knowledge tooling:

```bash
npm run knowledge:build
npm run knowledge:validate
npm run knowledge:relationships
npm run knowledge:check
```

Generated facts are rebuilt, never hand-edited. Relationship validation checks
active endpoints and evidence; synchronization preserves missing links so they
can be investigated. The optional `knowledge:eval` checks supplied answer text
and cited file presence, not agent intelligence or semantic correctness.
