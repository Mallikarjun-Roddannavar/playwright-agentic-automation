# Output Contracts

## Focused Evidence Answer

- `Selected mode: Focused Evidence Answer`
- `Answer:` the narrow answer requested.
- `Evidence checked:` exact artifacts and source slices.
- `Why sufficient or insufficient:` what the evidence proves.
- `Not checked / gaps:` material exclusions.
- `Confidence:` high, medium, or low with a reason.
- `Strict Full Evidence RCA needed before closure:` yes or no.

Do not include final RCA, final classification, definitive fix, support update, or closure wording.

## Strict Full Evidence RCA

- `Selected mode: Strict Full Evidence RCA`
- `Issue / expected / actual / impact:` concise intake.
- `Evidence ledger:` material classes only, each marked `checked`, `not present`, `not applicable`, `not checked - <reason>`, or `pending user-run validation`.
- `Correlation:` how UI, frontend, request, backend, data/config, and test evidence align or conflict.
- `Proven facts:` source-backed facts only.
- `Not proven / pending:` explicit gaps.
- `Root cause and classification:` use `Needs more evidence` when the gate is not met.
- `Comparable working pattern:` exact path/pattern or state that none exists.
- `Fix options:` easiest mitigation and best durable fix across relevant layers.
- `Recommended fix:` precise owner, files/components, behavior, and risk.
- `Regression and validation plan:` commands, cases, and expected results.
- `Support/closure wording:` only when requested and evidence supports it.
- `Assumptions and residual risks:` compact list.

Keep recording visuals and transcript/audio as separate ledger rows. Keep runtime validation distinct from source-code confirmation.

## Implemented Fix Report

Lead with the outcome, then include:

- proven cause;
- changed layers and files;
- regression tests added or updated;
- validation commands and outcomes;
- skipped or environment-blocked checks;
- remaining recommendations that were intentionally not implemented.
