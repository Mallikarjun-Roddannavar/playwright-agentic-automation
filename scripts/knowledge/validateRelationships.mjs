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
function* walk(directory) {
  if (!fs.existsSync(directory)) return;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (entry.name.endsWith(".md")) yield full;
  }
}
for (const file of walk(path.join(root, "knowledge"))) {
  const relative = path.relative(path.join(root, "knowledge"), file).replaceAll(path.sep, "/");
  if (/^(?:archive|drafts|conflicts)\//u.test(relative)) continue;
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
    !item.evidence.length ||
    item.evidence.some((file) => !localFile(file))
  ) {
    errors.push(`relationship ${index} has missing evidence.`);
  }
  for (const endpoint of [item.from, item.to]) {
    if (typeof endpoint !== "string") continue;
    const targetFile = endpoint.split("::", 1)[0];
    const resolves = localFile(targetFile) || knownIds.has(endpoint) || knownIds.has(targetFile);
    if (!resolves)
      errors.push(`relationship ${index} has an unresolved active endpoint: ${endpoint}`);
  }
}

function localFile(value) {
  if (typeof value !== "string" || !value.trim()) return false;
  const full = path.resolve(root, value);
  const relative = path.relative(root, full).replaceAll(path.sep, "/");
  return (
    !relative.startsWith("..") &&
    !path.isAbsolute(relative) &&
    !/^knowledge\/(?:archive|drafts|conflicts)\//u.test(relative) &&
    fs.existsSync(full) &&
    fs.statSync(full).isFile()
  );
}
if (errors.length > 0) {
  globalThis.console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  globalThis.console.log(
    `Semantic relationship validation passed: ${registry.relationships.length} relationships.`
  );
}
