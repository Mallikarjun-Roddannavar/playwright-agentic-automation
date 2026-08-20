import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const term = process.argv.slice(2).join(" ").toLowerCase();
const logPath = path.join(process.cwd(), "knowledge", "workflow-runs.jsonl");
if (!term) {
  globalThis.console.error("Usage: npm run knowledge:trace -- <run id, file, stage, or status>");
  process.exitCode = 1;
} else if (!fs.existsSync(logPath)) {
  globalThis.console.log("No workflow audit log exists yet.");
} else {
  const matches = fs
    .readFileSync(logPath, "utf8")
    .split(/\r?\n/u)
    .filter(Boolean)
    .filter((line) => line.toLowerCase().includes(term));
  globalThis.console.log(`Workflow events matching '${term}': ${matches.length}`);
  matches.forEach((line) => globalThis.console.log(line));
}
