import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const model = JSON.parse(fs.readFileSync(path.join(root, "qa", "coverage-model.json"), "utf8"));
const rows = model.capabilities.map((capability) => ({
  ...capability,
  ui: capability.uiSpecs.every(exists),
  api: capability.apiSpecs.every(exists) && capability.apiSpecs.length > 0,
  negative: capability.negativeSpecs.every(exists) && capability.negativeSpecs.length > 0,
}));

globalThis.console.log("QA Coverage Analysis\n");
globalThis.console.log("Capability             Risk       UI    API   Negative  Status");
for (const row of rows) {
  const status = row.ui && row.api && row.negative ? "HIGH" : row.ui || row.api ? "MEDIUM" : "MISSING";
  globalThis.console.log(`${row.name.padEnd(22)} ${row.risk.padEnd(10)} ${yesNo(row.ui).padEnd(5)} ${yesNo(row.api).padEnd(5)} ${yesNo(row.negative).padEnd(9)} ${status}`);
}
const gap = rows.find((row) => row.risk === "CRITICAL" && (!row.ui || !row.api || !row.negative)) ?? rows.find((row) => !row.api || !row.negative);
if (gap) {
  globalThis.console.log(`\nHighest-risk coverage gap: ${gap.name}`);
  globalThis.console.log(`Reason: ${gap.requirement} lacks ${[!gap.ui && "UI", !gap.api && "API", !gap.negative && "negative"].filter(Boolean).join(", ")} evidence in the declared model.`);
}
globalThis.console.log("\nThis is requirement-to-spec evidence, not executable code coverage or a quality percentage.");

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function yesNo(value) {
  return value ? "yes" : "no";
}
