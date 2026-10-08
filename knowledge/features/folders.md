# Folders

## Purpose and requirements

Requirement: [REQ-FOLDERS-001](../../requirements/incoming/REQ-FOLDERS-001.md).

Authenticated users must be able to view folders. Users with the required role
must be able to create, rename, and delete folders according to the defined
permission rules.

### Expected outcomes

- Authenticated users can list and view folders they are allowed to access.
- Authorized users can create a folder.
- Authorized users can rename a folder.
- Folder deletion follows the role permission rules.
- Requests for missing folders return the defined predictable error.

## Current implementation

1. `HomePage.openFolders()` returns `FoldersPage`; there is intentionally no `FoldersPage.goto()`.
2. The application lists folders through `GET /folders`. Admin/editor can create and rename; deletion requires admin in the current backend.
3. `FoldersPage.createFolder(...)` submits the creation form. `openFolder(...)` selects a folder and returns `FolderFilesPage`.
4. `FoldersService` owns API calls using routes from `BaseApiService`. Tests register cleanup for created folders.

## Manual checks

1. As admin or editor, create a folder and confirm it appears in the list.
2. As viewer, refresh and confirm the shared folder is visible and creation/deletion controls are hidden.
3. Rename with an authorized role and confirm only the target name changes.
4. Delete with admin and confirm removal; check rejected operations leave data unchanged.
5. Check missing-folder responses and name validation against the agreed requirements.

## Automated tests

| Spec                                                      | What its assertions check                                                                          |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| [multi-role.spec.ts](../../ui/specs/multi-role.spec.ts)   | An admin creates a folder and a viewer sees its name after refresh.                                |
| [rbac.spec.ts](../../api/specs/rbac.spec.ts)              | Viewer creation returns 403, editor creation succeeds, and admin deletion succeeds during cleanup. |
| [viewer-rbac.spec.ts](../../ui/specs/viewer-rbac.spec.ts) | Viewer sees the folder; creation and bulk-delete controls are hidden.                              |

File specs also create folders as setup; setup use is not a separate folder-behavior assertion.

Reading these specs identifies intended checks. It does not mean Playwright has been run or passed.

## Gaps and questions

- There is no dedicated `folders.spec.ts`; relevant tests have multi-role and RBAC names.
- Rename, missing-folder handling, duplicate/whitespace names, and the full delete-permission matrix lack focused assertions.
- Admin deletion in teardown is asserted, but does not establish every deletion scenario.

- The exact role-to-operation matrix is not specified in this requirement.
- The exact missing-folder error status and message require confirmation.
- Naming constraints for new and renamed folders are not specified.

## Source links

- [ui/pages/HomePage.ts](../../ui/pages/HomePage.ts)
- [ui/pages/FoldersPage.ts](../../ui/pages/FoldersPage.ts)
- [api/services/FoldersService.ts](../../api/services/FoldersService.ts)
- [api/services/BaseApiService.ts](../../api/services/BaseApiService.ts)
- [app/frontend/src/pages/FoldersPage.tsx](../../app/frontend/src/pages/FoldersPage.tsx)
- [app/frontend/src/api.ts](../../app/frontend/src/api.ts)
- [app/backend/main.py](../../app/backend/main.py)
