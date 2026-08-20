---
type: Testing Knowledge Proposal
id: draft-api-specs-files
status: draft
trust_status: grounded
feature_status: candidate
sources:
  - resource: /api/specs/files.spec.ts
---

# api/specs/files.spec.ts

This is an agent-generated proposal. Review the semantic feature name before promotion.

## Test evidence

- Kind: api
- Describe blocks: None extracted
- Tests: uploads use safe storage names and reject unauthorized or missing folders
- Source SHA-256: 8c9535dc43d0886fecbb0c0f8f329222beec11f2b807e0dc325ecf8efc4e2b70

## Static relationships

- IMPORTS_PACKAGE: node:crypto
- IMPORTS: api/services/FilesService.ts
- IMPORTS: api/services/FoldersService.ts
- IMPORTS: utils/common/CommonUtils.ts
- IMPORTS: utils/fixtures/TestFixtures.ts
- INSTANTIATES: api/services/FilesService.ts
- INSTANTIATES: api/services/FoldersService.ts
- USES_FIXTURE: utils/fixtures/TestFixtures.ts
- USES_SERVICE: api/services/FilesService.ts
- USES_SERVICE: api/services/FoldersService.ts

verification_status: grounded
