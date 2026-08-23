import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const draftsRoot = path.join(root, "knowledge", "drafts", "manual");
const targetRoot = path.join(root, "knowledge", "02-manual", "generated-proposals");
const archiveRoot = path.join(root, "knowledge", "archive", "manual");
fs.mkdirSync(targetRoot, { recursive: true });
fs.mkdirSync(archiveRoot, { recursive: true });
const promoted = [];
for (const filename of fs.readdirSync(draftsRoot).filter((file) => file.endsWith(".md"))) {
  const sourcePath = path.join(draftsRoot, filename);
  const content = fs.readFileSync(sourcePath, "utf8");
  if (!/^review_status:\s+pending\s*$/mu.test(content)) continue;
  const promotedContent = content
    .replace(/^type:\s+Manual Test Scenario Proposal/mu, "type: Manual Test Scenario")
    .replace(/^id:\s+draft-manual-(REQ-[A-Z0-9-]+)\s*$/mu, "id: manual-$1")
    .replace(/^status:\s+draft/mu, "status: stable")
    .replace(/^review_status:\s+pending/mu, "review_status: reviewed");
  fs.writeFileSync(path.join(targetRoot, filename), promotedContent, "utf8");
  fs.renameSync(sourcePath, path.join(archiveRoot, filename));
  promoted.push(filename);
}
console.log(`Promoted manual knowledge proposals: ${promoted.length}`);
if (promoted.length) {
  execFileSync(process.execPath, [path.join(root, "scripts", "knowledge", "syncRelationships.mjs")], { cwd: root, stdio: "inherit" });
  execFileSync(process.execPath, [path.join(root, "scripts", "buildKnowledge.mjs")], { cwd: root, stdio: "inherit" });
  execFileSync(process.execPath, [path.join(root, "scripts", "validateKnowledge.mjs")], { cwd: root, stdio: "inherit" });
  execFileSync(process.execPath, [path.join(root, "scripts", "buildKnowledge.mjs"), "--check"], { cwd: root, stdio: "inherit" });
}
