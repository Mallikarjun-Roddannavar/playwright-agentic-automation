export type Role = "admin" | "editor" | "viewer";

export type User = {
  username: string;
  role: Role;
  accessToken: string;
};

export type Folder = {
  id: string;
  name: string;
  createdAt: string;
  owner: string;
  files: FileItem[];
};

export type FileItem = {
  id: string;
  name: string;
  storedName: string;
  uploadedAt: string;
  uploadedBy: string;
  size: number;
};
