---
type: Product Feature
id: product-feature-login
title: Login
description: Password-based authentication into the Playwright Practice App workspace.
status: stable
trust_status: grounded
freshness: fresh
sources:
  - resource: /app/frontend/src/pages/LoginPage.tsx
  - resource: /app/frontend/src/context/AuthContext.tsx
  - resource: /app/backend/main.py
  - resource: /config/test-config.json
---

# Login

The application provides a username/password login form for the demo role accounts. The frontend submits credentials through the authentication API, stores the returned user session through the authentication context, and navigates to the workspace home route after success.

Invalid credentials remain on the login surface and display an error. An expired stored session is cleared and protected-home navigation returns the user to the login surface.

Related behavior:

- [Successful login behavior](../expected-behavior/login-success.md)
- [Successful login testing scenario](../../testing/scenarios/successful-login.md)
