# Project knowledge: start here

This second brain is a small set of project notes. Read one feature note to understand its requirements, implementation, manual checks, automated tests, and gaps. No knowledge commands or special application are needed.

## Three different jobs

| File                                                         | What it tells you                           | Example                                               |
| ------------------------------------------------------------ | ------------------------------------------- | ----------------------------------------------------- |
| [AGENTS.md](../AGENTS.md)                                    | Project rules the agent follows             | Keep selectors in Page Objects.                       |
| [SKILL.md](../.agents/skills/codebase-second-brain/SKILL.md) | How to perform a particular task            | Read the feature note, then inspect its source links. |
| Knowledge notes                                              | What this project does and how it is tested | Login uses `/token`; its spec checks the home title.  |

Rules, workflows, and explanations belong in their respective places. Avoid copying the same instructions into all three.

## Find a feature

- [Authentication](features/authentication.md): password login, stored sessions, OAuth, and expiry.
- [Folders](features/folders.md): shared folders and multi-role tests.
- [Files](features/files.md): uploads, safe names, permissions, and missing coverage.
- [Roles](features/roles.md): UI controls and independent API authorization.
- [Health](features/health.md): service reachability.
- [Preferences](features/preferences.md): theme and profile icon; currently no dedicated automation.

For the whole project, read [architecture](architecture.md). For the reasons behind the design, read [decisions](decisions.md).

## Try it with your agent

> Explain how login works and what its tests actually check. Show the source files and any missing coverage.

The agent reads the authentication note, follows its source links, and explains the flow and assertions. It reports separately whether it ran a test. You do not need to name a skill or run a knowledge command.

For change impact, ask: "Review this folder change. Which roles, source files, tests, and missing scenarios should I check?" The [folders note](features/folders.md) links the multi-role and API RBAC assertions.

## Keep notes useful

When a feature changes, update that feature's note with the same change. Link source files using relative Markdown links; check the actual assertions rather than matching filenames. Notes are a starting point: code explains current implementation, requirements explain intended behavior, and test results describe a particular execution.

Keep raw new requirements in [requirements/incoming](../requirements/incoming/README.md). Put proposed business interpretations in a **Pending review** section of the feature note and ask the user to confirm them before treating them as requirements. This is not needed for ordinary source-backed explanations or test mappings. Preserve disagreements and unanswered questions rather than inventing a rule.

The notes have no automatic freshness checks. If code and a note disagree, explain the mismatch and correct the source-backed explanation when authorized to update documentation.
