# API Manual Test Cases

## Preconditions

- Backend is running at the expected base URL.
- Use Swagger, Postman, curl, or Playwright API tooling for execution.
- Use unique folder and file names for create and rename scenarios.
- Clean up created test data after execution.

## Health And Authentication

### API-HLT-01 Health endpoint is reachable
- Type: Positive
- Request: `GET /health`
- Expected Result:
  1. Status code is `200`.
  2. Response body is `{ "status": "ok" }`.

### API-AUTH-01 Password token issuance succeeds for admin
- Type: Positive
- Request: `POST /token`
- Test Data: `username=admin`, `password=admin123`
- Expected Result:
  1. Status code is `200`.
  2. Response includes `access_token` and `token_type=bearer`.

### API-AUTH-02 Password token issuance fails for invalid credentials
- Type: Negative, Error Handling
- Request: `POST /token`
- Test Data: invalid username or password
- Expected Result:
  1. Status code is `401`.
  2. Error detail indicates invalid credentials.

### API-AUTH-03 JSON login succeeds for editor
- Type: Positive
- Request: `POST /auth/login`
- Test Data: `editor / editor123`
- Expected Result:
  1. Status code is `200`.
  2. Response contains username `editor` and role `editor`.

### API-AUTH-04 JSON login fails for invalid credentials
- Type: Negative, Error Handling
- Request: `POST /auth/login`
- Test Data: invalid username or password
- Expected Result:
  1. Status code is `401`.
  2. Error detail indicates invalid credentials.

### API-AUTH-05 Protected endpoint rejects missing bearer token
- Type: Negative, Error Handling
- Request: `GET /folders` without `Authorization` header
- Expected Result:
  1. Status code is `401`.
  2. Request is not treated as authenticated.

### API-AUTH-06 Protected endpoint rejects invalid bearer token
- Type: Negative, Error Handling
- Request: `GET /folders` with malformed or invalid bearer token
- Expected Result:
  1. Status code is `401`.
  2. Error detail indicates credentials could not be validated.

### API-OAUTH-01 OAuth login reports configuration error when OAuth is not configured
- Type: Negative, Error Handling
- Request: `GET /auth/oauth/login`
- Preconditions: Required `OAUTH_*` environment variables are not set.
- Expected Result:
  1. Status code is `503`.
  2. Error detail indicates OAuth is not configured.

### API-OAUTH-02 OAuth callback rejects invalid or expired state
- Type: Negative, Error Handling
- Request: `GET /auth/oauth/callback?code=<code>&state=<bad-state>`
- Preconditions: OAuth environment is configured.
- Expected Result:
  1. Status code is `400`.
  2. Error detail indicates invalid or expired OAuth state.

## Stats And Folder APIs

### API-STA-01 Stats endpoint succeeds for authenticated user
- Type: Positive
- Request: `GET /stats`
- Preconditions: Valid bearer token for any role.
- Expected Result:
  1. Status code is `200`.
  2. Response contains integer `totalFolders` and `totalFiles`.

### API-FLD-01 List folders succeeds for authenticated viewer
- Type: Positive
- Request: `GET /folders`
- Preconditions: Valid viewer token.
- Expected Result:
  1. Status code is `200`.
  2. Response is a folder array.

### API-FLD-02 Viewer cannot create a folder
- Type: Negative, Error Handling
- Request: `POST /folders`
- Preconditions: Valid viewer token.
- Body: `{ "name": "viewer-create-attempt" }`
- Expected Result:
  1. Status code is `403`.
  2. Error detail indicates create or edit requires editor or admin.

### API-FLD-03 Editor can create a folder
- Type: Positive
- Request: `POST /folders`
- Preconditions: Valid editor token.
- Body: unique folder name
- Expected Result:
  1. Status code is `200`.
  2. Response contains new folder id, name, owner, and `files` array.

### API-FLD-04 Admin can create a folder
- Type: Positive
- Request: `POST /folders`
- Preconditions: Valid admin token.
- Body: unique folder name
- Expected Result:
  1. Status code is `200`.
  2. Folder is persisted and visible in subsequent `GET /folders`.

### API-FLD-05 Folder name minimum boundary of 1 character succeeds
- Type: Boundary Positive
- Request: `POST /folders`
- Preconditions: Valid editor or admin token.
- Body: `{ "name": "A" }`
- Expected Result:
  1. Status code is `200`.
  2. Folder is created with the same name.

### API-FLD-06 Folder name maximum boundary of 100 characters succeeds
- Type: Boundary Positive
- Request: `POST /folders`
- Preconditions: Valid editor or admin token.
- Body: 100-character folder name
- Expected Result:
  1. Status code is `200`.
  2. Folder is created successfully.

### API-FLD-07 Folder name longer than 100 characters is rejected
- Type: Boundary Negative, Error Handling
- Request: `POST /folders`
- Preconditions: Valid editor or admin token.
- Body: 101-character folder name
- Expected Result:
  1. Status code is `422`.
  2. Validation error identifies the name field length issue.

