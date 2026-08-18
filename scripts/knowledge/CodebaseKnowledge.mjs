import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { execFileSync } from "node:child_process";

import yaml from "js-yaml";
import ts from "typescript";

export const OKF_VERSION = "0.2";
export const KNOWLEDGE_PROCESS = "process:codebase-knowledge/1.0.0";

const codeExtensions = new Set([".ts", ".tsx", ".mts", ".cts", ".js", ".mjs", ".cjs"]);
const pythonExtensions = new Set([".py"]);
const typeScriptExtensions = new Set([".ts", ".tsx", ".mts", ".cts"]);
const sourceExtensions = new Set([...codeExtensions, ...pythonExtensions, ".json"]);
const ignoredDirectories = new Set([
  ".auth",
  "_git",
  ".git",
  ".venv",
  "venv",
  ".mypy_cache",
  "__pycache__",
  "dist",
  "build",
  "node_modules",
  "playwright-report",
  "test-results",
]);

const relationLabels = {
  CONTAINS: "contains",
  DECLARES_FIXTURE: "declares fixture",
  DECLARES_PACKAGE: "declares package",
  DECLARES_ROUTE: "declares route",
  EXPORTS: "exports",
  EXTENDS: "extends",
  IMPLEMENTS: "implements",
  IMPORTS: "imports",
  IMPORTS_PACKAGE: "imports package",
  INSTANTIATES: "instantiates",
  NAVIGATES_TO: "navigates to",
  RETURNS_PAGE: "returns page",
  USES_API_ROUTE: "uses API route",
  USES_FIXTURE: "uses fixture",
  USES_PAGE: "uses page object",
  USES_SERVICE: "uses API service",
  USES_UI_ROUTE: "uses UI route",
  CALLS: "calls",
  ENFORCES_RBAC: "enforces RBAC",
  USES_AUTH_DEPENDENCY: "uses auth dependency",
  USES_PERSISTENCE: "uses persistence",
};

const interestingRelationships = new Set([
  "DECLARES_FIXTURE",
  "DECLARES_ROUTE",
  "EXTENDS",
  "IMPLEMENTS",
  "INSTANTIATES",
  "NAVIGATES_TO",
  "RETURNS_PAGE",
  "USES_API_ROUTE",
  "USES_FIXTURE",
  "USES_PAGE",
  "USES_SERVICE",
  "USES_UI_ROUTE",
  "CALLS",
  "ENFORCES_RBAC",
  "USES_AUTH_DEPENDENCY",
  "USES_PERSISTENCE",
]);

export function toPosix(value) {
  return value.split(path.sep).join("/");
}

export function hashText(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function absoluteKey(value) {
  const normalized = path.normalize(value);
  return process.platform === "win32" ? normalized.toLowerCase() : normalized;
}

function compareText(left, right) {
  // Use code-unit ordering so generated artifacts are identical on every CI OS.
  if (left < right) {
    return -1;
  }
  return left > right ? 1 : 0;
}

function compareById(left, right) {
  return compareText(left.id, right.id);
}

function ensureDirectory(directoryPath) {
  fs.mkdirSync(directoryPath, { recursive: true });
}

function readUtf8(filePath) {
  return fs.readFileSync(filePath, "utf8").replace(/\r\n?/gu, "\n");
}

function hasPathPrefix(candidatePath, rootPath) {
  const relativePath = path.relative(rootPath, candidatePath);
  return relativePath === "" || (!relativePath.startsWith("..") && !path.isAbsolute(relativePath));
}

function walkFiles(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    return [];
  }

  const files = [];
  for (const entry of fs.readdirSync(directoryPath, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!ignoredDirectories.has(entry.name)) {
        files.push(...walkFiles(path.join(directoryPath, entry.name)));
      }
      continue;
    }

    if (entry.isFile()) {
      files.push(path.join(directoryPath, entry.name));
    }
  }
  return files;
}

function loadTypeScriptConfig(repoRoot) {
  const configPath = path.join(repoRoot, "tsconfig.json");
  const configResult = ts.readConfigFile(configPath, ts.sys.readFile);
  if (configResult.error) {
    throw new Error(formatTypeScriptDiagnostic(configResult.error));
  }

  const parsed = ts.parseJsonConfigFileContent(
    configResult.config,
    ts.sys,
    repoRoot,
    undefined,
    configPath
  );
  if (parsed.errors.length > 0) {
    throw new Error(parsed.errors.map(formatTypeScriptDiagnostic).join("\n"));
  }

  return parsed;
}

function formatTypeScriptDiagnostic(diagnostic) {
  return ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
}

function collectSourcePaths(repoRoot, parsedConfig) {
  const sourcePaths = new Set(parsedConfig.fileNames.map((filePath) => path.resolve(filePath)));
  const extraFiles = ["eslint.config.mjs", "package.json", "playwright.config.ts", "tsconfig.json"];

  for (const relativePath of extraFiles) {
    const absolutePath = path.join(repoRoot, relativePath);
    if (fs.existsSync(absolutePath)) {
      sourcePaths.add(absolutePath);
    }
  }

  for (const directory of ["app", "config", "scripts"]) {
    for (const absolutePath of walkFiles(path.join(repoRoot, directory))) {
      if (sourceExtensions.has(path.extname(absolutePath))) {
        sourcePaths.add(absolutePath);
      }
    }
  }

  return [...sourcePaths]
    .filter((absolutePath) => hasPathPrefix(absolutePath, repoRoot))
    .filter((absolutePath) => sourceExtensions.has(path.extname(absolutePath)))
    .sort((left, right) =>
      compareText(toPosix(path.relative(repoRoot, left)), toPosix(path.relative(repoRoot, right)))
    );
}

function classifyFile(relativePath) {
  if (relativePath.startsWith("app/backend/")) {
    return { category: "backend", label: "Python backend", conceptType: "Code Module" };
  }
  if (relativePath.startsWith("app/frontend/")) {
    return { category: "frontend", label: "Application frontend", conceptType: "Code Module" };
  }
  if (relativePath.startsWith("ui/pages/")) {
    return { category: "ui-page", label: "UI page object", conceptType: "Code Module" };
  }
  if (relativePath.startsWith("api/services/")) {
    return { category: "api-service", label: "API service", conceptType: "Code Module" };
  }
  if (relativePath.startsWith("utils/fixtures/")) {
    return { category: "fixture", label: "Shared fixture", conceptType: "Code Module" };
  }
  if (relativePath.startsWith("ui/specs/")) {
    return { category: "ui-spec", label: "UI specification", conceptType: "Test Specification" };
  }
  if (relativePath.startsWith("api/specs/")) {
    return { category: "api-spec", label: "API specification", conceptType: "Test Specification" };
  }
  if (relativePath.startsWith("ui/setup/")) {
    return { category: "setup", label: "Test setup", conceptType: "Code Module" };
  }
  if (
    relativePath.startsWith("config/") ||
    relativePath === "package.json" ||
    relativePath === "tsconfig.json"
  ) {
    return { category: "configuration", label: "Configuration", conceptType: "Configuration" };
  }
  if (
    relativePath.startsWith("scripts/") ||
    relativePath === "eslint.config.mjs" ||
    relativePath === "playwright.config.ts"
  ) {
    return { category: "tooling", label: "Framework tooling", conceptType: "Code Module" };
  }
  if (relativePath.startsWith("utils/")) {
    return { category: "utility", label: "Shared utility", conceptType: "Code Module" };
  }
  return { category: "source", label: "Source module", conceptType: "Code Module" };
}

function sourceTitle(relativePath) {
  const basename = path.basename(relativePath).replace(/\.(?:[cm]?tsx?|[cm]?js|json)$/u, "");
  return basename || relativePath;
}

function scriptKindForPath(filePath) {
  const extension = path.extname(filePath);
  if (extension === ".tsx") {
    return ts.ScriptKind.TSX;
  }
  if (extension === ".js" || extension === ".mjs" || extension === ".cjs") {
    return ts.ScriptKind.JS;
  }
  return ts.ScriptKind.TS;
}

function isCodePath(filePath) {
  return codeExtensions.has(path.extname(filePath));
}

function isExported(node) {
  return Boolean(node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword));
}

function nodeName(node) {
  if (!node.name) {
    return "<anonymous>";
  }
  if (ts.isIdentifier(node.name) || ts.isPrivateIdentifier(node.name)) {
    return node.name.text;
  }
  return node.name.getText();
}

