# AGENTS.md (Frontend)

Frontend-specific instructions for `app/frontend`.

## Scope

- Applies only to files under `app/frontend/`.
- Overrides root guidance when there is a conflict.

## Current frontend architecture

- Stack: React + TypeScript + Vite + Tailwind
- Routing in `src/App.tsx`
- Auth context in `src/context/AuthContext.tsx`
- API client in `src/api.ts`
- Shared layout/components in `src/components/`
- Pages in `src/pages/`

## Procedural Workflow: Adding a New UI Feature

1. Define any new API calls in `src/api.ts`, ensuring they use Bearer tokens for auth.
2. Create or update components in `src/components/` or pages in `src/pages/`.
3. Use shared Tailwind classes from `src/index.css`.
4. Implement UI visibility based on the user's role from the `AuthContext` (e.g., hide delete buttons for editors).
5. Ensure all new interactive elements (buttons, inputs, links) have a `data-testid` attribute.

## UX/testability requirements & Gotchas

- Every interactive element must have a stable `data-testid`. **Do not remove existing test IDs.**
- Keep deep links functional:
  - `/folders/:folderId`
  - `/oauth/callback`
- Prefer hiding actions a role cannot perform instead of rendering disabled controls for unauthorized roles.
- Toast notifications should be used for async success/error flows via `react-toastify`.

## Auth and RBAC requirements

- Use Bearer token auth from `api.ts` for protected calls.
- Role is derived from the JWT payload and drives UI visibility.
- UI permissions must match backend rules:
  - `viewer`: read-only
  - `editor`: create/edit/upload
  - `admin`: delete allowed
- In the current UI contract:
  - `viewer` should not see create, rename, upload, or delete actions
  - `editor` should see create, rename, and upload actions, but not delete actions
  - `admin` should see all CRUD actions

## UI behavior that must remain intact

- Profile menu + preferences flow
- Theme preference support (white/black)
- Folder and file CRUD dialogs
- Bulk delete controls (where implemented)
- Real-time sync aids:
  - manual refresh buttons
  - periodic polling
- Toast notifications via `react-toastify`

## Styling conventions

- Reuse semantic classes from `src/index.css` whenever possible:
  - `btn-primary`, `btn-secondary`, `btn-danger`, `icon-btn`
  - `app-header`, `app-drawer`, `dropdown-panel`
  - `app-workspace`, `app-dialog-panel`, `app-input`, `app-table`, `app-status-chip`
- Keep the visual direction consistent:
  - premium glassmorphic shell for header, sidebar, menus, and top-level chrome
  - clearer work surfaces for forms, dialogs, and data-heavy screens
  - denser, readable tables and crisp primary actions
- Home page styling direction to preserve:
  - app-focused dashboard content, not product-marketing copy and not internal automation-framework copy
  - cinematic motion should come from shared CSS in `src/index.css`, not ad hoc inline styles
  - scroll, wheel, and pointer effects should stay subtle, premium, and secondary to readability
  - reveal/hover motion should enhance existing cards and sections instead of introducing new floating panels unless explicitly requested
- Avoid ad hoc button variants, social-feed layouts, and heavy neumorphic treatment for primary actions.

## Validation Loop for Frontend Changes

Run these commands from `app/frontend` after making changes:

1. Build check: `npm run build`.
2. If the build fails, review TypeScript or Vite errors, fix them, and repeat step 1.
3. Run the dev server: `npm run dev`.
4. Open the browser and manually test the changed UI, including interactions and `data-testid` presence.
5. Verify RBAC with `admin`, `editor`, and `viewer` accounts when permissions are affected.
6. Only proceed when validation passes.

## Change hygiene

- Prefer small, focused updates.
- Keep component responsibilities clear.
- If API contracts change, update `api.ts` and affected pages together.
