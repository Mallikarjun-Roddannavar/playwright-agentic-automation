import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const draftsRoot = path.join(root, "knowledge", "drafts", "product");
const targetRoot = path.join(root, "knowledge", "01-product", "requirements");
const archiveRoot = path.join(root, "knowledge", "archive", "product");
fs.mkdirSync(targetRoot, { recursive: true });
fs.mkdirSync(archiveRoot, { recursive: true });
const promoted = [];
for (const filename of fs.readdirSync(draftsRoot).filter((file) => file.endsWith(".md") && file !== "README.md")) {
  const sourcePath = path.join(draftsRoot, filename);
  const content = fs.readFileSync(sourcePath, "utf8");
  if (!/^review_status:\s+reviewed\s*$/mu.test(content)) continue;
  const id = content.match(/^id:\s*(REQ-[A-Z0-9-]+)\s*$/mu)?.[1];
  if (!id) continue;
  const targetName = `${id.replace(/^REQ-/, "").replace(/-\d+$/, "").toLowerCase()}.md`;
  const promotedContent = content
    .replace(/^type:\s+Product Requirement Draft/mu, "type: Product Requirement")
    .replace(/^status:\s+draft/mu, "status: stable")
    .replace(/^review_status:\s+reviewed/mu, "review_status: reviewed");
  fs.writeFileSync(path.join(targetRoot, targetName), promotedContent, "utf8");
  fs.renameSync(sourcePath, path.join(archiveRoot, filename));
  promoted.push(targetName);
}
console.log(`Promoted product requirements: ${promoted.length}`);
execFileSync(process.execPath, [path.join(root, "scripts", "knowledge", "cleanPromotedKnowledge.mjs")], { cwd: root, stdio: "inherit" });
execFileSync(process.execPath, [path.join(root, "scripts", "knowledge", "syncRelationships.mjs")], { cwd: root, stdio: "inherit" });
execFileSync(process.execPath, [path.join(root, "scripts", "buildKnowledge.mjs")], { cwd: root, stdio: "inherit" });
execFileSync(process.execPath, [path.join(root, "scripts", "validateKnowledge.mjs")], { cwd: root, stdio: "inherit" });
execFileSync(process.execPath, [path.join(root, "scripts", "knowledge", "validateRelationships.mjs")], { cwd: root, stdio: "inherit" });
execFileSync(process.execPath, [path.join(root, "scripts", "buildKnowledge.mjs"), "--check"], { cwd: root, stdio: "inherit" });
