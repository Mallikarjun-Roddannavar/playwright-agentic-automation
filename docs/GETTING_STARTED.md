# Getting Started

This guide takes a new contributor from clone to a local Playwright test run.

## Prerequisites

- Node.js 20 or newer;
- Python 3.14;
- Git;
- a Chromium-capable Playwright installation.

## Install dependencies

From the repository root:

```powershell
npm install
npm run install:browsers
```

Install the sample backend dependencies:

```powershell
cd app/backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
cd ../..
```

Install the sample frontend dependencies:

```powershell
cd app/frontend
npm install
cd ../..
```

## Run the checks

Start with the inventory and static checks:

```powershell
npm run test:list
node ./scripts/checkNamingConventions.mjs
node ./scripts/buildKnowledge.mjs --check
node ./scripts/validateKnowledge.mjs
node ./scripts/verifyLoginKnowledge.mjs
npm run lint
npm run typecheck
```

Run the complete local Playwright suite:

```powershell
npm test
```

The Playwright configuration starts the backend and frontend automatically. If either service is already running, it reuses the existing server outside CI.

## Run a focused project

```powershell
npm run test:ui
npm run test:api
npm run test:debug
```

## Work with the knowledge layer

```powershell
npm run knowledge:query -- --knowledge Login
npm run knowledge:build
npm run knowledge:check
```

Refresh generated artifacts after changing indexed source, configuration, package metadata, or knowledge scripts. Do not hand-edit files under `knowledge/generated/`.

## Add a test

1. Read `AGENTS.md` and the relevant local skill.
2. Reuse an existing Page Object, API service, fixture, and route constant where possible.
3. Keep selectors in Page Objects and assertions in specs.
4. Register cleanup for created data.
5. Run the smallest relevant checks and `npm test` for runtime changes.

## Troubleshooting

If a Windows `npm run` command fails with a Node `EPERM` realpath error in the AI shell, run the local binaries or direct Node scripts as documented in `knowledge/runbooks/refresh-codebase-knowledge.md`.

If the backend virtual environment was moved or copied, recreate it in `app/backend/.venv`; Python launcher files contain absolute paths.

If all Playwright tests report `ok` but an AI-shell command does not return, retry with a fresh output directory:

```powershell
$env:PLAYWRIGHT_OUTPUT_DIR = "$env:TEMP\playwright-results"
npx playwright test --output=$env:PLAYWRIGHT_OUTPUT_DIR
```

This avoids locked generated files under the default `test-results/` directory. Treat the shell timeout separately from the test result and confirm that no local UI/API server remains listening afterward.
