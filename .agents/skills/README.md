# Agent Skills

This directory contains repository-local workflows for an AI coding agent working on the Playwright framework and its practice application.

Skills are instructions, not autonomous services. A coding agent selects a skill when the task matches its scope, reads the skill before editing, follows its ownership rules, and runs the prescribed validation.

## Available skills

| Skill                         | Use it for                                                                                |
| ----------------------------- | ----------------------------------------------------------------------------------------- |
| `pw-ui-pom`                   | UI Page Objects, UI specs, selectors, and navigation flows                                |
| `pw-api-pom`                  | API services/specs, auth sessions, fixtures, and API routes                               |
| `pw-framework-tooling`        | Playwright config, package scripts, lint, typecheck, waits, logging, and reporting        |
| `codebase-second-brain`       | Knowledge retrieval, static graph queries, freshness, validation, and Obsidian navigation |
| `full-stack-incident-analyst` | Evidence-based cross-layer incident and Playwright failure analysis                       |
| `frontend-workflow`           | React/Vite practice-application changes                                                   |
| `backend-workflow`            | FastAPI practice-application changes                                                      |

## How to use a skill

1. Match the task to the narrowest applicable skill.
2. Read the complete `SKILL.md` before editing.
3. Inspect the files and patterns named by the skill.
4. Preserve ownership boundaries and avoid duplicate helpers.
5. Run the smallest relevant validation commands.
6. Report evidence, limitations, and changed files.

## Skill design principles

- Keep the scope specific and repository-aware.
- State when the skill should and should not be used.
- Prefer existing commands, fixtures, routes, and knowledge.
- Keep assertions in tests and selectors in Page Objects.
- Do not claim runtime or AI behavior that the repository cannot prove.
- Make validation and output expectations explicit.

To add a skill, first confirm that an existing skill cannot cover the workflow. Add a focused directory with a clear `SKILL.md`, document its trigger and validation rules, and update this index.
