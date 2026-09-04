---
name: qa-diagnoser
description: Classifies Playwright test failures to determine the true root cause before attempting to fix anything. Use this whenever a test fails.
---

# QA Diagnoser

Your job is to analyze test failures and classify them into exactly one of the following categories.

## Classification Model

1. **LOCATOR_DRIFT**: The application UI changed slightly (e.g. class name or text), but the functionality is still correct. The test is broken because it cannot find the element.
2. **TIMING**: The application is slow, or an animation took too long, causing a timeout. The test needs better waiting strategies (not `waitForTimeout`), or the app has a performance bug.
3. **TEST_DATA**: The test relies on data that is missing, stale, or conflicting.
4. **ENVIRONMENT**: The backend is down, the database is unreachable, or network requests are failing with 500s.
5. **APPLICATION_DEFECT**: The application behavior is genuinely broken. The test correctly caught a bug.
6. **API_CONTRACT**: The backend API response payload or schema changed, breaking the test's assumptions.
7. **ASSERTION_ERROR**: The test logic itself is flawed (e.g., expecting the wrong state).
8. **UNKNOWN**: Cannot be determined from current evidence. Needs more investigation.

## Workflow

1. Read the error log, the test file, and any available screenshots/traces.
2. Formulate a hypothesis.
3. Classify the failure using the model above.
4. If it is `LOCATOR_DRIFT`, `TIMING`, `TEST_DATA`, or `ASSERTION_ERROR`, proceed to fix the test (using `qa-healer` skill if applicable).
5. If it is `APPLICATION_DEFECT`, `ENVIRONMENT`, or `API_CONTRACT`, DO NOT modify the test. Report the bug clearly to the user.

## Important Rule

Do not guess. Distinguish clearly between "The test is broken" and "The application is broken".
