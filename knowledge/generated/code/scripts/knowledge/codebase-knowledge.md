---
type: Code Module
title: CodebaseKnowledge
description: Framework tooling extracted from scripts/knowledge/CodebaseKnowledge.mjs by deterministic static analysis.
resource: repo://playwright-pom-agent-skills/scripts/knowledge/CodebaseKnowledge.mjs
tags:
  - generated
  - static-ast
  - tooling
  - mjs
status: stable
sources:
  - id: source
    resource: repo://playwright-pom-agent-skills/scripts/knowledge/CodebaseKnowledge.mjs
    title: scripts/knowledge/CodebaseKnowledge.mjs
    author: process:codebase-knowledge/1.0.0
source_path: scripts/knowledge/CodebaseKnowledge.mjs
source_sha256: bd24292d2b8ea503a496ca9825d53cf9ce4fe5a505c2288bfde97015e9a8b600
code_graph_id: file:scripts/knowledge/CodebaseKnowledge.mjs
analysis_scope: static-ast
fact_sha256: 87de98a2c03b6eee335a40225b0a924d4a943989abb0670858e464d80db9d080
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-07-31T11:43:13.295Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-07-31T11:43:13.295Z"
---

# Purpose

Framework tooling extracted from scripts/knowledge/CodebaseKnowledge.mjs by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `function` **absoluteKey** (lines 67-70)
- `function` **applyKnowledgeBuild** exported (lines 1736-1746)
- `function` **artifactPaths** (lines 407-415)
- `function` **buildArchitectureMermaid** (lines 1260-1311)
- `function` **buildCodeConcept** (lines 1144-1258)
- `function` **buildGeneratedIndexes** (lines 1408-1465)
- `function` **buildProjectAnalysis** (lines 490-544)
- `function` **buildRelationshipMermaid** (lines 1313-1337)
- `function` **buildServiceMermaid** (lines 1339-1369)
- `function` **buildStaticGraph** (lines 546-1083)
- `function` **categoryForNode** (lines 1115-1123)
- `function` **classifyFile** (lines 166-203)
- `function` **collectSourcePaths** (lines 139-164)
- `function` **compareById** (lines 76-78)
- `function` **compareText** (lines 72-74)
- `function` **dateNow** (lines 459-461)
- `function` **ensureDirectory** (lines 80-82)
- `function` **escapeMermaidLabel** (lines 309-316)
- `function` **formatTypeScriptDiagnostic** (lines 135-137)
- `function` **generatedCodePath** (lines 295-299)
- `function` **graphConcept** (lines 1371-1406)
- `function` **graphNodeLabel** (lines 1111-1113)
- `function` **graphPayload** (lines 1085-1109)
- `function` **hashText** exported (lines 63-65)
- `function` **hasPathPrefix** (lines 88-91)
- `function` **isCodePath** (lines 221-223)
- `function` **isDateLike** (lines 1768-1770)
- `function` **isExported** (lines 225-227)
- `variable` **KNOWLEDGE_PROCESS** (lines 10-10)
- `function` **listMarkdown** (lines 1137-1142)
- `function` **loadCodeGraph** exported (lines 1943-1951)
- `function` **loadTypeScriptConfig** (lines 114-133)
- `function` **markdownFilesInKnowledge** (lines 1748-1766)
- `function` **markdownLink** (lines 301-307)
- `function` **mermaidId** (lines 318-320)
- `function` **nodeName** (lines 229-237)
- `variable` **OKF_VERSION** (lines 9-9)
- `function` **ownedGeneratedMarkdownFiles** (lines 1621-1632)
- `function` **packageNameFromSpecifier** (lines 276-284)
- `function` **parseFrontmatter** (lines 417-432)
- `function` **planKnowledgeBuild** exported (lines 1634-1734)
- `function` **preservedGenerationAt** (lines 463-473)
- `function` **preservedGraphGenerationAt** (lines 475-488)
- `function` **readExistingAttributes** (lines 434-443)
- `function` **readUtf8** (lines 84-86)
- `function` **relationshipTargetLink** (lines 1125-1135)
- `function` **renderConcept** (lines 455-457)
- `function` **resolveMarkdownTarget** (lines 1772-1790)
- `function` **sanitizePathSegment** (lines 286-293)
- `function` **scriptKindForPath** (lines 210-219)
- `function` **serializeFrontmatter** (lines 445-453)
- `function` **sourceTitle** (lines 205-208)
- `class` **StaticGraph** (lines 322-405)
- `method` **StaticGraph.addEdge** (lines 342-380)
- `method` **StaticGraph.addNode** (lines 328-340)
- `method` **StaticGraph.constructor** (lines 323-326)
- `method` **StaticGraph.getEdges** (lines 390-404)
- `method` **StaticGraph.getNode** (lines 382-384)
- `method` **StaticGraph.getNodes** (lines 386-388)
- `function` **staticScaffold** (lines 1467-1619)
- `function` **textFromRouteInitializer** (lines 239-262)
- `function` **toPosix** exported (lines 59-61)
- `function` **unwrapExpression** (lines 264-274)
- `function` **validateKnowledgeBundle** exported (lines 1792-1941)
- `function` **walkFiles** (lines 93-112)

# Imports

- `node:fs` via `node:fs`
- `js-yaml` via `js-yaml`
- `node:path` via `node:path`
- `node:crypto` via `node:crypto`
- `node:process` via `node:process`
- `typescript` via `typescript`

# Static relationships

- None detected by static analysis.

# Dependents

- [scripts/queryKnowledge.mjs](../query-knowledge.md) imports this module.
- [scripts/validateKnowledge.mjs](../validate-knowledge.md) imports this module.
- [scripts/buildKnowledge.mjs](../build-knowledge.md) imports this module.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `bd24292d2b8ea503a496ca9825d53cf9ce4fe5a505c2288bfde97015e9a8b600`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
