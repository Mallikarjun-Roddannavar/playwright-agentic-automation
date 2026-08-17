---
type: Expected Product Behavior
id: expected-behavior-login-success
title: Successful login
description: Valid demo credentials authenticate the user and expose the workspace home page.
status: stable
trust_status: grounded
freshness: fresh
sources:
  - resource: /app/frontend/src/pages/LoginPage.tsx
  - resource: /app/backend/main.py
  - resource: /ui/pages/LoginPage.ts
  - resource: /ui/pages/HomePage.ts
  - resource: /ui/specs/login.spec.ts
verification:
  status: grounded
  mechanism: Playwright login test and source inspection
---

# Successful login

Given valid credentials for a configured demo user:

1. The login form submits the credentials to `POST /auth/login`.
2. The backend authenticates the user and returns the username and role.
3. The frontend stores the authenticated user and navigates to `/`.
4. The workspace home title becomes visible.

The current automated evidence verifies this behavior for the configured admin account.
