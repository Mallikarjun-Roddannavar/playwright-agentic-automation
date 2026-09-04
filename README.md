# Playwright Agentic Automation

> Turn Codex and Claude Code into disciplined Playwright QA engineers.

[![Quality and Playwright tests](https://github.com/Mallikarjun-Roddannavar/playwright-agentic-automation/actions/workflows/ci.yml/badge.svg)](https://github.com/Mallikarjun-Roddannavar/playwright-agentic-automation/actions/workflows/ci.yml)
[![Playwright](https://img.shields.io/badge/Playwright-UI%20%2B%20API-45ba4b)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6)](https://www.typescriptlang.org/)

Playwright Agentic Automation is not just another testing framework. It is an **Agentic QA System** designed to guide LLM coding agents (like Codex, Claude Code, Cline, etc.) to explore, generate, diagnose, and heal Playwright tests safely and autonomously.

This repository provides the intelligence layer—skills, workflows, policies, guardrails, and knowledge—so your LLM coding agent can act as a Staff QA Engineer, without requiring you to configure complex API keys, vector databases, or custom LLM routers.

**The LLM provides the intelligence. This repo provides the discipline.**

## Why this is different

If you just tell an LLM to "fix my broken tests," it will often:

- Delete the test to make it green.
- Weaken the assertions (e.g., change `expect(2)` to `expect(1)` because only 1 item loaded).
- Add `page.waitForTimeout(5000)` to fix flakiness.
- Fail to distinguish between a broken test and a genuinely broken application.

This repository fixes that. It provides strict Agent Skills (`qa-diagnoser`, `qa-healer`, `qa-generator`) and automated guardrails so the agent classifies failures correctly, heals locators safely, and refuses to hide application defects.

## 30-Second Demo Concept

**You tell Codex:**

> "Explore the checkout flow and create comprehensive Playwright tests."

**Codex + This Repo:**

- ✓ Reads `AGENTS.md` and repo knowledge to understand the architecture.
- ✓ Runs `npm run qa:coverage` to identify missing scenarios.
- ✓ Generates POM-compliant Playwright tests.
- ✓ Runs tests, finds a failure.
- ✓ Uses `qa-diagnoser` to classify it: `APPLICATION_DEFECT` vs `LOCATOR_DRIFT`.
- ✓ Uses `qa-healer` to safely fix the locator without weakening assertions.
- ✓ Runs `npm run guardrails` to prove no timeouts or swallowed exceptions were added.
- ✓ Reports back with evidence.

## Quick Start

```bash
git clone https://github.com/Mallikarjun-Roddannavar/playwright-agentic-automation.git
cd playwright-agentic-automation
npm install
npm run install:browsers

# Run the guardrails and coverage checks
npm run guardrails
npm run qa:coverage

# Run the tests (starts backend/frontend automatically)
npm test
```

## How the Agents Work

The architecture is simple. The repository does not build its own LLM runtime. Instead, it expects you to use your preferred agent (Codex, Claude Code, Cursor) and point it at the repository.

```
Codex / Claude
      ↓
Reads repository instructions (AGENTS.md)
      ↓
Selects appropriate skill/workflow (.agents/skills/)
      ↓
Queries app knowledge & runs coverage (scripts/qa-coverage.mjs)
      ↓
Writes Tests & Uses Playwright (npm test)
      ↓
Produces evidence & passes guardrails (npm run guardrails)
```

### The First-Class Workflow

1. **Requirement** -> 2. **Explore** -> 3. **Understand app** -> 4. **Identify risks** -> 5. **Create test strategy** -> 6. **Generate tests** -> 7. **Execute** -> 8. **Diagnose failure** (`TEST` vs `APP`) -> 9. **Safe Healing** -> 10. **Coverage Analysis** -> 11. **Report**

### Failure Classification (The QA Diagnoser)

When a test fails, the agent is instructed to classify it before touching any code:

- `LOCATOR_DRIFT` (Fix the test)
- `TIMING` (Fix the wait state, NO timeouts)
- `TEST_DATA` (Fix the test)
- `ENVIRONMENT` (Do not fix the test, report it)
- `APPLICATION_DEFECT` (Do not fix the test, report the bug!)
- `API_CONTRACT` (Report the breaking change)
- `ASSERTION_ERROR` (Fix the test logic)

## Copy-Paste Agent Prompts

Try pasting these prompts into Codex, Claude Code, or Cursor:

### Generate New Tests

> "Explore the application and the `knowledge/01-product/requirements/` directory. Run `npm run qa:coverage` to identify critical user journeys that are not covered by existing Playwright tests. Generate robust, POM-compliant tests for the highest-risk missing scenarios."

### Diagnose Failures

> "Run `npm test`. Analyze the failed tests from the latest run using the `qa-diagnoser` skill. Classify each failure as an application defect, automation defect, environment problem, or unknown. Do not modify any code yet."

### Safe Healing

> "Using the `qa-healer` skill, heal only genuine locator drift in the currently failing tests. Ensure you pass `npm run guardrails` afterwards. Do not weaken assertions or hide failures."

## Architecture & Features

- **Agent Skills (`.agents/skills/`)**: standard instructions for Diagnosing, Healing, Generating, and Tooling.
- **Guardrails (`scripts/guardrails.mjs`)**: lightweight deterministic checks to block `waitForTimeout`, brittle locators, and swallowed exceptions.
- **Coverage Intelligence (`scripts/qa-coverage.mjs`)**: maps tests to product requirements to answer "What business logic is missing coverage?"
- **Local LLM Wiki (`knowledge/`)**: markdown notes that provide the agent with architecture context and product requirements.
- **Playwright Framework**: robust POM UI + API testing setup.

## Contributing

We welcome contributions to make this the best Agentic QA repository available. Check out [CONTRIBUTING.md](CONTRIBUTING.md) and look at the open issues.
