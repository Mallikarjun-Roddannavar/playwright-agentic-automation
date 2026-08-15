import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { Sidebar } from "./Sidebar";

export function AppLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileIcon, setProfileIcon] = useState("");

  const profileIconKey = `playwright_profile_icon_${user?.username ?? "guest"}`;

  useEffect(() => {
    const loadIcon = () => setProfileIcon(localStorage.getItem(profileIconKey) ?? "");

    loadIcon();
    window.addEventListener("storage", loadIcon);
    window.addEventListener("profile-icon-updated", loadIcon);
    return () => {
      window.removeEventListener("storage", loadIcon);
      window.removeEventListener("profile-icon-updated", loadIcon);
    };
  }, [profileIconKey]);

  return (
    <div className="app-shell">
      <header className="app-header fixed inset-x-0 top-0 z-20 flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="icon-btn rounded px-3 py-2 shadow"
            onClick={() => setNavOpen(true)}
            data-testid="hamburger-menu-btn"
            aria-label="Open navigation menu"
            aria-expanded={navOpen}
            aria-controls="app-sidebar-drawer"
          >
            <span className="mb-1 block h-0.5 w-5 bg-current" />
            <span className="mb-1 block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
          </button>
          <div className="app-brand-lockup">
            <p className="app-header-eyebrow">File management workspace</p>
            <h1 className="app-header-title text-base" data-testid="header-app-name">
              Playwright Practice App
            </h1>
          </div>
        </div>
        <div className="app-header-actions">
          {user && <div className="app-header-badge">Role: {user.role}</div>}
          <div className="relative">
            <button
              type="button"
              className="icon-btn flex h-10 w-10 items-center justify-center overflow-hidden rounded-full"
              onClick={() => setProfileOpen((prev) => !prev)}
              data-testid="profile-menu-btn"
              aria-label="Open profile menu"
              aria-expanded={profileOpen}
              aria-controls="profile-menu"
            >
              {profileIcon ? (
                <img
                  src={profileIcon}
                  alt="Profile"
                  className="h-full w-full object-cover"
                  data-testid="header-profile-icon-img"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-5 w-5"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c1.6-3.2 4.6-5 8-5s6.4 1.8 8 5" />
                </svg>
              )}
            </button>
            {profileOpen && (
              <div
                id="profile-menu"
                className="dropdown-panel absolute right-0 top-full z-30 mt-3 w-64 p-4"
                data-testid="profile-menu"
              >
                <p className="text-sm font-medium" data-testid="profile-username">
                  {user?.username}
                </p>
                <p className="text-muted mt-1 text-xs" data-testid="profile-role">
                  Role: {user?.role}
                </p>
                <button
                  type="button"
                  className="btn-secondary mt-4 w-full py-2 text-sm font-medium"
                  onClick={() => {
                    setProfileOpen(false);
                    navigate("/preferences");
                  }}
                  data-testid="profile-preferences-btn"
                >
                  Change Preferences
                </button>
                <button
                  type="button"
                  className="btn-primary mt-3 w-full py-2 text-sm font-medium"
                  onClick={logout}
                  data-testid="profile-logout-btn"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      <Sidebar isOpen={navOpen} onClose={() => setNavOpen(false)} />
      <main className="app-main">{children}</main>
    </div>
  );
}
