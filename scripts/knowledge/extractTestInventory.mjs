import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import { loadCodeGraph, hashText } from "./CodebaseKnowledge.mjs";
import { logWorkflowEvent } from "./WorkflowLog.mjs";

const root = process.cwd();
const graph = loadCodeGraph(root);
const tests = graph.nodes.filter(
  (node) => node.kind === "file" && /(?:ui|api)\/specs\/.*\.spec\.ts$/u.test(node.path ?? "")
);
const edgesBySource = new Map();
for (const edge of graph.edges) {
  const source = graph.nodes.find((node) => node.id === edge.from)?.path;
  if (source) edgesBySource.set(source, [...(edgesBySource.get(source) ?? []), edge]);
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}
function unique(values) {
  return [...new Set(values)].sort();
}

function inventoryFor(testNode) {
  const source = read(testNode.path);
  const edges = edgesBySource.get(testNode.path) ?? [];
  const relationships = edges.map((edge) => ({
    relation: edge.relation,
    target:
      graph.nodes.find((node) => node.id === edge.to)?.path ??
      graph.nodes.find((node) => node.id === edge.to)?.label,
    evidence: edge.evidence,
  }));
  const tests = [...source.matchAll(/test\(\s*["'`]([^"'`]+)["'`]/gu)].map((match) => match[1]);
  const describe = [...source.matchAll(/test\.describe\(\s*["'`]([^"'`]+)["'`]/gu)].map(
    (match) => match[1]
  );
  const uniqueRelationships = [
    ...new Map(relationships.map((entry) => [`${entry.relation}:${entry.target}`, entry])).values(),
  ];
  return {
    id: `${testNode.path}::${hashText(source).slice(0, 12)}`,
    spec: testNode.path,
    kind: testNode.path.startsWith("api/") ? "api" : "ui",
    describe: unique(describe),
    tests: unique(tests),
    relationships: uniqueRelationships.sort((left, right) =>
      `${left.relation}:${left.target}`.localeCompare(`${right.relation}:${right.target}`)
    ),
    source_sha256: hashText(source),
  };
}

const inventory = {
  format: "testing-inventory",
  formatVersion: "1.0",
  generatedBy: "process:test-inventory/1.0.0",
  graphDigest: graph.sourceDigest,
  tests: tests.sort((left, right) => left.path.localeCompare(right.path)).map(inventoryFor),
};
const output = path.join(root, "knowledge", "test-inventory.json");
fs.writeFileSync(output, `${JSON.stringify(inventory, null, 2)}\n`, "utf8");
logWorkflowEvent({
  stage: "inventory",
  status: "COMPLETED",
  artifact: "knowledge/test-inventory.json",
  specCount: inventory.tests.length,
  graphDigest: graph.sourceDigest,
});
globalThis.console.log(`Test inventory written: ${inventory.tests.length} spec files.`);
