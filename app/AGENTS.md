# AGENTS.md

Project-wide instructions for coding agents working in `playwright-practice-app`.

## Scope and precedence
- This file is the common baseline for the whole repository.
- More specific instructions in nested files override this file:
  - `backend/AGENTS.md`
  - `frontend/AGENTS.md`

## Project overview
- Monorepo for a File Management System used for Playwright UI/API automation practice.
- Backend: FastAPI + OAuth2 Password Flow JWT + optional external OAuth callback support.
- Frontend: React + TypeScript + Vite + Tailwind.
- Storage:
  - App data: `backend/database.json`
  - Uploaded files: `backend/uploads/`

## Plan-Validate-Execute Workflow
For any task, follow this workflow:
1. **Plan**: Identify which parts of the stack are affected (frontend, backend, or both). Read the corresponding nested `AGENTS.md` for specific guidance. Determine the required RBAC checks.
2. **Execute**: Make your focused code changes.
3. **Validate**: Follow the project-specific validation checklists to ensure correctness. Do not mark the task as complete until all validation steps pass.

## Non-negotiable behaviors & Gotchas
- Preserve RBAC semantics:
  - `admin`: full access
  - `editor`: create/edit/upload, no delete
  - `viewer`: read-only
- Keep API testability and UI testability intact.
- Do not remove `data-testid` attributes from interactive elements.
- Any new interactive element must include `data-testid`.
- Avoid breaking deep-link routes (`/folders/:folderId`) and OAuth callback route (`/oauth/callback`).

## Implementation standards
- Prefer minimal, focused diffs.
- Keep naming and file structure consistent with existing code.
- Do not introduce heavy infrastructure (DB servers, queues, etc.) unless explicitly requested.
- Keep storage model simple and local-first unless user asks otherwise.
- For frontend visual changes, prefer extending the shared visual system in `frontend/src/index.css` instead of adding one-off page-local styling patterns.

## Global Validation Checklist Before Finishing
Before submitting changes, perform these checks:
- [ ] Backend syntax check passes: `python -m py_compile backend/main.py backend/auth.py backend/models.py`
- [ ] Frontend build succeeds: `cd frontend && npm run build`
- [ ] If auth or permissions changed:
  - Verify login still works.
  - Verify protected endpoints still require Bearer token.
  - Verify role-based UI behavior still matches backend constraints.

## Safe editing rules
- Never delete user data files unless explicitly requested.
- Never run destructive git commands (`reset --hard`, forced checkout, etc.).
- Do not modify `.venv/`, `dist/`, or `node_modules/` manually.

## Documentation updates
- Update `README.md` when changing:
  - setup commands
  - auth flows/endpoints
  - required environment variables
  - major UI behavior used in Playwright practice
  - shared visual direction or interaction patterns that future assistants should preserve

## Verification Marker (Temporary)
- For backend auth code edits, include exactly one comment line:
  - `# AGENT_MARKER_AUTH`
- This marker is only for testing whether AGENTS instructions are being followed.
