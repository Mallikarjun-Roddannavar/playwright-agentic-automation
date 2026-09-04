import type { FileItem, Folder, Role, User } from "./types";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ??
  `${window.location.protocol}//${window.location.hostname}:8000`;

type Stats = {
  totalFolders: number;
  totalFiles: number;
};

type TokenResponse = {
  access_token: string;
  token_type: string;
};

type JwtClaims = {
  sub: string;
  role: Role;
  exp: number;
  iat: number;
  auth_source: string;
};

export const AUTH_SESSION_EXPIRED_EVENT = "playwright-auth-session-expired";
const VALID_ROLES: Role[] = ["admin", "editor", "viewer"];

function parseErrorDetail(payload: unknown): string {
  if (!payload || typeof payload !== "object") {
    return "Request failed";
  }
  const detail = (payload as { detail?: unknown }).detail;
  if (typeof detail === "string") {
    return detail;
  }
  if (Array.isArray(detail)) {
    const first = detail[0];
    if (first && typeof first === "object" && "msg" in first) {
      const msg = (first as { msg?: unknown }).msg;
      if (typeof msg === "string") {
        return msg;
      }
    }
    return "Validation error";
  }
  return "Request failed";
}

function decodeJwtPayload(token: string): JwtClaims {
  const parts = token.split(".");
  if (parts.length < 2) {
    throw new Error("Invalid access token");
  }
  const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
  const json = atob(padded);
  return JSON.parse(json) as JwtClaims;
}

export function userFromAccessToken(accessToken: string): User {
  const claims = decodeJwtPayload(accessToken);
  if (
    typeof claims.sub !== "string" ||
    !VALID_ROLES.includes(claims.role) ||
    typeof claims.exp !== "number" ||
    claims.exp * 1000 <= Date.now()
  ) {
    throw new Error("Invalid or expired access token");
  }
  return {
    username: claims.sub,
    role: claims.role,
    accessToken,
  };
}

async function request<T>(path: string, user: User | null, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers ?? {});
  if (user?.accessToken) {
    headers.set("Authorization", `Bearer ${user.accessToken}`);
  }
  if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401 && user) {
      window.dispatchEvent(new Event(AUTH_SESSION_EXPIRED_EVENT));
    }
    const payload = await response.json().catch(() => null);
    throw new Error(parseErrorDetail(payload));
  }
  if (response.status === 204) {
    return {} as T;
  }
  return (await response.json()) as T;
}

export const api = {
  login: async (username: string, password: string): Promise<User> => {
    const form = new URLSearchParams();
    form.set("username", username);
    form.set("password", password);
    const token = await request<TokenResponse>("/token", null, {
      method: "POST",
      body: form,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return userFromAccessToken(token.access_token);
  },
  getOAuthAuthorizationUrl: async (): Promise<string> => {
    const data = await request<{ authorization_url: string }>("/auth/oauth/login", null);
    return data.authorization_url;
  },
  exchangeOAuthCode: async (code: string, state: string): Promise<User> => {
    const token = await request<TokenResponse>(
      `/auth/oauth/callback?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}`,
      null
    );
    return userFromAccessToken(token.access_token);
  },
  buildFilePreviewUrl: (user: User, folderId: string, fileId: string) =>
    `${API_BASE}/folders/${folderId}/files/${fileId}/preview?token=${encodeURIComponent(user.accessToken)}`,
  buildFileDownloadUrl: (user: User, folderId: string, fileId: string) =>
    `${API_BASE}/folders/${folderId}/files/${fileId}/download?token=${encodeURIComponent(user.accessToken)}`,
  buildFilesDownloadUrl: (user: User, folderId: string, fileIds?: string[]) => {
    const params = new URLSearchParams();
    params.set("token", user.accessToken);
    for (const fileId of fileIds ?? []) {
      params.append("fileIds", fileId);
    }
    return `${API_BASE}/folders/${folderId}/files/download?${params.toString()}`;
  },
  stats: (user: User) => request<Stats>("/stats", user),
  listFolders: (user: User) => request<Folder[]>("/folders", user),
  createFolder: (user: User, name: string) =>
    request<Folder>("/folders", user, {
      method: "POST",
      body: JSON.stringify({ name }),
    }),
  renameFolder: (user: User, folderId: string, name: string) =>
    request<Folder>(`/folders/${folderId}`, user, {
      method: "PUT",
      body: JSON.stringify({ name }),
    }),
  deleteFolder: (user: User, folderId: string) =>
    request<{ message: string }>(`/folders/${folderId}`, user, { method: "DELETE" }),
  listFiles: (user: User, folderId: string) =>
    request<FileItem[]>(`/folders/${folderId}/files`, user),
  uploadFile: (user: User, folderId: string, file: File) => {
    const form = new FormData();
    form.append("file", file);
    return request<FileItem>(`/folders/${folderId}/files`, user, {
      method: "POST",
      body: form,
    });
  },
  renameFile: (user: User, folderId: string, fileId: string, name: string) =>
    request<FileItem>(`/folders/${folderId}/files/${fileId}`, user, {
      method: "PUT",
      body: JSON.stringify({ name }),
    }),
  deleteFile: (user: User, folderId: string, fileId: string) =>
    request<{ message: string }>(`/folders/${folderId}/files/${fileId}`, user, {
      method: "DELETE",
    }),
};
