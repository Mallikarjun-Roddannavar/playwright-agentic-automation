# Requirement: User authentication

The application must allow configured users to sign in and reach the protected
workspace. It should support the available password and OAuth login paths and
apply the user's role to the session.

Acceptance criteria to confirm:

- valid configured credentials reach the workspace;
- invalid credentials show an error;
- expired sessions return the user to login;
- OAuth callback behavior is defined and covered where supported.
