import path from "node:path";
import process from "node:process";

import {
  applyKnowledgeBuild,
  planKnowledgeBuild,
  toPosix,
} from "./knowledge/CodebaseKnowledge.mjs";

const checkOnly = process.argv.slice(2).includes("--check");
const repoRoot = process.cwd();

try {
  const plan = planKnowledgeBuild(repoRoot);
  const changes = [...plan.changedFiles, ...plan.staleOwnedFiles];

  if (checkOnly) {
    if (changes.length === 0) {
      globalThis.console.log("Knowledge bundle is current.");
    } else {
      globalThis.console.error("Knowledge bundle is stale. Run npm run knowledge:build.");
      for (const filePath of changes) {
        globalThis.console.error(`- ${toPosix(path.relative(repoRoot, filePath))}`);
      }
      process.exitCode = 1;
    }
  } else {
    applyKnowledgeBuild(plan);
    if (changes.length === 0) {
      globalThis.console.log("Knowledge bundle is already current.");
    } else {
      globalThis.console.log(
        `Knowledge bundle updated (${changes.length} artifact${changes.length === 1 ? "" : "s"}).`
      );
      for (const filePath of changes) {
        globalThis.console.log(`- ${toPosix(path.relative(repoRoot, filePath))}`);
      }
    }
  }
} catch (error) {
  globalThis.console.error(`Knowledge build failed: ${error.message}`);
  process.exitCode = 1;
}
