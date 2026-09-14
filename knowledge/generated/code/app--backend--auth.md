---
type: Code Module
title: auth.py
description: Python backend extracted from app/backend/auth.py by deterministic static analysis.
resource: repo://playwright-agentic-automation/app/backend/auth.py
tags:
  - generated
  - static-ast
  - backend
  - py
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/app/backend/auth.py
    title: app/backend/auth.py
    author: process:codebase-knowledge/1.0.0
source_path: app/backend/auth.py
source_sha256: 23958d497a360ff63b4645ebed50c4de062d1b4e3b758fe96325b1fd6396f8a0
code_graph_id: file:app/backend/auth.py
analysis_scope: static-ast
fact_sha256: 63db3360c246211957b2698fcca246c8b68187630496df183e7d4cbc3568c289
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-09-10T15:54:55.036Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-09-10T15:54:55.036Z"
---

# Purpose

Python backend extracted from app/backend/auth.py by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `function` **_now_utc** (lines 57-58)
- `function` **authenticate_user** (lines 65-69)
- `function` **create_access_token** (lines 72-81)
- `function` **decode_access_token** (lines 84-100)
- `function` **get_current_user** (lines 103-104)
- `function` **pop_and_validate_oauth_state** (lines 137-142)
- `function` **register_oauth_state** (lines 122-134)
- `function` **require_oauth_config** (lines 107-119)
- `function` **resolve_oauth_user_role** (lines 145-153)
- `function` **verify_password** (lines 61-62)

# Imports

- [app/backend/models.py](./app--backend--models.md) via `app/backend/models.py`

# Static relationships

- None detected by static analysis.

# Dependents

- [app/backend/main.py](./app--backend--main.md) imports this module.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `23958d497a360ff63b4645ebed50c4de062d1b4e3b758fe96325b1fd6396f8a0`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
