# AGENTS.md (Backend)

Backend-specific instructions for `playwright-practice-app/backend`.

## Scope
- Applies only to files under `backend/`.
- Overrides root guidance when there is a conflict.

## Current backend architecture
- Entry point: `main.py`
- Auth module: `auth.py`
- Schemas: `models.py`
- Data store: `database.sqlite3` via `database.py`
- File store: `uploads/`

## Procedural Workflow: Adding a New Endpoint
1. Define the Pydantic schema in `models.py` if a new request or response body is needed.
2. Implement the endpoint function in `main.py`.
3. Protect the endpoint by injecting the `get_current_user` dependency.
4. Enforce RBAC logic inside the endpoint (check `user.role` against requirements).
5. Document expected error responses for frontend handling.

### Template: FastAPI Endpoint
```python
@app.post("/example", response_model=ExampleResponse)
async def create_example(
    request: ExampleRequest,
    user: User = Depends(get_current_user)
):
    # RBAC Enforcement
    if user.role not in ["editor", "admin"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only editors and admins can create examples."
        )

    # Implementation here
    return {"message": "Success"}
```

## Auth requirements
- Password flow endpoint:
  - `POST /token` (OAuth2PasswordRequestForm)
- JWT claims must include role (`admin|editor|viewer`) used by frontend RBAC.
- `get_current_user` dependency must protect folder/file endpoints.
- Optional external OAuth endpoints must continue working when configured:
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
1. Make your code changes.
2. Run syntax check: `python -m py_compile main.py auth.py models.py`.
3. If there are syntax errors, fix them and repeat step 2.
4. Start the server: `uvicorn main:app --reload --port 8000`.
5. Check `/health` endpoint to verify the server starts.
6. Test your specific changes using `curl`, Swagger UI, or Playwright API tests.
7. Only proceed when validation passes.

## Dependency rules
- Keep dependencies lean.
- Prefer stable, widely-used libs only.
- If dependency changes are made, update `requirements.txt` and README instructions.
