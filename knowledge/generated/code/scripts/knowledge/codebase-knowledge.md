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
source_sha256: b8c31831fb7011976187a3f6f88d18c61c0f9dd0d2e90b2c9cca2df87204a550
code_graph_id: file:scripts/knowledge/CodebaseKnowledge.mjs
analysis_scope: static-ast
fact_sha256: d3062df781bdc6421fe2b813f16f44abafedee68240fc031347658c0b7a059ed
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-18T10:16:28.092Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-18T10:16:28.092Z"
---

# Purpose

Framework tooling extracted from scripts/knowledge/CodebaseKnowledge.mjs by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `variable` **KNOWLEDGE_PROCESS** (lines 11-11)
- `variable` **OKF_VERSION** (lines 10-10)
- `class` **StaticGraph** (lines 348-431)
- `method` **StaticGraph.addEdge** (lines 368-406)
- `method` **StaticGraph.addNode** (lines 354-366)
- `method` **StaticGraph.constructor** (lines 349-352)
- `method` **StaticGraph.getEdges** (lines 416-430)
- `method` **StaticGraph.getNode** (lines 408-410)
- `method` **StaticGraph.getNodes** (lines 412-414)
- `function` **absoluteKey** (lines 83-86)
- `function` **addPythonAstGraph** (lines 572-663)
- `function` **applyKnowledgeBuild** exported (lines 1857-1867)
- `function` **artifactPaths** (lines 433-441)
- `function` **buildArchitectureMermaid** (lines 1381-1432)
- `function` **buildCodeConcept** (lines 1265-1379)
- `function` **buildGeneratedIndexes** (lines 1529-1586)
- `function` **buildProjectAnalysis** (lines 516-570)
- `function` **buildRelationshipMermaid** (lines 1434-1458)
- `function` **buildServiceMermaid** (lines 1460-1490)
- `function` **buildStaticGraph** (lines 665-1204)
- `function` **categoryForNode** (lines 1236-1244)
- `function` **classifyFile** (lines 186-229)
- `function` **collectSourcePaths** (lines 159-184)
- `function` **compareById** (lines 96-98)
- `function` **compareText** (lines 88-94)
- `function` **dateNow** (lines 485-487)
- `function` **ensureDirectory** (lines 100-102)
- `function` **escapeMermaidLabel** (lines 335-342)
- `function` **formatTypeScriptDiagnostic** (lines 155-157)
- `function` **generatedCodePath** (lines 321-325)
- `function` **graphConcept** (lines 1492-1527)
- `function` **graphNodeLabel** (lines 1232-1234)
- `function` **graphPayload** (lines 1206-1230)
- `function` **hasPathPrefix** (lines 108-111)
- `function` **hashText** exported (lines 79-81)
- `function` **isCodePath** (lines 247-249)
- `function` **isDateLike** (lines 1889-1891)
- `function` **isExported** (lines 251-253)
- `function` **listMarkdown** (lines 1258-1263)
- `function` **loadCodeGraph** exported (lines 2064-2072)
- `function` **loadTypeScriptConfig** (lines 134-153)
- `function` **markdownFilesInKnowledge** (lines 1869-1887)
- `function` **markdownLink** (lines 327-333)
- `function` **mermaidId** (lines 344-346)
- `function` **nodeName** (lines 255-263)
- `function` **ownedGeneratedMarkdownFiles** (lines 1742-1753)
- `function` **packageNameFromSpecifier** (lines 302-310)
- `function` **parseFrontmatter** (lines 443-458)
- `function` **planKnowledgeBuild** exported (lines 1755-1855)
- `function` **preservedGenerationAt** (lines 489-499)
- `function` **preservedGraphGenerationAt** (lines 501-514)
- `function` **readExistingAttributes** (lines 460-469)
- `function` **readUtf8** (lines 104-106)
- `function` **relationshipTargetLink** (lines 1246-1256)
- `function` **renderConcept** (lines 481-483)
- `function` **resolveMarkdownTarget** (lines 1893-1911)
- `function` **sanitizePathSegment** (lines 312-319)
- `function` **scriptKindForPath** (lines 236-245)
- `function` **serializeFrontmatter** (lines 471-479)
- `function` **sourceTitle** (lines 231-234)
- `function` **staticScaffold** (lines 1588-1740)
- `function` **textFromRouteInitializer** (lines 265-288)
- `function` **toPosix** exported (lines 75-77)
- `function` **unwrapExpression** (lines 290-300)
- `function` **validateKnowledgeBundle** exported (lines 1913-2062)
- `function` **walkFiles** (lines 113-132)

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

The facts above are machine-confirmed from the TypeScript AST and source hash `b8c31831fb7011976187a3f6f88d18c61c0f9dd0d2e90b2c9cca2df87204a550`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
