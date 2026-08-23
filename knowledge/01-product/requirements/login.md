---
type: Product Requirement
id: REQ-LOGIN-001
title: Configured users can sign in
status: stable
trust_status: reviewed
---

# Configured users can sign in

## Requirement

A configured user can authenticate with valid credentials and enter the
workspace.

## Acceptance criteria

- Valid configured credentials are accepted.
- An authenticated user is taken to the workspace home page.
- The workspace home title is visible after successful authentication.

## Traceability

- [Manual test](../../02-manual/login/login-success.md)
- [Automated scenario](../../03-automated/scenarios/successful-login.md)
