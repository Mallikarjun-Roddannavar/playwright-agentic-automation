import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const changed = process.argv.slice(2).map((item) => item.replaceAll("\\", "/"));
if (changed.length === 0) throw new Error("Usage: npm run qa:impact -- <changed-file> [...changed-file]");
const graph = JSON.parse(fs.readFileSync(path.join(root, "knowledge/generated/code-graph.json"), "utf8"));
const inventory = JSON.parse(fs.readFileSync(path.join(root, "knowledge/test-inventory.json"), "utf8"));
const fileNodes = new Map(
  graph.nodes.filter((node) => node.kind === "file").map((node) => [node.id, node.path])
);
const reverse = new Map();
for (const edge of graph.edges) {
  if (!reverse.has(edge.to)) reverse.set(edge.to, []);
  reverse.get(edge.to).push(edge.from);
}
const affected = new Set(changed.map((item) => `file:${item}`));
const pending = [...affected];
while (pending.length > 0) {
  const current = pending.pop();
  for (const parent of reverse.get(current) ?? []) {
    if (!affected.has(parent)) {
      affected.add(parent);
      pending.push(parent);
    }
  }
}
const affectedPaths = [...affected].map((item) => fileNodes.get(item)).filter(Boolean);
const specs = inventory.tests.filter((spec) => affectedPaths.includes(spec.spec));
globalThis.console.log("QA Impact Analysis\n");
globalThis.console.log(`Changed: ${changed.join(", ")}`);
globalThis.console.log(`Affected source: ${affectedPaths.filter((item) => !changed.includes(item)).join(", ") || "none statically resolved"}`);
globalThis.console.log("\nRelated tests:");
for (const spec of specs) globalThis.console.log(`- ${spec.spec}: ${spec.tests.join("; ")}`);
if (specs.length === 0) globalThis.console.log("- No test reaches these files in the static graph; review product/requirement impact manually.");
globalThis.console.log("\nRisk: REVIEW_REQUIRED — static imports do not prove runtime behavior or complete coverage.");
