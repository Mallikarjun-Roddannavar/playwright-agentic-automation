# UI Manual Test Cases

## Preconditions

- Backend is running and reachable.
- Frontend is running and reachable.
- Browser local storage can be cleared between scenarios when needed.
- Use fresh test data for create, rename, upload, and delete scenarios.

## Login And Session

### UI-LOG-01 Admin login succeeds

- Type: Positive
- Preconditions: User is logged out.
- Test Data: `admin / admin123`
- Steps:
  1. Open `/login`.
  2. Enter valid admin credentials.
  3. Click `Login`.
- Expected Result:
  1. User is redirected to `/`.
  2. `Dashboard` is visible.
  3. Profile menu shows username `admin` and role `admin`.

### UI-LOG-02 Editor login succeeds

- Type: Positive
- Preconditions: User is logged out.
- Test Data: `editor / editor123`
- Steps:
  1. Open `/login`.
  2. Sign in with editor credentials.
  3. Open folders and files areas.
- Expected Result:
  1. Login succeeds.
  2. Editor can see create and rename actions.
  3. Editor does not get delete capability in folders or files.

### UI-LOG-03 Viewer login succeeds with read-only UI

- Type: Positive
- Preconditions: User is logged out.
- Test Data: `viewer / viewer123`
- Steps:
  1. Open `/login`.
  2. Sign in with viewer credentials.
  3. Open folders and a folder's files page.
- Expected Result:
  1. Login succeeds.
  2. Viewer can read data and refresh data.
  3. Viewer does not see create, upload, or delete actions.

### UI-LOG-04 Invalid password shows error

- Type: Negative, Error Handling
- Preconditions: User is logged out.
- Test Data: `admin / wrong-password`
- Steps:
  1. Open `/login`.
  2. Submit invalid credentials.
- Expected Result:
  1. User stays on login page.
  2. Error message is shown.
  3. No authenticated session is created.

### UI-LOG-05 Blank username and password are rejected

- Type: Negative, Error Handling
- Preconditions: User is logged out.
- Test Data: blank username, blank password
- Steps:
  1. Open `/login`.
  2. Leave both fields blank.
  3. Click `Login`.
- Expected Result:
  1. Login does not succeed.
  2. Error is shown to the user.
  3. User remains unauthenticated.

### UI-LOG-06 Unauthenticated deep link redirects to login

- Type: Negative
- Preconditions: Clear local storage and ensure no user is logged in.
- Steps:
  1. Open `/folders` directly.
  2. Open `/folders/<existing-folder-id>` directly.
  3. Open `/preferences` directly.
- Expected Result:
  1. Each route redirects to `/login`.
  2. Protected content is not rendered before redirect.

### UI-LOG-07 Logged-in user opening `/login` is redirected home

- Type: Positive
- Preconditions: Log in successfully as any valid role.
- Steps:
  1. While authenticated, navigate to `/login`.
- Expected Result:
  1. User is redirected to `/`.
  2. Existing authenticated session remains active.

### UI-LOG-08 Logout clears session

- Type: Positive, Error Handling
- Preconditions: Log in successfully as any valid role.
- Steps:
  1. Open the profile menu.
  2. Click `Logout`.
  3. Try to revisit `/`, `/folders`, and `/preferences`.
- Expected Result:
  1. Session is cleared.
  2. User is returned to the login page.
  3. Protected routes redirect back to `/login`.

### UI-LOG-09 OAuth login surfaces configuration error when OAuth is not configured

- Type: Negative, Error Handling
- Preconditions: Backend OAuth environment variables are not configured.
- Steps:
  1. Open `/login`.
  2. Click `Login with OAuth`.
- Expected Result:
  1. User remains on login page.
  2. An OAuth-related error is shown.
  3. No authenticated session is created.

### UI-LOG-10 OAuth callback without required parameters shows error

- Type: Negative, Error Handling
- Preconditions: User is logged out.
- Steps:
  1. Open `/oauth/callback` without `code` and `state` query parameters.
- Expected Result:
  1. Callback page loads.
  2. Error message indicates missing callback parameters.
  3. No login occurs.

