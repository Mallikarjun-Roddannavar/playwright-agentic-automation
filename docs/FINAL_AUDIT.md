# Final Report: 1-Day Agentic QA MVP

## 1. What you found

The repository had an excellent foundational Playwright architecture and an impressive standard for agent skills (`.agents/skills`), but it failed to clearly communicate its value as an "Agentic QA Engineer". It focused too heavily on being an "LLM Second Brain" and lacked explicit QA-oriented workflows, such as differentiating between test failures and application bugs, test generation, and strict guardrails.

## 2. What you changed

- **Guardrails (`scripts/guardrails.mjs`)**: Added a deterministic script to block bad practices (e.g. `page.waitForTimeout`, bad locators, swallowed exceptions, empty tests).
- **Coverage Intelligence (`scripts/qa-coverage.mjs`)**: Added a script to map `knowledge/01-product/requirements/` against existing tests and output a HIGH/MEDIUM/LOW coverage report, directly identifying missing scenarios.
- **New Agent Skills**:
  - `qa-diagnoser`: Instructs the agent to classify test failures (e.g., `LOCATOR_DRIFT` vs `APPLICATION_DEFECT`) before attempting a fix.
  - `qa-healer`: Strict rules for safe test healing (e.g., never weaken assertions, no timeouts).
  - `qa-generator`: Workflow to map requirements to new tests.
- **README Redesign**: Completely overhauled the README to aggressively position the project as an **Agentic QA System**. Added a killer 30-second demo concept, copy-paste prompts, and an explanation of the new workflows.
- **CI Pipeline Updates**: Integrated `npm run guardrails` into `npm run quality:check` and `.github/workflows/ci.yml`.

## 3. What you deliberately did NOT build

- An LLM API runtime / Python wrapper: The user specifically requested _not_ to build another LLM router or gateway. The intelligence comes from the IDE (Claude Code, Cursor) or external CLI (Codex), while this repository just provides the instructions and discipline.
- Complicated DB/Vector stores: The coverage intelligence was built purely using deterministic filesystem checks instead of RAG/vector search, optimizing for speed and simplicity.

## 4. How the new agentic workflow works

1. **Requirement / Request** -> The agent reads the user prompt.
2. **Explore** -> Agent explores `AGENTS.md` and `.agents/skills`.
3. **Coverage / Intelligence** -> Agent runs `npm run qa:coverage` to identify missing tests.
4. **Generate** -> Agent uses `qa-generator` to draft tests and adds them to `ui/specs`.
5. **Execute** -> Agent runs `npm test`.
6. **Diagnose** -> If a test fails, agent uses `qa-diagnoser` to determine if it is an `APPLICATION_DEFECT` (report bug) or `LOCATOR_DRIFT` (fix test).
7. **Heal** -> Agent uses `qa-healer` to update locators safely.
8. **Verify** -> Agent runs `npm run guardrails` to prove no timeouts or weakened assertions were introduced.

## 5. How a user uses it with Codex

A user opens their terminal with Codex and types:

> `Codex, run npm test. Analyze the failures using the qa-diagnoser skill. If any failure is due to LOCATOR_DRIFT, use qa-healer to fix it. Do not touch failures classified as APPLICATION_DEFECT.`

Codex will read the skills, execute the tests, parse the output, safely heal the locators, run the guardrails script, and report back.

## 6. How a user uses it with Claude Code

A user launches Claude Code (`claude`) in the root directory and types:

> `Use the qa-generator skill and the qa:coverage command to identify missing scenarios in the Checkout flow. Generate the missing tests in ui/specs, run them, and ensure npm run guardrails passes.`

Claude Code will autonomously explore the codebase, check the coverage, generate the specs, and iterate until the tests and guardrails pass.

## 7. What makes this different from Playwright's official agents?

Playwright's experimental agents and MCP servers are heavily focused on DOM traversal ("click this", "fill that") and generating simple scripts. They lack **discipline**. If a test fails, a naive agent will often delete the test, change an assertion from `expect(5)` to `expect(3)`, or add a 5-second `waitForTimeout` to make it pass.

This repository differs by providing a **strict QA methodology**: it forces the agent to differentiate between `LOCATOR_DRIFT` and `APPLICATION_DEFECT`, and provides hard `guardrails` to prevent bad habits like timeouts and swallowed exceptions. It treats the agent as an engineer, not just a script generator.

## 8. Remaining highest-value improvements

- Add a few more intentionally broken tests (e.g. an application bug vs a locator drift) to the sample app so the "Killer Demo" works out of the box immediately after cloning.
- Expand the `qa:coverage` script to parse test block names (`test('should...')`) via AST instead of regex.

## 9. GitHub first-impression score

Before: 5/10 (Felt like an overcomplicated markdown documentation tool).
After: **9/10** (Immediately clear value prop, easy copy-paste prompts, killer demo concept, and unique angle on Agentic QA).

## 10. Final verdict

**Yes, I would star this repository.**
Before, it felt like an academic exercise in knowledge graphs. Now, it solves a real problem: _How do I stop my AI coding assistant from destroying my test suite just to make the pipeline green?_ By providing strict diagnostic models and guardrails, it turns an unpredictable LLM into a disciplined Staff QA Engineer. It is practical, easy to run, and highly differentiated.
