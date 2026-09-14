# Same-agent QA guidance comparison (optional)

The first experience is [the five-minute demo](FIVE_MINUTE_DEMO.md). It provides
real controlled API observations; it does not measure a coding agent's behavior.

To compare guidance fairly, use the same agent/tool version, raw evidence and
question in two separate prepared checkouts. One has the adoption guidance and
notes; the other uses its normal framework instructions. Do not ask an agent to
ignore applicable repository instructions as a supposed baseline.

Retain actual prompts, responses, cited evidence, changed files and test results.
Record classification, modification decision, assertion changes, skips and
missing evidence. Submit actual decisions to `qa:eval -- --results=<file>`;
never fill in decisions from expectation or fabricate benchmark scores.

The evaluation fixtures are small examples, not comprehensive accuracy tests.
Keyword/evidence-label checks cannot establish the quality of reasoning.

`npm run qa:runtime-demo` is retained as an alias for `npm run qa:demo`. The old
browser locator-only demo has been retired so there is one reproducible entry
point. Locator-drift policy examples remain in `qa/evals/locator-drift.json`.
Existing local artifacts from older runs are historical evidence, not outputs
of the current demo.
