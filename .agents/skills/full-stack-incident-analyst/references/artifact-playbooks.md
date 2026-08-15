# Artifact Playbooks

## Ticket or support-system text

Extract available incident ID/state, issue/expected/actual, environment, timestamps, affected role/user, assignment/activity, and attachment names. Treat comments and work notes as narrative. Correlate named attachments with local files and identify missing or stale evidence.

## HAR and network evidence

Report only the relevant request:

- method and host/path;
- query parameters or body keys;
- status and timing;
- response count and top-level/item keys;
- fields that prove or weaken the report;
- `unknown` for absent requested values.

Parse JSON instead of quoting large HAR lines. Redact cookies, tokens, authorization headers, session IDs, secrets, and unrelated personal data. HAR proves transport behavior, not by itself the business rule, persistence, or delivery.

## Browser DevTools

Use Network to identify the exact request feeding the component. Compare visible value, bound value, selected object, request parameter, and response field. Use Sources breakpoints at the first transformation or downstream parameter assignment. Confirm Local Overrides in the actual Response tab and remember that mocked GET responses do not prevent later POST/PUT/PATCH/DELETE writes.

For prod, guide read-only observation. Use dev/test for flows that may save, submit, upload, notify, or delete.

## Logs, traces, and test reports

Normalize timestamps/timezones before correlation. Follow request, trace, correlation, resource, or test IDs across layers. Distinguish the first causal error from retries and downstream noise. A log line proves the emitting component observed or reported something; it may not prove commit, delivery, or user-visible completion.

For flaky tests, inspect retained trace, screenshot, video, console, network, retry, worker, and cleanup evidence. Check whether selectors, readiness, shared state, polling, or teardown—not the product—caused the failure.

## Screenshots and recordings

Capture exact page/route, visible role/environment/timestamp, labels, status, rows/counts, validation text, and whether a commit action was performed. Cite filenames and frame timestamps. Visual evidence proves displayed state and action path, not source-of-truth data or persistence.

Keep separate ledger rows for:

- `Recording visual evidence`
- `Transcript/audio evidence`

If material audio exists but cannot be transcribed locally, mark it `not checked - audio transcription unavailable`. Use `not applicable - no audio stream` only after stream inspection confirms that fact.

## Derived helpers

Before generating OCR, contact sheets, frames, normalized logs, HAR summaries, or transcripts:

1. create `<incident>/_derived/<type>/`;
2. preserve source filenames in helper metadata;
3. never overwrite or delete originals;
4. verify OCR/transcript facts against the original when material;
5. cite original evidence first and helpers second.

## Interactive evidence request

Prefer one next check in this order:

1. existing supplied artifact;
2. read-only database/config query or HAR response;
3. user-run authenticated GET;
4. UI observation/HAR capture;
5. dev-only mutating reproduction.

Tell the user exactly what fields/output to return and what secrets to redact.
