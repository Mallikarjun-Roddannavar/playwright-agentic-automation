---
type: Testing Knowledge Proposal
id: draft-ui-specs-files
status: draft
trust_status: grounded
feature_status: candidate
sources:
  - resource: /ui/specs/files.spec.ts
---

# ui/specs/files.spec.ts

This is an agent-generated proposal. Review the semantic feature name before promotion.

## Test evidence

- Kind: ui
- Describe blocks: Files
- Tests: admin can upload a file to a folder, editor can upload a file to a folder
- Source SHA-256: 01102de3a4b6e9a32ddb872bc4576d08e397b18b1d1b18b872c4930c0a8d0786

## Static relationships

- CONTAINS: ui/specs/files.spec.ts
- IMPORTS_PACKAGE: @playwright/test
- IMPORTS_PACKAGE: node:path
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
