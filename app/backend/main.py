from __future__ import annotations

import json
import os
import mimetypes
import re
import uuid
import zipfile
from datetime import datetime, timezone
from io import BytesIO
from pathlib import Path
from threading import Lock
from urllib.parse import urlencode

import httpx
from fastapi import Depends, FastAPI, File, HTTPException, Query, Request, UploadFile, status
from fastapi.responses import FileResponse, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm

from auth import (
    OAUTH_AUTHORIZE_URL,
    OAUTH_CLIENT_ID,
    OAUTH_CLIENT_SECRET,
    OAUTH_REDIRECT_URI,
    OAUTH_SCOPE,
    OAUTH_TOKEN_URL,
    OAUTH_USERINFO_URL,
    authenticate_user,
    create_access_token,
    decode_access_token,
    get_current_user,
    pop_and_validate_oauth_state,
    register_oauth_state,
    require_oauth_config,
    resolve_oauth_user_role,
)
from models import (
    AppUser,
    FileRenameRequest,
    FolderCreateRequest,
    FolderRenameRequest,
    LoginRequest,
    LoginResponse,
    OAuthLoginResponse,
    TokenResponse,
)

BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "database.json"
UPLOADS_DIR = BASE_DIR / "uploads"
UPLOADS_DIR.mkdir(parents=True, exist_ok=True)
MAX_UPLOAD_SIZE_BYTES = max(1, int(os.getenv("MAX_UPLOAD_SIZE_BYTES", str(10 * 1024 * 1024))))

STORE_LOCK = Lock()


def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def _seed_data() -> dict:
    return {"folders": []}


def normalize_db(data: dict) -> tuple[dict, bool]:
    changed = False
    folders = data.get("folders")
    if not isinstance(folders, list):
        data["folders"] = []
        folders = data["folders"]
        changed = True

    for folder in folders:
        if "files" not in folder or not isinstance(folder["files"], list):
            folder["files"] = []
            changed = True

    return data, changed


def load_db() -> dict:
    if not DB_PATH.exists():
        save_db(_seed_data())
    with DB_PATH.open("r", encoding="utf-8-sig") as file:
        data = json.load(file)
    data, changed = normalize_db(data)
    if changed:
        save_db(data)
    return data


def save_db(data: dict) -> None:
    temp_path = DB_PATH.with_name(f".{DB_PATH.name}.{uuid.uuid4().hex}.tmp")
    try:
        with temp_path.open("w", encoding="utf-8", newline="\n") as file:
            json.dump(data, file, indent=2)
            file.flush()
            os.fsync(file.fileno())
        os.replace(temp_path, DB_PATH)
    finally:
        temp_path.unlink(missing_ok=True)


def require_editor_or_admin(user: AppUser) -> None:
    if user.role not in {"admin", "editor"}:
        raise HTTPException(status_code=403, detail="Create/Edit requires editor or admin")


def require_admin(user: AppUser) -> None:
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Delete requires admin")


def find_folder(data: dict, folder_id: str) -> dict:
    folder = next((f for f in data["folders"] if f["id"] == folder_id), None)
    if not folder:
        raise HTTPException(status_code=404, detail="Folder not found")
    return folder


def find_file(folder: dict, file_id: str) -> dict:
    file_item = next((f for f in folder["files"] if f["id"] == file_id), None)
    if not file_item:
        raise HTTPException(status_code=404, detail="File not found")
    return file_item


def normalize_folder_name(name: str) -> str:
    return name.strip().casefold()


def ensure_unique_folder_name(data: dict, name: str, exclude_folder_id: str | None = None) -> None:
    target_name = normalize_folder_name(name)
    for folder in data["folders"]:
        if exclude_folder_id and folder["id"] == exclude_folder_id:
            continue
        if normalize_folder_name(folder["name"]) == target_name:
            raise HTTPException(status_code=409, detail="Folder name already exists")


def _sanitize_download_name(name: str, fallback: str) -> str:
    stripped = name.strip()
    if not stripped:
        return fallback
    cleaned = re.sub(r'[<>:"/\\|?*\x00-\x1F]+', "_", stripped)
    return cleaned or fallback


