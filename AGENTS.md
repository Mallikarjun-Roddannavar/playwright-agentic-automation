# Project rules

These rules apply to the whole Playwright + TypeScript learning framework.
Use Playwright best practices and the repository's Page Object Model conventions.
Nested application instructions apply to their respective folders.

## Choose a skill

| Work                                                                | Skill                   |
| ------------------------------------------------------------------- | ----------------------- |
| UI specs, Page Objects, selectors, navigation                       | `pw-ui-pom`             |
| API services/specs, fixtures, auth sessions                         | `pw-api-pom`            |
| Configuration, scripts, waits, logging, reporting, quality checks   | `pw-framework-tooling`  |
| Feature explanations, architecture, test coverage, note maintenance | `codebase-second-brain` |
| Failure diagnosis and evidence-backed repairs                       | `qa-safe-healing`       |

Skills live under `.agents/skills/`. For feature or coverage questions, use
`codebase-second-brain` first: read `knowledge/README.md`, open the feature note,
and confirm important claims against source and assertions. Use UI/API skills
when implementation changes are needed. Report source review and test execution
separately. Official Playwright agents, CLI, or optional MCP may assist this work.

## Preserve test intent

- Diagnose before modifying. Read the failure policy in `.agents/skills/qa-safe-healing/SKILL.md` before classifying or repairing a failure and preserve real test, trace, screenshot, API, source, and requirement evidence.
- Application defects, API contract failures, environment failures, and `UNKNOWN` are not test-healing opportunities.
- Never weaken assertions without supported behavior and policy-required review. Never skip, fixme, delete, swallow errors, or force interactions merely to obtain green output.
- Make the smallest evidence-backed permitted repair, run `npm run qa:guardrails`, and rerun the affected test. Green output alone does not prove correct product behavior.

## Keep ownership clear

- Selectors and actions belong in `ui/pages`; assertions belong in specs. API services in `api/services` remain assertion-free and return raw `APIResponse` values.
- Shared page behavior and UI routes belong in `ui/pages/BasePage.ts`. API routes belong in `api/services/BaseApiService.ts`. Reuse these constants in specs, setup, and services.
- `config/test-config.json` is the single committed framework source for UI/API base URLs, admin/editor/viewer demo credentials, and shared waits. Change values there directly; use `UPPER_SNAKE_CASE` JSON keys.
- Derive timing from `utils/common/Waits.ts`, use `logger.withScope(...)`, and keep the custom reporter at `utils/common/CustomReporter.ts`.
- Prefer TypeScript aliases `@pages/*`, `@api/*`, `@utils/*`, and `@config/*` over deep relative imports in framework code and tooling.

## Page Objects and fixtures

- Return `this` for guaranteed same-page navigation, a different Page Object only for a guaranteed destination, and `Promise<void>` for ambiguous actions.
- Preserve the flow: `LoginPage.login(...)` returns `HomePage`; `loginExpectingFailure(...)` stays on `LoginPage`; `HomePage.openFolders()` returns `FoldersPage`. `FoldersPage` has no `goto()`.
- Shared fixtures live in `utils/fixtures/TestFixtures.ts`: role contexts/pages are `adminContext`/`adminPage`, `editorContext`/`editorPage`, and `viewerContext`/`viewerPage`; API contexts are `adminRequest`, `editorRequest`, and `viewerRequest`.
- Tests instantiate their own Page Objects and services. Fixtures must not hide test intent by returning them. Register teardown for created data through the shared `cleanup` fixture.

## Naming and notes

- Use PascalCase for exported class-style framework files and match the primary export name. Reserve `Base*` for shared parents. Use camelCase for methods, local variables, properties, and locator fields.
- Keep role-focused folder names lowercase. Specs use lowercase kebab-case with `.spec.ts`, such as `multi-role.spec.ts`.
- Update the relevant feature note when behavior changes. Keep raw requirements in `requirements/incoming/`; new business interpretations go in a Pending review section for human confirmation. Ordinary source-backed documentation updates need no promotion process. Preserve unresolved questions.

## Validate the change

Keep ESLint, Prettier, and `tsc --noEmit` green; retain
`@typescript-eslint/no-floating-promises`. `npm run quality:check` runs naming,
QA guardrails, lint, typecheck, and formatting. Use the smallest relevant checks
for focused changes and `npm run test:list` to inspect the suite. Run the full
suite only when relevant or requested; rerun affected tests after behavioral repairs.

If npm encounters the known Windows `EPERM` issue, use direct scripts or local
binaries: `node ./scripts/checkNamingConventions.mjs`,
`node ./scripts/qaGuardrails.mjs`, and `./node_modules/.bin/` commands
`eslint.cmd .`, `tsc.cmd --noEmit`, `prettier.cmd . --check`, or
`playwright.cmd test --list`.
