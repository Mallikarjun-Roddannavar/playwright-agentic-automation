---
type: Static Code Graph
title: Static API service relationships
description: API-service inheritance and concrete service-use edges derived from the TypeScript AST.
resource: /generated/code-graph.json
tags:
  - generated
  - mermaid
  - static-ast
  - code-graph
status: stable
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-15T11:47:52.662Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-15T11:47:52.662Z"
sources:
  - id: code-graph
    resource: /generated/code-graph.json
    title: Static AST code graph
    author: process:codebase-knowledge/1.0.0
source_digest: 09a541c99086ce1ff39bb1b6611a9b472bdb2d115dbc1b5bb98ae74c0e0a7185
analysis_scope: static-ast
---

# Scope

API-service inheritance and concrete service-use edges derived from the TypeScript AST. It is a static code graph, not a runtime call graph.

# Mermaid diagram

```mermaid
flowchart LR
  node_e5065ca783["api/specs/files.spec.ts"]
  node_d6d570a3c3["api/specs/rbac.spec.ts"]
  node_2a3f39369e["ui/specs/multi-role.spec.ts"]
  node_906b59725f["ui/specs/viewer-rbac.spec.ts"]
  node_aadbf558d7["AuthService"]
  node_5c07cd7be6["BaseApiService"]
  node_d730646214["FilesService"]
  node_ed216ecf78["FoldersService"]
  node_3b0693298c["expectRoleCanUploadFile"]
  node_b3fd884998["createApiRoleContext"]
  node_e5065ca783 -->|uses api service| node_ed216ecf78
  node_2a3f39369e -->|uses api service| node_ed216ecf78
  node_aadbf558d7 -->|extends| node_5c07cd7be6
  node_d6d570a3c3 -->|uses api service| node_ed216ecf78
  node_906b59725f -->|uses api service| node_ed216ecf78
  node_d730646214 -->|extends| node_5c07cd7be6
  node_e5065ca783 -->|instantiates| node_d730646214
  node_d6d570a3c3 -->|instantiates| node_ed216ecf78
  node_b3fd884998 -->|uses api service| node_aadbf558d7
  node_3b0693298c -->|uses api service| node_ed216ecf78
  node_e5065ca783 -->|uses api service| node_d730646214
  node_3b0693298c -->|instantiates| node_ed216ecf78
  node_b3fd884998 -->|instantiates| node_aadbf558d7
  node_2a3f39369e -->|instantiates| node_ed216ecf78
  node_ed216ecf78 -->|extends| node_5c07cd7be6
  node_906b59725f -->|instantiates| node_ed216ecf78
  node_e5065ca783 -->|instantiates| node_ed216ecf78
```

# Machine-readable graph

Use [code-graph.json](../code-graph.json) for complete nodes, typed edges, evidence locations, and source hashes.
