import process from "node:process";

import { validateKnowledgeBundle } from "./knowledge/CodebaseKnowledge.mjs";

const validation = validateKnowledgeBundle(process.cwd());

for (const warning of validation.warnings) {
  globalThis.console.warn(`Warning: ${warning}`);
}
for (const error of validation.errors) {
  globalThis.console.error(`Error: ${error}`);
}

if (validation.errors.length === 0) {
  globalThis.console.log(
    `Knowledge bundle validation passed${validation.warnings.length ? " with warnings" : ""}.`
  );
} else {
  process.exitCode = 1;
}
