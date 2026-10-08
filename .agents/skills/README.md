# Agent skills

A skill is a task workflow. Project rules live in [AGENTS.md](../../AGENTS.md);
feature explanations live in [knowledge](../../knowledge/README.md).

| Skill                                                   | Use it for                                                                  |
| ------------------------------------------------------- | --------------------------------------------------------------------------- |
| [pw-ui-pom](pw-ui-pom/SKILL.md)                         | UI Page Objects, specs, selectors, and navigation.                          |
| [pw-api-pom](pw-api-pom/SKILL.md)                       | API services/specs, auth sessions, fixtures, and routes.                    |
| [pw-framework-tooling](pw-framework-tooling/SKILL.md)   | Configuration, scripts, timing, logging, reporting, and quality checks.     |
| [codebase-second-brain](codebase-second-brain/SKILL.md) | Feature notes, architecture, source explanations, and test coverage.        |
| [qa-safe-healing](qa-safe-healing/SKILL.md)             | UI/API failure investigation, evidence, classification, and guarded repair. |

Read the narrowest relevant skill, inspect its source evidence, and validate the
change. For application changes also read the nested frontend/backend
`AGENTS.md`. Skills guide the coding agent; they are not autonomous services.
