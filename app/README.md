# Playwright Practice App

File Management System for Playwright UI and API automation practice.

## Agent Guidance

For AI coding agents and contributors, follow these instruction files:
- Project-wide: `AGENTS.md`
- Backend-specific: `backend/AGENTS.md`
- Frontend-specific: `frontend/AGENTS.md`

## Project Structure

```text
/playwright-practice-app
+-- /backend
�   +-- auth.py
�   +-- main.py
�   +-- models.py
�   +-- database.json
�   +-- /uploads
�   +-- requirements.txt
+-- /frontend
�   +-- /src
�   �   +-- /components
�   �   +-- /pages
�   �   +-- /context
�   �   +-- App.tsx
�   +-- package.json
�   +-- tailwind.config.js
+-- /tests
�   +-- /api
�   +-- /core
�   +-- /ui
�   +-- playwright.config.ts
+-- README.md
```

## Role Credentials

- `admin / admin123` -> full access (create, edit, delete)
- `editor / editor123` -> create and edit only
- `viewer / viewer123` -> read-only

## Auth Modes Implemented

1. OAuth2 Password Flow + JWT:
- `POST /token` with `username` + `password` returns `access_token`
- JWT payload includes `sub` (username) and `role` (`admin|editor|viewer`)
- Folder/File APIs are protected with bearer auth

2. External OAuth (Authorization Code):
- `GET /auth/oauth/login` returns provider authorization URL
- `GET /auth/oauth/callback?code=...&state=...` exchanges provider code and returns app `access_token`
- App JWT still carries `role` claim for frontend RBAC rendering

## Backend Setup (FastAPI)

```bash
cd backend
python -m venv .venv
# Windows PowerShell
.venv\Scripts\Activate.ps1
#bash
source .venv/Scripts/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Swagger UI for API automation:
- `http://localhost:8000/docs`

### Optional OAuth Provider Config (for external OAuth login)

Set these env vars before starting backend:

```bash
OAUTH_CLIENT_ID=<provider-client-id>
OAUTH_CLIENT_SECRET=<provider-client-secret>
OAUTH_AUTHORIZE_URL=<provider-authorize-endpoint>
OAUTH_TOKEN_URL=<provider-token-endpoint>
OAUTH_USERINFO_URL=<provider-userinfo-endpoint>   # optional but recommended
OAUTH_REDIRECT_URI=http://localhost:5173/oauth/callback
OAUTH_SCOPE="openid profile email"
JWT_SECRET_KEY=<strong-random-secret>
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

Optional role mapping for OAuth users:

```bash
OAUTH_ROLE_MAP_JSON={"admin@example.com":"admin","editor@example.com":"editor"}
```

## Frontend Setup (React + Vite + Tailwind)

```bash
cd frontend
npm install
npm run dev
```

Frontend URL:
- `http://localhost:5173`

For local frontend development, configure the API base URL as:

```bash
VITE_API_BASE_URL=http://localhost:8000
```

Login page now supports:
- Username/password login (`/token`)
- OAuth redirect login (`Login with OAuth` button)

UI behavior for Playwright practice:
- Folder pages support toggling between list and card views while preserving the same actions and test IDs.
- Folder rows include `Open in New Tab` links (`target="_blank"`).
- File rows include `Preview` popup button (`window.open`).
- Folder and File pages support 5-second auto-polling and manual `Refresh` buttons.
- Toast notifications are enabled via `react-toastify` for async success/error flows.
- Frontend RBAC visibility mirrors backend permissions:
  - `viewer` sees read-only navigation and file/folder browsing actions
  - `editor` sees create, rename, and upload actions
  - `admin` sees delete actions in addition to create, rename, and upload

Frontend visual direction:
- premium glassmorphic shell for header, sidebar, and menus
- clearer work surfaces for forms, dialogs, and CRUD screens
- denser, more enterprise-like tables for data-heavy pages
- crisp high-contrast primary actions instead of heavy neumorphic controls
- home page uses app-focused dashboard copy with cinematic motion layered through shared `frontend/src/index.css` styles

## Refresh / Rerun After Code Changes

### Backend (API)
- If backend server is already running with `--reload`, most Python code changes auto-reload.
- If dependencies or environment variables changed, restart backend:

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Frontend (UI)
- Vite dev server auto-refreshes on most `src/` changes.
- If styles/config look stale, do a hard refresh in browser (`Ctrl+F5`).
- If `package.json`, Tailwind config, or Vite config changes, restart frontend:

```bash
cd frontend
npm install
npm run dev
```

## Testability Notes

- Interactive elements include `data-testid` attributes for Playwright selectors.
- Example IDs:
  - `login-submit`
  - `new-folder-btn`
  - `folder-row-1`
  - `folder-delete-btn-<folderId>`
  - `upload-file-btn`

## Playwright Test Framework (TypeScript)

The `tests` folder is now structured for both UI and API automation, with POM and multi-role fixtures:

```text
/tests
+-- /api
�   +-- ApiClient.ts
�   +-- authorization.spec.ts
�   +-- health.spec.ts
+-- /core
�   +-- auth.setup.ts
�   +-- env.ts
�   +-- paths.ts
+-- /ui
�   +-- /auth
�   +-- /e2e
�   +-- /fixtures
�   +-- /pom
+-- .env.example
+-- package.json
+-- playwright.config.ts
+-- tsconfig.json
```

### Setup

```bash
cd tests
npm install
npx playwright install
```

### Run Tests

```bash
# all projects (ui + api)
npx playwright test

# only ui
npx playwright test --project=ui

# only api
npx playwright test --project=api
```

### Multi-Role Strategy

- `tests/core/auth.setup.ts` logs in as `admin`, `editor`, and `viewer` via `/token`.
- It writes role-specific storage states into `tests/.auth/`.
- `tests/ui/fixtures/roleFixtures.ts` creates isolated role sessions (`admin`, `editor`, `viewer`) in one test, so one scenario can validate cross-role behavior (for example: admin creates, viewer verifies after refresh).

### Best-Practice Alignment

- Uses stable `data-testid` selectors for resilient UI tests.
- Uses Page Object Model classes under `tests/ui/pom`.
- Separates API specs from UI specs and uses a shared API client helper.
- Uses isolated browser contexts per role for parallel-safe multi-user testing.