def _safe_upload_name(filename: str | None) -> str:
    raw_name = (filename or "").replace("\\", "/")
    basename = Path(raw_name).name.strip()
    cleaned = re.sub(r"[\x00-\x1F\x7F]+", "_", basename)
    if not cleaned or cleaned in {".", ".."}:
        raise HTTPException(status_code=400, detail="Uploaded file must have a valid name")
    return cleaned


app = FastAPI(
    title="Playwright Practice File Management API",
    description="FastAPI backend for Playwright UI/API automation practice.",
    version="2.0.0",
)

LOCAL_ORIGIN_REGEX = r"https?://(localhost|127\.0\.0\.1)(:\d+)?$"


def get_allowed_origins() -> list[str]:
    configured_origins = os.getenv("CORS_ALLOWED_ORIGINS", "")
    return [origin.strip() for origin in configured_origins.split(",") if origin.strip()]


app.add_middleware(
    CORSMiddleware,
    allow_origins=get_allowed_origins(),
    allow_origin_regex=LOCAL_ORIGIN_REGEX,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def allow_private_network_access(request: Request, call_next):
    response = await call_next(request)
    # Chrome's Private Network Access preflight requires this header
    # when a public origin accesses localhost/private network targets.
    if request.headers.get("access-control-request-private-network") == "true":
        response.headers["Access-Control-Allow-Private-Network"] = "true"
    return response


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/token", response_model=TokenResponse)
def issue_token(form_data: OAuth2PasswordRequestForm = Depends()) -> TokenResponse:
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    token = create_access_token(user.username, user.role, auth_source="password")
    return TokenResponse(access_token=token)


@app.post("/auth/login", response_model=LoginResponse)
def login(payload: LoginRequest) -> LoginResponse:
    user = authenticate_user(payload.username, payload.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    return LoginResponse(username=user.username, role=user.role)


@app.get("/auth/oauth/login", response_model=OAuthLoginResponse)
def oauth_login() -> OAuthLoginResponse:
    require_oauth_config()
    state = register_oauth_state()

    query = urlencode(
        {
            "response_type": "code",
            "client_id": OAUTH_CLIENT_ID,
            "redirect_uri": OAUTH_REDIRECT_URI,
            "scope": OAUTH_SCOPE,
            "state": state,
        }
    )
    return OAuthLoginResponse(authorization_url=f"{OAUTH_AUTHORIZE_URL}?{query}")


@app.get("/auth/oauth/callback", response_model=TokenResponse)
async def oauth_callback(code: str, state: str) -> TokenResponse:
    require_oauth_config()
    if not pop_and_validate_oauth_state(state):
        raise HTTPException(status_code=400, detail="Invalid or expired OAuth state")

    async with httpx.AsyncClient(timeout=20.0) as client:
        token_response = await client.post(
            OAUTH_TOKEN_URL,
            data={
                "grant_type": "authorization_code",
                "code": code,
                "redirect_uri": OAUTH_REDIRECT_URI,
                "client_id": OAUTH_CLIENT_ID,
                "client_secret": OAUTH_CLIENT_SECRET,
            },
            headers={"Accept": "application/json"},
        )
        if token_response.status_code >= 400:
            raise HTTPException(status_code=401, detail="OAuth token exchange failed")
        token_payload = token_response.json()
        external_access_token = token_payload.get("access_token")
        if not external_access_token:
            raise HTTPException(status_code=401, detail="OAuth provider did not return access token")

        userinfo: dict = {}
        if OAUTH_USERINFO_URL:
            userinfo_response = await client.get(
                OAUTH_USERINFO_URL,
                headers={"Authorization": f"Bearer {external_access_token}"},
            )
            if userinfo_response.status_code < 400:
                userinfo = userinfo_response.json()

    username = (
        userinfo.get("preferred_username")
        or userinfo.get("email")
        or userinfo.get("name")
        or userinfo.get("sub")
    )
    if not username:
        raise HTTPException(status_code=400, detail="OAuth user info missing username/email")

    role = resolve_oauth_user_role(str(username))
    token = create_access_token(str(username), role, auth_source="oauth")
    return TokenResponse(access_token=token)


@app.get("/stats")
def stats(current_user: AppUser = Depends(get_current_user)) -> dict[str, int]:
    del current_user
    with STORE_LOCK:
        data = load_db()
    return {
        "totalFolders": len(data["folders"]),
        "totalFiles": sum(len(folder["files"]) for folder in data["folders"]),
    }


@app.get("/folders")
def list_folders(current_user: AppUser = Depends(get_current_user)) -> list[dict]:
    del current_user
    with STORE_LOCK:
        return load_db()["folders"]


@app.post("/folders")
def create_folder(payload: FolderCreateRequest, current_user: AppUser = Depends(get_current_user)) -> dict:
    require_editor_or_admin(current_user)
    clean_name = payload.name.strip()
    new_folder = {
        "id": str(uuid.uuid4()),
        "name": clean_name,
        "createdAt": _now_iso(),
        "owner": current_user.username,
        "files": [],
    }
    with STORE_LOCK:
        data = load_db()
        ensure_unique_folder_name(data, clean_name)
        data["folders"].append(new_folder)
        save_db(data)
    return new_folder


@app.put("/folders/{folder_id}")
def rename_folder(
    folder_id: str,
    payload: FolderRenameRequest,
    current_user: AppUser = Depends(get_current_user),
) -> dict:
    require_editor_or_admin(current_user)
    clean_name = payload.name.strip()
    with STORE_LOCK:
        data = load_db()
        folder = find_folder(data, folder_id)
        ensure_unique_folder_name(data, clean_name, exclude_folder_id=folder_id)
        folder["name"] = clean_name
        save_db(data)
    return folder


@app.delete("/folders/{folder_id}")
def delete_folder(folder_id: str, current_user: AppUser = Depends(get_current_user)) -> dict[str, str]:
    require_admin(current_user)
    with STORE_LOCK:
        data = load_db()
        folder = find_folder(data, folder_id)
        for file_item in folder["files"]:
            file_path = UPLOADS_DIR / file_item["storedName"]
            if file_path.exists():
                file_path.unlink()
        data["folders"] = [f for f in data["folders"] if f["id"] != folder_id]
        save_db(data)
    return {"message": "Folder deleted"}


@app.get("/folders/{folder_id}/files")
def list_files(folder_id: str, current_user: AppUser = Depends(get_current_user)) -> list[dict]:
    del current_user
    with STORE_LOCK:
        data = load_db()
        folder = find_folder(data, folder_id)
        return folder["files"]


@app.get("/folders/{folder_id}/files/{file_id}/preview")
def preview_file(
    folder_id: str,
    file_id: str,
    token: str = Query(...),
) -> FileResponse:
    decode_access_token(token)
    with STORE_LOCK:
        data = load_db()
        folder = find_folder(data, folder_id)
        file_item = find_file(folder, file_id)
    file_path = UPLOADS_DIR / file_item["storedName"]
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found on disk")
    media_type = mimetypes.guess_type(file_item["name"])[0] or "application/octet-stream"
    headers = {"Content-Disposition": "inline"}
    return FileResponse(path=file_path, media_type=media_type, headers=headers)


@app.get("/folders/{folder_id}/files/{file_id}/download")
def download_file(
    folder_id: str,
    file_id: str,
    token: str = Query(...),
) -> FileResponse:
    decode_access_token(token)
    with STORE_LOCK:
        data = load_db()
        folder = find_folder(data, folder_id)
        file_item = find_file(folder, file_id)
    file_path = UPLOADS_DIR / file_item["storedName"]
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found on disk")
    return FileResponse(
        path=file_path,
        media_type="application/octet-stream",
        filename=file_item["name"],
    )


@app.get("/folders/{folder_id}/files/download")
def download_files_zip(
    folder_id: str,
    token: str = Query(...),
    file_ids: list[str] | None = Query(default=None, alias="fileIds"),
) -> StreamingResponse:
    decode_access_token(token)
    with STORE_LOCK:
        data = load_db()
        folder = find_folder(data, folder_id)
        folder_files = folder["files"]
        if file_ids:
            file_map = {file_item["id"]: file_item for file_item in folder_files}
            selected_files: list[dict] = []
            for file_id in file_ids:
                if file_id not in file_map:
                    raise HTTPException(status_code=404, detail="File not found")
                selected_files.append(file_map[file_id])
        else:
            selected_files = list(folder_files)

    if not selected_files:
        raise HTTPException(status_code=400, detail="No files available for download")

    zip_buffer = BytesIO()
    used_archive_names: set[str] = set()
    with zipfile.ZipFile(zip_buffer, mode="w", compression=zipfile.ZIP_DEFLATED) as archive:
        for index, file_item in enumerate(selected_files, start=1):
            file_path = UPLOADS_DIR / file_item["storedName"]
            if not file_path.exists():
                raise HTTPException(status_code=404, detail="File not found on disk")
            base_name = _sanitize_download_name(file_item["name"], f"file-{index}")
            archive_name = base_name
            suffix = 2
            while archive_name in used_archive_names:
                archive_name = f"{base_name}-{suffix}"
                suffix += 1
            used_archive_names.add(archive_name)
            archive.writestr(archive_name, file_path.read_bytes())

    zip_buffer.seek(0)
    archive_name = f"{_sanitize_download_name(folder['name'], 'folder')}-files.zip"
    headers = {"Content-Disposition": f'attachment; filename="{archive_name}"'}
    return StreamingResponse(
        zip_buffer,
        media_type="application/zip",
        headers=headers,
    )


@app.post("/folders/{folder_id}/files")
async def upload_file(
    folder_id: str,
    file: UploadFile = File(...),
    current_user: AppUser = Depends(get_current_user),
) -> dict:
    require_editor_or_admin(current_user)
    display_name = _safe_upload_name(file.filename)
    content = await file.read(MAX_UPLOAD_SIZE_BYTES + 1)
    if len(content) > MAX_UPLOAD_SIZE_BYTES:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File exceeds the {MAX_UPLOAD_SIZE_BYTES}-byte upload limit",
        )

    stored_name = uuid.uuid4().hex
    file_path = UPLOADS_DIR / stored_name

    file_item = {
        "id": str(uuid.uuid4()),
        "name": display_name,
        "storedName": stored_name,
        "uploadedAt": _now_iso(),
        "uploadedBy": current_user.username,
        "size": len(content),
    }
    with STORE_LOCK:
        data = load_db()
        folder = find_folder(data, folder_id)
        try:
            file_path.write_bytes(content)
            folder["files"].append(file_item)
            save_db(data)
        except Exception:
            file_path.unlink(missing_ok=True)
            raise
    return file_item


@app.put("/folders/{folder_id}/files/{file_id}")
def rename_file(
    folder_id: str,
    file_id: str,
    payload: FileRenameRequest,
    current_user: AppUser = Depends(get_current_user),
) -> dict:
    require_editor_or_admin(current_user)
    with STORE_LOCK:
        data = load_db()
        folder = find_folder(data, folder_id)
        file_item = find_file(folder, file_id)
        file_item["name"] = payload.name.strip()
        save_db(data)
    return file_item


@app.delete("/folders/{folder_id}/files/{file_id}")
def delete_file(folder_id: str, file_id: str, current_user: AppUser = Depends(get_current_user)) -> dict[str, str]:
    require_admin(current_user)
    with STORE_LOCK:
        data = load_db()
        folder = find_folder(data, folder_id)
        file_item = find_file(folder, file_id)
        file_path = UPLOADS_DIR / file_item["storedName"]
        if file_path.exists():
            file_path.unlink()
        folder["files"] = [f for f in folder["files"] if f["id"] != file_id]
        save_db(data)
    return {"message": "File deleted"}
