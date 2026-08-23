---
type: Automated Testing Scenario
id: testing-scenario-successful-login
title: Successful admin login
description: Playwright verifies that configured admin credentials reach the workspace home page.
status: stable
trust_status: verified
requirements:
  - ../../01-product/requirements/login.md
manual_tests:
  - ../../02-manual/login/login-success.md
sources:
  - resource: /ui/specs/login.spec.ts
  - resource: /ui/pages/LoginPage.ts
  - resource: /ui/pages/HomePage.ts
  - resource: /config/test-config.json
verification:
  status: verified
  mechanism: Playwright test assertion
---

# Successful admin login

## Preconditions

- The sample application is available through the configured Playwright web server.
- The configured admin credentials are available in `config/test-config.json`.

## Test mapping

- Test: `ui/specs/login.spec.ts` — `admin login succeeds`
- Page Object: `ui/pages/LoginPage.ts`
- Destination Page Object: `ui/pages/HomePage.ts`
- Authentication route used by the Login UI: `POST /token`

## Verification

`LoginPage.login(...)` fills the username and password, submits the form, waits
for `HomePage`, and returns that Page Object. The test then asserts that
`HomePage.title` is visible. This verifies the successful-login transition and
the visible workspace-home outcome for the configured admin account.

Related product knowledge:

- [Login requirement](../../01-product/requirements/login.md)
