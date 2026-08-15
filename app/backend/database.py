from __future__ import annotations

import sqlite3
from pathlib import Path


SCHEMA = """
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS folders (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL COLLATE NOCASE UNIQUE,
    created_at TEXT NOT NULL,
    owner TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS files (
    id TEXT PRIMARY KEY,
    folder_id TEXT NOT NULL REFERENCES folders(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    stored_name TEXT NOT NULL UNIQUE,
    uploaded_at TEXT NOT NULL,
    uploaded_by TEXT NOT NULL,
    size INTEGER NOT NULL
);
"""


def _connect(path: Path) -> sqlite3.Connection:
    connection = sqlite3.connect(path)
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA foreign_keys = ON")
    return connection


def initialize_database(database_path: Path) -> None:
    database_path.parent.mkdir(parents=True, exist_ok=True)
    with _connect(database_path) as connection:
        connection.executescript(SCHEMA)


def load_database(database_path: Path) -> dict:
    with _connect(database_path) as connection:
        folders = connection.execute(
            "SELECT id, name, created_at, owner FROM folders ORDER BY rowid"
        ).fetchall()
        files = connection.execute(
            "SELECT id, folder_id, name, stored_name, uploaded_at, uploaded_by, size "
            "FROM files ORDER BY rowid"
        ).fetchall()

    files_by_folder: dict[str, list[dict]] = {}
    for item in files:
        files_by_folder.setdefault(item["folder_id"], []).append(
            {
                "id": item["id"],
                "name": item["name"],
                "storedName": item["stored_name"],
                "uploadedAt": item["uploaded_at"],
                "uploadedBy": item["uploaded_by"],
                "size": item["size"],
            }
        )

    return {
        "folders": [
            {
                "id": folder["id"],
                "name": folder["name"],
                "createdAt": folder["created_at"],
                "owner": folder["owner"],
                "files": files_by_folder.get(folder["id"], []),
            }
            for folder in folders
        ]
    }


def save_database(database_path: Path, data: dict) -> None:
    with _connect(database_path) as connection:
        _replace_data(connection, data)


def _replace_data(connection: sqlite3.Connection, data: dict) -> None:
    connection.execute("DELETE FROM files")
    connection.execute("DELETE FROM folders")
    for folder in data.get("folders", []):
        connection.execute(
            "INSERT INTO folders (id, name, created_at, owner) VALUES (?, ?, ?, ?)",
            (folder["id"], folder["name"], folder["createdAt"], folder["owner"]),
        )
        for file_item in folder.get("files", []):
            connection.execute(
                "INSERT INTO files "
                "(id, folder_id, name, stored_name, uploaded_at, uploaded_by, size) "
                "VALUES (?, ?, ?, ?, ?, ?, ?)",
                (
                    file_item["id"],
                    folder["id"],
                    file_item["name"],
                    file_item["storedName"],
                    file_item["uploadedAt"],
                    file_item["uploadedBy"],
                    file_item["size"],
                ),
            )
