# AGENTS.md (Frontend)

Frontend-specific instructions for `playwright-practice-app/frontend`.

## Scope
- Applies only to files under `frontend/`.
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

### Template: React Component
When creating a new component or page, follow this structure:
```tsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

export const ExampleComponent: React.FC = () => {
    const { user } = useAuth();

    // Hide actions the user is not authorized to perform
    const canDelete = user?.role === 'admin';

    return (
        <div className="app-workspace">
            <h1 className="text-xl font-bold dark:text-white">Example</h1>
            <button data-testid="example-btn" className="btn-primary">
                Action
            </button>
            {canDelete && (
                <button data-testid="example-delete-btn" className="btn-danger">
                    Delete
                </button>
            )}
        </div>
    );
};
```

## UX/testability requirements & Gotchas
- Every interactive element must have a stable `data-testid`. **Do not remove existing test IDs.**
- Keep deep links functional:
  - `/folders/:folderId`
  - `/oauth/callback`
- Prefer hiding actions a role cannot perform instead of rendering disabled controls for unauthorized roles.
- Toast notifications should be used for async success/error flows via `react-toastify`.

## Auth and RBAC requirements
- Use Bearer token auth from `api.ts` for protected calls.
- Role is derived from JWT payload and drives UI visibility/disable states.
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
1. Make your code changes.
2. Run build check: `npm run build`.
3. If the build fails, review TypeScript or Vite errors, fix them, and repeat step 2.
4. Run reusable scripts to validate UI invariants: `node scripts/check-test-ids.js`. Fix any issues and repeat.
5. Run dev server: `npm run dev`.
6. Open the browser and manually test the UI changes (verify styling, interactions, and `data-testid` presence).
7. Verify RBAC by logging in as different roles (`admin`, `editor`, `viewer`) and ensuring the UI reflects correct permissions.
8. Only proceed when validation passes.

## Change hygiene
- Prefer small, focused updates.
- Keep component responsibilities clear.
- If API contracts change, update `api.ts` and affected pages together.
