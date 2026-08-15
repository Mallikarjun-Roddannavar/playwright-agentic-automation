import process from "node:process";

import { loadCodeGraph } from "./knowledge/CodebaseKnowledge.mjs";

function usage() {
  globalThis.console.log(
    "Usage: npm run knowledge:query -- [--kind <kind>] [--relation <relation>] <search terms>"
  );
}

function parseArguments(args) {
  const values = { kind: undefined, relation: undefined, terms: [] };
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === "--kind") {
      values.kind = args[index + 1];
      index += 1;
    } else if (argument === "--relation") {
      values.relation = args[index + 1]?.toUpperCase();
      index += 1;
    } else if (argument === "--help" || argument === "-h") {
      values.help = true;
    } else {
      values.terms.push(argument);
    }
  }
  return values;
}

function matchesTerms(value, terms) {
  const haystack = value.toLowerCase();
  return terms.every((term) => haystack.includes(term));
}

function edgeSearchText(edge, nodesById) {
  const from = nodesById.get(edge.from)?.label ?? edge.from;
  const to = nodesById.get(edge.to)?.label ?? edge.to;
  return `${edge.relation} ${from} ${to} ${JSON.stringify(edge.evidence)}`;
}

const args = parseArguments(process.argv.slice(2));
if (args.help || (args.terms.length === 0 && !args.kind && !args.relation)) {
  usage();
  process.exitCode = args.help ? 0 : 1;
} else {
  try {
    const graph = loadCodeGraph(process.cwd());
    const terms = args.terms.map((term) => term.toLowerCase());
    const nodesById = new Map(graph.nodes.map((node) => [node.id, node]));
    const selectedNodeIds = new Set(
      graph.nodes
        .filter((node) => !args.kind || node.kind === args.kind)
        .filter((node) => matchesTerms(JSON.stringify(node), terms))
        .map((node) => node.id)
    );
    const matchedEdges = graph.edges
      .filter((edge) => !args.relation || edge.relation === args.relation)
      .filter((edge) => {
        if (args.relation) {
          return args.kind
            ? selectedNodeIds.has(edge.from) || selectedNodeIds.has(edge.to)
            : matchesTerms(edgeSearchText(edge, nodesById), terms);
        }

        return selectedNodeIds.has(edge.from) || selectedNodeIds.has(edge.to);
      })
      .sort((left, right) => left.id.localeCompare(right.id));
    const relationNodeIds = new Set(matchedEdges.flatMap((edge) => [edge.from, edge.to]));
    const matchedNodes = graph.nodes
      .filter((node) =>
        args.relation ? relationNodeIds.has(node.id) : selectedNodeIds.has(node.id)
      )
      .sort((left, right) => left.id.localeCompare(right.id));

    globalThis.console.log(
      `Static AST graph ${graph.sourceDigest.slice(0, 12)} (${graph.nodes.length} nodes, ${graph.edges.length} edges)`
    );
    globalThis.console.log("This is not a runtime call graph.");
    globalThis.console.log("");
    globalThis.console.log(`Nodes (${matchedNodes.length})`);
    for (const node of matchedNodes) {
      const location = node.path
        ? ` — ${node.path}${node.startLine ? `:${node.startLine}` : ""}`
        : "";
      globalThis.console.log(`- [${node.kind}] ${node.label}${location}`);
    }
    globalThis.console.log("");
    globalThis.console.log(`Relationships (${matchedEdges.length})`);
    for (const edge of matchedEdges) {
      const from = nodesById.get(edge.from)?.label ?? edge.from;
      const to = nodesById.get(edge.to)?.label ?? edge.to;
      const evidence = edge.evidence[0];
      const location = evidence ? ` (${evidence.path}:${evidence.line})` : "";
      globalThis.console.log(`- ${from} --${edge.relation}--> ${to}${location}`);
    }
    if (matchedNodes.length === 0 && matchedEdges.length === 0) {
      globalThis.console.log(
        "No saved facts matched. Try a path, symbol, fixture, package, route, or relationship name."
      );
    }
  } catch (error) {
    globalThis.console.error(`Knowledge query failed: ${error.message}`);
    process.exitCode = 1;
  }
}
