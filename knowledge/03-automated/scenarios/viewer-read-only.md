---
type: Testing Scenario
id: viewer-read-only-evidence
status: stable
trust_status: grounded
sources:
  - resource: /requirements/incoming/REQ-RBAC-001.md
  - resource: /knowledge/01-product/requirements/rbac.md
  - resource: /api/specs/rbac.spec.ts
  - resource: /app/backend/main.py
  - resource: /ui/specs/viewer-rbac.spec.ts
---

# Why the Viewer test rejects folder creation

This is a technical evidence map checked against source on 2026-09-10, not a new
approved product requirement. Existing RBAC knowledge is marked reviewed but
has no attributable reviewer in this copy; its provenance limitation remains.

## Intent and implementation

[Raw RBAC input](../../../requirements/incoming/REQ-RBAC-001.md) and the
[existing product note](../../01-product/requirements/rbac.md) describe Viewer
as read-only. Creating a folder writes data, so allowing that operation conflicts
with the stated read-only intent.

The [API regression](../../../api/specs/rbac.spec.ts), titled
“viewer cannot create folder, editor can create, admin can delete,” sends a
Viewer creation request through [FoldersService.create](../../../api/services/FoldersService.ts)
and asserts status 403. It then creates as Editor and registers Admin deletion
as teardown. Admin deletion here is cleanup, not a separate Viewer-delete test.

The [backend](../../../app/backend/main.py) calls `require_editor_or_admin`
from `create_folder`; that helper rejects Viewer with 403. The
[UI test](../../../ui/specs/viewer-rbac.spec.ts) checks read-only controls.
[AuthContext](../../../app/frontend/src/context/AuthContext.tsx) computes
`canCreateEdit` and `canDelete` from the role. UI visibility alone cannot prove
that the API enforces the same permission.

## What remains unproven

- The product note explicitly leaves exact unauthorized status/error semantics
  and parts of the permission matrix open. The current test and implementation
  support 403; independent product approval of that HTTP contract is absent.
- These linked tests do not directly assert that Viewer cannot delete a folder.
  Read-only intent suggests that expectation, but it is not executed coverage.
- This note records source inspection. It does not assert that the reference
  application's UI/API tests ran during this investigation.

## Reusable failure lesson

[The controlled demo](../../../docs/FIVE_MINUTE_DEMO.md) runs a separate miniature
API, using the reference FoldersService. A correct run rejects creation and
stores no folder; an injected authorization fault returns 200 and stores a
folder. Its printed run directory contains actual responses, data state,
Playwright output and source hashes. It does not execute the FastAPI app or
prove anything about its real authentication.

When runtime evidence shows a read-only role successfully writing data, retain
the assertion and investigate the product. Changing 403 to 200 would accept the
unauthorized write. If the only disagreement is a different rejection status
with no write, investigate the unresolved contract instead of declaring an
authorization defect automatically.

After a real investigation, an agent can propose a linked failure note with
sanitized evidence. Human confirmation is required for new permission rules or
contract meaning. Future agents should check these links and open questions
before treating this note as current.
