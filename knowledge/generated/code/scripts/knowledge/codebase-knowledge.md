---
type: Code Module
title: CodebaseKnowledge
description: Framework tooling extracted from scripts/knowledge/CodebaseKnowledge.mjs by deterministic static analysis.
resource: repo://playwright-agentic-automation/scripts/knowledge/CodebaseKnowledge.mjs
tags:
  - generated
  - static-ast
  - tooling
  - mjs
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/scripts/knowledge/CodebaseKnowledge.mjs
    title: scripts/knowledge/CodebaseKnowledge.mjs
    author: process:codebase-knowledge/1.0.0
source_path: scripts/knowledge/CodebaseKnowledge.mjs
source_sha256: 52a5e81acd7d5b81b4ba0337db13b8dcf0533eb4bc64a49359618b16fc61d40c
code_graph_id: file:scripts/knowledge/CodebaseKnowledge.mjs
analysis_scope: static-ast
fact_sha256: efc1371e6b38a40700217c91bb4a0f5ba7b6bb0ddde80ab709e6a0c8cebbac5a
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-16T08:39:27.990Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-16T08:39:27.990Z"
---

# Purpose

Framework tooling extracted from scripts/knowledge/CodebaseKnowledge.mjs by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `function` **absoluteKey** (lines 83-86)
- `function` **addPythonAstGraph** (lines 568-659)
- `function` **applyKnowledgeBuild** exported (lines 1853-1863)
- `function` **artifactPaths** (lines 429-437)
- `function` **buildArchitectureMermaid** (lines 1377-1428)
- `function` **buildCodeConcept** (lines 1261-1375)
- `function` **buildGeneratedIndexes** (lines 1525-1582)
- `function` **buildProjectAnalysis** (lines 512-566)
- `function` **buildRelationshipMermaid** (lines 1430-1454)
- `function` **buildServiceMermaid** (lines 1456-1486)
- `function` **buildStaticGraph** (lines 661-1200)
- `function` **categoryForNode** (lines 1232-1240)
- `function` **classifyFile** (lines 182-225)
- `function` **collectSourcePaths** (lines 155-180)
- `function` **compareById** (lines 92-94)
- `function` **compareText** (lines 88-90)
- `function` **dateNow** (lines 481-483)
- `function` **ensureDirectory** (lines 96-98)
- `function` **escapeMermaidLabel** (lines 331-338)
- `function` **formatTypeScriptDiagnostic** (lines 151-153)
- `function` **generatedCodePath** (lines 317-321)
- `function` **graphConcept** (lines 1488-1523)
- `function` **graphNodeLabel** (lines 1228-1230)
- `function` **graphPayload** (lines 1202-1226)
- `function` **hashText** exported (lines 79-81)
- `function` **hasPathPrefix** (lines 104-107)
- `function` **isCodePath** (lines 243-245)
- `function` **isDateLike** (lines 1885-1887)
- `function` **isExported** (lines 247-249)
- `variable` **KNOWLEDGE_PROCESS** (lines 11-11)
- `function` **listMarkdown** (lines 1254-1259)
- `function` **loadCodeGraph** exported (lines 2060-2068)
- `function` **loadTypeScriptConfig** (lines 130-149)
- `function` **markdownFilesInKnowledge** (lines 1865-1883)
- `function` **markdownLink** (lines 323-329)
- `function` **mermaidId** (lines 340-342)
- `function` **nodeName** (lines 251-259)
- `variable` **OKF_VERSION** (lines 10-10)
- `function` **ownedGeneratedMarkdownFiles** (lines 1738-1749)
- `function` **packageNameFromSpecifier** (lines 298-306)
- `function` **parseFrontmatter** (lines 439-454)
- `function` **planKnowledgeBuild** exported (lines 1751-1851)
- `function` **preservedGenerationAt** (lines 485-495)
- `function` **preservedGraphGenerationAt** (lines 497-510)
- `function` **readExistingAttributes** (lines 456-465)
- `function` **readUtf8** (lines 100-102)
- `function` **relationshipTargetLink** (lines 1242-1252)
- `function` **renderConcept** (lines 477-479)
- `function` **resolveMarkdownTarget** (lines 1889-1907)
- `function` **sanitizePathSegment** (lines 308-315)
- `function` **scriptKindForPath** (lines 232-241)
- `function` **serializeFrontmatter** (lines 467-475)
- `function` **sourceTitle** (lines 227-230)
- `class` **StaticGraph** (lines 344-427)
- `method` **StaticGraph.addEdge** (lines 364-402)
- `method` **StaticGraph.addNode** (lines 350-362)
- `method` **StaticGraph.constructor** (lines 345-348)
- `method` **StaticGraph.getEdges** (lines 412-426)
- `method` **StaticGraph.getNode** (lines 404-406)
- `method` **StaticGraph.getNodes** (lines 408-410)
- `function` **staticScaffold** (lines 1584-1736)
- `function` **textFromRouteInitializer** (lines 261-284)
- `function` **toPosix** exported (lines 75-77)
- `function` **unwrapExpression** (lines 286-296)
- `function` **validateKnowledgeBundle** exported (lines 1909-2058)
- `function` **walkFiles** (lines 109-128)

# Imports

- `node:fs` via `node:fs`
- `js-yaml` via `js-yaml`
- `node:path` via `node:path`
- `node:crypto` via `node:crypto`
- `node:child_process` via `node:child_process`
- `node:process` via `node:process`
- `typescript` via `typescript`

# Static relationships

- None detected by static analysis.

# Dependents

- [scripts/queryKnowledge.mjs](../query-knowledge.md) imports this module.
- [scripts/validateKnowledge.mjs](../validate-knowledge.md) imports this module.
- [scripts/buildKnowledge.mjs](../build-knowledge.md) imports this module.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `52a5e81acd7d5b81b4ba0337db13b8dcf0533eb4bc64a49359618b16fc61d40c`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
