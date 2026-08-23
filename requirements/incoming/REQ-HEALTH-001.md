# Requirement: Service health

The backend must expose a health endpoint that allows the test framework and
deployment checks to determine whether the service is reachable.

Acceptance criteria to confirm:

- the health endpoint is reachable;
- it returns the expected successful response shape.
