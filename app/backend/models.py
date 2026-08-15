from typing import Literal

from pydantic import BaseModel, Field

Role = Literal["admin", "editor", "viewer"]


class LoginRequest(BaseModel):
    username: str
    password: str


class LoginResponse(BaseModel):
    username: str
    role: Role


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class OAuthLoginResponse(BaseModel):
    authorization_url: str


class FolderCreateRequest(BaseModel):
    name: str = Field(min_length=1, max_length=100)


class FolderRenameRequest(BaseModel):
    name: str = Field(min_length=1, max_length=100)


class FileRenameRequest(BaseModel):
    name: str = Field(min_length=1, max_length=255)


class AppUser(BaseModel):
    username: str
    role: Role
