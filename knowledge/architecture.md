# Architecture

The practice application is the target; Playwright exercises it through the UI and API.

```text
UI specs -> Page Objects -> browser -> React application
API specs -> API services -> request context -> FastAPI backend
                     shared role fixtures and cleanup
```

## Application

[app/frontend](../app/frontend/) contains the React/Vite UI. Its [API client](../app/frontend/src/api.ts) calls the [FastAPI backend](../app/backend/main.py), which uses [authentication](../app/backend/auth.py), [models](../app/backend/models.py), and [database helpers](../app/backend/database.py). Application source explains implementation; it does not replace a business requirement.

## Test framework

| Layer                                             | Responsibility                                                                         |
| ------------------------------------------------- | -------------------------------------------------------------------------------------- |
| [UI specs](../ui/specs/)                          | User scenarios and assertions.                                                         |
| [Page Objects](../ui/pages/)                      | Selectors, actions, navigation, and page readiness.                                    |
| [API specs](../api/specs/)                        | Request/response scenarios and assertions.                                             |
| [API services](../api/services/)                  | Reusable requests returning raw responses.                                             |
| [TestFixtures](../utils/fixtures/TestFixtures.ts) | Separate admin/editor/viewer browser and API sessions, plus registered teardown tasks. |
| [Auth setup](../ui/setup/auth.setup.ts)           | Stored browser sessions used by role fixtures.                                         |

The main navigation flow is `LoginPage.login(...) -> HomePage.openFolders() -> FoldersPage.openFolder(...) -> FolderFilesPage`. Failed login remains on `LoginPage`; `FoldersPage` has no direct `goto()`.

## Configuration and tools

[config/test-config.json](../config/test-config.json) owns framework base URLs, demo role credentials, and shared waits. [BasePage](../ui/pages/BasePage.ts) owns UI routes; [BaseApiService](../api/services/BaseApiService.ts) owns API routes. [Waits](../utils/common/Waits.ts), [Logger](../utils/common/Logger.ts), and [CustomReporter](../utils/common/CustomReporter.ts) provide timing, scoped logs, and reporting.

[playwright.config.ts](../playwright.config.ts) defines setup/UI/API projects and starts or reuses the local application servers. [package.json](../package.json) provides test, lint, typecheck, formatting, and QA commands.

[Safe-diagnosis policy](../.agents/skills/qa-safe-healing/SKILL.md) governs failure diagnosis and safe repair. Feature notes explain requirements and coverage; they do not grant permission to weaken an assertion or claim a test passed.