function textFromRouteInitializer(initializer) {
  initializer = unwrapExpression(initializer);
  if (ts.isStringLiteral(initializer) || ts.isNoSubstitutionTemplateLiteral(initializer)) {
    return initializer.text;
  }
  if (ts.isArrowFunction(initializer) || ts.isFunctionExpression(initializer)) {
    const expression = ts.isBlock(initializer.body)
      ? initializer.body.statements.find(ts.isReturnStatement)?.expression
      : initializer.body;
    if (
      expression &&
      (ts.isStringLiteral(expression) || ts.isNoSubstitutionTemplateLiteral(expression))
    ) {
      return expression.text;
    }
    if (expression && ts.isTemplateExpression(expression)) {
      return expression
        .getText()
        .replace(/\$\{[^}]+\}/gu, "{parameter}")
        .replace(/`/gu, "");
    }
  }
  return initializer.getText().replace(/\s+/gu, " ");
}

function unwrapExpression(expression) {
  let current = expression;
  while (
    ts.isAsExpression(current) ||
    ts.isTypeAssertionExpression(current) ||
    (ts.isSatisfiesExpression?.(current) ?? false)
  ) {
    current = current.expression;
  }
  return current;
}

function packageNameFromSpecifier(specifier) {
  if (specifier.startsWith("node:")) {
    return specifier;
  }
  if (specifier.startsWith("@")) {
    return specifier.split("/").slice(0, 2).join("/");
  }
  return specifier.split("/")[0];
}

function sanitizePathSegment(segment) {
  return segment
    .replace(/([a-z0-9])([A-Z])/gu, "$1-$2")
    .replace(/\.(?:spec|setup)$/u, "-$&")
    .replace(/[^A-Za-z0-9]+/gu, "-")
    .replace(/^-+|-+$/gu, "")
    .toLowerCase();
}

function generatedCodePath(relativePath) {
  const withoutExtension = relativePath.replace(/\.[^.]+$/u, "");
  const segments = withoutExtension.split(/[\\/]/u).map(sanitizePathSegment);
  return path.posix.join("generated", "code", ...segments) + ".md";
}

function markdownLink(fromRelativePath, toRelativePath, label) {
  let relativeTarget = toPosix(path.relative(path.dirname(fromRelativePath), toRelativePath));
  if (!relativeTarget.startsWith(".")) {
    relativeTarget = `./${relativeTarget}`;
  }
  return `[${label}](${relativeTarget})`;
}

function escapeMermaidLabel(value) {
  return value
    .replaceAll("[", " ")
    .replaceAll("]", " ")
    .replaceAll('"', " ")
    .replace(/\s+/gu, " ")
    .trim();
}

function mermaidId(id) {
  return `node_${hashText(id).slice(0, 10)}`;
}

class StaticGraph {
  constructor() {
    this.nodes = new Map();
    this.edges = new Map();
  }

  addNode(node) {
    const existing = this.nodes.get(node.id);
    if (!existing) {
      this.nodes.set(node.id, { ...node, tags: [...new Set(node.tags ?? [])].sort(compareText) });
      return;
    }

    this.nodes.set(node.id, {
      ...existing,
      ...Object.fromEntries(Object.entries(node).filter(([, value]) => value !== undefined)),
      tags: [...new Set([...(existing.tags ?? []), ...(node.tags ?? [])])].sort(compareText),
    });
  }

  addEdge({ relation, from, to, evidence, confidence = "exact" }) {
    if (from === to) {
      return;
    }

    const key = `${relation}\u0000${from}\u0000${to}`;
    const existing = this.edges.get(key);
    const normalizedEvidence = evidence
      ? {
          path: evidence.path,
          line: evidence.line,
          ...(evidence.detail ? { detail: evidence.detail } : {}),
        }
      : undefined;

    if (!existing) {
      this.edges.set(key, {
        id: `edge:${hashText(key).slice(0, 16)}`,
        relation,
        from,
        to,
        confidence,
        evidence: normalizedEvidence ? [normalizedEvidence] : [],
      });
      return;
    }

    if (
      normalizedEvidence &&
      !existing.evidence.some(
        (item) =>
          item.path === normalizedEvidence.path &&
          item.line === normalizedEvidence.line &&
          item.detail === normalizedEvidence.detail
      )
    ) {
      existing.evidence.push(normalizedEvidence);
    }
  }

  getNode(id) {
    return this.nodes.get(id);
  }

  getNodes() {
    return [...this.nodes.values()].sort(compareById);
  }

  getEdges() {
    return [...this.edges.values()]
      .map((edge) => ({
        ...edge,
        evidence: [...edge.evidence].sort((left, right) => {
          const pathComparison = compareText(left.path, right.path);
          return (
            pathComparison ||
            left.line - right.line ||
            compareText(left.detail ?? "", right.detail ?? "")
          );
        }),
      }))
      .sort(compareById);
  }
}

function artifactPaths(repoRoot) {
  const knowledgeRoot = path.join(repoRoot, "knowledge");
  const generatedRoot = path.join(knowledgeRoot, "generated");
  return {
    knowledgeRoot,
    generatedRoot,
    graphPath: path.join(generatedRoot, "code-graph.json"),
  };
}

function parseFrontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/u);
  if (!match) {
    return undefined;
  }

  const attributes = yaml.load(match[1], { schema: yaml.JSON_SCHEMA });
  if (!attributes || typeof attributes !== "object" || Array.isArray(attributes)) {
    throw new Error("YAML frontmatter must be a mapping.");
  }

  return {
    attributes,
    body: source.slice(match[0].length),
  };
}

function readExistingAttributes(filePath) {
  if (!fs.existsSync(filePath)) {
    return undefined;
  }
  try {
    return parseFrontmatter(readUtf8(filePath))?.attributes;
  } catch {
    return undefined;
  }
}

function serializeFrontmatter(attributes) {
  return yaml
    .dump(attributes, {
      noRefs: true,
      lineWidth: -1,
      quotingType: '"',
    })
    .trimEnd();
}

function renderConcept(attributes, body) {
  return `---\n${serializeFrontmatter(attributes)}\n---\n\n${body.trim()}\n`;
}

function dateNow() {
  return new Date().toISOString();
}

function preservedGenerationAt(filePath, factDigest, fallback) {
  const attributes = readExistingAttributes(filePath);
  if (
    attributes?.fact_sha256 === factDigest &&
    typeof attributes.generated?.at === "string" &&
    attributes.generated.by === KNOWLEDGE_PROCESS
  ) {
    return attributes.generated.at;
  }
  return fallback;
}

function preservedGraphGenerationAt(graphPath, sourceDigest, fallback) {
  if (!fs.existsSync(graphPath)) {
    return fallback;
  }
  try {
    const graph = JSON.parse(readUtf8(graphPath));
    if (graph.sourceDigest === sourceDigest && graph.generation?.by === KNOWLEDGE_PROCESS) {
      return typeof graph.generation.at === "string" ? graph.generation.at : fallback;
    }
  } catch {
    return fallback;
  }
  return fallback;
}

function buildProjectAnalysis(repoRoot) {
  const parsedConfig = loadTypeScriptConfig(repoRoot);
  const sourcePaths = collectSourcePaths(repoRoot, parsedConfig);
  const sourceByAbsolutePath = new Map();
  const sourceFiles = sourcePaths.map((absolutePath) => {
    const relativePath = toPosix(path.relative(repoRoot, absolutePath));
    const content = readUtf8(absolutePath);
    const classification = classifyFile(relativePath);
    const source = {
      absolutePath,
      relativePath,
      content,
      hash: hashText(content),
      extension: path.extname(absolutePath),
      ...classification,
      id: `file:${relativePath}`,
    };
    sourceByAbsolutePath.set(absoluteKey(absolutePath), source);
    return source;
  });

  const programRootNames = sourceFiles
    .filter((source) => typeScriptExtensions.has(source.extension))
    .map((source) => source.absolutePath);
  const program = ts.createProgram({
    rootNames: programRootNames,
    options: parsedConfig.options,
  });
  const programSourceFiles = new Map(
    program.getSourceFiles().map((sourceFile) => [absoluteKey(sourceFile.fileName), sourceFile])
  );

  for (const source of sourceFiles) {
    if (!isCodePath(source.absolutePath)) {
      continue;
    }
    source.sourceFile =
      programSourceFiles.get(absoluteKey(source.absolutePath)) ??
      ts.createSourceFile(
        source.absolutePath,
        source.content,
        ts.ScriptTarget.Latest,
        true,
        scriptKindForPath(source.absolutePath)
      );
  }

  return {
    parsedConfig,
    program,
    checker: program.getTypeChecker(),
    sourceFiles,
    sourceByAbsolutePath,
  };
}

function addPythonAstGraph(repoRoot, analysis, graph) {
  const pythonSources = analysis.sourceFiles.filter((source) => pythonExtensions.has(source.extension));
  if (pythonSources.length === 0) {
    return;
  }

  const adapterPath = path.join(repoRoot, "scripts", "knowledge", "python_ast_adapter.py");
  const output = execFileSync("python", [adapterPath, repoRoot], { encoding: "utf8" });
  const facts = JSON.parse(output);
  const sourceByPath = new Map(pythonSources.map((source) => [source.relativePath, source]));

  const addFunction = (fact) => {
    const source = sourceByPath.get(fact.path);
    if (!source) {
      return undefined;
    }
    const id = `symbol:${fact.path}#${fact.name}`;
    graph.addNode({
      id,
      kind: "function",
      label: fact.name,
      path: fact.path,
      category: source.category,
      startLine: fact.line,
      endLine: fact.endLine,
      tags: ["function", "python", source.category],
    });
    graph.addEdge({
      relation: "CONTAINS",
      from: source.id,
      to: id,
      evidence: { path: fact.path, line: fact.line },
    });
    return id;
  };

  for (const fact of facts.functions) {
    const functionId = addFunction(fact);
    if (!functionId) {
      continue;
    }
    for (const endpoint of fact.endpoints) {
      const routeId = `route:${fact.path}#${fact.name}:${endpoint.method}`;
      graph.addNode({
        id: routeId,
        kind: "route",
        label: `${endpoint.method} ${endpoint.path}`,
        path: fact.path,
        category: "backend",
        routeName: `${fact.name}:${endpoint.method}`,
        startLine: endpoint.line,
        tags: ["route", "python", "backend"],
      });
      graph.addEdge({
        relation: "DECLARES_ROUTE",
        from: functionId,
        to: routeId,
        evidence: { path: fact.path, line: endpoint.line },
      });
    }
    for (const dependency of fact.authDependencies) {
      graph.addEdge({
        relation: "USES_AUTH_DEPENDENCY",
        from: functionId,
        to: `symbol:${dependency.path}#${dependency.name}`,
        evidence: { path: fact.path, line: dependency.line },
      });
    }
    for (const call of fact.calls) {
      const target = `symbol:${call.path}#${call.name}`;
      graph.addEdge({
        relation: call.kind === "rbac" ? "ENFORCES_RBAC" : call.kind === "persistence" ? "USES_PERSISTENCE" : "CALLS",
        from: functionId,
        to: target,
        evidence: { path: fact.path, line: call.line },
      });
    }
  }

  for (const edge of facts.imports) {
    const from = sourceByPath.get(edge.path);
    const target = sourceByPath.get(edge.target);
    if (from && target) {
      graph.addEdge({
        relation: "IMPORTS",
        from: from.id,
        to: target.id,
        evidence: { path: edge.path, line: edge.line, detail: edge.target },
      });
    }
  }
}

function buildStaticGraph(repoRoot) {
  const analysis = buildProjectAnalysis(repoRoot);
  const graph = new StaticGraph();
  const packageManifest = analysis.sourceFiles.find(
    (source) => source.relativePath === "package.json"
  );
  const repositoryName = packageManifest
    ? JSON.parse(packageManifest.content).name
    : path.basename(repoRoot);
  const repositoryId = `repository:${repositoryName}`;
  const nodeToId = new Map();
  const sourceByNode = new Map();

  graph.addNode({
    id: repositoryId,
    kind: "repository",
    label: repositoryName,
    tags: ["repository", "static-analysis"],
  });

  for (const source of analysis.sourceFiles) {
    graph.addNode({
      id: source.id,
      kind: "file",
      label: source.relativePath,
      path: source.relativePath,
      category: source.category,
      tags: [source.category, source.extension.slice(1) || "file"],
      sourceHash: source.hash,
    });
    graph.addEdge({
      relation: "CONTAINS",
      from: repositoryId,
      to: source.id,
      evidence: { path: source.relativePath, line: 1 },
    });
    if (source.sourceFile) {
      sourceByNode.set(source.sourceFile, source);
    }
  }

  const symbolId = (source, name) => `symbol:${source.relativePath}#${name}`;
  const routeId = (source, name) => `route:${source.relativePath}#${name}`;
  const fixtureId = (source, name) => `fixture:${source.relativePath}#${name}`;

  const createSymbol = (node, source, kind, name, parentId) => {
    const id = symbolId(source, name);
    const start = source.sourceFile.getLineAndCharacterOfPosition(node.getStart(source.sourceFile));
    const end = source.sourceFile.getLineAndCharacterOfPosition(node.getEnd());
    graph.addNode({
      id,
      kind,
      label: name,
      path: source.relativePath,
      category: source.category,
      startLine: start.line + 1,
      endLine: end.line + 1,
      exported: isExported(node),
      tags: [kind, source.category],
    });
    graph.addEdge({
      relation: "CONTAINS",
      from: parentId ?? source.id,
      to: id,
      evidence: { path: source.relativePath, line: start.line + 1 },
    });
    if (isExported(node)) {
      graph.addEdge({
        relation: "EXPORTS",
        from: source.id,
        to: id,
        evidence: { path: source.relativePath, line: start.line + 1 },
      });
    }
    nodeToId.set(node, id);
    return id;
  };

  const collectRoutes = (node, source, parentId) => {
    if (!ts.isPropertyDeclaration(node) || nodeName(node) !== "routes" || !node.initializer) {
      return;
    }
    const initializer = unwrapExpression(node.initializer);
    if (!ts.isObjectLiteralExpression(initializer)) {
      return;
    }
    for (const property of initializer.properties) {
      if (!ts.isPropertyAssignment(property)) {
        continue;
      }
      const name = nodeName(property);
      const id = routeId(source, name);
      const start = source.sourceFile.getLineAndCharacterOfPosition(
        property.getStart(source.sourceFile)
      );
      graph.addNode({
        id,
        kind: "route",
        label: textFromRouteInitializer(property.initializer),
        path: source.relativePath,
        category: source.category,
        routeName: name,
        startLine: start.line + 1,
        tags: ["route", source.category],
      });
      graph.addEdge({
        relation: "DECLARES_ROUTE",
        from: parentId,
        to: id,
        evidence: { path: source.relativePath, line: start.line + 1, detail: name },
      });
      nodeToId.set(property, id);
      nodeToId.set(property.name, id);
    }
  };

  const collectFixtures = (source) => {
    if (!source.sourceFile || !source.relativePath.startsWith("utils/fixtures/")) {
      return;
    }
    const visit = (node) => {
      if (
        ts.isCallExpression(node) &&
        ts.isPropertyAccessExpression(node.expression) &&
        node.expression.name.text === "extend"
      ) {
        const fixtureObject = node.arguments.find(ts.isObjectLiteralExpression);
        if (fixtureObject) {
          for (const property of fixtureObject.properties) {
            if (!ts.isPropertyAssignment(property) || !ts.isIdentifier(property.name)) {
              continue;
            }
            const name = property.name.text;
            const id = fixtureId(source, name);
            const start = source.sourceFile.getLineAndCharacterOfPosition(
              property.getStart(source.sourceFile)
            );
            graph.addNode({
              id,
              kind: "fixture",
              label: name,
              path: source.relativePath,
              category: "fixture",
              startLine: start.line + 1,
              tags: ["fixture", "playwright"],
            });
            graph.addEdge({
              relation: "DECLARES_FIXTURE",
              from: source.id,
              to: id,
              evidence: { path: source.relativePath, line: start.line + 1 },
            });
            nodeToId.set(property, id);
            nodeToId.set(property.initializer, id);
          }
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(source.sourceFile);
  };

  for (const source of analysis.sourceFiles) {
    if (!source.sourceFile) {
      continue;
    }
    const visit = (node, parentId = source.id, className) => {
      let nextParentId = parentId;
      let nextClassName = className;
      if (ts.isClassDeclaration(node) && node.name) {
        const name = node.name.text;
        nextParentId = createSymbol(node, source, "class", name, source.id);
        nextClassName = name;
      } else if (ts.isInterfaceDeclaration(node)) {
        nextParentId = createSymbol(node, source, "interface", node.name.text, source.id);
      } else if (ts.isEnumDeclaration(node)) {
        nextParentId = createSymbol(node, source, "enum", node.name.text, source.id);
      } else if (ts.isFunctionDeclaration(node) && node.name) {
        nextParentId = createSymbol(node, source, "function", node.name.text, source.id);
      } else if (
        (ts.isMethodDeclaration(node) ||
          ts.isGetAccessorDeclaration(node) ||
          ts.isSetAccessorDeclaration(node)) &&
        className
      ) {
        nextParentId = createSymbol(
          node,
          source,
          "method",
          `${className}.${nodeName(node)}`,
          parentId
        );
      } else if (ts.isConstructorDeclaration(node) && className) {
        nextParentId = createSymbol(node, source, "method", `${className}.constructor`, parentId);
      } else if (ts.isTypeAliasDeclaration(node)) {
        nextParentId = createSymbol(node, source, "type", node.name.text, source.id);
      } else if (
        ts.isVariableDeclaration(node) &&
        ts.isIdentifier(node.name) &&
        isExported(node.parent.parent)
      ) {
        nextParentId = createSymbol(node, source, "variable", node.name.text, source.id);
      }

      if (className && ts.isPropertyDeclaration(node)) {
        collectRoutes(node, source, parentId);
      }
      ts.forEachChild(node, (child) => visit(child, nextParentId, nextClassName));
    };
    visit(source.sourceFile);
  }

  for (const source of analysis.sourceFiles) {
    collectFixtures(source);
  }

  const ensurePackageNode = (packageName, version) => {
    const id = `package:${packageName}`;
    graph.addNode({
      id,
      kind: packageName.startsWith("node:") ? "node-builtin" : "package",
      label: packageName,
      version,
      tags: [packageName.startsWith("node:") ? "node-builtin" : "npm-package"],
    });
    return id;
  };

  if (packageManifest) {
    const manifest = JSON.parse(packageManifest.content);
    for (const [packageName, version] of Object.entries({
      ...(manifest.dependencies ?? {}),
      ...(manifest.devDependencies ?? {}),
    })) {
      const packageId = ensurePackageNode(packageName, version);
      graph.addEdge({
        relation: "DECLARES_PACKAGE",
        from: packageManifest.id,
        to: packageId,
        evidence: { path: packageManifest.relativePath, line: 1 },
      });
    }
  }

  const resolveModule = (specifier, source) => {
    const resolved = ts.resolveModuleName(
      specifier,
      source.absolutePath,
      analysis.parsedConfig.options,
      ts.sys
    ).resolvedModule;
    const internalSource = resolved
      ? analysis.sourceByAbsolutePath.get(absoluteKey(resolved.resolvedFileName))
      : undefined;
    return internalSource ? internalSource.id : undefined;
  };

  const resolveGraphId = (node) => {
    if (!node || !sourceByNode.has(node.getSourceFile())) {
      return undefined;
    }
    try {
      let symbol = analysis.checker.getSymbolAtLocation(node);
      if (symbol?.flags & ts.SymbolFlags.Alias) {
        symbol = analysis.checker.getAliasedSymbol(symbol);
      }
      for (const declaration of symbol?.declarations ?? []) {
        const id = nodeToId.get(declaration);
        if (id) {
          return id;
        }
      }
    } catch {
      // Synthetic JavaScript source files are intentionally not part of the TypeScript program.
      return undefined;
    }
    return undefined;
  };

  const originIdFor = (node, source) => {
    let current = node;
    while (current && current !== source.sourceFile) {
      const id = nodeToId.get(current);
      if (id) {
        return id;
      }
      current = current.parent;
    }
    return source.id;
  };

  const routeIdFromExpression = (node) => {
    let found;
    const visit = (candidate) => {
      if (found) {
        return;
      }
      if (ts.isPropertyAccessExpression(candidate)) {
        const id = resolveGraphId(candidate.name);
        if (id && graph.getNode(id)?.kind === "route") {
          found = id;
          return;
        }
      }
      ts.forEachChild(candidate, visit);
    };
    visit(node);
    return found;
  };

  const typeReferenceIds = (typeNode) => {
    const ids = new Set();
    const visit = (node) => {
      if (ts.isTypeReferenceNode(node)) {
        const id = resolveGraphId(node.typeName);
        if (id) {
          ids.add(id);
        }
      }
      ts.forEachChild(node, visit);
    };
    if (typeNode) {
      visit(typeNode);
    }
    return [...ids];
  };

  for (const source of analysis.sourceFiles) {
    if (!source.sourceFile) {
      continue;
    }
    const visit = (node) => {
      if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
        const specifier = node.moduleSpecifier.text;
        const internalTarget = resolveModule(specifier, source);
        const line =
          source.sourceFile.getLineAndCharacterOfPosition(node.getStart(source.sourceFile)).line +
          1;
        if (internalTarget) {
          graph.addEdge({
            relation: "IMPORTS",
            from: source.id,
            to: internalTarget,
            evidence: { path: source.relativePath, line, detail: specifier },
          });
        } else {
          const packageId = ensurePackageNode(packageNameFromSpecifier(specifier));
          graph.addEdge({
            relation: "IMPORTS_PACKAGE",
            from: source.id,
            to: packageId,
            evidence: { path: source.relativePath, line, detail: specifier },
          });
        }
      }

      if (
        ts.isExportDeclaration(node) &&
        node.moduleSpecifier &&
        ts.isStringLiteral(node.moduleSpecifier)
      ) {
        const internalTarget = resolveModule(node.moduleSpecifier.text, source);
        if (internalTarget) {
          const line =
            source.sourceFile.getLineAndCharacterOfPosition(node.getStart(source.sourceFile)).line +
            1;
          graph.addEdge({
            relation: "IMPORTS",
            from: source.id,
            to: internalTarget,
            evidence: { path: source.relativePath, line, detail: node.moduleSpecifier.text },
          });
        }
      }

      if (
        (ts.isClassDeclaration(node) || ts.isInterfaceDeclaration(node)) &&
        node.heritageClauses
      ) {
        const origin = nodeToId.get(node);
        if (origin) {
          for (const clause of node.heritageClauses) {
            const relation =
              clause.token === ts.SyntaxKind.ExtendsKeyword ? "EXTENDS" : "IMPLEMENTS";
            for (const type of clause.types) {
              const target = resolveGraphId(type.expression);
              if (target) {
                const line =
                  source.sourceFile.getLineAndCharacterOfPosition(type.getStart(source.sourceFile))
                    .line + 1;
                graph.addEdge({
                  relation,
                  from: origin,
                  to: target,
                  evidence: { path: source.relativePath, line },
                });
              }
            }
          }
        }
      }

      if (
        (ts.isMethodDeclaration(node) ||
          ts.isFunctionDeclaration(node) ||
          ts.isGetAccessorDeclaration(node)) &&
        node.type
      ) {
        const origin = nodeToId.get(node);
        if (origin) {
          for (const target of typeReferenceIds(node.type)) {
            if (graph.getNode(target)?.category === "ui-page") {
              const line =
                source.sourceFile.getLineAndCharacterOfPosition(
                  node.type.getStart(source.sourceFile)
                ).line + 1;
              graph.addEdge({
                relation: "RETURNS_PAGE",
                from: origin,
                to: target,
                evidence: { path: source.relativePath, line },
              });
            }
          }
        }
      }

      if (ts.isNewExpression(node)) {
        const target = resolveGraphId(node.expression);
        if (target && graph.getNode(target)?.kind === "class") {
          const origin = originIdFor(node, source);
          const line =
            source.sourceFile.getLineAndCharacterOfPosition(node.getStart(source.sourceFile)).line +
            1;
          graph.addEdge({
            relation: "INSTANTIATES",
            from: origin,
            to: target,
            evidence: { path: source.relativePath, line },
          });
          const targetNode = graph.getNode(target);
          const originNode = graph.getNode(origin);
          if (targetNode.category === "ui-page") {
            graph.addEdge({
              relation: "USES_PAGE",
              from: origin,
              to: target,
              evidence: { path: source.relativePath, line },
            });
            if (originNode?.category === "ui-page") {
              const originClass = (() => {
                let current = node.parent;
                while (current && current !== source.sourceFile) {
                  if (ts.isClassDeclaration(current)) {
                    return nodeToId.get(current);
                  }
                  current = current.parent;
                }
                return undefined;
              })();
              if (originClass) {
                graph.addEdge({
                  relation: "NAVIGATES_TO",
                  from: originClass,
                  to: target,
                  evidence: { path: source.relativePath, line },
                });
              }
            }
          }
          if (targetNode.category === "api-service") {
            graph.addEdge({
              relation: "USES_SERVICE",
              from: origin,
              to: target,
              evidence: { path: source.relativePath, line },
            });
          }
        }
      }

      if (ts.isCallExpression(node)) {
        for (const argument of node.arguments) {
          const targetRoute = routeIdFromExpression(argument);
          if (targetRoute) {
            const line =
              source.sourceFile.getLineAndCharacterOfPosition(node.getStart(source.sourceFile))
                .line + 1;
            graph.addEdge({
              relation:
                graph.getNode(targetRoute)?.category === "api-service"
                  ? "USES_API_ROUTE"
                  : "USES_UI_ROUTE",
              from: originIdFor(node, source),
              to: targetRoute,
              evidence: { path: source.relativePath, line },
            });
          }
        }
      }

      if (ts.isObjectBindingPattern(node)) {
        const origin = originIdFor(node, source);
        const fixtureSource = analysis.sourceFiles.find(
          (candidate) => candidate.relativePath === "utils/fixtures/TestFixtures.ts"
        );
        for (const element of node.elements) {
          if (!ts.isIdentifier(element.name) || !fixtureSource) {
            continue;
          }
          const id = fixtureId(fixtureSource, element.name.text);
          if (graph.getNode(id)?.kind === "fixture") {
            const line =
              source.sourceFile.getLineAndCharacterOfPosition(element.getStart(source.sourceFile))
                .line + 1;
            graph.addEdge({
              relation: "USES_FIXTURE",
              from: origin,
              to: id,
              evidence: { path: source.relativePath, line },
            });
          }
        }
      }

      ts.forEachChild(node, visit);
    };
    visit(source.sourceFile);
  }

  addPythonAstGraph(repoRoot, analysis, graph);

  const sources = analysis.sourceFiles.map((source) => ({
    path: source.relativePath,
    sha256: source.hash,
    category: source.category,
  }));
  const sourceDigest = hashText(JSON.stringify(sources));
  return { analysis, graph, repositoryId, repositoryName, sourceDigest };
}

function graphPayload(result, generationAt) {
  return {
    format: "static-code-graph",
    formatVersion: "1.0",
    title: `${result.repositoryName} static code graph`,
    staticAnalysis: true,
    disclaimer:
      "This is a static AST-derived relationship graph. It is not a runtime call graph, execution trace, coverage report, or security model.",
    sourceDigest: result.sourceDigest,
    generation: {
      by: KNOWLEDGE_PROCESS,
      at: generationAt,
      parser: `TypeScript ${ts.version} + Python ast`,
    },
    sources: result.analysis.sourceFiles
      .map((source) => ({
        path: source.relativePath,
        sha256: source.hash,
        category: source.category,
      }))
      .sort((left, right) => compareText(left.path, right.path)),
    nodes: result.graph.getNodes(),
    edges: result.graph.getEdges(),
  };
}

function graphNodeLabel(graph, nodeId) {
  return graph.getNode(nodeId)?.label ?? nodeId;
}

function categoryForNode(graph, node) {
  if (node?.category) {
    return node.category;
  }
  if (node?.path) {
    return graph.getNode(`file:${node.path}`)?.category;
  }
  return undefined;
}

function relationshipTargetLink(graph, fromDocumentPath, documentByFileId, targetId) {
  const target = graph.getNode(targetId);
  if (!target) {
    return `\`${targetId}\``;
  }
  const documentPath = target.path ? documentByFileId.get(`file:${target.path}`) : undefined;
  if (documentPath) {
    return markdownLink(fromDocumentPath, documentPath, target.label);
  }
  return `\`${target.label}\``;
}

function listMarkdown(items) {
  if (items.length === 0) {
    return "- None detected by static analysis.";
  }
  return items.map((item) => `- ${item}`).join("\n");
}

function buildCodeConcept(
  source,
  result,
  documentPath,
  documentByFileId,
  filePath,
  fallbackGenerationAt
) {
  const { graph } = result;
  const allEdges = graph.getEdges();
  const symbols = graph
    .getNodes()
    .filter(
      (node) => node.path === source.relativePath && node.kind !== "file" && node.kind !== "route"
    )
    .sort((left, right) => compareText(left.label, right.label));
  const imports = allEdges.filter(
    (edge) => edge.from === source.id && ["IMPORTS", "IMPORTS_PACKAGE"].includes(edge.relation)
  );
  const relationships = allEdges.filter(
    (edge) =>
      interestingRelationships.has(edge.relation) &&
      (edge.from === source.id || graph.getNode(edge.from)?.path === source.relativePath)
  );
  const dependents = allEdges.filter(
    (edge) =>
      ["IMPORTS", "INSTANTIATES", "USES_PAGE", "USES_SERVICE", "USES_FIXTURE"].includes(
        edge.relation
      ) &&
      (edge.to === source.id || graph.getNode(edge.to)?.path === source.relativePath)
  );

  const description = `${source.label} extracted from ${source.relativePath} by deterministic static analysis.`;
  const staticAttributes = {
    type: source.conceptType,
    title: sourceTitle(source.relativePath),
    description,
    resource: `repo://${result.repositoryName}/${source.relativePath}`,
    tags: ["generated", "static-ast", source.category, source.extension.slice(1)].filter(Boolean),
    status: "stable",
    sources: [
      {
        id: "source",
        resource: `repo://${result.repositoryName}/${source.relativePath}`,
        title: source.relativePath,
        author: KNOWLEDGE_PROCESS,
      },
    ],
    source_path: source.relativePath,
    source_sha256: source.hash,
    code_graph_id: source.id,
    analysis_scope: "static-ast",
  };

  const symbolLines = symbols.map((symbol) => {
    const exportMarker = symbol.exported ? " exported" : "";
    return `\`${symbol.kind}\` **${symbol.label}**${exportMarker} (lines ${symbol.startLine}-${symbol.endLine})`;
  });
  const importLines = imports.map((edge) => {
    const target = relationshipTargetLink(graph, documentPath, documentByFileId, edge.to);
    const detail = edge.evidence[0]?.detail;
    return detail ? `${target} via \`${detail}\`` : target;
  });
  const relationshipLines = relationships.map((edge) => {
    const sourceLabel = graphNodeLabel(graph, edge.from);
    const target = relationshipTargetLink(graph, documentPath, documentByFileId, edge.to);
    return `**${sourceLabel}** ${relationLabels[edge.relation].toLowerCase()} ${target}.`;
  });
  const dependentLines = dependents.map((edge) => {
    const sourceNode = graph.getNode(edge.from);
    const sourceDocument = sourceNode?.path
      ? documentByFileId.get(`file:${sourceNode.path}`)
      : undefined;
    const sourceLabel = sourceNode?.label ?? edge.from;
    const linkedSource = sourceDocument
      ? markdownLink(documentPath, sourceDocument, sourceLabel)
      : `\`${sourceLabel}\``;
    return `${linkedSource} ${relationLabels[edge.relation].toLowerCase()} this module.`;
  });

  const body = `# Purpose

${description} The underlying source code remains authoritative.

# Symbols

${listMarkdown(symbolLines)}

# Imports

${listMarkdown(importLines)}

# Static relationships

${listMarkdown(relationshipLines)}

# Dependents

${listMarkdown(dependentLines)}

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash \`${source.hash}\`. Run \`npm run knowledge:check\` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.`;

  const factDigest = hashText(renderConcept(staticAttributes, body));
  const generationAt = preservedGenerationAt(filePath, factDigest, fallbackGenerationAt);
  const attributes = {
    ...staticAttributes,
    fact_sha256: factDigest,
    generated: { by: KNOWLEDGE_PROCESS, at: generationAt },
    verified: [{ by: KNOWLEDGE_PROCESS, at: generationAt }],
  };

  return renderConcept(attributes, body);
}

function buildArchitectureMermaid(result) {
  const groupLabels = {
    "api-service": "API services",
    "api-spec": "API specs",
    configuration: "Configuration",
    fixture: "Fixtures",
    setup: "Test setup",
    tooling: "Tooling",
    "ui-page": "UI page objects",
    "ui-spec": "UI specs",
    utility: "Utilities",
  };
  const graph = result.graph;
  const groups = new Set();
  const relationships = new Map();
  const includedRelations = new Set([
    "IMPORTS",
    "INSTANTIATES",
    "USES_FIXTURE",
    "USES_PAGE",
    "USES_SERVICE",
  ]);

  for (const edge of graph.getEdges()) {
    if (!includedRelations.has(edge.relation)) {
      continue;
    }
    const from = categoryForNode(graph, graph.getNode(edge.from));
    const to = categoryForNode(graph, graph.getNode(edge.to));
    if (!from || !to || from === to) {
      continue;
    }
    groups.add(from);
    groups.add(to);
    const key = `${from}\u0000${to}`;
    relationships.set(key, { from, to });
  }

  const groupIds = new Map(
    [...groups].sort(compareText).map((group) => [group, mermaidId(`group:${group}`)])
  );
  const lines = ["flowchart LR"];
  for (const [group, id] of groupIds) {
    lines.push(`  ${id}["${escapeMermaidLabel(groupLabels[group] ?? group)}"]`);
  }
  for (const relationship of [...relationships.values()].sort((left, right) =>
    compareText(`${left.from}:${left.to}`, `${right.from}:${right.to}`)
  )) {
    lines.push(`  ${groupIds.get(relationship.from)} --> ${groupIds.get(relationship.to)}`);
  }
  return lines.join("\n");
}

function buildRelationshipMermaid(result, relation, title) {
  const graph = result.graph;
  const edges = graph.getEdges().filter((edge) => edge.relation === relation);
  const nodes = new Map();
  for (const edge of edges) {
    nodes.set(edge.from, graph.getNode(edge.from));
    nodes.set(edge.to, graph.getNode(edge.to));
  }
  const lines = ["flowchart LR"];
  if (edges.length === 0) {
    lines.push(`  empty["No ${escapeMermaidLabel(title.toLowerCase())} detected"]`);
    return lines.join("\n");
  }
  for (const [id, node] of [...nodes.entries()].sort(([left], [right]) =>
    compareText(left, right)
  )) {
    lines.push(`  ${mermaidId(id)}["${escapeMermaidLabel(node?.label ?? id)}"]`);
  }
  for (const edge of edges) {
    lines.push(
      `  ${mermaidId(edge.from)} -->|${relationLabels[relation].toLowerCase()}| ${mermaidId(edge.to)}`
    );
  }
  return lines.join("\n");
}

function buildServiceMermaid(result) {
  const graph = result.graph;
  const serviceEdges = graph.getEdges().filter((edge) => {
    const target = graph.getNode(edge.to);
    return (
      target?.category === "api-service" &&
      ["EXTENDS", "INSTANTIATES", "USES_SERVICE"].includes(edge.relation)
    );
  });
  const nodes = new Map();
  for (const edge of serviceEdges) {
    nodes.set(edge.from, graph.getNode(edge.from));
    nodes.set(edge.to, graph.getNode(edge.to));
  }
  const lines = ["flowchart LR"];
  if (serviceEdges.length === 0) {
    lines.push('  empty["No static API service relationships detected"]');
    return lines.join("\n");
  }
  for (const [id, node] of [...nodes.entries()].sort(([left], [right]) =>
    compareText(left, right)
  )) {
    lines.push(`  ${mermaidId(id)}["${escapeMermaidLabel(node?.label ?? id)}"]`);
  }
  for (const edge of serviceEdges) {
    lines.push(
      `  ${mermaidId(edge.from)} -->|${relationLabels[edge.relation].toLowerCase()}| ${mermaidId(edge.to)}`
    );
  }
  return lines.join("\n");
}

function graphConcept(title, description, diagram, sourceDigest, generationAt, relatedGraphPath) {
  const attributes = {
    type: "Static Code Graph",
    title,
    description,
    resource: `/${relatedGraphPath}`,
    tags: ["generated", "mermaid", "static-ast", "code-graph"],
    status: "stable",
    generated: { by: KNOWLEDGE_PROCESS, at: generationAt },
    verified: [{ by: KNOWLEDGE_PROCESS, at: generationAt }],
    sources: [
      {
        id: "code-graph",
        resource: `/${relatedGraphPath}`,
        title: "Static AST code graph",
        author: KNOWLEDGE_PROCESS,
      },
    ],
    source_digest: sourceDigest,
    analysis_scope: "static-ast",
  };
  const body = `# Scope

${description} It is a static code graph, not a runtime call graph.

# Mermaid diagram

\`\`\`mermaid
${diagram}
\`\`\`

# Machine-readable graph

Use [code-graph.json](../code-graph.json) for complete nodes, typed edges, evidence locations, and source hashes.`;
  return renderConcept(attributes, body);
}

function buildGeneratedIndexes(result, documentByFileId) {
  const sourceGroups = new Map();
  for (const source of result.analysis.sourceFiles) {
    const entries = sourceGroups.get(source.category) ?? [];
    entries.push(source);
    sourceGroups.set(source.category, entries);
  }
  const groupTitles = {
    "api-service": "API services",
    "api-spec": "API specifications",
    configuration: "Configuration",
    fixture: "Fixtures",
    setup: "Setup",
    source: "Source modules",
    tooling: "Tooling",
    "ui-page": "UI page objects",
    "ui-spec": "UI specifications",
    utility: "Utilities",
  };
  const codeIndex = [
    "# Generated code concepts",
    "",
    "Read the smallest relevant concept after querying the saved graph.",
  ];
  for (const [group, sources] of [...sourceGroups.entries()].sort(([left], [right]) =>
    compareText(left, right)
  )) {
    codeIndex.push("", `## ${groupTitles[group] ?? group}`, "");
    for (const source of sources.sort((left, right) =>
      compareText(left.relativePath, right.relativePath)
    )) {
      const target = documentByFileId.get(source.id);
      codeIndex.push(
        `- [${sourceTitle(source.relativePath)}](${toPosix(path.relative("generated/code", target))})`,
        `  - \`${source.relativePath}\` — ${source.label}.`
      );
    }
  }

  return {
    code: `${codeIndex.join("\n")}\n`,
    graphs: `# Generated graph concepts

- [Static architecture](architecture.md) - High-level module relationships derived from imports and use edges.
- [Page navigation](page-navigation.md) - Static page-object construction/navigation edges.
- [API service relationships](service-relationships.md) - Static inheritance and usage edges for API services.
- [code-graph.json](../code-graph.json) - Full typed static AST graph for deterministic queries.
`,
    generated: `# Generated knowledge

Generated content is deterministic and source-hash-backed. It is safe to regenerate with \`npm run knowledge:build\`; do not use it as evidence of runtime behavior.

- [Code concepts](code/) - Source-level OKF concepts with provenance and static relationships.
- [Graph concepts](graphs/) - Mermaid diagrams suitable for Obsidian and Markdown viewers.
- [code-graph.json](code-graph.json) - Machine-readable static AST graph.
`,
  };
}

function staticScaffold(repoRoot) {
  const { knowledgeRoot } = artifactPaths(repoRoot);
  const withFrontmatter = (attributes, body) => renderConcept(attributes, body);
  const staticConcept = (type, title, description, body, tags) =>
    withFrontmatter(
      {
        type,
        title,
        description,
        tags,
        status: "stable",
        sources: [
          {
            id: "repository",
            resource: "repo://playwright-agentic-automation/AGENTS.md",
            title: "Repository instructions",
          },
        ],
      },
      body
    );

  return new Map([
    [
      path.join(knowledgeRoot, "index.md"),
      `---
okf_version: "${OKF_VERSION}"
---

# Playwright Agentic Automation knowledge

This is a portable, offline-first Open Knowledge Format (OKF) v${OKF_VERSION} bundle. Start here, then retrieve only the smallest relevant concept. The committed source code remains authoritative.

## Architecture

- [Overview](architecture/overview.md) - How the framework layers fit together.
- [Generated graph concepts](generated/graphs/index.md) - Static AST-derived diagrams and machine-readable graph.

## Decisions

- [Offline-first second brain](decisions/offline-first-second-brain.md) - Why the knowledge bundle is portable and model-neutral.

## Runbooks

- [Refresh codebase knowledge](runbooks/refresh-codebase-knowledge.md) - Query, validate, and refresh the saved knowledge safely.

## Obsidian

Open this \`knowledge/\` directory as an Obsidian vault for native backlinks, Graph view, properties, and Mermaid rendering. No Obsidian plugin, account, sync service, LLM key, or cloud service is required.
`,
    ],
    [
      path.join(knowledgeRoot, "log.md"),
      `# Knowledge update log

## ${new Date().toISOString().slice(0, 10)}

- **Initialization**: Created an offline-first OKF v${OKF_VERSION} knowledge bundle with deterministic TypeScript AST extraction.
`,
    ],
    [
      path.join(knowledgeRoot, "architecture", "index.md"),
      `# Architecture concepts

- [Framework overview](overview.md) - Stable ownership boundaries and pointers to generated static graphs.
`,
    ],
    [
      path.join(knowledgeRoot, "architecture", "overview.md"),
      staticConcept(
        "Architecture Overview",
        "Playwright framework architecture",
        "Stable ownership boundaries for the UI, API, fixtures, configuration, and tooling layers.",
        `# Layers

- UI specifications use page objects in \`ui/pages\`.
- API specifications use services in \`api/services\`.
- Shared role sessions and cleanup behavior live in \`utils/fixtures/TestFixtures.ts\`.
- UI routes belong to \`BasePage\`; API routes belong to \`BaseApiService\`.
- \`config/test-config.json\` owns runtime URLs, demo credentials, and shared waits.

# Evidence-backed maps

Use the [generated static architecture graph](../generated/graphs/architecture.md) for current module relationships and [code-graph.json](../generated/code-graph.json) for the full typed graph. These outputs are AST-derived static code graphs, not runtime call graphs.`,
        ["architecture", "playwright", "static-analysis"]
      ),
    ],
    [
      path.join(knowledgeRoot, "decisions", "index.md"),
      `# Architecture decisions

- [Offline-first second brain](offline-first-second-brain.md) - Saved knowledge, provenance, and portability decisions.
`,
    ],
    [
      path.join(knowledgeRoot, "decisions", "offline-first-second-brain.md"),
      staticConcept(
        "Architecture Decision",
        "Offline-first, model-neutral codebase second brain",
        "The repository persists portable OKF notes and deterministic AST-derived graph artifacts instead of requiring an LLM service or vector database.",
        `# Decision

Store durable repository knowledge as standard Markdown with YAML frontmatter, following Google Cloud's Open Knowledge Format v${OKF_VERSION}. Generate code facts from the TypeScript AST rather than asking a model to rediscover them.

# Consequences

- The bundle is readable in a terminal, Git diff, Markdown viewer, or Obsidian vault.
- Source hashes, provenance, and machine verification distinguish extracted facts from human-reviewed notes.
- \`knowledge:query\` reads the saved graph without reparsing the repository.
- \`knowledge:check\` detects when a source change makes generated knowledge stale.
- No Gemini key, vendor SDK, cloud service, embedding model, or vector database is required.

# External reference

The bundle targets [Open Knowledge Format v${OKF_VERSION}](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md).`,
        ["decision", "okf", "offline-first", "agent-memory"]
      ),
    ],
    [
      path.join(knowledgeRoot, "runbooks", "index.md"),
      `# Runbooks

- [Refresh codebase knowledge](refresh-codebase-knowledge.md) - Deterministic retrieval, validation, and refresh workflow.
`,
    ],
    [
      path.join(knowledgeRoot, "runbooks", "refresh-codebase-knowledge.md"),
      staticConcept(
        "Runbook",
        "Retrieve and refresh codebase knowledge",
        "Use the saved graph first, verify freshness, and regenerate only deterministic AST facts after code changes.",
        `# Before investigating or changing code

1. Read [the bundle index](../index.md).
2. Run \`npm run knowledge:check\`.
3. Query only relevant facts: \`npm run knowledge:query -- LoginPage\`.
4. Open the returned concept notes before reading broader source files.

# After changing indexed source code

1. Run \`npm run knowledge:build\`.
2. Run \`npm run knowledge:validate\`.
3. Review generated Markdown, Mermaid diagrams, and \`generated/code-graph.json\` in the diff.
4. Run the smallest relevant framework checks, then commit the updated \`knowledge/\` artifacts with the source change.

# Obsidian use

Open the \`knowledge\` folder as a vault. Its normal Markdown links populate Obsidian's backlink and Graph views; Mermaid code fences render without a community plugin. Do not edit generated concepts manually—put human decisions and runbooks outside \`generated/\`.`,
        ["runbook", "knowledge", "okf", "obsidian"]
      ),
    ],
  ]);
}

function ownedGeneratedMarkdownFiles(paths) {
  const files = [];
  for (const directory of [
    path.join(paths.generatedRoot, "code"),
    path.join(paths.generatedRoot, "graphs"),
  ]) {
    files.push(...walkFiles(directory).filter((filePath) => path.extname(filePath) === ".md"));
  }
  return files.filter(
    (filePath) => readExistingAttributes(filePath)?.generated?.by === KNOWLEDGE_PROCESS
  );
}

export function planKnowledgeBuild(repoRoot, options = {}) {
  const paths = artifactPaths(repoRoot);
  const result = buildStaticGraph(repoRoot);
  const now = options.now ?? dateNow();
  const graphGenerationAt = preservedGraphGenerationAt(paths.graphPath, result.sourceDigest, now);
  const expectedFiles = new Map();
  const ownedGeneratedPaths = new Set();

  for (const [filePath, content] of staticScaffold(repoRoot)) {
    if (!fs.existsSync(filePath)) {
      expectedFiles.set(filePath, content);
    }
  }

  const documentByFileId = new Map(
    result.analysis.sourceFiles.map((source) => [source.id, generatedCodePath(source.relativePath)])
  );
  for (const source of result.analysis.sourceFiles) {
    const documentPath = documentByFileId.get(source.id);
    const absolutePath = path.join(paths.knowledgeRoot, documentPath);
    expectedFiles.set(
      absolutePath,
      buildCodeConcept(source, result, documentPath, documentByFileId, absolutePath, now)
    );
    ownedGeneratedPaths.add(absoluteKey(absolutePath));
  }

  const graphRelativePath = path.posix.join("generated", "code-graph.json");
  expectedFiles.set(
    paths.graphPath,
    `${JSON.stringify(graphPayload(result, graphGenerationAt), null, 2)}\n`
  );
  ownedGeneratedPaths.add(absoluteKey(paths.graphPath));

  const architecturePath = path.join(paths.generatedRoot, "graphs", "architecture.md");
  const navigationPath = path.join(paths.generatedRoot, "graphs", "page-navigation.md");
  const servicesPath = path.join(paths.generatedRoot, "graphs", "service-relationships.md");
  expectedFiles.set(
    architecturePath,
    graphConcept(
      "Static architecture graph",
      "High-level repository relationships derived from imports and direct static usage edges.",
      buildArchitectureMermaid(result),
      result.sourceDigest,
      graphGenerationAt,
      graphRelativePath
    )
  );
  expectedFiles.set(
    navigationPath,
    graphConcept(
      "Static page navigation graph",
      "Page-object construction edges inferred from concrete TypeScript new expressions.",
      buildRelationshipMermaid(result, "NAVIGATES_TO", "page navigation"),
      result.sourceDigest,
      graphGenerationAt,
      graphRelativePath
    )
  );
  expectedFiles.set(
    servicesPath,
    graphConcept(
      "Static API service relationships",
      "API-service inheritance and concrete service-use edges derived from the TypeScript AST.",
      buildServiceMermaid(result),
      result.sourceDigest,
      graphGenerationAt,
      graphRelativePath
    )
  );
  for (const filePath of [architecturePath, navigationPath, servicesPath]) {
    ownedGeneratedPaths.add(absoluteKey(filePath));
  }

  const indexes = buildGeneratedIndexes(result, documentByFileId);
  const generatedIndexPath = path.join(paths.generatedRoot, "index.md");
  const codeIndexPath = path.join(paths.generatedRoot, "code", "index.md");
  const graphsIndexPath = path.join(paths.generatedRoot, "graphs", "index.md");
  expectedFiles.set(generatedIndexPath, indexes.generated);
  expectedFiles.set(codeIndexPath, indexes.code);
  expectedFiles.set(graphsIndexPath, indexes.graphs);
  for (const filePath of [generatedIndexPath, codeIndexPath, graphsIndexPath]) {
    ownedGeneratedPaths.add(absoluteKey(filePath));
  }

  const changedFiles = [...expectedFiles.entries()]
    .filter(([filePath, content]) => !fs.existsSync(filePath) || readUtf8(filePath) !== content)
    .map(([filePath]) => filePath)
    .sort(compareText);
  const staleOwnedFiles = ownedGeneratedMarkdownFiles(paths)
    .filter((filePath) => !ownedGeneratedPaths.has(absoluteKey(filePath)))
    .sort(compareText);

  return {
    paths,
    result,
    expectedFiles,
    changedFiles,
    staleOwnedFiles,
  };
}

export function applyKnowledgeBuild(plan) {
  for (const [filePath, content] of plan.expectedFiles) {
    if (!fs.existsSync(filePath) || readUtf8(filePath) !== content) {
      ensureDirectory(path.dirname(filePath));
      fs.writeFileSync(filePath, content, "utf8");
    }
  }
  for (const filePath of plan.staleOwnedFiles) {
    fs.rmSync(filePath);
  }
}

function markdownFilesInKnowledge(knowledgeRoot) {
  if (!fs.existsSync(knowledgeRoot)) {
    return [];
  }
  const files = [];
  const visit = (directoryPath) => {
    for (const entry of fs.readdirSync(directoryPath, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (entry.name !== ".obsidian") {
          visit(path.join(directoryPath, entry.name));
        }
      } else if (entry.isFile() && path.extname(entry.name) === ".md") {
        files.push(path.join(directoryPath, entry.name));
      }
    }
  };
  visit(knowledgeRoot);
  return files.sort(compareText);
}

function isDateLike(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}(?:T.*)?$/u.test(value);
}

function resolveMarkdownTarget(knowledgeRoot, sourcePath, target) {
  const pathOnly = target.split("#", 1)[0].split("?", 1)[0];
  if (!pathOnly || /^(?:https?:|mailto:|obsidian:)/u.test(pathOnly)) {
    return undefined;
  }
  const candidate = pathOnly.startsWith("/")
    ? path.join(knowledgeRoot, pathOnly.slice(1))
    : path.resolve(path.dirname(sourcePath), pathOnly);
  if (!hasPathPrefix(candidate, knowledgeRoot)) {
    return undefined;
  }
  if (fs.existsSync(candidate)) {
    return candidate;
  }
  if (!path.extname(candidate) && fs.existsSync(`${candidate}.md`)) {
    return `${candidate}.md`;
  }
  return null;
}

export function validateKnowledgeBundle(repoRoot) {
  const { knowledgeRoot, graphPath } = artifactPaths(repoRoot);
  const errors = [];
  const warnings = [];
  if (!fs.existsSync(knowledgeRoot)) {
    return { errors: ["knowledge/ does not exist. Run npm run knowledge:build first."], warnings };
  }

  const rootIndexPath = path.join(knowledgeRoot, "index.md");
  if (!fs.existsSync(rootIndexPath)) {
    errors.push("knowledge/index.md is required for progressive discovery.");
  } else {
    try {
      const rootAttributes = parseFrontmatter(readUtf8(rootIndexPath))?.attributes;
      if (rootAttributes?.okf_version !== OKF_VERSION) {
        errors.push(`knowledge/index.md must declare okf_version: "${OKF_VERSION}".`);
      }
    } catch (error) {
      errors.push(`knowledge/index.md has invalid YAML frontmatter: ${error.message}`);
    }
  }

  for (const filePath of markdownFilesInKnowledge(knowledgeRoot)) {
    const relativePath = toPosix(path.relative(knowledgeRoot, filePath));
    const basename = path.basename(filePath);
    const source = readUtf8(filePath);
    if (basename === "index.md") {
      if (filePath !== rootIndexPath && source.startsWith("---")) {
        errors.push(
          `${relativePath} is a reserved index file and must not have concept frontmatter.`
        );
      }
      continue;
    }
    if (basename === "log.md") {
      if (source.startsWith("---")) {
        errors.push(
          `${relativePath} is a reserved log file and must not have concept frontmatter.`
        );
      }
      continue;
    }

    let parsed;
    try {
      parsed = parseFrontmatter(source);
    } catch (error) {
      errors.push(`${relativePath} has invalid YAML frontmatter: ${error.message}`);
      continue;
    }
    if (!parsed) {
      errors.push(`${relativePath} is an OKF concept and needs YAML frontmatter.`);
      continue;
    }
    const attributes = parsed.attributes;
    if (typeof attributes.type !== "string" || !attributes.type.trim()) {
      errors.push(`${relativePath} needs a non-empty type field.`);
    }
    if (attributes.status && !["draft", "stable", "deprecated"].includes(attributes.status)) {
      errors.push(`${relativePath} has unsupported status '${attributes.status}'.`);
    }
    if (attributes.generated) {
      if (
        typeof attributes.generated !== "object" ||
        typeof attributes.generated.by !== "string" ||
        !isDateLike(attributes.generated.at)
      ) {
        errors.push(`${relativePath} has an invalid generated trust record.`);
      }
    }
    if (attributes.verified) {
      const records = Array.isArray(attributes.verified)
        ? attributes.verified
        : [attributes.verified];
      if (records.some((record) => typeof record?.by !== "string" || !isDateLike(record.at))) {
        errors.push(`${relativePath} has an invalid verified trust record.`);
      }
    }
    if (attributes.sources) {
      if (!Array.isArray(attributes.sources)) {
        errors.push(`${relativePath} sources must be a YAML list.`);
      } else if (
        attributes.sources.some((sourceEntry) => typeof sourceEntry?.resource !== "string")
      ) {
        errors.push(`${relativePath} sources entries must include resource.`);
      }
    }
    if (
      attributes.generated?.by === KNOWLEDGE_PROCESS &&
      relativePath.startsWith("generated/code/")
    ) {
      if (!/^[a-f0-9]{64}$/u.test(attributes.source_sha256 ?? "")) {
        errors.push(`${relativePath} needs a source_sha256 for deterministic freshness.`);
      }
      if (!/^[a-f0-9]{64}$/u.test(attributes.fact_sha256 ?? "")) {
        errors.push(`${relativePath} needs a fact_sha256 for rendered-fact freshness.`);
      }
      if (
        typeof attributes.source_path !== "string" ||
        typeof attributes.code_graph_id !== "string"
      ) {
        errors.push(`${relativePath} needs source_path and code_graph_id.`);
      }
    }

    for (const match of source.matchAll(/\[[^\]]+\]\(([^)]+)\)/gu)) {
      const target = resolveMarkdownTarget(knowledgeRoot, filePath, match[1]);
      if (target === null) {
        warnings.push(`${relativePath} links to a missing local target '${match[1]}'.`);
      }
    }
  }

  if (!fs.existsSync(graphPath)) {
    errors.push("knowledge/generated/code-graph.json is missing.");
  } else {
    try {
      const graph = JSON.parse(readUtf8(graphPath));
      if (graph.format !== "static-code-graph" || graph.staticAnalysis !== true) {
        errors.push("code-graph.json must be explicitly marked as a static code graph.");
      }
      if (!Array.isArray(graph.nodes) || !Array.isArray(graph.edges)) {
        errors.push("code-graph.json needs nodes and edges arrays.");
      } else {
        const nodeIds = new Set();
        for (const node of graph.nodes) {
          if (!node?.id || nodeIds.has(node.id)) {
            errors.push("code-graph.json has a missing or duplicate node id.");
            break;
          }
          nodeIds.add(node.id);
        }
        for (const edge of graph.edges) {
          if (!nodeIds.has(edge.from) || !nodeIds.has(edge.to)) {
            errors.push(
              `code-graph.json edge '${edge.id ?? "<unknown>"}' has an unresolved endpoint.`
            );
          }
        }
      }
    } catch (error) {
      errors.push(`knowledge/generated/code-graph.json is not valid JSON: ${error.message}`);
    }
  }

  return {
    errors: [...new Set(errors)].sort(compareText),
    warnings: [...new Set(warnings)].sort(compareText),
  };
}

export function loadCodeGraph(repoRoot) {
  const { graphPath } = artifactPaths(repoRoot);
  if (!fs.existsSync(graphPath)) {
    throw new Error(
      "knowledge/generated/code-graph.json is missing. Run npm run knowledge:build first."
    );
  }
  return JSON.parse(readUtf8(graphPath));
}
