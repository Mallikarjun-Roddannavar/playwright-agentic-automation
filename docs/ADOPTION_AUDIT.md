# Adoption audit

Audit date: 2026-09-10. Performed before implementation changes in a copied
workspace without `.git`. Source, entry documentation, repository instructions,
skills, requirements and active/archive knowledge, QA policy and evaluations,
scripts, configuration and package commands were inspected. Generated indexes
were checked with the existing builder and validator after installing locked
root dependencies. This is an adoption review, not a penetration test.

| Finding before changes                                                                            | Adoption consequence                                                      | Action                                                                     |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| README and package described a Playwright framework; no concrete copy recipe                      | Teams could infer migration was required                                  | Lead with the additive knowledge layer and a small starter                 |
| Doctor required frontend, Python and Chromium for a static demo                                   | First try required the whole reference app                                | Separate demo readiness from optional app readiness                        |
| Demo printed coverage, impact and guardrail reports                                               | Did not show why an assertion exists or why preserving failure is correct | Run the same authorization test against controlled correct/faulty behavior |
| Runtime locator runner accepted timeout plus possibly old artifacts and emitted a fixed diagnosis | Environment failures could look like successful diagnosis                 | Retire the duplicate browser demo; require fresh completed API runs        |
| Result validator checked only some schema fields and ignored repair policy                        | A product defect could claim repair permission                            | Validate types, evidence categories and modification policy                |
| Manual promotion selected `review_status: pending`; automated promotion lacked a review record    | Scripts could manufacture reviewed knowledge                              | Require recorded human review and evidence before promotion                |
| Relationship sync dropped missing evidence; validator accepted empty evidence and archive IDs     | Broken provenance could disappear or appear resolved                      | Preserve broken links and reject unresolved active endpoints               |
| Knowledge guide named obsolete directories and showed unqualified promotion commands              | Users had to learn internals and could bypass review                      | Document actual paths and explicit trust boundaries                        |
| Guardrails assumed `.spec.ts` and this POM layout, and could scan zero specs successfully         | Copying them could enforce migration or give false confidence             | Add portable mode, common JS/TS test suffixes and a nonempty scan check    |
| Ignore rules omitted virtual environments, build output, caches and local secrets                 | Folder sharing could expose artifacts; format check scanned caches        | Expand exclusions and document clean Git-based sharing                     |
| Formatting had pre-existing drift across source/docs                                              | Advertised quality gate was not reproducible                              | Format maintained text; exclude generated/runtime/cache output             |

## Boundaries retained

- Existing product notes marked reviewed have no attributable reviewer in several
  cases. Their historical approval cannot be authenticated from this copy. Do not
  fabricate it or retroactively approve their business meaning.
- `REQ-RBAC-001` says Viewer is read-only but explicitly leaves exact status/error
  semantics open. `403` is supported by the current test and implementation,
  not an independently approved HTTP contract. A successful unauthorized write
  violates read-only behavior regardless of that status ambiguity.
- Source shows what is implemented; requirements express intended behavior;
  executed tests establish observations. None replaces the other two.
- The reference graph, stage-specific promotion scripts and generic incident
  index are useful for this larger example but unnecessary for initial adoption.
- The application uses demo credentials, a development JWT fallback and token
  query parameters for downloads. Keep it local; it is not a production service.
- No Git history, tracked-file inventory, dependency vulnerability audit or
  measured coding-agent comparison was available in the initial review.

Validation results and reproduction commands are recorded in
[VALIDATION.md](VALIDATION.md) after implementation.
