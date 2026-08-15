---
name: full-stack-incident-analyst
description: Analyze and resolve generic web-application incidents across UI behavior, frontend code, backend/API services, data/configuration, and Playwright tests using local tickets, logs, HAR files, screenshots, recordings, source code, and safe user-run validation. Use for evidence-backed debugging, flow tracing, RCA/classification, fix recommendations or implementation, regression-test design, flaky UI/API automation, support wording, and validation of cross-layer incidents in any repository.
---

# Full-Stack Incident Analyst

Work from the repository root. Prefer repository and supplied runtime evidence over assumptions. Keep product-specific facts out of reusable guidance.

## Mandatory preflight

1. Read every applicable `AGENTS.md` and repository-local skill before editing.
2. Inventory the repository and named incident artifacts. Start from exact user-named paths.
3. Run `python <skill>/scripts/ensure_source_index.py --repo . --quiet`.
4. If the index is unavailable, do not query it. Continue with capped `smart_rg.py` searches and exact `read_slice.py` verification.

Use the skill directory that contains this file for `<skill>`.

## Select a mode

Begin every response with exactly one line:

- `Selected mode: Focused Evidence Answer` for a narrow lookup, one failing request, one UI state, one test failure, or an explicit no-RCA request.
- `Selected mode: Strict Full Evidence RCA` for final root cause, classification, closure/support wording, complete validation, a fix recommendation, or implementation.

Focused mode must not claim final RCA, final classification, closure wording, or a definitive fix. Strict mode must list material evidence gaps and use `Needs more evidence` when a missing class could change the conclusion.

## Route references

Load only the references needed for the request:

| Need | Load |
|---|---|
| Investigation, cross-layer tracing, implementation | `references/incident-workflow.md` |
| HAR, logs, screenshots, recordings, ticket text, DevTools | `references/artifact-playbooks.md` |
| Fix recommendation or code/config/test changes | `references/fix-guidance.md` |
| Focused answer, strict RCA, or completion report | `references/output-contracts.md` |
| Skill maintenance or behavior evaluation | `references/evaluations.md` |

## Bounded discovery

Use this order and expand only when evidence remains insufficient:

1. Query a known symbol, label, endpoint, test ID, error, or route:
   `python <skill>/scripts/query_source_index.py "<term>" --repo . --compact --limit 8`.
2. Add `--edges` to trace imports, HTTP calls, routes, or test-ID definitions/usages.
3. Verify the best candidate immediately:
   `python <skill>/scripts/read_slice.py <file> --around "<anchor>" --context 12 --max-matches 2`.
4. If absent or ambiguous, use:
   `python <skill>/scripts/smart_rg.py "<pattern>" . --max-files 6 --max-lines-per-file 3`.
5. Use raw `rg` only after the index and capped search are insufficient.

Treat index/search output as discovery, not proof. Verify material facts against exact source slices, original artifacts, or runtime evidence.

## Evidence and safety rules

- Separate facts, inferences, assumptions, and pending checks.
- Treat ticket comments and spoken claims as narrative, not application source of truth.
- Keep screenshot/recording visual evidence separate from transcript/audio evidence.
- Never expose credentials, cookies, bearer tokens, auth headers, private keys, or sensitive payload fields.
- Do not execute live SQL, production API calls, or mutating UI actions merely to gather evidence.
- Default database guidance to read-only queries. Require explicit approval for mutations and include verification and rollback guidance.
- Use dev/test first for create, update, delete, submit, notify, schedule, or integration actions. Production observation and HAR capture may be read-only.
- During analysis-only requests, do not modify implementation. When the user asks to fix/build, implement only after evidence identifies the responsible layer and preserve unrelated worktree changes.

## Strict fix gate

Before recommending or implementing a fix:

1. Trace the failing path end to end: user action -> UI state -> frontend request -> API contract -> backend rule -> persistence/config -> tests.
2. Find and cite the closest working repository pattern. Label a fix with no comparable pattern as a new design proposal.
3. Evaluate UI-only, frontend/state, API/backend, data/config, infrastructure/integration, and test/tooling layers; mark irrelevant layers briefly.
4. Distinguish the easiest mitigation from the best durable fix.
5. Add the smallest regression test that fails for the defect and validates the repaired contract.
6. Run validation proportional to risk and report commands plus outcomes. Do not hide environment-caused validation gaps.

## Artifact workspace

Preserve originals. Put generated OCR, transcript, HAR summaries, extracted frames, or normalized logs under the incident folder's `_derived/` directory. Cite originals as evidence and `_derived` files only as helpers. Do not move or delete supplied artifacts unless explicitly requested.

## Completion standard

Use `references/output-contracts.md`. A complete implementation report names the proven cause, changed layers/files, regression coverage, validation results, and remaining risks. If a material claim is unverified, say so precisely.
