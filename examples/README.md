# Examples

These examples use the existing repository rather than duplicating framework code. Each one connects a realistic testing task to the files, skill, knowledge, and validation that already exist.

## 1. Understand a successful Login test

Use this when you want an agent or new contributor to understand what a test verifies.

Start with:

```powershell
node ./scripts/queryKnowledge.mjs --knowledge Login
node ./scripts/verifyLoginKnowledge.mjs
```

Read:

- `knowledge/product/features/login.md`;
- `knowledge/product/expected-behavior/login-success.md`;
- `knowledge/testing/scenarios/successful-login.md`;
- `ui/specs/login.spec.ts`;
- `ui/pages/LoginPage.ts`;
- `ui/pages/HomePage.ts`.

The result is a grounded chain from product expectation to Page Objects and the `HomePage.title` assertion.

## 2. Add or maintain a UI scenario

Use this when changing a UI Page Object or UI spec.

Read:

- `AGENTS.md`;
- `.agents/skills/pw-ui-pom/SKILL.md`;
- an existing scenario such as `ui/specs/files.spec.ts`;
- the related Page Object under `ui/pages/`.

Follow the existing ownership model:

```text
selector → Page Object
navigation → Page Object
assertion → spec
test data cleanup → shared fixture
```

Validate with:

```powershell
node ./scripts/checkNamingConventions.mjs
npm run typecheck
npm run test:list
npm run test:ui
```

## 3. Combine UI and API automation

The file-upload flow demonstrates how the layers work together.

Read:

- `.agents/skills/pw-ui-pom/SKILL.md`;
- `.agents/skills/pw-api-pom/SKILL.md`;
- `ui/pages/FolderFilesPage.ts`;
- `api/services/FilesService.ts`;
- `utils/fixtures/TestFixtures.ts`;
- `ui/specs/files.spec.ts`;
- `api/specs/files.spec.ts`.

The UI Page Object owns upload interaction, the API service owns multipart request construction, fixtures provide role sessions and cleanup, and specs own assertions.

Validate with:

```powershell
npm run test:ui
npm run test:api
```

## Agent boundary

An external coding agent can use these examples together with `AGENTS.md`, the relevant skill, and the knowledge query. The repository provides the instructions and evidence; it does not itself run an LLM or autonomously generate tests.