### API-FLD-08 Duplicate folder name is rejected case-insensitively
- Type: Negative, Error Handling
- Request: `POST /folders`
- Preconditions: A folder named `Reports` already exists.
- Body: `{ "name": "reports" }`
- Expected Result:
  1. Status code is `409`.
  2. Error detail indicates folder name already exists.

### API-FLD-09 Trimmed duplicate folder name is rejected
- Type: Negative, Error Handling
- Request: `POST /folders`
- Preconditions: A folder named `Reports` already exists.
- Body: `{ "name": "  Reports  " }`
- Expected Result:
  1. Status code is `409`.
  2. Service treats the trimmed value as duplicate.

### API-FLD-10 Whitespace-only folder name should be rejected after trimming
- Type: Boundary Negative, Defect-Focused
- Request: `POST /folders`
- Preconditions: Valid editor or admin token.
- Body: `{ "name": "   " }`
- Expected Result:
  1. API should reject an effectively empty folder name.
  2. Empty-named folder should not be created.
- Notes:
  1. This case is intended to catch trim-after-validation defects.

### API-FLD-11 Rename folder succeeds
- Type: Positive
- Request: `PUT /folders/{folder_id}`
- Preconditions: Valid editor or admin token. Target folder exists.
- Body: unique new folder name
- Expected Result:
  1. Status code is `200`.
  2. Folder response reflects the new name.

### API-FLD-12 Rename folder to duplicate name is rejected
- Type: Negative, Error Handling
- Request: `PUT /folders/{folder_id}`
- Preconditions: Valid editor or admin token. Another folder already has the target name.
- Expected Result:
  1. Status code is `409`.
  2. Original folder name remains unchanged.

### API-FLD-13 Rename missing folder returns not found
- Type: Negative, Error Handling
- Request: `PUT /folders/{missing-folder-id}`
- Preconditions: Valid editor or admin token.
- Expected Result:
  1. Status code is `404`.
  2. Error detail indicates folder not found.

### API-FLD-14 Editor cannot delete a folder
- Type: Negative, Error Handling
- Request: `DELETE /folders/{folder_id}`
- Preconditions: Valid editor token. Target folder exists.
- Expected Result:
  1. Status code is `403`.
  2. Error detail indicates delete requires admin.

### API-FLD-15 Admin can delete a folder
- Type: Positive
- Request: `DELETE /folders/{folder_id}`
- Preconditions: Valid admin token. Target folder exists.
- Expected Result:
  1. Status code is `200`.
  2. Response contains deletion message.
  3. Folder is absent from subsequent folder listing.

### API-FLD-16 Delete missing folder returns not found
- Type: Negative, Error Handling
- Request: `DELETE /folders/{missing-folder-id}`
- Preconditions: Valid admin token.
- Expected Result:
  1. Status code is `404`.
  2. Error detail indicates folder not found.

## File CRUD APIs

### API-FIL-01 List files succeeds for an existing folder
- Type: Positive
- Request: `GET /folders/{folder_id}/files`
- Preconditions: Valid bearer token. Target folder exists.
- Expected Result:
  1. Status code is `200`.
  2. Response is an array of file objects.

### API-FIL-02 Listing files for a missing folder returns not found
- Type: Negative, Error Handling
- Request: `GET /folders/{missing-folder-id}/files`
- Preconditions: Valid bearer token.
- Expected Result:
  1. Status code is `404`.
  2. Error detail indicates folder not found.

### API-FIL-03 Editor can upload a file
- Type: Positive
- Request: `POST /folders/{folder_id}/files`
- Preconditions: Valid editor token. Target folder exists.
- Body: multipart form-data with one file
- Expected Result:
  1. Status code is `200`.
  2. Response contains file id, name, uploadedBy, and size.

### API-FIL-04 Viewer cannot upload a file
- Type: Negative, Error Handling
- Request: `POST /folders/{folder_id}/files`
- Preconditions: Valid viewer token. Target folder exists.
- Expected Result:
  1. Status code is `403`.
  2. Error detail indicates create or edit requires editor or admin.

### API-FIL-05 Uploading to a missing folder should not leave an orphan file on disk
- Type: Negative, Defect-Focused
- Request: `POST /folders/{missing-folder-id}/files`
- Preconditions: Valid editor or admin token.
- Body: multipart form-data with one file
- Expected Result:
  1. API returns `404` for missing folder.
  2. No file artifact should remain in `backend/uploads`.
- Notes:
  1. This case verifies cleanup behavior, not just response code.

### API-FIL-06 Rename file succeeds
- Type: Positive
- Request: `PUT /folders/{folder_id}/files/{file_id}`
- Preconditions: Valid editor or admin token. Folder and file exist.
- Body: unique new file name
- Expected Result:
  1. Status code is `200`.
  2. Response contains the updated file name.

### API-FIL-07 File rename maximum boundary of 255 characters succeeds
- Type: Boundary Positive
- Request: `PUT /folders/{folder_id}/files/{file_id}`
- Preconditions: Valid editor or admin token. Folder and file exist.
- Body: 255-character file name
- Expected Result:
  1. Status code is `200`.
  2. Response stores the new name successfully.

