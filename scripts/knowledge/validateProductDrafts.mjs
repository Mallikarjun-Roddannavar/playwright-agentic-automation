import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import yaml from "js-yaml";

const root = process.cwd();
const draftsRoot = path.join(root, "knowledge", "drafts", "product");
const files = fs.existsSync(draftsRoot)
  ? fs.readdirSync(draftsRoot).filter((file) => file.endsWith(".md") && file !== "README.md")
  : [];
const errors = [];
for (const filename of files) {
  const relative = `knowledge/drafts/product/${filename}`;
  const source = fs.readFileSync(path.join(draftsRoot, filename), "utf8");
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/u);
  const attributes = yaml.load(match?.[1] ?? "") ?? {};
  if (attributes.status !== "draft") errors.push(`${relative} must remain status: draft.`);
  if (attributes.review_status !== "pending")
    errors.push(`${relative} must remain review_status: pending.`);
  const input = attributes.source_requirement?.replace(/^\//u, "");
  if (!input || !fs.existsSync(path.join(root, input)))
    errors.push(`${relative} has missing source requirement evidence.`);
}
if (errors.length) {
  globalThis.console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  globalThis.console.log(`Product draft validation passed: ${files.length} drafts.`);
}
