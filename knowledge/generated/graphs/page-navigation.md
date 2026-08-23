---
type: Static Code Graph
title: Static page navigation graph
description: Page-object construction edges inferred from concrete TypeScript new expressions.
resource: /generated/code-graph.json
tags:
  - generated
  - mermaid
  - static-ast
  - code-graph
status: stable
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-23T04:53:29.830Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-23T04:53:29.830Z"
sources:
  - id: code-graph
    resource: /generated/code-graph.json
    title: Static AST code graph
    author: process:codebase-knowledge/1.0.0
source_digest: 1c8ab4aa70561c01b69a1a124965032b31a5681e2610e61dde3184cebbd793e7
analysis_scope: static-ast
---

# Scope

Page-object construction edges inferred from concrete TypeScript new expressions. It is a static code graph, not a runtime call graph.

# Mermaid diagram

```mermaid
flowchart LR
  node_5509f5d1f6["FolderFilesPage"]
  node_dc87cfbca3["FoldersPage"]
  node_f82bc2d423["HomePage"]
  node_4fc11bd6d3["LoginPage"]
  node_f82bc2d423 -->|navigates to| node_dc87cfbca3
  node_dc87cfbca3 -->|navigates to| node_5509f5d1f6
  node_4fc11bd6d3 -->|navigates to| node_f82bc2d423
```

# Machine-readable graph

Use [code-graph.json](../code-graph.json) for complete nodes, typed edges, evidence locations, and source hashes.
