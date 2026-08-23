---
type: Product Requirement
id: REQ-RBAC-001
status: stable
trust_status: grounded
review_status: reviewed
source_requirement: /requirements/incoming/REQ-RBAC-001.md
---

# Role-based access

## Raw requirement

# Requirement: Role-based access

The application must enforce role-based permissions consistently in the UI and
API for admin, editor, and viewer users.

Acceptance criteria to confirm:

- viewers have read-only access;
- editors can perform permitted create/edit/upload actions;
- admins can perform permitted destructive actions;
- hidden UI actions and protected API responses remain aligned.

## Agent proposal

### Feature overview

Consistent role-based authorization across the UI and API for admin, editor,
and viewer users.

### Business requirement

The application must enforce the same role permissions in its user interface
and protected API operations so that users can perform only the actions allowed
for their role.

### Acceptance criteria

- Viewers have read-only access.
- Editors can perform permitted create, edit, and upload actions.
- Admins can perform permitted destructive actions.
- UI action visibility agrees with the corresponding protected API responses.

### Expected behavior

1. The system identifies the signed-in user's role.
2. The UI exposes only actions allowed for that role.
3. The API authorizes each protected operation independently.
4. Unauthorized API requests are rejected and do not change protected data.
5. UI visibility and API authorization remain aligned for the same operation.

### Business rules and ambiguities

- The complete role-to-operation matrix is not specified in this requirement.
- The exact unauthorized status and error body require confirmation.
- The definition of destructive actions requires confirmation.
