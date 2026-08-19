# Playwright Agentic Automation — LLM Wiki and Codebase Second Brain

The main capability of this repository is a repository-local LLM Wiki/codebase second brain for Playwright automation. It gives AI coding agents a durable, navigable, evidence-backed understanding of the framework, application behavior, tests, and relationships between them.

This direction is informed by [Google Cloud's Open Knowledge Format overview](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing), [Andrej Karpathy's LLM Wiki concept](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f), the [`AGENTS.md` convention](https://agents.md/), and the [Agent Skills standard](https://agentskills.io/home). The implementation remains local to this repository and focused on Playwright agentic automation.

## Try it in three minutes

```bash
git clone https://github.com/Mallikarjun-Roddannavar/playwright-agentic-automation.git
cd playwright-agentic-automation
npm install
npm run install:browsers
npm run test:list
npm test
```

The test command starts the local application and runs the Playwright UI/API suite.

## Framework Highlights

- Playwright UI and API projects with TypeScript Page Objects and reusable API services.
- Role-based browser/API fixtures with authentication and cleanup.
- `AGENTS.md` and `.agents/skills/` for framework-aware agent workflows.
- `knowledge/` for OKF Markdown, static code relationships, product/testing evidence, and Obsidian navigation.
- Freshness, validation, and verification checks that prevent unsupported knowledge claims.

The repository currently provides these implemented second-brain and AI-agent capabilities:

- [x] Repository-level operating guidance through `AGENTS.md`, including ownership rules, conventions, validation commands, and safe change boundaries.
- [x] Specialized local agent skills for UI Page Objects, API services and fixtures, framework tooling, codebase knowledge, and full-stack incident analysis.
- [x] Offline-first codebase knowledge in OKF Markdown that an agent can read, query, validate, and refresh locally.
- [x] Deterministic TypeScript/Python static code graph with imports, Page Object navigation, API services, routes, fixtures, package usage, and Mermaid views.
- [x] LLM-Wiki-style structured notes that organize architecture, decisions, runbooks, product behavior, and testing knowledge for progressive discovery.
- [x] Second-brain navigation through normal Markdown links, frontmatter, backlinks, Mermaid diagrams, and Obsidian Graph view.
- [x] Source-hash freshness checks that tell an agent when generated knowledge must be refreshed after code changes.
- [x] Login product knowledge connecting expected behavior to repository evidence.
- [x] Login testing knowledge connecting the feature to its spec, Page Objects, test, and assertion evidence.
- [x] Product-to-test knowledge queries for Login coverage, behavior, Page Objects, and successful-login assertions.
- [x] Independent knowledge verification that distinguishes repository evidence from LLM-generated interpretation.
- [x] Controlled stale/conflict detection that reports when a Login behavior change may invalidate stored knowledge without silently rewriting it.
- [x] Obsidian-compatible Markdown links, frontmatter, backlinks, and Mermaid knowledge views for agent and human navigation.

The knowledge layer provides durable context and evidence for an external AI coding agent; it does not contain an autonomous AI runtime or silently modify tests and knowledge on its own.

## Not yet implemented

- [ ] Integrated agent workflow that analyzes Playwright failures using test results, traces, screenshots, logs, and source evidence.
- [ ] Agent-assisted maintenance workflow that identifies affected Page Objects, routes, services, fixtures, and specs after a code change.
- [ ] Knowledge-backed queries for file-upload and role-based scenarios beyond the Login feature.
- [ ] Grounded failure and flaky-test knowledge linked to reproducible Playwright evidence.
- [ ] Automated evaluation scenarios that compare agent results with and without repository guidance and knowledge.
- [ ] Human-review workflow for approving agent-proposed test, framework, or knowledge changes.
