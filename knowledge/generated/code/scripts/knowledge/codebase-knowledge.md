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
source_sha256: 8b2b92ec9f542b33cece5fb4452a5ada574a5577de81b0fdd270848d0c4e747a
code_graph_id: file:scripts/knowledge/CodebaseKnowledge.mjs
analysis_scope: static-ast
fact_sha256: 0e03ae60e31ac26ee031f8fdba0ad1fafaf7e219d3577eeb17a74c448832453a
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-09-04T05:15:44.685Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-09-04T05:15:44.685Z"
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
- `function` **addPythonAstGraph** (lines 572-670)
- `function` **applyKnowledgeBuild** exported (lines 1864-1874)
- `function` **artifactPaths** (lines 433-441)
- `function` **buildArchitectureMermaid** (lines 1388-1439)
- `function` **buildCodeConcept** (lines 1272-1386)
- `function` **buildGeneratedIndexes** (lines 1536-1593)
- `function` **buildProjectAnalysis** (lines 516-570)
- `function` **buildRelationshipMermaid** (lines 1441-1465)
- `function` **buildServiceMermaid** (lines 1467-1497)
- `function` **buildStaticGraph** (lines 672-1211)
- `function` **categoryForNode** (lines 1243-1251)
- `function` **classifyFile** (lines 186-229)
- `function` **collectSourcePaths** (lines 159-184)
- `function` **compareById** (lines 96-98)
- `function` **compareText** (lines 88-94)
- `function` **dateNow** (lines 485-487)
- `function` **ensureDirectory** (lines 100-102)
- `function` **escapeMermaidLabel** (lines 335-342)
- `function` **formatTypeScriptDiagnostic** (lines 155-157)
- `function` **generatedCodePath** (lines 321-325)
- `function` **graphConcept** (lines 1499-1534)
- `function` **graphNodeLabel** (lines 1239-1241)
- `function` **graphPayload** (lines 1213-1237)
- `function` **hasPathPrefix** (lines 108-111)
- `function` **hashText** exported (lines 79-81)
- `function` **isCodePath** (lines 247-249)
- `function` **isDateLike** (lines 1896-1898)
- `function` **isExported** (lines 251-253)
- `function` **listMarkdown** (lines 1265-1270)
- `function` **loadCodeGraph** exported (lines 2071-2079)
- `function` **loadTypeScriptConfig** (lines 134-153)
- `function` **markdownFilesInKnowledge** (lines 1876-1894)
- `function` **markdownLink** (lines 327-333)
- `function` **mermaidId** (lines 344-346)
- `function` **nodeName** (lines 255-263)
- `function` **ownedGeneratedMarkdownFiles** (lines 1749-1760)
- `function` **packageNameFromSpecifier** (lines 302-310)
- `function` **parseFrontmatter** (lines 443-458)
- `function` **planKnowledgeBuild** exported (lines 1762-1862)
- `function` **preservedGenerationAt** (lines 489-499)
- `function` **preservedGraphGenerationAt** (lines 501-514)
- `function` **readExistingAttributes** (lines 460-469)
- `function` **readUtf8** (lines 104-106)
- `function` **relationshipTargetLink** (lines 1253-1263)
- `function` **renderConcept** (lines 481-483)
- `function` **resolveMarkdownTarget** (lines 1900-1918)
- `function` **sanitizePathSegment** (lines 312-319)
- `function` **scriptKindForPath** (lines 236-245)
- `function` **serializeFrontmatter** (lines 471-479)
- `function` **sourceTitle** (lines 231-234)
- `function` **staticScaffold** (lines 1595-1747)
- `function` **textFromRouteInitializer** (lines 265-288)
- `function` **toPosix** exported (lines 75-77)
- `function` **unwrapExpression** (lines 290-300)
- `function` **validateKnowledgeBundle** exported (lines 1920-2069)
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
- [scripts/knowledge/extractTestInventory.mjs](./extract-test-inventory.md) imports this module.
- [scripts/validateKnowledge.mjs](../validate-knowledge.md) imports this module.
- [scripts/buildKnowledge.mjs](../build-knowledge.md) imports this module.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `8b2b92ec9f542b33cece5fb4452a5ada574a5577de81b0fdd270848d0c4e747a`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
