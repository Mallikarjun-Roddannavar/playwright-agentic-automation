# Agent-ready repository backlog

## Goal

Make this repository easy to evaluate, run, and reuse as an evidence-backed Playwright project for coding agents. This backlog does not introduce an autonomous AI testing service; it strengthens the guidance, evidence, and repeatable workflows an external agent can use.

## Now: public entry path

- [x] Lead the README with an explicit agent-ready Playwright promise and boundaries.
- [x] Add `npm run agent:doctor` for local environment and knowledge readiness checks.
- [x] Add `npm run agent:demo` for a repeatable RBAC impact-analysis walkthrough.
- [x] Add the portable `skills/playwright-agentic` entry skill that routes to the repository-local specialist skills.

## Next: credibility and onboarding

- [ ] Align CI with the advertised `quality:check` command after defining a source-only Prettier scope.
- [ ] Run frontend typecheck and production build in CI.
- [ ] Add a link checker for README and documentation links.
- [ ] Keep only human-reviewed automated-test knowledge in active stable locations.
- [ ] Add automated regression coverage for whitespace-only folder and file names.

## Then: prove maintenance value

- [ ] Cover the highest-value unautomated flows: OAuth, preferences, file rename/delete/preview/download, bulk actions, and RBAC negative paths.
- [ ] Tag the suite by risk and layer, such as `@smoke`, `@ui`, `@api`, and `@rbac`.
- [ ] Add deterministic tests for knowledge query and impact-report behavior.
- [ ] Record a short demo showing a requirement change traced to POMs, services, fixtures, and targeted tests.
- [ ] Publish a reproducible evaluation comparing maintenance tasks with and without repository guidance.

## Distribution and community

- [ ] Verify installation instructions for each promoted coding-agent tool before documenting compatibility.
- [ ] Publish focused GitHub topics, release notes, issue templates, and contribution starters.
- [ ] Track clone-to-demo, demo-to-test, stars, forks, and returning contributors as separate signals.

## Success measures

Measure discoverability and trust separately. Track whether a new contributor can run the demo, whether the quality gate is green, whether an agent identifies the correct impacted files, and whether a reviewer accepts the resulting change. Stars are a useful outcome signal, not the sole success metric.
