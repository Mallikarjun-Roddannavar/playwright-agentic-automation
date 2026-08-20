# AGENTS.md (Backend)

Backend-specific instructions for `app/backend`.

## Scope

- Applies only to files under `app/backend/`.
- Overrides root guidance when there is a conflict.

## Current backend architecture

- Entry point: `main.py`
- Auth module: `auth.py`
- Schemas: `models.py`
- Data store: `database.sqlite3` via `database.py`
- File store: `uploads/`

## Workflow: Adding a New Endpoint

1. Define the Pydantic schema in `models.py` if a new request or response body is needed.
2. Implement the endpoint function in `main.py`.
3. Protect the endpoint by injecting the `get_current_user` dependency.
4. Enforce RBAC logic inside the endpoint (check `user.role` against requirements).
5. Document expected error responses for frontend handling.

Public endpoints such as `/health`, `/token`, and the optional OAuth routes do not
use `get_current_user`. Protected folder and file endpoints must use it and apply
the appropriate role check.

## Auth requirements

- Password flow endpoint:
  - `POST /token` (OAuth2PasswordRequestForm)
- JWT claims must include role (`admin|editor|viewer`) used by frontend RBAC.
- `get_current_user` dependency must protect folder/file endpoints.
- Optional external OAuth endpoints must continue working when OAuth is configured:
  - `GET /auth/oauth/login`
  - `GET /auth/oauth/callback`

## RBAC contract (must not regress)

- `viewer`: read-only (`GET` endpoints only)
- `editor`: can create/rename/upload, cannot delete
- `admin`: full access including delete

## Storage and consistency rules

- Keep the SQLite schema and API response shape stable.
- File metadata in SQLite must match real files in `uploads/`.
- On folder deletion, remove associated uploaded files from disk.

## Gotchas & API behavior requirements

- The `/docs` must remain usable for API automation practice.
- Maintain predictable errors (`detail` field) for frontend toasts/tests.
- Preserve endpoint URLs unless user explicitly asks to change them.
- If adding endpoints, follow existing naming style and dependency injection pattern.
- SQLite transactions and the application store lock protect concurrent updates.

## Validation Loop for Backend Changes

Run these commands from `app/backend` after making changes:

1. Syntax check: `python -m py_compile main.py auth.py models.py database.py`.
2. Start the server: `uvicorn main:app --reload --port 8000`.
3. Check `/health`; the expected response is `{ "status": "ok" }`.
4. Test the specific change using `curl`, Swagger UI, or the repository's Playwright API tests.
5. Only proceed when validation passes.

## Dependency rules

- Keep dependencies lean.
- Prefer stable, widely-used libs only.
- If dependency changes are made, update `requirements.txt` and README instructions.
