---
type: Manual Test Scenario
id: manual-files-role-aware-management
title: Role-aware file management
status: stable
trust_status: grounded
requirements:
  - ../../01-product/requirements/files.md
sources:
  - resource: ../../../requirements/incoming/REQ-FILES-001.md
  - resource: ../../../api/specs/files.spec.ts
  - resource: ../../../ui/specs/files.spec.ts
---

# Role-aware file management

## Preconditions

- The sample application is running with configured admin, editor, and viewer
  accounts.
- An existing folder is available, or the tester can create one with an
  authorized role.
- A small text file is available for upload.

## Scenario 1: Authorized upload, safe name, listing, and retrieval

1. Sign in as an editor (or admin) and open an existing folder.
2. Upload a text file whose submitted name contains path components, such as
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

## Scenario 2: Authorized rename and deletion

1. Using the uploaded file, rename it to a new valid filename.
2. Confirm the new name appears and the old name no longer appears.
3. Delete the renamed file.
4. Refresh or relist the folder.

Expected result: Rename updates only the target file, and deletion removes it
from the folder without affecting other files.

## Scenario 3: Unauthorized operation is rejected

1. Sign in as a viewer and attempt to upload a file to the existing folder.
2. Attempt any available preview, download, rename, or delete operation for a
   file when the viewer role is not authorized for that operation.
3. Relist or refresh the folder after each rejected operation.

Expected result: Each unauthorized operation returns the defined authorization
error (for example, HTTP 403), leaves the file and folder unchanged, and does
not create a new resource.

## Scenario 4: Missing folder or file is handled predictably

1. Address a folder identifier that does not exist and attempt an upload or
   file listing.
2. Address a file identifier that does not exist and attempt preview,
   download, rename, or delete.

Expected result: Each operation returns the defined not-found (or equivalent)
error (for example, HTTP 404), leaves existing data unchanged, and does not
create an unintended folder or file.