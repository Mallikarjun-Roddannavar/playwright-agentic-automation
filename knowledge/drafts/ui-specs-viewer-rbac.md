---
type: Testing Knowledge Proposal
id: draft-ui-specs-viewer-rbac
status: draft
trust_status: grounded
feature_status: candidate
sources:
  - resource: /ui/specs/viewer-rbac.spec.ts
---

# ui/specs/viewer-rbac.spec.ts

This is an agent-generated proposal. Review the semantic feature name before promotion.

## Test evidence

- Kind: ui
- Describe blocks: None extracted
- Tests: viewer sees read-only folder and file controls
- Source SHA-256: 79cff691d9d4a85bf7239a6b9861c09e627153bb61880e6886796a8d2f93347d

## Static relationships

- IMPORTS: api/services/FoldersService.ts
- IMPORTS: ui/pages/HomePage.ts
- IMPORTS: utils/common/CommonUtils.ts
- IMPORTS: utils/fixtures/TestFixtures.ts
- INSTANTIATES: api/services/FoldersService.ts
- INSTANTIATES: ui/pages/HomePage.ts
- USES_FIXTURE: utils/fixtures/TestFixtures.ts
- USES_PAGE: ui/pages/HomePage.ts
- USES_SERVICE: api/services/FoldersService.ts

verification_status: grounded