## Navigation, Home, And Preferences

### UI-NAV-01 Sidebar navigation works across protected pages

- Type: Positive
- Preconditions: Log in as any valid role.
- Steps:
  1. Open the hamburger menu.
  2. Navigate to `Home`, `Folders`, and `Preferences` from the sidebar.
- Expected Result:
  1. Each navigation target loads correctly.
  2. Sidebar closes after navigation.
  3. Page titles match the selected area.

### UI-HME-01 Dashboard stats render after login

- Type: Positive
- Preconditions: Log in as any valid role.
- Steps:
  1. Land on the dashboard.
  2. Wait for stats to load.
- Expected Result:
  1. `Total Folders` and `Total Files` cards are visible.
  2. Values render without page crash.

### UI-PRF-01 Theme toggle updates and persists after refresh

- Type: Positive, Error Handling
- Preconditions: Log in as any valid role.
- Steps:
  1. Open `Preferences`.
  2. Toggle theme.
  3. Refresh the page.
- Expected Result:
  1. Theme label changes between light and dark wording.
  2. Selected theme remains applied after refresh.

### UI-PRF-02 Profile icon upload and removal work

- Type: Positive
- Preconditions: Log in as any valid role. Have a valid image file available.
- Steps:
  1. Open `Preferences`.
  2. Upload a profile icon image.
  3. Confirm preview is shown.
  4. Remove the icon.
- Expected Result:
  1. Uploaded image preview is displayed after upload.
  2. Header profile image updates.
  3. Removing the icon clears the preview and header image.

## Folder Management

### UI-FLD-01 Admin can create a folder

- Type: Positive
- Preconditions: Log in as admin.
- Test Data: unique folder name
- Steps:
  1. Open `Folders`.
  2. Click `New Folder`.
  3. Enter a unique name and submit.
- Expected Result:
  1. Success toast is shown.
  2. Folder appears in the table after refresh.
  3. `Last synced` updates.

### UI-FLD-02 Editor can create a folder

- Type: Positive
- Preconditions: Log in as editor.
- Test Data: unique folder name
- Steps:
  1. Open `Folders`.
  2. Create a folder.
- Expected Result:
  1. Folder creation succeeds.
  2. New folder is visible in the list.

### UI-FLD-03 Viewer cannot create or delete folders from the UI

- Type: Negative
- Preconditions: Log in as viewer.
- Steps:
  1. Open `Folders`.
  2. Inspect available actions.
- Expected Result:
  1. `New Folder` is not available.
  2. Bulk delete is not available.
  3. Per-row delete is not available.

### UI-FLD-04 Duplicate folder name is rejected

- Type: Negative, Error Handling
- Preconditions: A folder named `Reports` already exists.
- Test Data: `Reports`
- Steps:
  1. Open `Folders`.
  2. Try to create another folder with the same name.
- Expected Result:
  1. Create action fails.
  2. Error is shown.
  3. Duplicate folder is not added.

### UI-FLD-05 Folder name minimum boundary of 1 character succeeds

- Type: Boundary Positive
- Preconditions: Log in as editor or admin.
- Test Data: `A`
- Steps:
  1. Create a folder using a 1-character name.
- Expected Result:
  1. Folder creation succeeds.
  2. Folder is listed with the exact name.

### UI-FLD-06 Folder name maximum boundary of 100 characters succeeds

- Type: Boundary Positive
- Preconditions: Log in as editor or admin.
- Test Data: 100-character folder name
- Steps:
  1. Create a folder using exactly 100 characters.
- Expected Result:
  1. Folder creation succeeds.
  2. Name is stored and displayed correctly.

### UI-FLD-07 Folder name longer than 100 characters is rejected

- Type: Boundary Negative, Error Handling
- Preconditions: Log in as editor or admin.
- Test Data: 101-character folder name
- Steps:
  1. Try to create a folder using 101 characters.
- Expected Result:
  1. Create action fails.
  2. Validation-related error is shown.
  3. Folder is not added.

