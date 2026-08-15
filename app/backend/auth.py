from __future__ import annotations

import json
import os
import uuid
from datetime import datetime, timedelta, timezone
from threading import Lock

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext

from models import AppUser

PWD_CONTEXT = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")
OAUTH2_SCHEME = OAuth2PasswordBearer(tokenUrl="token")

SECRET_KEY = os.getenv("JWT_SECRET_KEY", "change-me-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("JWT_ACCESS_TOKEN_EXPIRE_MINUTES", "120"))

OAUTH_CLIENT_ID = os.getenv("OAUTH_CLIENT_ID")
OAUTH_CLIENT_SECRET = os.getenv("OAUTH_CLIENT_SECRET")
OAUTH_AUTHORIZE_URL = os.getenv("OAUTH_AUTHORIZE_URL")
OAUTH_TOKEN_URL = os.getenv("OAUTH_TOKEN_URL")
OAUTH_USERINFO_URL = os.getenv("OAUTH_USERINFO_URL")
OAUTH_REDIRECT_URI = os.getenv("OAUTH_REDIRECT_URI")
OAUTH_SCOPE = os.getenv("OAUTH_SCOPE", "openid profile email")
OAUTH_STATE_TTL_SECONDS = int(os.getenv("OAUTH_STATE_TTL_SECONDS", "600"))

DEFAULT_USERS = {
    "admin": {"password": "admin123", "role": "admin"},
    "editor": {"password": "editor123", "role": "editor"},
    "viewer": {"password": "viewer123", "role": "viewer"},
}

ROLE_MAP_JSON = os.getenv("OAUTH_ROLE_MAP_JSON", "{}")
try:
    OAUTH_ROLE_MAP: dict[str, str] = json.loads(ROLE_MAP_JSON)
except json.JSONDecodeError:
    OAUTH_ROLE_MAP = {}

USER_STORE = {
    username: {
        "username": username,
        "hashed_password": PWD_CONTEXT.hash(data["password"]),
        "role": data["role"],
    }
    for username, data in DEFAULT_USERS.items()
}

OAUTH_STATES: dict[str, datetime] = {}
OAUTH_STATE_LOCK = Lock()


def _now_utc() -> datetime:
    return datetime.now(timezone.utc)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return PWD_CONTEXT.verify(plain_password, hashed_password)


def authenticate_user(username: str, password: str) -> AppUser | None:
    user_record = USER_STORE.get(username)
    if not user_record or not verify_password(password, user_record["hashed_password"]):
        return None
    return AppUser(username=user_record["username"], role=user_record["role"])


def create_access_token(username: str, role: str, auth_source: str) -> str:
    expire = _now_utc() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {
        "sub": username,
        "role": role,
        "auth_source": auth_source,
        "iat": int(_now_utc().timestamp()),
        "exp": expire,
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def decode_access_token(token: str) -> AppUser:
    credentials_error = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        role = payload.get("role")
        if not username or not role:
            raise credentials_error
        if role not in {"admin", "editor", "viewer"}:
            raise credentials_error
    except JWTError as exc:
        raise credentials_error from exc
    return AppUser(username=username, role=role)


def get_current_user(token: str = Depends(OAUTH2_SCHEME)) -> AppUser:
    return decode_access_token(token)


def require_oauth_config() -> None:
    required = [
        OAUTH_CLIENT_ID,
        OAUTH_CLIENT_SECRET,
        OAUTH_AUTHORIZE_URL,
        OAUTH_TOKEN_URL,
        OAUTH_REDIRECT_URI,
    ]
    if not all(required):
        raise HTTPException(
            status_code=503,
            detail="OAuth is not configured. Set OAUTH_* environment variables.",
        )


def register_oauth_state() -> str:
    state = str(uuid.uuid4())
    now = _now_utc()
    with OAUTH_STATE_LOCK:
        expired = [
            key
            for key, created in OAUTH_STATES.items()
            if (now - created).total_seconds() > OAUTH_STATE_TTL_SECONDS
        ]
        for key in expired:
            OAUTH_STATES.pop(key, None)
        OAUTH_STATES[state] = now
    return state


def pop_and_validate_oauth_state(state: str) -> bool:
    with OAUTH_STATE_LOCK:
        created = OAUTH_STATES.pop(state, None)
    if not created:
        return False
    return (_now_utc() - created).total_seconds() <= OAUTH_STATE_TTL_SECONDS


def resolve_oauth_user_role(username: str) -> str:
    normalized = username.strip().lower()
    mapped = OAUTH_ROLE_MAP.get(normalized)
    if mapped in {"admin", "editor", "viewer"}:
        return mapped
    local_user = USER_STORE.get(username)
    if local_user:
        return local_user["role"]
    return "viewer"
