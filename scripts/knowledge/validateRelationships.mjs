import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const registry = JSON.parse(
  fs.readFileSync(path.join(root, "knowledge", "relationships.json"), "utf8")
);
const allowed = new Set([
  "REQUIRES",
  "EXPECTED_BEHAVIOR",
  "HAS_MANUAL_TEST",
  "HAS_AUTOMATED_TEST",
  "USES_PAGE_OBJECT",
  "USES_API_SERVICE",
  "USES_FIXTURE",
  "USES_ROUTE",
  "VERIFIED_BY_ASSERTION",
  "SUPPORTED_BY_SOURCE",
  "IMPACTS",
]);
const errors = [];
const knownIds = new Set();
const markdownFiles = [];
function* walk(directory) {
  if (!fs.existsSync(directory)) return;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (entry.name.endsWith(".md")) yield full;
  }
}
for (const file of walk(path.join(root, "knowledge"))) {
  markdownFiles.push(file);
  const content = fs.readFileSync(file, "utf8");
  const id = content.match(/^id:\s*(\S+)\s*$/mu)?.[1];
  if (id) knownIds.add(id);
}
if (registry.format !== "semantic-knowledge-relationships" || registry.version !== "1.0") {
  errors.push("relationships.json has an unsupported format or version.");
}
if (!Array.isArray(registry.relationships)) errors.push("relationships must be an array.");
for (const [index, item] of (registry.relationships ?? []).entries()) {
  if (!item.from || !item.to || !allowed.has(item.relation)) {
    errors.push(`relationship ${index} needs valid from, to, and relation fields.`);
  }
  if (
    !Array.isArray(item.evidence) ||
    item.evidence.some((file) => !fs.existsSync(path.join(root, file)))
  ) {
    errors.push(`relationship ${index} has missing evidence.`);
  }
  const targetFile = item.to.includes("::") ? item.to.split("::", 1)[0] : item.to;
  const resolves =
    fs.existsSync(path.join(root, targetFile)) || knownIds.has(item.to) || knownIds.has(targetFile);
  if (!resolves) errors.push(`relationship ${index} has an unresolved target: ${item.to}`);
}
if (errors.length > 0) {
  globalThis.console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  globalThis.console.log(
    `Semantic relationship validation passed: ${registry.relationships.length} relationships.`
  );
}
