import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const replacements = [
  ["knowledge/02-manual", "Requirement basis"],
  ["knowledge/03-automated", "Product basis"],
];
let changed = 0;
for (const [directory, heading] of replacements) {
  for (const file of walk(path.join(root, directory))) {
    if (!file.endsWith(".md")) continue;
    const content = fs.readFileSync(file, "utf8");
    const requirement = content.match(
      /(?:requirement:\s*|\n\s*-\s+)([^\n]*requirements\/([^/\n]+)\.md)/u
    );
    if (!requirement || !content.includes(`## ${heading}`)) continue;
    const link = `## Product requirement\n\nSee [approved product requirement](../../01-product/requirements/${requirement[2]}.md).`;
    const updated = content.replace(new RegExp(`## ${heading}[\\s\\S]*?(?=\\n## |$)`, "u"), link);
    if (updated !== content) {
      fs.writeFileSync(file, updated, "utf8");
      changed += 1;
    }
  }
}
console.log(`Cleaned promoted knowledge notes: ${changed}`);

function* walk(directory) {
  if (!fs.existsSync(directory)) return;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}
