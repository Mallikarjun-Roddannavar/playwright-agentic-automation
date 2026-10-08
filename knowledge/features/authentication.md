# Authentication

## Purpose and requirements

Requirement: [REQ-AUTH-001](../../requirements/incoming/REQ-AUTH-001.md).

Configured users must be able to authenticate through each supported login path,
reach the protected workspace after successful authentication, and receive a
session that reflects their application role.

### Expected outcomes

- Valid configured credentials allow the user to reach the protected workspace.
- Invalid credentials do not authenticate the user and show the defined error.
- An expired session returns the user to the login experience.
- The supported OAuth callback path has defined behavior and coverage where it
  is enabled.

The existing successful-login requirement `REQ-LOGIN-001` also requires valid credentials to reach workspace home and its title to be visible.

## Current implementation

1. The Login UI submits form credentials to `POST /token` through the frontend API client.
2. The backend authenticates the user and returns an access token containing role information.
3. The auth context saves the session in local storage and protected routes require a valid user.
4. `LoginPage.login(...)` fills credentials, submits, waits for `HomePage`, and returns it. Assertions remain in the spec.
5. Browser setup creates stored sessions for admin, editor, and viewer. API fixtures obtain tokens through `AuthService` and add a Bearer authorization header.

The backend also exposes `POST /auth/login`, but the current UI password flow and framework token setup use `/token`. OAuth uses `/auth/oauth/login` and `/auth/oauth/callback`; configuration and provider availability affect that flow.

## Manual checks

1. Sign in with configured credentials and confirm the workspace home title is visible.
2. Try invalid credentials and confirm an error appears without protected access.
3. Open a protected page with an expired stored session and confirm the login form appears.
4. When OAuth is configured, check its callback and role handling separately; password-login checks do not establish OAuth behavior.

## Automated tests

| Spec                                          | What its assertions check                                                                                                                                                                                             |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [login.spec.ts](../../ui/specs/login.spec.ts) | `admin login succeeds`: home title visible; `invalid credentials show error`: login error visible; `expired stored session redirects to login`: login form visible after opening protected home with expired storage. |

The expiry test covers startup with expired storage, not expiry during an active session.

Reading these specs identifies intended checks. It does not mean Playwright has been run or passed.

## Gaps and questions

- No dedicated API-authentication or OAuth spec exists.
- Mid-session expiry, logout, and the complete OAuth callback/error behavior need additional coverage.

- The configured user set and role values are defined by the application.
- The exact invalid-credential error wording is not specified here.
- The supported OAuth provider, callback payload, and enabled environments
  require confirmation.

## Source links

- [ui/specs/login.spec.ts](../../ui/specs/login.spec.ts)
- [ui/pages/LoginPage.ts](../../ui/pages/LoginPage.ts)
- [ui/pages/HomePage.ts](../../ui/pages/HomePage.ts)
- [ui/setup/auth.setup.ts](../../ui/setup/auth.setup.ts)
- [api/services/AuthService.ts](../../api/services/AuthService.ts)
- [utils/fixtures/TestFixtures.ts](../../utils/fixtures/TestFixtures.ts)
- [app/frontend/src/api.ts](../../app/frontend/src/api.ts)
- [app/frontend/src/context/AuthContext.tsx](../../app/frontend/src/context/AuthContext.tsx)
- [app/frontend/src/pages/LoginPage.tsx](../../app/frontend/src/pages/LoginPage.tsx)
- [app/frontend/src/pages/OAuthCallbackPage.tsx](../../app/frontend/src/pages/OAuthCallbackPage.tsx)
- [app/frontend/src/App.tsx](../../app/frontend/src/App.tsx)
- [app/backend/main.py](../../app/backend/main.py)
- [app/backend/auth.py](../../app/backend/auth.py)
