---
type: Static Code Graph
title: Static architecture graph
description: High-level repository relationships derived from imports and direct static usage edges.
resource: /generated/code-graph.json
tags:
  - generated
  - mermaid
  - static-ast
  - code-graph
status: stable
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-18T10:09:48.149Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-18T10:09:48.149Z"
sources:
  - id: code-graph
    resource: /generated/code-graph.json
    title: Static AST code graph
    author: process:codebase-knowledge/1.0.0
source_digest: 746f735bd15d9d6bd1ce2e04093b44e9b4591edcb6a78f27feffc438e8cb1aed
analysis_scope: static-ast
---

# Scope

High-level repository relationships derived from imports and direct static usage edges. It is a static code graph, not a runtime call graph.

# Mermaid diagram

```mermaid
flowchart LR
  node_6de4de0315["API services"]
  node_b2229e984a["API specs"]
  node_63f40f4be5["Configuration"]
  node_41089dbc2c["Fixtures"]
  node_75f969eee6["Test setup"]
  node_35c7777589["Tooling"]
  node_560b1bca30["UI page objects"]
  node_a071ef0445["UI specs"]
  node_191ace11ef["Utilities"]
  node_6de4de0315 --> node_191ace11ef
  node_b2229e984a --> node_6de4de0315
  node_b2229e984a --> node_41089dbc2c
  node_b2229e984a --> node_191ace11ef
  node_41089dbc2c --> node_6de4de0315
  node_41089dbc2c --> node_63f40f4be5
  node_41089dbc2c --> node_191ace11ef
  node_75f969eee6 --> node_6de4de0315
  node_75f969eee6 --> node_63f40f4be5
  node_75f969eee6 --> node_191ace11ef
  node_35c7777589 --> node_6de4de0315
  node_35c7777589 --> node_63f40f4be5
  node_35c7777589 --> node_560b1bca30
  node_35c7777589 --> node_191ace11ef
  node_560b1bca30 --> node_191ace11ef
  node_a071ef0445 --> node_6de4de0315
  node_a071ef0445 --> node_63f40f4be5
  node_a071ef0445 --> node_41089dbc2c
  node_a071ef0445 --> node_560b1bca30
  node_a071ef0445 --> node_191ace11ef
  node_191ace11ef --> node_63f40f4be5
```

# Machine-readable graph

Use [code-graph.json](../code-graph.json) for complete nodes, typed edges, evidence locations, and source hashes.
