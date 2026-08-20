---
type: Testing Knowledge Proposal
id: draft-api-specs-rbac
status: draft
trust_status: grounded
feature_status: candidate
sources:
  - resource: /api/specs/rbac.spec.ts
---

# api/specs/rbac.spec.ts

This is an agent-generated proposal. Review the semantic feature name before promotion.

## Test evidence

- Kind: api
- Describe blocks: None extracted
- Tests: viewer cannot create folder, editor can create, admin can delete
- Source SHA-256: cdc605d447716f2c47f8bd695165aa82f22b568141c103b12ef19430fdee41f1

## Static relationships

- IMPORTS: api/services/FoldersService.ts
- IMPORTS: utils/common/CommonUtils.ts
- IMPORTS: utils/fixtures/TestFixtures.ts
- INSTANTIATES: api/services/FoldersService.ts
- USES_FIXTURE: utils/fixtures/TestFixtures.ts
- USES_SERVICE: api/services/FoldersService.ts

verification_status: grounded