### UI-FLD-08 Whitespace-only folder name should be rejected

- Type: Boundary Negative, Defect-Focused
- Preconditions: Log in as editor or admin.
- Test Data: spaces only, for example `   `
- Steps:
  1. Open create folder dialog.
  2. Enter whitespace only.
  3. Try to submit.
- Expected Result:
  1. Folder name should be treated as invalid after trimming.
  2. Empty folder name should not be created.
- Notes:
  1. This case is intended to expose trim-related validation gaps.

### UI-FLD-09 Rename folder succeeds for editor/admin

- Type: Positive
- Preconditions: Log in as editor or admin. At least one folder exists.
- Test Data: unique new folder name
- Steps:
  1. Select an existing folder.
  2. Click `Rename`.
  3. Enter a unique name and save.
- Expected Result:
  1. Rename succeeds.
  2. Updated name appears in the folder table.

### UI-FLD-10 Rename folder to an existing name is rejected

- Type: Negative, Error Handling
- Preconditions: Log in as editor or admin. Two different folders exist.
- Steps:
  1. Select one folder.
  2. Try to rename it to the other folder's name.
- Expected Result:
  1. Rename fails.
  2. Error is shown.
  3. Original name remains unchanged.

### UI-FLD-11 Admin can delete a single folder

- Type: Positive
- Preconditions: Log in as admin. At least one disposable folder exists.
- Steps:
  1. Select a folder.
  2. Click `Delete`.
  3. Confirm deletion.
- Expected Result:
  1. Success toast is shown.
  2. Folder disappears from the list.

### UI-FLD-12 Admin can bulk delete selected folders

- Type: Positive
- Preconditions: Log in as admin. Two or more disposable folders exist.
- Steps:
  1. Select multiple folders.
  2. Click `Delete Selected`.
  3. Confirm deletion.
- Expected Result:
  1. Success toast is shown.
  2. Selected folders are removed.
  3. Selection is cleared.

### UI-FLD-13 Open and open-in-new-tab require selection

- Type: Negative, Error Handling
- Preconditions: Log in as any role. At least one folder exists.
- Steps:
  1. Observe folder action buttons before selecting a row.
  2. Select a folder.
  3. Retry `Open` and `Open in New Tab`.
- Expected Result:
  1. Actions are disabled before selection.
  2. Actions become available after selection.
  3. Navigation works after selection.

### UI-FLD-14 Invalid folder deep link shows error on files page

- Type: Negative, Error Handling
- Preconditions: Log in as any role.
- Steps:
  1. Open `/folders/<non-existent-folder-id>`.
- Expected Result:
  1. Files page loads without application crash.
  2. Error is shown for missing folder.
  3. File list is not populated.

## File Management

### UI-FIL-01 Open a folder and view its files

- Type: Positive
- Preconditions: Log in as any role. At least one folder exists.
- Steps:
  1. Open `Folders`.
  2. Select a folder.
  3. Click `Open`.
- Expected Result:
  1. User lands on the folder's files page.
  2. Files page title includes the folder name when available.

### UI-FIL-02 Editor or admin can upload a file

- Type: Positive
- Preconditions: Log in as editor or admin. Open a folder. Have a local file available.
- Steps:
  1. Click `Upload File`.
  2. Pick a file.
  3. Submit upload.
- Expected Result:
  1. Upload succeeds.
  2. Success toast is shown.
  3. Uploaded file appears in the table.

### UI-FIL-03 Viewer cannot upload or delete files from the UI

- Type: Negative
- Preconditions: Log in as viewer. Open a folder.
- Steps:
  1. Inspect available actions.
- Expected Result:
  1. Upload action is not available.
  2. Delete selected is not available.
  3. Per-row delete is not available.

### UI-FIL-04 File rename succeeds

- Type: Positive
- Preconditions: Log in as editor or admin. Open a folder containing at least one file.
- Test Data: unique new file name
- Steps:
  1. Select a file.
  2. Click `Rename`.
  3. Enter a new name and save.
- Expected Result:
  1. Rename succeeds.
  2. Updated file name is shown in the table.

