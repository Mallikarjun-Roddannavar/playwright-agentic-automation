import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { api } from "../api";
import { AppLayout } from "../components/AppLayout";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { Modal } from "../components/Modal";
import { useAuth } from "../context/AuthContext";
import type { FileItem, Folder } from "../types";

export function FilesPage() {
  const { folderId = "" } = useParams();
  const navigate = useNavigate();
  const { user, canCreateEdit, canDelete } = useAuth();
  const [viewMode, setViewMode] = useState<"list" | "cards">("list");
  const [folders, setFolders] = useState<Folder[]>([]);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [renamingFile, setRenamingFile] = useState<FileItem | null>(null);
  const [deletingFile, setDeletingFile] = useState<FileItem | null>(null);
  const [deletingFilesBulk, setDeletingFilesBulk] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [newName, setNewName] = useState("");
  const [error, setError] = useState("");
  const [selectedFileIds, setSelectedFileIds] = useState<string[]>([]);
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);
  const fileCardRefs = useRef<Record<string, HTMLElement | null>>({});

  const currentFolder = folders.find((f) => f.id === folderId);
  const emptyState = useMemo(() => files.length === 0, [files.length]);

  async function refresh() {
    if (!user || !folderId) return;
    setError("");
    try {
      const [allFolders, folderFiles] = await Promise.all([
        api.listFolders(user),
        api.listFiles(user, folderId),
      ]);
      setFolders(allFolders);
      setFiles(folderFiles);
      setSelectedFileIds((prev) => prev.filter((id) => folderFiles.some((f) => f.id === id)));
      setLastSyncedAt(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load files");
    }
  }

  useEffect(() => {
    refresh();
  }, [user, folderId]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      refresh();
    }, 5000);
    return () => window.clearInterval(timer);
  }, [user, folderId]);

  async function upload() {
    if (!user || !selectedFile || !folderId) return;
    try {
      await api.uploadFile(user, folderId, selectedFile);
      setSelectedFile(null);
      setShowUploadDialog(false);
      await refresh();
      toast.success("File uploaded");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to upload file");
    }
  }

  async function renameFile() {
    if (!user || !folderId || !renamingFile || !newName.trim()) return;
    try {
      await api.renameFile(user, folderId, renamingFile.id, newName.trim());
      setRenamingFile(null);
      setNewName("");
      await refresh();
      toast.success("File renamed");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to rename file");
    }
  }

  async function deleteFile() {
    if (!user || !folderId || !deletingFile) return;
    try {
      await api.deleteFile(user, folderId, deletingFile.id);
      setDeletingFile(null);
      await refresh();
      toast.success("File deleted");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete file");
    }
  }

  async function deleteSelectedFiles() {
    if (!user || !folderId || selectedFileIds.length === 0) return;
    try {
      await Promise.all(selectedFileIds.map((id) => api.deleteFile(user, folderId, id)));
      setDeletingFilesBulk(false);
      setSelectedFileIds([]);
      await refresh();
      toast.success("Selected files deleted");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete selected files");
    }
  }

  function ensureCardActionsVisible(fileId: string) {
    const card = fileCardRefs.current[fileId];
    if (!card) return;

    const footer = card.querySelector<HTMLElement>(".app-file-card-footer");
    const padding = 28;

    const scrollFooterIntoView = () => {
      const target = footer ?? card;
      const rect = target.getBoundingClientRect();

      if (rect.bottom > window.innerHeight - padding) {
        window.scrollBy({ top: rect.bottom - window.innerHeight + padding, behavior: "smooth" });
        return;
      }

      if (rect.top < padding) {
        window.scrollBy({ top: rect.top - padding, behavior: "smooth" });
      }
    };

    window.setTimeout(() => {
      window.requestAnimationFrame(scrollFooterIntoView);
    }, 240);
  }

  function toggleFileSelection(fileId: string) {
    setSelectedFileIds((prev) => {
      const isSelected = prev.includes(fileId);
      const nextSelectedFileIds = isSelected
        ? prev.filter((id) => id !== fileId)
        : [...prev, fileId];

      if (!isSelected && viewMode === "cards") {
        ensureCardActionsVisible(fileId);
      }

      return nextSelectedFileIds;
    });
  }

  function toggleAllFiles() {
    if (selectedFileIds.length === files.length) {
      setSelectedFileIds([]);
    } else {
      setSelectedFileIds(files.map((f) => f.id));
    }
  }

  function handleViewModeSelect(
    event: MouseEvent<HTMLButtonElement>,
    nextViewMode: "list" | "cards"
  ) {
    setViewMode(nextViewMode);
    event.currentTarget.blur();
  }

  function handleFileCardPointerEnter(fileId: string) {
    if (viewMode === "cards") {
      ensureCardActionsVisible(fileId);
    }
  }

  function handleFileCardPointerMove(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    const tiltX = ((50 - y) / 50) * 2.2;
    const tiltY = ((x - 50) / 50) * 2.8;

    event.currentTarget.style.setProperty("--app-card-glow-x", `${x}%`);
    event.currentTarget.style.setProperty("--app-card-glow-y", `${y}%`);
    event.currentTarget.style.setProperty("--app-card-tilt-x", `${tiltX.toFixed(2)}deg`);
    event.currentTarget.style.setProperty("--app-card-tilt-y", `${tiltY.toFixed(2)}deg`);
  }

  function handleFileCardPointerLeave(event: MouseEvent<HTMLElement>) {
    event.currentTarget.style.setProperty("--app-card-glow-x", "72%");
    event.currentTarget.style.setProperty("--app-card-glow-y", "18%");
    event.currentTarget.style.setProperty("--app-card-tilt-x", "0deg");
    event.currentTarget.style.setProperty("--app-card-tilt-y", "0deg");
  }

  function previewFile(fileId: string) {
    if (!user || !folderId) return;
    const url = api.buildFilePreviewUrl(user, folderId, fileId);
    window.open(url, `preview-${fileId}`, "width=760,height=560,resizable=yes,scrollbars=yes");
  }

  function downloadFile(fileId: string) {
    if (!user || !folderId) return;
    const url = api.buildFileDownloadUrl(user, folderId, fileId);
    window.open(url, "_blank");
  }

  function downloadMultipleFiles(fileIds?: string[]) {
    if (!user || !folderId) return;
    const url = api.buildFilesDownloadUrl(user, folderId, fileIds);
    window.open(url, "_blank");
  }

  return (
    <AppLayout>
      <section className="app-page">
        <div className="app-section-head">
          <div className="app-section-copy">
            <p className="app-kicker">File Workspace</p>
            <h2 className="mt-3 text-3xl font-semibold" data-testid="files-title">
              Files in {currentFolder?.name ?? "Folder"}
            </h2>
            <p className="text-muted mt-2 text-sm">
              Review uploads, previews, downloads, and cleanup actions from a clearer content
              surface.
            </p>
          </div>
          <div className="app-meta-row">
            <div className="app-status-chip">Folder: {currentFolder?.name ?? "Unknown"}</div>
            <div className="app-status-chip">Selected: {selectedFileIds.length}</div>
          </div>
        </div>

        <div className="app-workspace" data-view-mode={viewMode}>
          <div className="app-toolbar" data-view-mode={viewMode}>
            <div className="app-toolbar-group">
              <div className="app-view-toggle-shell">
                <span className="app-view-toggle-label">View mode</span>
                <div
                  className="app-view-toggle"
                  data-view-mode={viewMode}
                  data-testid="files-view-toggle"
                >
                  <button
                    type="button"
                    className={`btn-secondary app-view-toggle-btn px-3 py-2 text-sm ${
                      viewMode === "list" ? "app-view-toggle-active" : ""
                    }`}
                    onClick={(event) => handleViewModeSelect(event, "list")}
                    aria-pressed={viewMode === "list"}
                    data-testid="files-view-list-btn"
                  >
                    List
                  </button>
                  <button
                    type="button"
                    className={`btn-secondary app-view-toggle-btn px-3 py-2 text-sm ${
                      viewMode === "cards" ? "app-view-toggle-active" : ""
                    }`}
                    onClick={(event) => handleViewModeSelect(event, "cards")}
                    aria-pressed={viewMode === "cards"}
                    data-testid="files-view-cards-btn"
                  >
                    Cards
                  </button>
                </div>
              </div>
              <button
                className="btn-secondary px-4 py-2"
                onClick={() => navigate("/folders")}
                data-testid="files-back-btn"
              >
                Back to folders
              </button>
              <button
                className="btn-secondary px-4 py-2"
                onClick={refresh}
                data-testid="files-refresh-btn"
              >
                Refresh
              </button>
            </div>
            <div className="app-toolbar-group">
              {canCreateEdit && (
                <button
                  className="btn-primary px-4 py-2"
                  onClick={() => setShowUploadDialog(true)}
                  data-testid="files-upload-action-btn"
                >
                  Upload File
                </button>
              )}
              <button
                className="btn-secondary px-4 py-2 disabled:opacity-60"
                onClick={() => downloadMultipleFiles()}
                disabled={files.length === 0}
                data-testid="files-download-all-btn"
              >
                Download All
              </button>
              {files.length > 0 && (
                <button
                  className="btn-secondary px-4 py-2 disabled:opacity-60"
                  onClick={() => downloadMultipleFiles(selectedFileIds)}
                  disabled={selectedFileIds.length === 0}
                  data-testid="files-download-selected-btn"
                >
                  Download Selected
                </button>
              )}
              {canDelete && (
                <button
                  className="btn-danger px-4 py-2 disabled:opacity-60"
                  onClick={() => setDeletingFilesBulk(true)}
                  disabled={selectedFileIds.length === 0}
                  data-testid="files-bulk-delete-btn"
                >
                  Delete Selected
                </button>
              )}
            </div>
          </div>

          <p className="text-muted mt-4 text-xs" data-testid="files-last-synced">
            Last synced at: {lastSyncedAt ? lastSyncedAt.toLocaleTimeString() : "--"}
          </p>

          {error && (
            <p className="app-alert app-alert-danger mt-4" data-testid="files-error">
              {error}
            </p>
          )}

          <div
            key={viewMode}
            className={`app-view-stage app-view-stage-${viewMode}`}
            data-testid={`files-view-stage-${viewMode}`}
          >
            {viewMode === "list" ? (
              <div className="app-table-wrap">
                <table className="app-table text-left">
                  <thead className="text-sm">
                    <tr>
                      <th className="p-3">
                        <input
                          type="checkbox"
                          checked={files.length > 0 && selectedFileIds.length === files.length}
                          onChange={toggleAllFiles}
                          data-testid="files-select-all"
                        />
                      </th>
                      <th className="p-3">Name</th>
                      <th className="p-3">Size</th>
                      <th className="p-3">Uploaded By</th>
                      <th className="p-3">Uploaded At</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {files.map((file, index) => (
                      <tr key={file.id} data-testid={`file-row-${index + 1}`}>
                        <td className="p-3">
                          <input
                            type="checkbox"
                            checked={selectedFileIds.includes(file.id)}
                            onChange={() => toggleFileSelection(file.id)}
                            data-testid={`file-select-${file.id}`}
                          />
                        </td>
                        <td className="p-3">{file.name}</td>
                        <td className="p-3">{file.size}</td>
                        <td className="p-3">{file.uploadedBy}</td>
                        <td className="p-3">{new Date(file.uploadedAt).toLocaleString()}</td>
                        <td className="p-3">
                          <div className="app-row-actions">
                            {canCreateEdit && (
                              <button
                                className="btn-secondary px-3 py-2 disabled:opacity-60"
                                onClick={() => {
                                  setRenamingFile(file);
                                  setNewName(file.name);
                                }}
                                disabled={!selectedFileIds.includes(file.id)}
                                data-testid={`file-rename-btn-${file.id}`}
                              >
                                Rename
                              </button>
                            )}
                            <button
                              className="btn-secondary px-3 py-2 disabled:opacity-60"
                              onClick={() => previewFile(file.id)}
                              disabled={!selectedFileIds.includes(file.id)}
                              data-testid={`file-preview-btn-${file.id}`}
                            >
                              Preview
                            </button>
                            <button
                              className="btn-secondary px-3 py-2 disabled:opacity-60"
                              onClick={() => downloadFile(file.id)}
                              disabled={!selectedFileIds.includes(file.id)}
                              data-testid={`file-download-btn-${file.id}`}
                            >
                              Download
                            </button>
                            {canDelete && (
                              <button
                                className="btn-danger px-3 py-2 disabled:opacity-60"
                                onClick={() => setDeletingFile(file)}
                                disabled={!selectedFileIds.includes(file.id)}
                                data-testid={`file-delete-btn-${file.id}`}
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {emptyState && (
                  <p className="app-empty-state" data-testid="files-empty">
                    No files in this folder.
                  </p>
                )}
              </div>
            ) : (
              <>
                <div className="app-card-grid-header">
                  <label className="app-card-grid-select-all">
                    <input
                      type="checkbox"
                      checked={files.length > 0 && selectedFileIds.length === files.length}
                      onChange={toggleAllFiles}
                      data-testid="files-select-all"
                    />
                    <span>Select all files</span>
                  </label>
                </div>
                <div className="app-file-grid" data-testid="files-card-view">
                  {files.map((file, index) => {
                    const isSelected = selectedFileIds.includes(file.id);
                    return (
                      <article
                        key={file.id}
                        ref={(element) => {
                          fileCardRefs.current[file.id] = element;
                        }}
                        className={`app-file-card ${isSelected ? "app-file-card-selected" : ""}`}
                        onMouseEnter={() => handleFileCardPointerEnter(file.id)}
                        onFocus={() => handleFileCardPointerEnter(file.id)}
                        onMouseMove={handleFileCardPointerMove}
                        onMouseLeave={handleFileCardPointerLeave}
                        data-testid={`file-row-${index + 1}`}
                      >
                        <div className="app-file-card-head">
                          <div className="app-file-card-icon" aria-hidden="true">
                            <span />
                          </div>
                          <label className="app-card-select">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleFileSelection(file.id)}
                              data-testid={`file-select-${file.id}`}
                            />
                            <span>{isSelected ? "Selected" : "Select"}</span>
                          </label>
                        </div>

                        <div className="app-file-card-body">
                          <h3 className="app-file-card-title">{file.name}</h3>
                          <div className="app-file-card-meta">
                            <p>
                              <span className="text-muted">Size</span>
                              <strong>{file.size}</strong>
                            </p>
                            <p>
                              <span className="text-muted">Uploaded By</span>
                              <strong>{file.uploadedBy}</strong>
                            </p>
                            <p>
                              <span className="text-muted">Uploaded At</span>
                              <strong>{new Date(file.uploadedAt).toLocaleString()}</strong>
                            </p>
                          </div>
                        </div>

                        <div className="app-file-card-footer">
                          <div className="app-file-card-links">
                            <button
                              className="btn-secondary px-3 py-2"
                              onClick={() => previewFile(file.id)}
                              data-testid={`file-preview-btn-${file.id}`}
                            >
                              Preview
                            </button>
                            <button
                              className="btn-primary px-3 py-2"
                              onClick={() => downloadFile(file.id)}
                              data-testid={`file-download-btn-${file.id}`}
                            >
                              Download
                            </button>
                          </div>
                          <div className="app-row-actions">
                            {canCreateEdit && (
                              <button
                                className="btn-secondary px-3 py-2"
                                onClick={() => {
                                  setRenamingFile(file);
                                  setNewName(file.name);
                                }}
                                data-testid={`file-rename-btn-${file.id}`}
                              >
                                Rename
                              </button>
                            )}
                            {canDelete && (
                              <button
                                className="btn-danger px-3 py-2"
                                onClick={() => setDeletingFile(file)}
                                data-testid={`file-delete-btn-${file.id}`}
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
                {emptyState && (
                  <p className="app-empty-state" data-testid="files-empty">
                    No files in this folder.
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {renamingFile && (
        <Modal
          title={`Rename File: ${renamingFile.name}`}
          testId="rename-file-modal"
          onClose={() => setRenamingFile(null)}
        >
          <input
            className="app-input"
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
            data-testid="rename-file-input"
          />
          <div className="app-dialog-actions">
            <button
              className="btn-primary px-4 py-2"
              onClick={renameFile}
              data-testid="rename-file-submit"
            >
              Save
            </button>
          </div>
        </Modal>
      )}

      {showUploadDialog && (
        <Modal
          title="Upload File"
          testId="upload-file-modal"
          onClose={() => {
            setShowUploadDialog(false);
            setSelectedFile(null);
          }}
        >
          <input
            type="file"
            className="app-input mt-2 block"
            onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
            data-testid="upload-file-input"
            disabled={!canCreateEdit}
          />
          <div className="app-dialog-actions">
            <button
              className="btn-primary px-4 py-2 disabled:opacity-60"
              onClick={upload}
              disabled={!selectedFile || !canCreateEdit}
              data-testid="upload-file-btn"
            >
              Upload File
            </button>
          </div>
        </Modal>
      )}

      {deletingFile && (
        <ConfirmDialog
          message={`Delete file "${deletingFile.name}"?`}
          testId="delete-file-dialog"
          onCancel={() => setDeletingFile(null)}
          onConfirm={deleteFile}
        />
      )}
      {deletingFilesBulk && (
        <ConfirmDialog
          message={`Delete ${selectedFileIds.length} selected file(s)?`}
          testId="delete-files-bulk-dialog"
          onCancel={() => setDeletingFilesBulk(false)}
          onConfirm={deleteSelectedFiles}
        />
      )}
    </AppLayout>
  );
}
