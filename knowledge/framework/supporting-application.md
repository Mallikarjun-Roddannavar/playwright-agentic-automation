---
type: Framework Boundary
id: supporting-application-boundary
title: Supporting demo application
status: stable
trust_status: reviewed
---

# Supporting demo application

The `app/frontend/` and `app/backend/` projects provide a runnable target for
the Playwright framework. They are supporting evidence for UI and API behavior,
not the primary source of business requirements.

Primary testing and framework knowledge comes from `ui/`, `api/`, `utils/`,
`config/`, Playwright setup, and test specifications. Application source may be
consulted to verify an API or UI claim when a test relationship requires it.
