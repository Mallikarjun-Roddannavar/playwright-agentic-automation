# Files

## Purpose and requirements

Requirement: [REQ-FILES-001](../../requirements/incoming/REQ-FILES-001.md).

Authenticated users can perform the file operations allowed by their role on
files inside a folder. The system supports upload, listing, preview, download,
rename, and deletion while protecting stored file names, enforcing
authorization, and handling missing folders or files predictably.

### Expected outcomes

- An authenticated user whose role permits upload can upload a file into an
  existing folder and receives a successful result.
- Files in an accessible folder can be listed, and an authorized user can
  retrieve an uploaded file.
- A file uploaded with an unsafe name is stored and represented using a safe,
  non-path-traversing name while retaining the intended file identity where
  applicable.
- Preview, download, rename, and delete succeed only when the user's role is
  authorized for the operation; unauthorized attempts return the defined
  authorization error.
- Operations against a missing folder or file return the defined not-found (or
  equivalent) error consistently and do not create unintended resources.

## Current implementation

1. A user opens a folder through `FoldersPage.openFolder(...)`, which returns `FolderFilesPage`.
2. The frontend API client lists and uploads files under `/folders/{folderId}/files`; preview/download URLs include an access token.
3. Upload and rename require editor/admin in the backend; delete requires admin. Authenticated users can list files, and preview/download validate a token.
4. Uploads expose a safe basename and store content under a random UUID hexadecimal name.
5. UI specs use role page/request fixtures; API specs use `FilesService` and `FoldersService`. Created folders are removed through cleanup.

## Manual checks

### Preconditions

- The sample application is running with configured admin, editor, and viewer
  accounts.
- An existing folder is available, or the tester can create one with an
  authorized role.
- A small text file is available for upload.

### Scenario 1: Authorized upload, safe name, listing, and retrieval

1. Sign in as an editor (or admin) and open an existing folder.
2. Use an authenticated API client to upload a text file whose submitted name contains path components, such as
   `../nested\\unsafe-name.txt`.
3. Confirm the upload succeeds and the displayed name is the safe basename
   `unsafe-name.txt`.
4. List the folder's files and confirm exactly one new file appears.
5. Preview and download the file, where those controls are available.
6. Confirm the preview is readable and the downloaded content matches the
   uploaded content.

Expected result: The authorized upload succeeds; the name is non-path-
traversing while retaining the intended basename; listing includes the file;
preview and download return the uploaded file.

### Scenario 2: Authorized rename and deletion

1. As an authorized editor or admin, rename the uploaded file to a new valid filename.
2. Confirm the new name appears and the old name no longer appears.
3. As admin, delete the renamed file.
4. Refresh or relist the folder.

Expected result: Rename updates only the target file, and deletion removes it
from the folder without affecting other files.

### Scenario 3: Unauthorized operation is rejected

1. Sign in as a viewer and attempt to upload a file to the existing folder.
2. Attempt any available preview, download, rename, or delete operation for a
   file when the viewer role is not authorized for that operation.
3. Relist or refresh the folder after each rejected operation.

Expected result: Each unauthorized operation returns the defined authorization
error (for example, HTTP 403), leaves the file and folder unchanged, and does
not create a new resource.

### Scenario 4: Missing folder or file is handled predictably

1. Address a folder identifier that does not exist and attempt an upload or
   file listing.
2. Address a file identifier that does not exist and attempt preview,
   download, rename, or delete.

Expected result: Each operation returns the defined not-found (or equivalent)
error (for example, HTTP 404), leaves existing data unchanged, and does not
create an unintended folder or file.

## Automated tests

| Spec                                                      | What its assertions check                                                                                                                                                                                                   |
| --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [api files.spec.ts](../../api/specs/files.spec.ts)        | Editor upload succeeds; submitted path components become `unsafe-name.txt`; stored name matches 32 hexadecimal characters; viewer upload returns 403; missing-folder upload returns 404; listing contains exactly one file. |
| [ui files.spec.ts](../../ui/specs/files.spec.ts)          | Editor and admin uploads show a success toast and uploaded filename.                                                                                                                                                        |
| [viewer-rbac.spec.ts](../../ui/specs/viewer-rbac.spec.ts) | Viewer upload and bulk-delete controls are hidden; download-all is visible and disabled for an empty folder.                                                                                                                |

Reading these specs identifies intended checks. It does not mean Playwright has been run or passed.

## Gaps and questions

- Preview, download, rename, file deletion, missing-file errors, upload limits, and bulk operations lack dedicated automated behavior checks.
- The API listing assertion checks one file after rejected uploads. It does not inspect every filesystem side effect or all rejection paths.
- Manual procedures describe checks to perform, not recorded successful executions. For unsafe submitted names, use an API client; a browser file chooser cannot submit an arbitrary path-like filename.
- Exact role permissions and error wording remain business questions where the requirement leaves them undefined. Current backend rules above describe implementation only.

## Source links

- [ui/pages/FolderFilesPage.ts](../../ui/pages/FolderFilesPage.ts)
- [ui/pages/FoldersPage.ts](../../ui/pages/FoldersPage.ts)
- [api/services/FilesService.ts](../../api/services/FilesService.ts)
- [api/services/FoldersService.ts](../../api/services/FoldersService.ts)
- [utils/fixtures/TestFixtures.ts](../../utils/fixtures/TestFixtures.ts)
- [app/frontend/src/pages/FilesPage.tsx](../../app/frontend/src/pages/FilesPage.tsx)
- [app/frontend/src/api.ts](../../app/frontend/src/api.ts)
- [app/backend/main.py](../../app/backend/main.py)
