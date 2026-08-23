import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import yaml from "js-yaml";
import { logWorkflowEvent } from "./WorkflowLog.mjs";

const root = process.cwd();
const graph = JSON.parse(
  fs.readFileSync(path.join(root, "knowledge", "generated", "code-graph.json"), "utf8")
);
const nodes = new Set(graph.nodes.map((node) => node.path).filter(Boolean));
const draftsRoot = path.join(root, "knowledge", "drafts", "automated");
const conflictsRoot = path.join(root, "knowledge", "conflicts");
const files = fs.existsSync(draftsRoot)
  ? fs.readdirSync(draftsRoot).filter((file) => file.endsWith(".md"))
  : [];
const results = [];

for (const filename of files) {
  const relative = `knowledge/drafts/automated/${filename}`;
  const draftPath = path.join(draftsRoot, filename);
  const content = fs.readFileSync(draftPath, "utf8");
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/u);
  const attributes = yaml.load(match?.[1] ?? "") ?? {};
  const resources = Array.isArray(attributes.sources)
    ? attributes.sources.map((entry) => entry.resource?.replace(/^\//u, ""))
    : [];
  const missing = resources.filter(
    (resource) => !nodes.has(resource) && !fs.existsSync(path.join(root, resource))
  );
  const status = missing.length
    ? "STALE"
    : attributes.feature_status === "review_required"
      ? "REVIEW_REQUIRED"
      : "GROUNDED";
  results.push({ file: relative, status, missing });
  const normalized = content.replace(/^status:\s+grounded\s*$/mu, "status: draft");
  const updated = normalized.replace(
    /^(verification_status:)\s+[^\r\n]+/mu,
    `$1 ${status.toLowerCase()}`
  );
  const withVerification = updated.includes("verification_status:")
    ? updated
    : `${updated.trimEnd()}\nverification_status: ${status.toLowerCase()}\n`;
  if (withVerification !== content) fs.writeFileSync(draftPath, withVerification, "utf8");
}

if (results.some((result) => result.status === "STALE")) {
  fs.mkdirSync(conflictsRoot, { recursive: true });
  const stale = results.filter((result) => result.status === "STALE");
  const report = `---\ntype: Knowledge Conflict\nstatus: draft\nconflict_status: review_required\ntitle: Automated draft evidence conflicts\n---\n\n# Automated draft evidence conflicts\n\n${stale.map((result) => `- ${result.file}: missing ${result.missing.join(", ")}`).join("\n")}\n`;
  fs.writeFileSync(path.join(conflictsRoot, "draft-evidence-conflicts.md"), report, "utf8");
}
globalThis.console.log(`Knowledge proposals checked: ${results.length}`);
for (const result of results) globalThis.console.log(`${result.status}: ${result.file}`);
for (const result of results)
  logWorkflowEvent({
    stage: "verification",
    status: result.status,
    knowledge: result.file,
    missingEvidence: result.missing,
  });
