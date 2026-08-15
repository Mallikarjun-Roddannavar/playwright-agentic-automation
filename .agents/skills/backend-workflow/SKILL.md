# Backend Workflow Skill

## Purpose
Use this skill when working on FastAPI backend changes in this repository.

## Applies to
- `backend/main.py`
- `backend/auth.py`
- `backend/models.py`
- `backend/requirements.txt`
- `backend/database.json`

## Core rules
- Preserve JWT + RBAC behavior:
  - `admin` full access
  - `editor` create/edit/upload only
  - `viewer` read-only
- Keep `/token` password flow working.
- Keep optional OAuth endpoints functional when env vars are set.
- Do not break `/docs`.
- Keep `detail` messages predictable for frontend toasts/tests.

## Standard workflow
1. Read current endpoint + dependency usage in `main.py`.
2. Apply minimal changes.
3. If auth logic changes, keep it centralized in `auth.py`.
4. Run backend validation commands.
5. Update README when setup/env/api contract changes.

## Validation commands
Run from `backend/`:

```bash
python -m py_compile main.py auth.py models.py
uvicorn main:app --reload --port 8000
```

Optional API sanity checks:
- `GET /health`
- `POST /token`
- one protected folder/file endpoint with Bearer token

## Guardrails
- Keep JSON storage simple and BOM-safe.
- Keep uploaded file cleanup behavior on folder/file delete.
- Avoid introducing external DB/infra unless explicitly requested.

## Verification Marker (Temporary)
- If this skill is applied in a run, include this exact phrase once in a progress update:
  - `backend-workflow skill applied`
