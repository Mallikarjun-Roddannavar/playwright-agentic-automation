# Playwright Practice App

Local file-management application used as the practice system for the
repository's Playwright UI and API automation framework.

This folder contains the application only. The Playwright tests, page objects,
API services, fixtures, and knowledge tooling are maintained at the repository
root.

## Current application structure

```text
app/
├── backend/
│   ├── main.py              # FastAPI routes and application startup
│   ├── auth.py              # Password/JWT and optional OAuth helpers
│   ├── models.py            # Request and response models
│   ├── database.py          # SQLite storage helpers
│   ├── database.sqlite3     # Local application data
│   ├── uploads/             # Local uploaded-file storage
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── api.ts
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
├── manual_test_cases/
└── README.md
```

## Roles

The demo accounts are intended for local learning:

| Role     | Permissions                                      |
| -------- | ------------------------------------------------ |
| `admin`  | Create, rename, upload, and delete folders/files |
| `editor` | Create, rename, and upload; cannot delete        |
| `viewer` | Read-only browsing and file actions              |

Credentials are defined in the repository configuration used by the
automation framework.

## Backend

The backend is a FastAPI application using SQLite for local persistence and a
local `uploads/` directory for file contents.

Implemented endpoints and capabilities include:

- `GET /health`
- password login through `POST /token` and `POST /auth/login`
- JWT bearer authentication with a role claim
- protected folder CRUD operations
- protected file listing, upload, rename, delete, preview, and download
- ZIP download for files in a folder
- `GET /stats`
- CORS configuration for the local frontend
- optional external OAuth authorization-code endpoints

Start it from this directory:

```bash
cd backend
python -m venv .venv
```

Windows PowerShell:

```powershell
.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

Other shells:

```bash
source .venv/bin/activate
python -m pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

Useful local URLs:

- API: <http://localhost:8000>
- Swagger UI: <http://localhost:8000/docs>
- Health check: <http://localhost:8000/health>

## Frontend

The frontend is a React, TypeScript, Vite, and Tailwind application.

Implemented screens and behavior include:

- username/password login
- optional OAuth callback handling
- home/dashboard screen
- folder list and card views
- folder creation, rename, open, and delete actions
- file listing, upload, rename, delete, preview, and download actions
- role-aware navigation and action visibility
- refresh controls and polling for folder/file screens
- toast feedback for asynchronous success and error flows
- preferences and theme controls

Start it from this directory:

```bash
cd frontend
npm install
npm run dev
```

Frontend URL: <http://localhost:5173>

For local development, the frontend uses:

```text
VITE_API_BASE_URL=http://localhost:8000
```

The Vite configuration currently supplies the local API default, so an
environment override is only needed when using a different backend URL.
