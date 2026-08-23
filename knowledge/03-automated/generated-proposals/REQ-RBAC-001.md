---
type: Testing Scenario
id: automated-REQ-RBAC-001
title: Automated coverage for REQ-RBAC-001
status: stable
trust_status: grounded
feature_status: existing_match
verification_status: grounded
requirements:
  - ../../01-product/requirements/rbac.md
sources:
  - resource: /ui/specs/multi-role.spec.ts
  - resource: /ui/specs/viewer-rbac.spec.ts
  - resource: /api/specs/rbac.spec.ts
---

# Automated coverage for REQ-RBAC-001

This requirement-focused proposal maps approved product meaning to existing
Playwright evidence. Review semantic coverage before promotion.

## Product requirement

See [approved product requirement](../../01-product/requirements/rbac.md).
## Candidate automation evidence

- Candidate evidence: `ui/specs/multi-role.spec.ts`
- Candidate evidence: `ui/specs/viewer-rbac.spec.ts`
- Candidate evidence: `api/specs/rbac.spec.ts`

## Coverage review

- Confirm which acceptance criteria are covered by existing tests.
- Identify missing UI/API scenarios, roles, assertions, and error paths.
- Do not treat source-file existence as proof that a requirement is verified.
