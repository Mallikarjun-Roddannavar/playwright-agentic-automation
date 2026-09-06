import { spawnSync } from "node:child_process";
import process from "node:process";

const commands = [
  ["scripts/qaCoverage.mjs"],
  ["scripts/qaImpact.mjs", "api/services/FoldersService.ts"],
  ["scripts/qaGuardrails.mjs"],
  ["scripts/qaEval.mjs"],
];

globalThis.console.log("Agentic QA demo\n");
globalThis.console.log(
  "This deterministic demo shows repository evidence and policy plumbing; it is not a simulated agent run.\n"
);
for (const [script, ...args] of commands) {
  const result = spawnSync(process.execPath, [script, ...args], {
    cwd: process.cwd(),
    encoding: "utf8",
  });
  if (result.stdout) globalThis.console.log(result.stdout.trimEnd());
  if (result.stderr) globalThis.console.error(result.stderr.trimEnd());
  if (result.status !== 0) process.exitCode = 1;
  globalThis.console.log("");
}
