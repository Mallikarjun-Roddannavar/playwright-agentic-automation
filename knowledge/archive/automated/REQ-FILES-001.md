---
type: Testing Knowledge Proposal
id: draft-automated-REQ-FILES-001
title: Role-aware file management automation
status: draft
trust_status: grounded
feature_status: existing_match
verification_status: grounded
requirements:
  - ../../01-product/requirements/files.md
sources:
  - resource: /api/specs/files.spec.ts
  - resource: /ui/specs/files.spec.ts
  - resource: /api/services/FilesService.ts
  - resource: /api/services/FoldersService.ts
  - resource: /ui/pages/FolderFilesPage.ts
---

# Role-aware file management automation

This proposal maps the existing Playwright file-management tests to
`REQ-FILES-001`. The semantic coverage should be reviewed before promotion.

## Automated coverage

- API test `api/specs/files.spec.ts` verifies that an editor can upload a file
  with path components in its submitted name, that the exposed name is the safe
  basename, and that the stored name matches the opaque 32-character
  hexadecimal format.
- The same API test verifies a viewer upload is rejected with HTTP 403, an
  upload to a missing folder is rejected with HTTP 404, and the authorized
  listing contains exactly the uploaded file.
- UI tests `ui/specs/files.spec.ts` verify that both editor and admin roles can
  upload a file through the folders UI and see the success toast and uploaded
  filename.

## Framework mapping

- API fixtures: `editorRequest`, `viewerRequest`, and `adminRequest`.
- UI fixtures: `editorPage` and `adminPage`.
- API services: `FilesService` and `FoldersService`.
- Page Objects: `HomePage`, `FoldersPage`, and `FolderFilesPage`.
- Test cleanup removes created folders through the folders service.

## Coverage boundaries and review points

The current automated evidence covers upload authorization, safe-name storage,
listing, and missing-folder handling. It does not independently demonstrate
preview, download, rename, delete, missing-file handling, or post-rejection
state checks. Those acceptance criteria remain uncovered unless additional
tests are added.
