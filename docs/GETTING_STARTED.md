# Getting started

Choose the layer you want to try. The reference application is optional.

## QA + knowledge demo

Use Node 20.19+, 22.13+, or 24+ (the locked lint dependencies exclude older
Node 20/22 versions). Run from the repository root:

```bash
npm ci
npm run agent:doctor
npm run qa:demo
```

This installs the existing root packages and runs a controlled API experiment.
No browser, Python, frontend packages or model credentials are needed. See the
[five-minute demo](FIVE_MINUTE_DEMO.md) for prompts and expected observations.

To adopt the layer in an existing repository, follow the
[starter copy recipe](../adoption/README.md) instead of installing this framework.

## Optional Playwright reference application

The sample app uses React/Vite and FastAPI. Python 3.11+ is the source syntax
baseline; its dependencies must install successfully on your Python version.

```bash
npm ci --prefix app/frontend
python -m venv app/backend/.venv
npx playwright install chromium
```

Install backend packages without activating a shell environment:

```powershell
# Windows PowerShell
app/backend/.venv/Scripts/python.exe -m pip install -r app/backend/requirements.txt
```

```bash
# macOS / Linux
app/backend/.venv/bin/python -m pip install -r app/backend/requirements.txt
```

Then:

```bash
npm run agent:doctor:app
npm run test:list
npm test
```

The reference config starts local frontend/backend services and reuses existing
ones outside CI. Inspect `config/test-config.json` before a run; these commands
are for the local demo system. See [app/README.md](../app/README.md).

## Repository maintenance

```bash
npm run quality:check
npm run qa:eval
npm run qa:tooling-test
npm run test:list
```

After indexed code or configuration changes, run `npm run knowledge:build`, then
`npm run knowledge:check`. This optional reference index depends on root packages
and Python for backend AST extraction. Do not hand-edit generated facts.

## Troubleshooting

- `agent:doctor` is a prerequisite check, not proof a browser or application
  starts. `--app` adds the reference-app dependencies and knowledge freshness.
- If the Windows npm launcher fails with `EPERM` in an AI shell, use direct
  scripts such as `node scripts/qaDemo.mjs` and local binaries such as
  `node_modules/.bin/tsc.cmd --noEmit` after dependencies are installed.
- A copied Python virtual environment may contain old absolute paths. Recreate
  it using the installation steps above.
- A demo timeout, runner error or missing API attachment is an incomplete
  experiment. Inspect its printed run directory; do not interpret an arbitrary
  failed process as an authorization finding.
