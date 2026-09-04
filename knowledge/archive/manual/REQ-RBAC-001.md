---
type: Manual Test Scenario Proposal
id: draft-manual-REQ-RBAC-001
title: Manual verification for REQ-RBAC-001
status: draft
trust_status: grounded
review_status: pending
requirement: ../../01-product/requirements/rbac.md
sources:
  - resource: /ui/specs/multi-role.spec.ts
  - resource: /ui/specs/viewer-rbac.spec.ts
  - resource: /api/specs/rbac.spec.ts
---

# Manual verification for REQ-RBAC-001

This proposal translates the approved product requirement into human-verifiable
scenarios. Review the business meaning, preconditions, and expected outcomes
before promotion.

## Requirement basis

---

type: Product Requirement
id: REQ-RBAC-001
status: stable
trust_status: grounded
review_status: reviewed
source_requirement: /requirements/incoming/REQ-RBAC-001.md

---

# Proposed product knowledge: REQ-RBAC-001

## Scenarios to review

1. Verify each approved acceptance criterion under its applicable user role or
   service state.
2. Verify the expected successful outcome and visible/API result.
3. Verify the relevant rejection, missing-resource, or persistence behavior.
4. Confirm that unrelated product data is unchanged.

## Review points

- Confirm exact roles, error wording, response status, and persistence rules.
- Add feature-specific steps before promotion; this proposal is intentionally
  grounded but not semantically verified.
