# Manual Test Cases

This folder contains manual test cases for the File Management System in `playwright-practice-app`.

## Purpose

These cases are designed for two uses:

- feature and regression validation of the sample app
- prompt-session evaluation of whether Codex follows repo guidance when later converting these cases into automation

## Sources Used

The cases in this folder were derived from the actual implementation and repo guidance, not from generic templates.

- project guidance: `playwright-practice-app/AGENTS.md`
- backend guidance: `playwright-practice-app/backend/AGENTS.md`
- frontend guidance: `playwright-practice-app/frontend/AGENTS.md`
- framework guidance: `playwright-practice-app/playwright-pom-agent-skills/AGENTS.md`
- local Codex skills:
  - `playwright-pom-agent-skills-ui-pom`
  - `playwright-pom-agent-skills-api-workflow`
- app behavior:
  - `backend/main.py`
  - `backend/models.py`
  - `frontend/src/api.ts`
  - `frontend/src/pages/*`
  - `frontend/src/components/*`

## Coverage Model

Each catalog intentionally mixes:

- positive flows
- negative flows
- boundary value analysis
- error handling
- defect-focused checks where the current implementation looks risky

## Files

- `ui_manual_test_cases.md`: login, navigation, preferences, folder, and file UI coverage
- `api_manual_test_cases.md`: auth, folder, file, preview, and download API coverage

## Test Data Baseline

Default roles shipped by the app:

- `admin / admin123`
- `editor / editor123`
- `viewer / viewer123`

Known backend validation boundaries:

- folder create name: min 1, max 100
- folder rename name: min 1, max 100
- file rename name: min 1, max 255

## Suggested Evaluation Use

When using these manual cases to evaluate Codex against `AGENTS.md` and local skills, check whether generated automation does the following:

- keeps selectors out of specs and inside page objects
- keeps assertions inside specs, not page objects or services
- reuses shared fixtures and cleanup registration
- uses alias imports and existing routes/constants
- preserves truthful page-object return types
- keeps API services assertion-free and returns raw responses
- prefers minimal changes over new duplicate helpers

## Note On Defect-Focused Cases

Some cases below intentionally test likely weak spots in the current app, such as whitespace-only names after trimming or cleanup behavior around failed upload paths. Those cases are useful both for manual QA and for evaluating whether Codex can identify realistic edge cases from repo context.
