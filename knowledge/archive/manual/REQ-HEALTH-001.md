---
type: Manual Test Scenario Proposal
id: draft-manual-REQ-HEALTH-001
title: Manual verification for REQ-HEALTH-001
status: draft
trust_status: grounded
review_status: pending
requirement: ../../01-product/requirements/health.md
sources:
  - resource: /api/specs/health.spec.ts
---

# Manual verification for REQ-HEALTH-001

This proposal translates the approved product requirement into human-verifiable
scenarios. Review the business meaning, preconditions, and expected outcomes
before promotion.

## Requirement basis

---
type: Product Requirement
id: REQ-HEALTH-001
status: stable
trust_status: grounded
review_status: reviewed
source_requirement: /requirements/incoming/REQ-HEALTH-001.md
---

# Proposed product knowledge: REQ-HEALTH-001

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
