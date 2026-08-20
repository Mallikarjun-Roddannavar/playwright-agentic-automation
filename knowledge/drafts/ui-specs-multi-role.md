---
type: Testing Knowledge Proposal
id: draft-ui-specs-multi-role
status: draft
trust_status: grounded
feature_status: candidate
sources:
  - resource: /ui/specs/multi-role.spec.ts
---

# ui/specs/multi-role.spec.ts

This is an agent-generated proposal. Review the semantic feature name before promotion.

## Test evidence

- Kind: ui
- Describe blocks: None extracted
- Tests: admin creates folder and viewer can see it after refresh
- Source SHA-256: 3450191ff39037a1d9fff57fb184bf542aa6f5a1486b95705bd913e15dd22e31

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
