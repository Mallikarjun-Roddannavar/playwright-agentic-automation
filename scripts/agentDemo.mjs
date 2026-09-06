import { spawnSync } from "node:child_process";
import process from "node:process";

const terms = process.argv.slice(2);
const demoTerms = terms.length > 0 ? terms : ["REQ-RBAC-001"];

globalThis.console.log("Agent-ready Playwright demo");
globalThis.console.log(
  "This read-only demo shows the evidence an external coding agent should inspect before changing a feature."
);
globalThis.console.log("Suggested skill: .agents/skills/codebase-second-brain/SKILL.md");
globalThis.console.log("");

const result = spawnSync(process.execPath, ["scripts/knowledge/impactReport.mjs", ...demoTerms], {
  cwd: process.cwd(),
  encoding: "utf8",
});

if (result.stdout) {
  globalThis.console.log(result.stdout.trimEnd());
}
if (result.stderr) {
  globalThis.console.error(result.stderr.trimEnd());
}
if (result.error || result.status !== 0) {
  globalThis.console.error(
    "The impact report did not complete. Run npm run agent:doctor for setup guidance."
  );
  process.exitCode = 1;
}