### UI-FIL-05 File rename maximum boundary of 255 characters succeeds

- Type: Boundary Positive
- Preconditions: Log in as editor or admin. Open a folder containing at least one file.
- Test Data: 255-character file name
- Steps:
  1. Rename the selected file to exactly 255 characters.
- Expected Result:
  1. Rename succeeds.
  2. New name is displayed correctly.

### UI-FIL-06 File rename longer than 255 characters is rejected

- Type: Boundary Negative, Error Handling
- Preconditions: Log in as editor or admin. Open a folder containing at least one file.
- Test Data: 256-character file name
- Steps:
  1. Try to rename the selected file to 256 characters.
- Expected Result:
  1. Rename fails.
  2. Validation-related error is shown.
  3. Original file name remains unchanged.

### UI-FIL-07 Whitespace-only file rename should be rejected

- Type: Boundary Negative, Defect-Focused
- Preconditions: Log in as editor or admin. Open a folder containing at least one file.
- Test Data: spaces only, for example `   `
- Steps:
  1. Select a file.
  2. Open rename dialog.
  3. Enter whitespace only and submit.
- Expected Result:
  1. Empty file names should not be allowed after trimming.
  2. Original name should remain unchanged.
- Notes:
  1. This case is intended to expose trim-related validation gaps.

### UI-FIL-08 Preview opens the file in a separate window

- Type: Positive
- Preconditions: Log in as any role. Open a folder with at least one file.
- Steps:
  1. Select a file.
  2. Click `Preview`.
- Expected Result:
  1. Preview opens in a popup window.
  2. File content or browser preview is rendered when supported.

### UI-FIL-09 Download opens in a new browser context

- Type: Positive
- Preconditions: Log in as any role. Open a folder with at least one file.
- Steps:
  1. Select a file.
  2. Click `Download`.
- Expected Result:
  1. Download is initiated in a new browser tab or download flow.
  2. Downloaded file name matches the selected file.

### UI-FIL-10 Download all is disabled when no files exist

- Type: Negative, Error Handling
- Preconditions: Log in as any role. Open an empty folder.
- Steps:
  1. Observe the files toolbar.
- Expected Result:
  1. `Download All` is disabled when there are no files.

### UI-FIL-11 Download selected requires file selection

- Type: Negative, Error Handling
- Preconditions: Log in as admin. Open a folder with files.
- Steps:
  1. Observe `Download Selected` without selecting files.
  2. Select one or more files.
- Expected Result:
  1. `Download Selected` is disabled before selection.
  2. It becomes enabled after at least one file is selected.

### UI-FIL-12 Admin can delete a single file

- Type: Positive
- Preconditions: Log in as admin. Open a folder containing a disposable file.
- Steps:
  1. Select the file.
  2. Click `Delete`.
  3. Confirm deletion.
- Expected Result:
  1. File is removed from the list.
  2. Success toast is shown.

### UI-FIL-13 Admin can bulk delete selected files

- Type: Positive
- Preconditions: Log in as admin. Open a folder with two or more disposable files.
- Steps:
  1. Select multiple files.
  2. Click `Delete Selected`.
  3. Confirm deletion.
- Expected Result:
  1. Selected files are removed.
  2. Selection is cleared.

### UI-FIL-14 Manual refresh reflects newly created data

- Type: Positive, Error Handling
- Preconditions: Use two sessions or roles. One session is on the files page. Another session adds or removes a file in the same folder.
- Steps:
  1. Keep the first session open on the files page.
  2. Make a data change from the second session.
  3. Click `Refresh` in the first session.
- Expected Result:
  1. Latest data is shown after refresh.
  2. `Last synced` updates.

### UI-FIL-15 Auto-refresh reflects newly created data within polling window

- Type: Positive, Error Handling
- Preconditions: Use two sessions or roles. One session remains on folders or files page while another session changes data.
- Steps:
  1. Make a folder or file change from the second session.
  2. Wait longer than 5 seconds on the first session.
- Expected Result:
  1. Data updates without manual refresh.
  2. UI does not crash during polling.
