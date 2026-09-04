---
type: Code Module
title: main.py
description: Python backend extracted from app/backend/main.py by deterministic static analysis.
resource: repo://playwright-agentic-automation/app/backend/main.py
tags:
  - generated
  - static-ast
  - backend
  - py
status: stable
sources:
  - id: source
    resource: repo://playwright-agentic-automation/app/backend/main.py
    title: app/backend/main.py
    author: process:codebase-knowledge/1.0.0
source_path: app/backend/main.py
source_sha256: 693486e115a3c3cc22bd3bc500d66b2dcba46790d767c70b36c898a1644fe912
code_graph_id: file:app/backend/main.py
analysis_scope: static-ast
fact_sha256: 9a643bd82d3c14cf331106f6d06f49837d339ff11dd6a5a00c991cb4842b219c
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-16T08:39:27.990Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-16T08:39:27.990Z"
---

# Purpose

Python backend extracted from app/backend/main.py by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `function` **\_now_iso** (lines 58-59)
- `function` **\_safe_upload_name** (lines 118-124)
- `function` **\_sanitize_download_name** (lines 110-115)
- `function` **allow_private_network_access** (lines 152-158)
- `function` **create_folder** (lines 267-282)
- `function` **delete_file** (lines 473-484)
- `function` **delete_folder** (lines 303-314)
- `function` **download_file** (lines 346-363)
- `function` **download_files_zip** (lines 367-413)
- `function` **ensure_unique_folder_name** (lines 101-107)
- `function` **find_file** (lines 90-94)
- `function` **find_folder** (lines 83-87)
- `function` **get_allowed_origins** (lines 136-138)
- `function` **health** (lines 162-163)
- `function` **issue_token** (lines 167-172)
- `function` **list_files** (lines 318-323)
- `function` **list_folders** (lines 260-263)
- `function` **load_db** (lines 62-63)
- `function` **login** (lines 176-180)
- `function` **normalize_folder_name** (lines 97-98)
- `function` **oauth_callback** (lines 201-245)
- `function` **oauth_login** (lines 184-197)
- `function` **preview_file** (lines 327-342)
- `function` **rename_file** (lines 456-469)
- `function` **rename_folder** (lines 286-299)
- `function` **require_admin** (lines 78-80)
- `function` **require_editor_or_admin** (lines 73-75)
- `function` **save_db** (lines 66-67)
- `function` **stats** (lines 249-256)
- `function` **upload_file** (lines 417-452)

# Imports

- [app/backend/models.py](./models.md) via `app/backend/models.py`
- [app/backend/auth.py](./auth.md) via `app/backend/auth.py`

# Static relationships

- **upload_file** uses persistence [load_db](./main.md).
- **upload_file** uses auth dependency [get_current_user](./auth.md).
- **download_file** declares route [GET /folders/{folder_id}/files/{file_id}/download](./main.md).
- **rename_folder** uses auth dependency [get_current_user](./auth.md).
- **rename_file** uses persistence [load_db](./main.md).
- **create_folder** uses persistence [load_db](./main.md).
- **rename_file** uses persistence [save_db](./main.md).
- **list_folders** declares route [GET /folders](./main.md).
- **upload_file** uses persistence [save_db](./main.md).
- **login** declares route [POST /auth/login](./main.md).
- **rename_folder** uses persistence [save_db](./main.md).
- **rename_folder** enforces rbac [require_editor_or_admin](./main.md).
- **rename_folder** declares route [PUT /folders/{folder_id}](./main.md).
- **download_files_zip** uses persistence [load_db](./main.md).
- **oauth_login** declares route [GET /auth/oauth/login](./main.md).
- **preview_file** declares route [GET /folders/{folder_id}/files/{file_id}/preview](./main.md).
- **stats** uses auth dependency [get_current_user](./auth.md).
- **list_files** uses persistence [load_db](./main.md).
- **list_folders** uses persistence [load_db](./main.md).
- **delete_file** uses persistence [load_db](./main.md).
- **upload_file** enforces rbac [require_editor_or_admin](./main.md).
- **delete_file** uses auth dependency [get_current_user](./auth.md).
- **rename_folder** uses persistence [load_db](./main.md).
- **oauth_callback** declares route [GET /auth/oauth/callback](./main.md).
- **delete_folder** uses auth dependency [get_current_user](./auth.md).
- **delete_file** enforces rbac [require_admin](./main.md).
- **delete_folder** uses persistence [save_db](./main.md).
- **rename_file** enforces rbac [require_editor_or_admin](./main.md).
- **download_files_zip** declares route [GET /folders/{folder_id}/files/download](./main.md).
- **stats** declares route [GET /stats](./main.md).
- **delete_file** declares route [DELETE /folders/{folder_id}/files/{file_id}](./main.md).
- **delete_folder** uses persistence [load_db](./main.md).
- **create_folder** uses persistence [save_db](./main.md).
- **rename_file** uses auth dependency [get_current_user](./auth.md).
- **delete_folder** declares route [DELETE /folders/{folder_id}](./main.md).
- **upload_file** declares route [POST /folders/{folder_id}/files](./main.md).
- **preview_file** uses persistence [load_db](./main.md).
- **health** declares route [GET /health](./main.md).
- **delete_folder** enforces rbac [require_admin](./main.md).
- **list_files** uses auth dependency [get_current_user](./auth.md).
- **create_folder** declares route [POST /folders](./main.md).
- **issue_token** declares route [POST /token](./main.md).
- **list_files** declares route [GET /folders/{folder_id}/files](./main.md).
- **delete_file** uses persistence [save_db](./main.md).
- **stats** uses persistence [load_db](./main.md).
- **list_folders** uses auth dependency [get_current_user](./auth.md).
- **create_folder** enforces rbac [require_editor_or_admin](./main.md).
- **create_folder** uses auth dependency [get_current_user](./auth.md).
- **rename_file** declares route [PUT /folders/{folder_id}/files/{file_id}](./main.md).
- **download_file** uses persistence [load_db](./main.md).

# Dependents

- None detected by static analysis.

# Trust and freshness

The facts above are machine-confirmed from the TypeScript AST and source hash `693486e115a3c3cc22bd3bc500d66b2dcba46790d767c70b36c898a1644fe912`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
