---
type: Product Requirement
id: REQ-FILES-001
title: Authenticated users manage files according to role
status: stable
trust_status: reviewed
source_requirement: ../../../requirements/incoming/REQ-FILES-001.md
---

# Authenticated users manage files according to role

## Requirement

Authenticated users can perform the file operations allowed by their role on
files inside a folder. The system supports upload, listing, preview, download,
rename, and deletion while protecting stored file names, enforcing
authorization, and handling missing folders or files predictably.

## Acceptance criteria

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

## Expected behavior

1. The user authenticates and selects or addresses a folder.
2. The system evaluates the user's role for each requested file operation.
3. For an authorized request, the system performs the operation and returns
   the resulting file metadata or content as appropriate.
4. For an unauthorized request, the system leaves the file unchanged and
   returns the expected authorization error.
5. For a request targeting a missing folder or file, the system leaves existing
   data unchanged and returns the expected not-found (or equivalent) error.

## Source

- [Incoming requirement](../../../requirements/incoming/REQ-FILES-001.md)
