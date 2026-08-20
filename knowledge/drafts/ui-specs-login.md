---
type: Testing Knowledge Proposal
id: draft-ui-specs-login
status: draft
trust_status: grounded
feature_status: candidate
sources:
  - resource: /ui/specs/login.spec.ts
---

# ui/specs/login.spec.ts

This is an agent-generated proposal. Review the semantic feature name before promotion.

## Test evidence

- Kind: ui
- Describe blocks: Login
- Tests: admin login succeeds, expired stored session redirects to login, invalid credentials show error
- Source SHA-256: 757e24c0dad0be5b410a3716177c7c05904812c151ce55f3457677e2082b2748

## Static relationships

- IMPORTS_PACKAGE: @playwright/test
- IMPORTS: config/test-config.json
- IMPORTS: ui/pages/LoginPage.ts
- INSTANTIATES: ui/pages/LoginPage.ts
- USES_PAGE: ui/pages/LoginPage.ts

verification_status: grounded
