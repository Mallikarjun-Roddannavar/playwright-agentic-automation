---
type: Runbook
id: using-testing-second-brain
title: Using the testing second brain
status: stable
trust_status: reviewed
---

# Using the testing second brain

Use this knowledge bundle to connect product requirements with manual tests,
automated Playwright coverage, and framework relationships.

## Ask questions naturally

Ask an AI coding agent questions such as:

```text
How is file upload tested?
Which tests are affected if FolderFilesPage changes?
What business behavior does the viewer RBAC test verify?
Is the Login knowledge stale?
```

The agent should use the repository knowledge first, then verify important
claims against source evidence. Runtime Playwright execution must be reported
separately.

## Inspect knowledge directly

```powershell
node ./scripts/queryKnowledge.mjs --knowledge Login
npm run knowledge:impact -- REQ-LOGIN-001
npm run knowledge:check
npm run knowledge:relationships
```

## Files created for a requirement

Use the smallest workflow that the requirement needs. Product knowledge is the
required first stage. Manual-test knowledge, automated-test knowledge, and
Playwright code are later stages and require explicit approval to begin.

```text
01  requirements/incoming/REQ-<feature>-001.md       raw requirement
02  knowledge/drafts/product/REQ-<feature>-001.md   agent proposal
03  knowledge/01-product/requirements/<feature>.md  approved product meaning
04  knowledge/drafts/manual/REQ-<feature>-001.md    optional manual proposal
05  knowledge/02-manual/<feature>/<scenario>.md     approved manual procedure
06  knowledge/drafts/automated/REQ-<feature>-001.md optional automation proposal
07  knowledge/03-automated/<scenario>.md             approved automation knowledge
08  ui/specs/<feature>.spec.ts or api/specs/<feature>.spec.ts
```

After a draft is explicitly approved, promoted, and validated, move the
original draft to the matching folder under `knowledge/archive/`. Archived
drafts preserve history but are not active knowledge sources.

The first three stages describe what the product should do. Manual and
automated knowledge describe how it is verified. Playwright files remain
executable code, while `knowledge/relationships.json` connects requirements to
their approved test coverage.

## Update knowledge when a requirement changes

For a new or changed requirement:

1. Place the raw requirement under `requirements/incoming/`.
2. Run `npm run knowledge:product:propose -- --file=<incoming requirement>`.
3. Complete and review the draft under `knowledge/drafts/product/`.
4. Stop for human review of business meaning, acceptance criteria, and
   ambiguities.
5. After explicit approval, copy it to
   `knowledge/01-product/requirements/` and mark it approved.
6. Run `npm run knowledge:product:validate`.
7. Archive the reviewed product draft under
   `knowledge/archive/product/` after promotion and validation.

Manual tests, automated scenarios, relationships, and Playwright changes are
later workflow stages and are not created during product approval.

```text
requirement
  ↓
approved product requirement
  ↓
optional manual proposal → human review → `knowledge/02-manual/`
  ↓
optional automated proposal → human review → `knowledge/03-automated/`
  ↓
Playwright UI/API test code
```

## Review impact before changing code

```powershell
npm run knowledge:impact -- REQ-FEATURE-001
```

The report is read-only. It identifies related knowledge and static code facts;
it does not rewrite approved knowledge or tests.

## Validate after changes

```powershell
npm run knowledge:build
npm run knowledge:validate
npm run knowledge:check
npm run knowledge:relationships
```

Keep product meaning, manual procedures, and automated implementation separate.
Generated graph files are refreshed by the builder and should not be edited by
hand.
