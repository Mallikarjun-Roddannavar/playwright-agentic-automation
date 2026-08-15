import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { api } from "../api";
import { AppLayout } from "../components/AppLayout";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { Modal } from "../components/Modal";
import { useAuth } from "../context/AuthContext";
import type { Folder } from "../types";

export function FoldersPage() {
  const navigate = useNavigate();
  const { user, canCreateEdit, canDelete } = useAuth();
  const [viewMode, setViewMode] = useState<"list" | "cards">("list");
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(false);
  const [newName, setNewName] = useState("");
  const [editingFolder, setEditingFolder] = useState<Folder | null>(null);
  const [deletingFolder, setDeletingFolder] = useState<Folder | null>(null);
  const [deletingFoldersBulk, setDeletingFoldersBulk] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [error, setError] = useState("");
  const [createError, setCreateError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [selectedFolderIds, setSelectedFolderIds] = useState<string[]>([]);
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);
  const folderCardRefs = useRef<Record<string, HTMLElement | null>>({});

  const emptyState = useMemo(() => !loading && folders.length === 0, [folders.length, loading]);

  async function refresh() {
    if (!user) return;
    setLoading(true);
    setError("");
    try {
      const nextFolders = await api.listFolders(user);
      setFolders(nextFolders);
      setSelectedFolderIds((prev) => prev.filter((id) => nextFolders.some((f) => f.id === id)));
      setLastSyncedAt(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load folders");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, [user]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      refresh();
    }, 5000);
    return () => window.clearInterval(timer);
  }, [user]);

  async function createFolder() {
    if (!user || !newName.trim()) return;
    setSubmitting(true);
    setError("");
    setCreateError("");
    try {
      await api.createFolder(user, newName.trim());
      setNewName("");
      setShowCreate(false);
      await refresh();
      toast.success("Folder created");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create folder";
      setCreateError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  async function renameFolder() {
    if (!user || !editingFolder || !newName.trim()) return;
    setSubmitting(true);
    setError("");
    try {
      await api.renameFolder(user, editingFolder.id, newName.trim());
      setEditingFolder(null);
      setNewName("");
      await refresh();
      toast.success("Folder renamed");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to rename folder";
      setError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  async function deleteFolder() {
    if (!user || !deletingFolder) return;
    setSubmitting(true);
    setError("");
    try {
      await api.deleteFolder(user, deletingFolder.id);
      setDeletingFolder(null);
      await refresh();
      toast.success("Folder deleted");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete folder";
      setError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  async function deleteSelectedFolders() {
    if (!user || selectedFolderIds.length === 0) return;
    setSubmitting(true);
    setError("");
    try {
      await Promise.all(selectedFolderIds.map((id) => api.deleteFolder(user, id)));
      setSelectedFolderIds([]);
      setDeletingFoldersBulk(false);
      await refresh();
      toast.success("Selected folders deleted");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete selected folders";
      setError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  function ensureCardActionsVisible(folderId: string) {
    const card = folderCardRefs.current[folderId];
    if (!card) return;

    const footer = card.querySelector<HTMLElement>(".app-folder-card-footer");
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

  function toggleFolderSelection(folderId: string) {
    setSelectedFolderIds((prev) => {
      const isSelected = prev.includes(folderId);
      const nextSelectedFolderIds = isSelected
        ? prev.filter((id) => id !== folderId)
        : [...prev, folderId];

      if (!isSelected && viewMode === "cards") {
        ensureCardActionsVisible(folderId);
      }

      return nextSelectedFolderIds;
    });
  }

  function toggleAllFolders() {
    if (selectedFolderIds.length === folders.length) {
      setSelectedFolderIds([]);
    } else {
      setSelectedFolderIds(folders.map((f) => f.id));
    }
  }

  function handleViewModeSelect(event: MouseEvent<HTMLButtonElement>, nextViewMode: "list" | "cards") {
    setViewMode(nextViewMode);
    event.currentTarget.blur();
  }

  function handleFolderCardPointerEnter(folderId: string) {
    if (viewMode === "cards") {
      ensureCardActionsVisible(folderId);
    }
  }

  function handleFolderCardPointerMove(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    const tiltX = ((50 - y) / 50) * 2.4;
    const tiltY = ((x - 50) / 50) * 3.2;

    event.currentTarget.style.setProperty("--app-card-glow-x", `${x}%`);
    event.currentTarget.style.setProperty("--app-card-glow-y", `${y}%`);
    event.currentTarget.style.setProperty("--app-card-tilt-x", `${tiltX.toFixed(2)}deg`);
    event.currentTarget.style.setProperty("--app-card-tilt-y", `${tiltY.toFixed(2)}deg`);
  }

  function handleFolderCardPointerLeave(event: MouseEvent<HTMLElement>) {
    event.currentTarget.style.setProperty("--app-card-glow-x", "72%");
    event.currentTarget.style.setProperty("--app-card-glow-y", "18%");
    event.currentTarget.style.setProperty("--app-card-tilt-x", "0deg");
    event.currentTarget.style.setProperty("--app-card-tilt-y", "0deg");
  }

  return (
    <AppLayout>
      <section className="app-page">
        <div className="app-section-head">
          <div className="app-section-copy">
            <p className="app-kicker">Workspace</p>
            <h2 className="mt-3 text-3xl font-semibold" data-testid="folders-title">
              Folders
            </h2>
            <p className="text-muted mt-2 text-sm">
              Manage folder creation, renaming, navigation, and cleanup from one readable work
              surface.
            </p>
          </div>
          <div className="app-meta-row">
            <div className="app-status-chip">Selected: {selectedFolderIds.length}</div>
          </div>
        </div>

        <div className="app-workspace" data-view-mode={viewMode}>
          <div className="app-toolbar" data-view-mode={viewMode}>
            <p className="text-muted text-xs" data-testid="folders-last-synced">
              Last synced at: {lastSyncedAt ? lastSyncedAt.toLocaleTimeString() : "--"}
            </p>
            <div className="app-toolbar-group">
              <div className="app-view-toggle-shell">
                <span className="app-view-toggle-label">View mode</span>
                <div className="app-view-toggle" data-view-mode={viewMode} data-testid="folders-view-toggle">
                  <button
                    type="button"
                    className={`btn-secondary app-view-toggle-btn px-3 py-2 text-sm ${
                      viewMode === "list" ? "app-view-toggle-active" : ""
                    }`}
                    onClick={(event) => handleViewModeSelect(event, "list")}
                    aria-pressed={viewMode === "list"}
                    data-testid="folders-view-list-btn"
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
                    data-testid="folders-view-cards-btn"
                  >
                    Cards
                  </button>
                </div>
              </div>
              <button
                className="btn-secondary px-4 py-2"
                onClick={refresh}
                data-testid="folders-refresh-btn"
              >
                Refresh
              </button>
              {canCreateEdit && (
                <button
                  className="btn-primary px-4 py-2"
                  onClick={() => {
                    setCreateError("");
                    setNewName("");
                    setShowCreate(true);
                  }}
                  data-testid="new-folder-btn"
                >
                  New Folder
                </button>
              )}
              {canDelete && (
                <button
                  className="btn-danger px-4 py-2 disabled:opacity-60"
                  onClick={() => setDeletingFoldersBulk(true)}
                  disabled={selectedFolderIds.length === 0}
                  data-testid="folders-bulk-delete-btn"
                >
                  Delete Selected
                </button>
              )}
            </div>
          </div>

          {error && (
            <p className="app-alert app-alert-danger mt-4" data-testid="folders-error">
              {error}
            </p>
          )}

          <div
            key={viewMode}
            className={`app-view-stage app-view-stage-${viewMode}`}
            data-testid={`folders-view-stage-${viewMode}`}
          >
            {viewMode === "list" ? (
              <div className="app-table-wrap">
                <table className="app-table text-left">
                  <thead className="text-sm">
                    <tr>
                      <th className="p-3">
                        <input
                          type="checkbox"
                          checked={folders.length > 0 && selectedFolderIds.length === folders.length}
                          onChange={toggleAllFolders}
                          data-testid="folders-select-all"
                        />
                      </th>
                      <th className="p-3">Name</th>
                      <th className="p-3">Created</th>
                      <th className="p-3">Owner</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {folders.map((folder, index) => (
                      <tr key={folder.id} data-testid={`folder-row-${index + 1}`}>
                        <td className="p-3">
                          <input
                            type="checkbox"
                            checked={selectedFolderIds.includes(folder.id)}
                            onChange={() => toggleFolderSelection(folder.id)}
                            data-testid={`folder-select-${folder.id}`}
                          />
                        </td>
                        <td className="p-3">{folder.name}</td>
                        <td className="p-3">{new Date(folder.createdAt).toLocaleString()}</td>
                        <td className="p-3">{folder.owner}</td>
                        <td className="p-3">
                          <div className="app-row-actions">
                            <button
                              className="btn-secondary px-3 py-2 disabled:opacity-60"
                              onClick={() => navigate(`/folders/${folder.id}`)}
                              disabled={!selectedFolderIds.includes(folder.id)}
                              data-testid={`folder-open-btn-${folder.id}`}
                            >
                              Open
                            </button>
                            <a
                              className={`btn-secondary px-3 py-2 ${
                                !selectedFolderIds.includes(folder.id)
                                  ? "pointer-events-none opacity-60"
                                  : ""
                              }`}
                              href={`/folders/${folder.id}`}
                              target="_blank"
                              rel="noreferrer"
                              data-testid={`folder-open-new-tab-${folder.id}`}
                            >
                              Open in New Tab
                            </a>
                            {canCreateEdit && (
                              <button
                                className="btn-secondary px-3 py-2 disabled:opacity-60"
                                onClick={() => {
                                  setEditingFolder(folder);
                                  setNewName(folder.name);
                                }}
                                disabled={!selectedFolderIds.includes(folder.id)}
                                data-testid={`folder-rename-btn-${folder.id}`}
                              >
                                Rename
                              </button>
                            )}
                            {canDelete && (
                              <button
                                className="btn-danger px-3 py-2 disabled:opacity-60"
                                onClick={() => setDeletingFolder(folder)}
                                disabled={!selectedFolderIds.includes(folder.id)}
                                data-testid={`folder-delete-btn-${folder.id}`}
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
                  <p className="app-empty-state" data-testid="folders-empty">
                    No folders yet.
                  </p>
                )}
              </div>
            ) : (
              <>
                <div className="app-card-grid-header">
                  <label className="app-card-grid-select-all">
                    <input
                      type="checkbox"
                      checked={folders.length > 0 && selectedFolderIds.length === folders.length}
                      onChange={toggleAllFolders}
                      data-testid="folders-select-all"
                    />
                    <span>Select all folders</span>
                  </label>
                </div>
                <div className="app-folder-grid" data-testid="folders-card-view">
                  {folders.map((folder, index) => {
                    const isSelected = selectedFolderIds.includes(folder.id);
                    return (
                      <article
                        key={folder.id}
                        ref={(element) => {
                          folderCardRefs.current[folder.id] = element;
                        }}
                        className={`app-folder-card ${isSelected ? "app-folder-card-selected" : ""}`}
                        onMouseEnter={() => handleFolderCardPointerEnter(folder.id)}
                        onFocus={() => handleFolderCardPointerEnter(folder.id)}
                        onMouseMove={handleFolderCardPointerMove}
                        onMouseLeave={handleFolderCardPointerLeave}
                        data-testid={`folder-row-${index + 1}`}
                      >
                        <div className="app-folder-card-head">
                          <div className="app-folder-card-icon" aria-hidden="true">
                            <span />
                          </div>
                          <label className="app-card-select">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleFolderSelection(folder.id)}
                              data-testid={`folder-select-${folder.id}`}
                            />
                            <span>{isSelected ? "Selected" : "Select"}</span>
                          </label>
                        </div>

                        <div className="app-folder-card-body">
                          <h3 className="app-folder-card-title">{folder.name}</h3>
                          <div className="app-folder-card-meta">
                            <p>
                              <span className="text-muted">Owner</span>
                              <strong>{folder.owner}</strong>
                            </p>
                            <p>
                              <span className="text-muted">Created</span>
                              <strong>{new Date(folder.createdAt).toLocaleString()}</strong>
                            </p>
                          </div>
                        </div>

                        <div className="app-folder-card-footer">
                          <div className="app-folder-card-links">
                            <button
                              className="btn-primary px-3 py-2"
                              onClick={() => navigate(`/folders/${folder.id}`)}
                              data-testid={`folder-open-btn-${folder.id}`}
                            >
                              Open
                            </button>
                            <a
                              className="btn-secondary px-3 py-2"
                              href={`/folders/${folder.id}`}
                              target="_blank"
                              rel="noreferrer"
                              data-testid={`folder-open-new-tab-${folder.id}`}
                            >
                              New Tab
                            </a>
                          </div>
                          <div className="app-row-actions">
                            {canCreateEdit && (
                              <button
                                className="btn-secondary px-3 py-2"
                                onClick={() => {
                                  setEditingFolder(folder);
                                  setNewName(folder.name);
                                }}
                                data-testid={`folder-rename-btn-${folder.id}`}
                              >
                                Rename
                              </button>
                            )}
                            {canDelete && (
                              <button
                                className="btn-danger px-3 py-2"
                                onClick={() => setDeletingFolder(folder)}
                                data-testid={`folder-delete-btn-${folder.id}`}
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
                  <p className="app-empty-state" data-testid="folders-empty">
                    No folders yet.
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {showCreate && (
        <Modal
          title="Create Folder"
          testId="create-folder-modal"
          onClose={() => {
            setShowCreate(false);
            setCreateError("");
          }}
        >
          <input
            className="app-input"
            value={newName}
            onChange={(event) => {
              setNewName(event.target.value);
              if (createError) setCreateError("");
            }}
            data-testid="create-folder-input"
          />
          {createError && (
            <p className="app-alert app-alert-danger mt-3" data-testid="create-folder-error">
              {createError}
            </p>
          )}
          <div className="app-dialog-actions">
            <button
              className="btn-primary px-4 py-2 disabled:opacity-60"
              onClick={createFolder}
              disabled={!newName.trim() || submitting}
              data-testid="create-folder-submit"
            >
              {submitting ? "Creating..." : "Create"}
            </button>
          </div>
        </Modal>
      )}

      {editingFolder && (
        <Modal
          title={`Rename Folder: ${editingFolder.name}`}
          testId="rename-folder-modal"
          onClose={() => setEditingFolder(null)}
        >
          <input
            className="app-input"
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
            data-testid="rename-folder-input"
          />
          <div className="app-dialog-actions">
            <button
              className="btn-primary px-4 py-2 disabled:opacity-60"
              onClick={renameFolder}
              disabled={!newName.trim() || submitting}
              data-testid="rename-folder-submit"
            >
              {submitting ? "Saving..." : "Save"}
            </button>
          </div>
        </Modal>
      )}

      {deletingFolder && (
        <ConfirmDialog
          message={`Delete folder "${deletingFolder.name}"?`}
          testId="delete-folder-dialog"
          onCancel={() => setDeletingFolder(null)}
          onConfirm={deleteFolder}
        />
      )}
      {deletingFoldersBulk && (
        <ConfirmDialog
          message={`Delete ${selectedFolderIds.length} selected folder(s)?`}
          testId="delete-folders-bulk-dialog"
          onCancel={() => setDeletingFoldersBulk(false)}
          onConfirm={deleteSelectedFolders}
        />
      )}
    </AppLayout>
  );
}









