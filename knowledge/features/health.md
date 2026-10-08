# Service health

## Purpose and requirements

Requirement: [REQ-HEALTH-001](../../requirements/incoming/REQ-HEALTH-001.md).

The backend must expose a health endpoint that reliably indicates whether the
service is reachable and returns the agreed successful response shape.

### Expected outcomes

- The health endpoint is reachable when the backend service is available.
- A successful health response uses the defined status and response shape.

## Current implementation

1. The backend exposes `GET /health` and returns `{"status": "ok"}`.
2. `BaseApiService.routes.health` owns the framework route.
3. Playwright uses the endpoint as the backend web-server readiness URL before application-backed tests.

## Manual checks

1. Start the backend and request `/health`.
2. Confirm a successful response with a JSON `status` of `ok`.
3. With the backend unavailable, confirm the reachability check fails; do not interpret a health response as proof of every feature or dependency.

## Automated tests

[health.spec.ts](../../api/specs/health.spec.ts) asserts `response.ok()` and that JSON matches `{ status: "ok" }`. It does not assert an exact status code or complete response schema.

Reading these specs identifies intended checks. It does not mean Playwright has been run or passed.

## Gaps and questions

- The incoming requirement does not specify the endpoint path, exact status/body, or failure contract. The values above are current implementation.
- No dedicated unavailable-service/dependency-health test exists.
- A successful health response does not prove folder, file, authentication, or database behavior.

- The endpoint path is not specified in the incoming requirement.
- The exact successful status code and response body require confirmation.
- Failure response behavior is not defined here.

## Source links

- [api/specs/health.spec.ts](../../api/specs/health.spec.ts)
- [api/services/BaseApiService.ts](../../api/services/BaseApiService.ts)
- [playwright.config.ts](../../playwright.config.ts)
- [app/backend/main.py](../../app/backend/main.py)
