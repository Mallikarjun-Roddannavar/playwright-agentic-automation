---
type: Code Module
title: main.py
description: Python backend extracted from app/backend/main.py by deterministic static analysis.
resource: repo://playwright-pom-agent-skills/app/backend/main.py
tags:
  - generated
  - static-ast
  - backend
  - py
status: stable
sources:
  - id: source
    resource: repo://playwright-pom-agent-skills/app/backend/main.py
    title: app/backend/main.py
    author: process:codebase-knowledge/1.0.0
source_path: app/backend/main.py
source_sha256: e9f5641d7bba31d76973be7103d36e75293c447b74522121797351796d1bee0a
code_graph_id: file:app/backend/main.py
analysis_scope: static-ast
fact_sha256: 96213ea46588714792195d496a4058dcf238cb60607f375ae1c738f543280e79
generated:
  by: process:codebase-knowledge/1.0.0
  at: "2026-08-15T12:01:45.193Z"
verified:
  - by: process:codebase-knowledge/1.0.0
    at: "2026-08-15T12:01:45.193Z"
---

# Purpose

Python backend extracted from app/backend/main.py by deterministic static analysis. The underlying source code remains authoritative.

# Symbols

- `function` **_now_iso** (lines 58-59)
- `function` **_safe_upload_name** (lines 150-156)
- `function` **_sanitize_download_name** (lines 142-147)
- `function` **_seed_data** (lines 62-63)
- `function` **allow_private_network_access** (lines 184-190)
- `function` **create_folder** (lines 299-314)
- `function` **delete_file** (lines 505-516)
- `function` **delete_folder** (lines 335-346)
- `function` **download_file** (lines 378-395)
- `function` **download_files_zip** (lines 399-445)
- `function` **ensure_unique_folder_name** (lines 133-139)
- `function` **find_file** (lines 122-126)
- `function` **find_folder** (lines 115-119)
- `function` **get_allowed_origins** (lines 168-170)
- `function` **health** (lines 194-195)
- `function` **issue_token** (lines 199-204)
- `function` **list_files** (lines 350-355)
- `function` **list_folders** (lines 292-295)
- `function` **load_db** (lines 82-90)
- `function` **login** (lines 208-212)
- `function` **normalize_db** (lines 66-79)
- `function` **normalize_folder_name** (lines 129-130)
- `function` **oauth_callback** (lines 233-277)
- `function` **oauth_login** (lines 216-229)
- `function` **preview_file** (lines 359-374)
- `function` **rename_file** (lines 488-501)
- `function` **rename_folder** (lines 318-331)
- `function` **require_admin** (lines 110-112)
- `function` **require_editor_or_admin** (lines 105-107)
- `function` **save_db** (lines 93-102)
- `function` **stats** (lines 281-288)
- `function` **upload_file** (lines 449-484)

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
- **load_db** uses persistence [save_db](./main.md).
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

The facts above are machine-confirmed from the TypeScript AST and source hash `e9f5641d7bba31d76973be7103d36e75293c447b74522121797351796d1bee0a`. Run `npm run knowledge:check` before relying on this note after source changes. This note describes static code relationships only, not runtime behavior.
