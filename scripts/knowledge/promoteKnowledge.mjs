import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { execFileSync } from "node:child_process";
import { logWorkflowEvent } from "./WorkflowLog.mjs";

const root = process.cwd();
const draftsRoot = path.join(root, "knowledge", "drafts", "automated");
const targetRoot = path.join(root, "knowledge", "03-automated", "generated-proposals");
const archiveRoot = path.join(root, "knowledge", "archive", "automated");
if (!fs.existsSync(draftsRoot)) {
  globalThis.console.log("No knowledge drafts to promote.");
  logWorkflowEvent({ stage: "promotion", status: "NOOP", promotedCount: 0 });
  process.exit(0);
}
const promoted = [];
fs.mkdirSync(targetRoot, { recursive: true });
fs.mkdirSync(archiveRoot, { recursive: true });
for (const filename of fs.readdirSync(draftsRoot).filter((file) => file.endsWith(".md"))) {
  const sourcePath = path.join(draftsRoot, filename);
  const content = fs.readFileSync(sourcePath, "utf8");
  if (
    !/^verification_status:\s+grounded\s*$/mu.test(content) ||
    !/^feature_status:\s+existing_match\s*$/mu.test(content) ||
    /feature_status:\s+review_required/mu.test(content)
  )
    continue;
  const promotedContent = content
    .replace(/^type:\s+Testing Knowledge Proposal/mu, "type: Testing Scenario")
    .replace(/^id:\s+draft-automated-(REQ-[A-Z0-9-]+)\s*$/mu, "id: automated-$1")
    .replace(/^status:\s+\w+/mu, "status: stable")
    .replace(/^trust_status:\s+\w+/mu, "trust_status: grounded");
  fs.writeFileSync(path.join(targetRoot, filename), promotedContent, "utf8");
  fs.renameSync(sourcePath, path.join(archiveRoot, filename));
  promoted.push(filename);
}
globalThis.console.log(`Promoted knowledge proposals: ${promoted.length}`);
logWorkflowEvent({
  stage: "promotion",
  status: promoted.length ? "COMPLETED" : "NOOP",
  promotedCount: promoted.length,
  knowledge: promoted,
});

globalThis.console.log("Refreshing generated knowledge after promotion...");
execFileSync(process.execPath, [path.join(root, "scripts", "knowledge", "syncRelationships.mjs")], {
  cwd: root,
  stdio: "inherit",
});
execFileSync(process.execPath, [path.join(root, "scripts", "buildKnowledge.mjs")], {
  cwd: root,
  stdio: "inherit",
});
execFileSync(process.execPath, [path.join(root, "scripts", "validateKnowledge.mjs")], {
  cwd: root,
  stdio: "inherit",
});
execFileSync(process.execPath, [path.join(root, "scripts", "buildKnowledge.mjs"), "--check"], {
  cwd: root,
  stdio: "inherit",
});
globalThis.console.log("Promotion and knowledge refresh completed.");
