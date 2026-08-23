import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const terms = process.argv.slice(2).map((value) => value.toLowerCase()).filter(Boolean);
if (terms.length === 0) {
  globalThis.console.error("Usage: npm run knowledge:impact -- <requirement, feature, file, or symbol>");
  process.exitCode = 1;
}

const contains = (value) => terms.every((term) => value.toLowerCase().includes(term));
const relationshipRegistry = JSON.parse(
  fs.readFileSync(path.join(root, "knowledge", "relationships.json"), "utf8")
);
const semanticRelationships = relationshipRegistry.relationships ?? [];
const semanticMatches = semanticRelationships.filter(
  (item) => contains(`${item.from} ${item.relation} ${item.to}`) || item.evidence.some((file) => contains(file))
);
const knowledgeMatches = [];
const visit = (directory) => {
  if (!fs.existsSync(directory)) return;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const candidate = path.join(directory, entry.name);
    if (entry.isDirectory() && !["generated", ".obsidian"].includes(entry.name)) visit(candidate);
    else if (entry.isFile() && entry.name.endsWith(".md")) {
      const source = fs.readFileSync(candidate, "utf8");
      if (contains(source)) knowledgeMatches.push(path.relative(root, candidate).replaceAll("\\", "/"));
    }
  }
};
visit(path.join(root, "knowledge"));

const relatedKnowledge = new Set(knowledgeMatches);
const relatedSourcePaths = new Set();
const pendingKnowledge = [...knowledgeMatches];
while (pendingKnowledge.length > 0) {
  const knowledgePath = pendingKnowledge.pop();
  const source = fs.readFileSync(path.join(root, knowledgePath), "utf8");
  for (const match of source.matchAll(/\(([^)#]+)(?:#[^)]*)?\)/gu)) {
    const target = match[1];
    if (!target.startsWith("http") && target.endsWith(".md")) {
      const resolved = path
        .relative(root, path.resolve(path.dirname(path.join(root, knowledgePath)), target))
        .replaceAll("\\", "/");
      if (fs.existsSync(path.join(root, resolved)) && !relatedKnowledge.has(resolved)) {
        relatedKnowledge.add(resolved);
        pendingKnowledge.push(resolved);
      }
    }
  }
  for (const match of source.matchAll(/resource:\s*\/?([^\s]+)/gu)) {
    relatedSourcePaths.add(match[1]);
  }
}

const graphPath = path.join(root, "knowledge", "generated", "code-graph.json");
const graph = JSON.parse(fs.readFileSync(graphPath, "utf8"));
const nodes = new Map(graph.nodes.map((node) => [node.id, node]));
const matchingNodes = graph.nodes.filter(
  (node) => contains(JSON.stringify(node)) || relatedSourcePaths.has(node.path)
);
const relatedIds = new Set(matchingNodes.map((node) => node.id));
const edges = graph.edges.filter((edge) => relatedIds.has(edge.from) || relatedIds.has(edge.to));

globalThis.console.log(`Impact report: ${terms.join(" ")}`);
globalThis.console.log("");
globalThis.console.log(`Semantic relationships (${semanticMatches.length})`);
semanticMatches.forEach((item) =>
  globalThis.console.log(`- ${item.from} --${item.relation}--> ${item.to}`)
);
globalThis.console.log("");
globalThis.console.log(`Knowledge pages (${relatedKnowledge.size})`);
[...relatedKnowledge].sort().forEach((file) => globalThis.console.log(`- ${file}`));
globalThis.console.log("");
globalThis.console.log(`Matching code facts (${matchingNodes.length})`);
matchingNodes
  .sort((left, right) => left.id.localeCompare(right.id))
  .forEach((node) => globalThis.console.log(`- [${node.kind}] ${node.label}${node.path ? ` — ${node.path}` : ""}`));
globalThis.console.log("");
globalThis.console.log(`Related static relationships (${edges.length})`);
edges
  .sort((left, right) => left.id.localeCompare(right.id))
  .forEach((edge) => {
    const from = nodes.get(edge.from)?.label ?? edge.from;
    const to = nodes.get(edge.to)?.label ?? edge.to;
    const evidence = edge.evidence?.[0];
    globalThis.console.log(`- ${from} --${edge.relation}--> ${to}${evidence ? ` (${evidence.path}:${evidence.line})` : ""}`);
  });
globalThis.console.log("");
globalThis.console.log("This is a candidate impact report. It does not modify tests or approved knowledge.");
