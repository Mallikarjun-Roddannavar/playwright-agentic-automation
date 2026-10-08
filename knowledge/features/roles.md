# Roles and permissions

## Purpose and requirements

Requirement: [REQ-RBAC-001](../../requirements/incoming/REQ-RBAC-001.md).

The application must enforce the same role permissions in its user interface
and protected API operations so that users can perform only the actions allowed
for their role.

### Expected outcomes

- Viewers have read-only access.
- Editors can perform permitted create, edit, and upload actions.
- Admins can perform permitted destructive actions.
- UI action visibility agrees with the corresponding protected API responses.

## Current implementation

1. The access token identifies admin, editor, or viewer.
2. `AuthContext` exposes create/edit for admin/editor, delete for admin, and a viewer flag for UI controls.
3. Backend handlers independently enforce authorization: folder/file create or edit requires editor/admin; deletion requires admin.
4. Role fixtures provide separate browser contexts and API request contexts, so tests can compare users without sharing a session.

This describes current implementation. The requirement does not define the complete operation-by-role matrix.

## Manual checks

1. Compare folder and file controls for admin, editor, and viewer.
2. Attempt the corresponding API operations as each role; hiding a button alone does not prove API authorization.
3. After rejected changes, relist data and confirm no unintended resource or modification exists.
4. Confirm permitted create/edit/upload and admin deletion outcomes separately.

## Automated tests

| Spec                                                      | What its assertions check                                                                                        |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| [API rbac.spec.ts](../../api/specs/rbac.spec.ts)          | Viewer folder creation is 403; editor creation succeeds; admin cleanup deletion succeeds.                        |
| [viewer-rbac.spec.ts](../../ui/specs/viewer-rbac.spec.ts) | Viewer folder/file creation and deletion controls are hidden; empty-folder download-all is visible and disabled. |
| [multi-role.spec.ts](../../ui/specs/multi-role.spec.ts)   | A viewer sees a folder created by an admin after refresh.                                                        |
| [API files.spec.ts](../../api/specs/files.spec.ts)        | Viewer upload is 403 while editor upload succeeds.                                                               |
| [UI files.spec.ts](../../ui/specs/files.spec.ts)          | Admin and editor can upload through the UI.                                                                      |

Reading these specs identifies intended checks. It does not mean Playwright has been run or passed.

## Gaps and questions

- The complete role-operation matrix, unauthorized response contract, and meaning of destructive actions need confirmation.
- Current tests do not cover every edit/delete denial, data preservation after every rejection, token tampering, or expired-token API response.
- Cross-role visibility checks are not proof of complete access-control coverage.

- The complete role-to-operation matrix is not specified in this requirement.
- The exact unauthorized status and error body require confirmation.
- The definition of destructive actions requires confirmation.

## Source links

- [utils/fixtures/TestFixtures.ts](../../utils/fixtures/TestFixtures.ts)
- [ui/setup/auth.setup.ts](../../ui/setup/auth.setup.ts)
- [app/frontend/src/context/AuthContext.tsx](../../app/frontend/src/context/AuthContext.tsx)
- [app/backend/auth.py](../../app/backend/auth.py)
- [app/backend/main.py](../../app/backend/main.py)
