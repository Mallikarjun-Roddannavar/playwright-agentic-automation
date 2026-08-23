---
type: Product Requirement
id: REQ-FOLDERS-001
status: stable
trust_status: grounded
review_status: reviewed
source_requirement: /requirements/incoming/REQ-FOLDERS-001.md
---

# Proposed product knowledge: REQ-FOLDERS-001

## Raw requirement

# Requirement: Folder management

Authenticated users must be able to view folders. Authorized roles should be
able to create, rename, and delete folders according to the application's role
permissions.

Acceptance criteria to confirm:

- folders can be listed;
- authorized users can create and rename folders;
- delete access follows the role rules;
- missing folders return a predictable error.

## Agent proposal

### Feature overview

Role-aware folder management for authenticated users, including viewing,
creation, renaming, and deletion.

### Business requirement

Authenticated users must be able to view folders. Users with the required role
must be able to create, rename, and delete folders according to the defined
permission rules.

### Acceptance criteria

- Authenticated users can list and view folders they are allowed to access.
- Authorized users can create a folder.
- Authorized users can rename a folder.
- Folder deletion follows the role permission rules.
- Requests for missing folders return the defined predictable error.

### Expected behavior

1. The user authenticates and opens the folder workspace.
2. The system displays folders available to that user.
3. The system permits create, rename, or delete actions only for authorized
   roles.
4. An operation against a missing folder returns the expected not-found result
   without affecting other folders.

### Business rules and ambiguities

- The exact role-to-operation matrix is not specified in this requirement.
- The exact missing-folder error status and message require confirmation.
- Naming constraints for new and renamed folders are not specified.

An external AI coding agent may propose this content, but a human must review
its meaning before it is copied to `knowledge/01-product/requirements/`.