### API-FIL-08 File rename longer than 255 characters is rejected
- Type: Boundary Negative, Error Handling
- Request: `PUT /folders/{folder_id}/files/{file_id}`
- Preconditions: Valid editor or admin token. Folder and file exist.
- Body: 256-character file name
- Expected Result:
  1. Status code is `422`.
  2. Validation error identifies the name length issue.

### API-FIL-09 Whitespace-only file rename should be rejected after trimming
- Type: Boundary Negative, Defect-Focused
- Request: `PUT /folders/{folder_id}/files/{file_id}`
- Preconditions: Valid editor or admin token. Folder and file exist.
- Body: `{ "name": "   " }`
- Expected Result:
  1. API should reject an effectively empty file name.
  2. File name should remain unchanged.
- Notes:
  1. This case is intended to catch trim-after-validation defects.

### API-FIL-10 Rename missing file returns not found
- Type: Negative, Error Handling
- Request: `PUT /folders/{folder_id}/files/{missing-file-id}`
- Preconditions: Valid editor or admin token. Folder exists.
- Expected Result:
  1. Status code is `404`.
  2. Error detail indicates file not found.

### API-FIL-11 Editor cannot delete a file
- Type: Negative, Error Handling
- Request: `DELETE /folders/{folder_id}/files/{file_id}`
- Preconditions: Valid editor token. Folder and file exist.
- Expected Result:
  1. Status code is `403`.
  2. Error detail indicates delete requires admin.

### API-FIL-12 Admin can delete a file
- Type: Positive
- Request: `DELETE /folders/{folder_id}/files/{file_id}`
- Preconditions: Valid admin token. Folder and file exist.
- Expected Result:
  1. Status code is `200`.
  2. Response contains deletion message.
  3. File is absent from subsequent file listing.

### API-FIL-13 Delete missing file returns not found
- Type: Negative, Error Handling
- Request: `DELETE /folders/{folder_id}/files/{missing-file-id}`
- Preconditions: Valid admin token. Folder exists.
- Expected Result:
  1. Status code is `404`.
  2. Error detail indicates file not found.

## Preview And Download APIs

### API-DWN-01 Preview file succeeds with valid token query parameter
- Type: Positive
- Request: `GET /folders/{folder_id}/files/{file_id}/preview?token=<valid-token>`
- Preconditions: Folder and file exist. Token belongs to any valid role.
- Expected Result:
  1. Status code is `200`.
  2. Response streams the file inline.

### API-DWN-02 Preview file rejects invalid token
- Type: Negative, Error Handling
- Request: `GET /folders/{folder_id}/files/{file_id}/preview?token=<invalid-token>`
- Expected Result:
  1. Status code is `401`.
  2. File content is not returned.

### API-DWN-03 Download file succeeds with valid token query parameter
- Type: Positive
- Request: `GET /folders/{folder_id}/files/{file_id}/download?token=<valid-token>`
- Preconditions: Folder and file exist. Token belongs to any valid role.
- Expected Result:
  1. Status code is `200`.
  2. Response is returned as attachment.
  3. Downloaded filename matches stored display name.

### API-DWN-04 Download zip for all files in a folder succeeds when files exist
- Type: Positive
- Request: `GET /folders/{folder_id}/files/download?token=<valid-token>`
- Preconditions: Folder contains at least one file.
- Expected Result:
  1. Status code is `200`.
  2. Response media type is `application/zip`.
  3. Archive contains the folder's files.

### API-DWN-05 Download zip for selected files rejects unknown file id
- Type: Negative, Error Handling
- Request: `GET /folders/{folder_id}/files/download?token=<valid-token>&fileIds=<bad-id>`
- Preconditions: Folder exists.
- Expected Result:
  1. Status code is `404`.
  2. Error detail indicates file not found.

### API-DWN-06 Download zip from empty folder returns bad request
- Type: Negative, Error Handling
- Request: `GET /folders/{folder_id}/files/download?token=<valid-token>`
- Preconditions: Folder exists and contains no files.
- Expected Result:
  1. Status code is `400`.
  2. Error detail indicates no files are available for download.

### API-DWN-07 Download and preview return not found when backing file is missing on disk
- Type: Negative, Error Handling
- Request:
  1. `GET /folders/{folder_id}/files/{file_id}/preview?token=<valid-token>`
  2. `GET /folders/{folder_id}/files/{file_id}/download?token=<valid-token>`
- Preconditions: File metadata exists in JSON, but the physical file is removed from `backend/uploads`.
- Expected Result:
  1. Status code is `404` for both endpoints.
  2. Error detail indicates file not found on disk.

### API-DWN-08 Zip download should deduplicate unsafe or duplicate archive entry names cleanly
- Type: Boundary, Error Handling
- Request: `GET /folders/{folder_id}/files/download?token=<valid-token>`
- Preconditions: Folder contains files whose display names normalize to the same sanitized archive name.
- Expected Result:
  1. Status code is `200`.
  2. Zip entries remain unique and readable.
  3. Archive does not fail because of duplicate entry names.
