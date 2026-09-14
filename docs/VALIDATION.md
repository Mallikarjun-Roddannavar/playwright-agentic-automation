# Validation results

Validated on 2026-09-10 in Windows PowerShell. This workspace is a copy without
`.git`. No commits, publication or external messages were performed.

## Passing checks

| Check                         | Command used                                                                             | Result                                                                    |
| ----------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Naming conventions            | `node scripts/checkNamingConventions.mjs`                                                | Passed                                                                    |
| Generated knowledge freshness | `node scripts/buildKnowledge.mjs --check`                                                | Current after rebuild                                                     |
| Knowledge structure and links | `node scripts/validateKnowledge.mjs`                                                     | Passed                                                                    |
| Semantic relationships        | `node scripts/knowledge/validateRelationships.mjs`                                       | 21 relationships passed                                                   |
| Product draft validation      | `node scripts/knowledge/validateProductDrafts.mjs`                                       | Passed; zero drafts, not an approval                                      |
| Knowledge answer fixtures     | `node scripts/knowledge/evaluateAnswers.mjs`                                             | 2 passed; static text/evidence checks only                                |
| ESLint                        | `node_modules/.bin/eslint.cmd .`                                                         | Passed                                                                    |
| TypeScript                    | `node_modules/.bin/tsc.cmd --noEmit`                                                     | Passed                                                                    |
| Formatting                    | `node_modules/.bin/prettier.cmd . --check`                                               | Passed after source formatting and generated/cache exclusions             |
| QA guardrails                 | `node scripts/qaGuardrails.mjs`                                                          | 7 reference spec files passed                                             |
| QA benchmark fixtures         | `node scripts/qaEval.mjs`                                                                | 4 fixtures valid; no measured agent scores                                |
| Safety regression tests       | `node --test scripts/tests/qa-safety.test.mjs`                                           | 6 passed                                                                  |
| Playwright inventory          | `node_modules/.bin/playwright.cmd test --list`                                           | 11 tests across 8 files, including auth setup; listing is not execution   |
| Reference impact query        | `node scripts/qaImpact.mjs api/services/FoldersService.ts`                               | Resolved related reference specs; static candidates only                  |
| Reference frontend            | From `app/frontend`: local `tsc.cmd -b`, then `node node_modules/vite/bin/vite.js build` | Typecheck and Vite build passed                                           |
| Skills                        | `python -X utf8 <skill-creator>/scripts/quick_validate.py <skill-folder>`                | Portable knowledge skill, reference knowledge skill and entry skill valid |

The safety regressions exercise malformed results, missing evidence, forbidden
repair permission, review records, portable layouts, empty guardrail scans,
pending promotion in all three entry points, missing review provenance,
archive-only endpoints and preservation of broken links. They use isolated
local fixture directories and do not promote real product knowledge.

## Runtime demonstration

`node scripts/qaDemo.mjs` completed twice, before and after formatting and index
changes. The latest validated local run is `qa-results/demo/run-fgmbud/`:

- Correct fixture: Playwright test passed, POST returned 403, zero stored folders.
- Faulty fixture: the same test failed, POST returned 200, one stored folder.
- The runner verified the intended assertion failure, both API observations and
  unchanged source hashes; `manifest.json` has `completed: true`.

Artifacts stay local and ignored. The portable reproduction is `npm ci`, then
`npm run qa:demo`; every execution prints a new run directory. This proves a
controlled miniature API experiment, not real application authentication, a
FastAPI defect or an agent's independently measured refusal.

## Failures, warnings and limits

- `npm ci` initially hit the known sandboxed Windows launcher `EPERM`. The
  authorized retry installed the locked root dependencies. No dependencies were
  added. Direct local binaries were used for checks.
- `agent:doctor` correctly fails this machine's Node **20.12.2**. Locked lint
  dependencies require Node 20.19+, 22.13+, or 24+. The checks and demo above did
  execute here; that does not override the declared engine requirements.
- Initial format checks found pre-existing source drift, cache files and later
  three deterministic generated Markdown files. Maintained source/docs were
  formatted. Generated knowledge is checked by its builder, not rewritten by
  Prettier. Read-only `.agents` formatting required an authorized retry.
- A first safety-test run hit Windows temporary-directory `EPERM`; fixture
  directories now live under ignored `qa-results/tooling-tests/`, and all six
  tests passed afterward. Skill validation used UTF-8 explicitly after the
  Windows default encoding rejected typographic quotes.
- The retired browser locator demo produced artifacts but timed out without a
  complete runner result. Its evidence remains in
  `qa-results/runtime/run-gxHhf3/`. The two services started by that run were
  stopped, and subsequent process/port checks showed no remaining processes or
  listeners on its ports. It was not counted as a successful diagnosis. The
  `qa:runtime-demo` command now aliases the primary API demo.
- The frontend build warned that its Browserslist dataset is old. No unrelated
  dependency update was performed.
- The full reference UI/API suite and manual browser verification were not run.
  Product behavior was not changed; reference UI edits were formatting only.
- Git tracked-file/history hygiene, vulnerability scanning, external-sharing
  rights, actual reviewer identity and semantic approval cannot be certified
  from this copied workspace. See [sharing hygiene](SHARING.md).

## Folder simplification follow-up

Maintained directories reduced from **110 to 78** (29%), maintained files from
**335 to 327**, and top-level maintained directories from **14 to 12**. Counts
exclude installed dependencies, runtime evidence, local data, caches and build
outputs; those were preserved rather than counted as deleted source.

- Moved `qa-evals/` into `qa/evals/`, including the controlled demo, and updated
  the evaluator, demo runner, TypeScript inventory and documentation.
- Consolidated architecture, decisions, runbooks and framework boundary notes
  into `knowledge/framework/` with one index. The builder now scaffolds that
  layout instead of recreating the retired directories.
- Flattened deterministic source notes under `knowledge/generated/code/`.
  Source hashes, graph relationships and the linked source index are retained.
  Regeneration removed obsolete generated notes; 25 empty mirrored folders were
  removed afterward. No generated note was hand-edited.
- Removed the redundant root skill router and three overlapping documentation
  entry files. Routing stays in `AGENTS.md` and `.agents/skills/README.md`;
  contribution ideas now live in `CONTRIBUTING.md` and priorities in `ROADMAP.md`.
- Kept product review stages, historical evidence, UI/API conventions and all
  package commands. A local rollback copy of moved/edited source is retained
  under ignored `qa-results/structure-backup/` because this copy has no Git history.
- Added runtime evidence/derived-artifact exclusions to ESLint after its initial
  scan included the rollback copy. Maintained source remains checked.

The relocated demo completed at `qa-results/demo/run-CJX1rU/`: the correct API
returned 403 with no write; the faulty API returned 200 and stored a folder,
causing the unchanged assertion to fail as intended. Six safety regressions and
four evaluation fixtures passed. Knowledge queries and 21 semantic relationships
resolved after the move. Final lint, typecheck and test inventory checks passed; all 11 reference tests
remain discoverable. Freshness and formatting were rechecked after the final
path-formatting updates. Entry-document links resolve and regeneration does
not recreate retired directories.
The full application-backed suite was not run for this layout-only change.
