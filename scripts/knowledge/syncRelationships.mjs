import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const registryPath = path.join(root, "knowledge", "relationships.json");
const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
const relationships = registry.relationships.map((item) => ({
  ...item,
  to: item.to.replace(/^draft-(manual|automated)-/, "$1-"),
})).filter((item) =>
  item.evidence?.every((evidence) => fs.existsSync(path.join(root, evidence)))
);
const existing = new Set(relationships.map((item) => JSON.stringify(item)));

for (const stage of ["manual", "automated"]) {
  const directory = path.join(root, "knowledge", stage === "manual" ? "02-manual" : "03-automated");
  for (const file of walk(directory)) {
    if (!file.endsWith(".md")) continue;
    const content = fs.readFileSync(file, "utf8");
    const requirementPath = content.match(/^(?:\s*-\s+|requirement:\s*)(.+requirements\/[^\s]+\.md)\s*$/mu)?.[1];
    if (!requirementPath) continue;
    const requirementId = content.match(/^id:\s*(?:draft-(?:manual|automated)-)?(REQ-[A-Z0-9-]+)\s*$/mu)?.[1];
    if (!requirementId) continue;
    const target = content.match(/^id:\s*([^\s]+)\s*$/mu)?.[1];
    if (!target) continue;
    const evidence = toRepoPath(file);
    const relation = {
      from: requirementId,
      relation: stage === "manual" ? "HAS_MANUAL_TEST" : "HAS_AUTOMATED_TEST",
      to: target,
      evidence: [evidence],
    };
    const key = JSON.stringify(relation);
    if (!existing.has(key)) {
      relationships.push(relation);
      existing.add(key);
    }
  }
}

for (const file of walk(path.join(root, "knowledge", "01-product", "requirements"))) {
  if (!file.endsWith(".md") || path.basename(file) === "index.md") continue;
  const content = fs.readFileSync(file, "utf8");
  const requirementId = content.match(/^id:\s*(REQ-[A-Z0-9-]+)\s*$/mu)?.[1];
  const source = content.match(/^source_requirement:\s*(.+)\s*$/mu)?.[1];
  if (!requirementId || !source) continue;
  const sourcePath = source.replace(/^\/+/, "").replace(/^\.\//, "");
  if (!fs.existsSync(path.join(root, sourcePath))) continue;
  const relation = { from: requirementId, relation: "SUPPORTED_BY_SOURCE", to: sourcePath, evidence: [toRepoPath(file)] };
  const key = JSON.stringify(relation);
  if (!existing.has(key)) {
    relationships.push(relation);
    existing.add(key);
  }
}

fs.writeFileSync(registryPath, `${JSON.stringify({ ...registry, relationships }, null, 2)}\n`, "utf8");
console.log(`Knowledge relationships synchronized: ${relationships.length} relationships.`);

function toRepoPath(file) { return path.relative(root, file).replaceAll("\\", "/"); }
function* walk(directory) {
  if (!fs.existsSync(directory)) return;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}
