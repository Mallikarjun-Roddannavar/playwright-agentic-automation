import { ChangeEvent, useEffect, useState } from "react";

import { AppLayout } from "../components/AppLayout";
import { ThemeToggle } from "../components/ThemeToggle";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export function PreferencesPage() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const profileIconKey = `playwright_profile_icon_${user?.username ?? "guest"}`;
  const [profileIcon, setProfileIcon] = useState<string>(
    () => localStorage.getItem(profileIconKey) ?? ""
  );

  useEffect(() => {
    setProfileIcon(localStorage.getItem(profileIconKey) ?? "");
  }, [profileIconKey]);

  function onProfileIconChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = typeof reader.result === "string" ? reader.result : "";
      if (!dataUrl) return;
      localStorage.setItem(profileIconKey, dataUrl);
      setProfileIcon(dataUrl);
      window.dispatchEvent(new Event("profile-icon-updated"));
    };
    reader.readAsDataURL(file);
  }

  function removeProfileIcon() {
    localStorage.removeItem(profileIconKey);
    setProfileIcon("");
    window.dispatchEvent(new Event("profile-icon-updated"));
  }

  return (
    <AppLayout>
      <section className="app-page">
        <div className="app-section-copy">
          <p className="app-kicker">Personalization</p>
          <h2 className="mt-3 text-3xl font-semibold" data-testid="preferences-title">
            Preferences
          </h2>
          <p className="text-muted mt-2 text-sm">
            Manage theme appearance and profile icon settings without affecting the core test flows.
          </p>
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="app-workspace" data-testid="preferences-card">
            <p className="app-kicker">Theme</p>
            <p className="mt-4 text-sm text-muted dark:text-gray-400">Theme Preference</p>
            <p className="mt-1 text-sm" data-testid="preferences-theme-current">
              Current theme: {theme === "dark" ? "Black" : "White"}
            </p>
            <div className="mt-4">
              <ThemeToggle />
            </div>
            <div className="app-preview-tile mt-5" data-testid="theme-dark-utility-example">
              <p className="text-sm font-medium">Theme preview</p>
              <p className="text-muted mt-1 text-sm">
                Shared surface and accent styling stay consistent in both white and black modes.
              </p>
            </div>
          </div>

          <div className="app-workspace" data-testid="preferences-profile-card">
            <p className="app-kicker">Profile</p>
            <p className="mt-4 text-sm text-muted">Profile Icon</p>
            <input
              type="file"
              accept="image/*"
              className="app-input mt-3 block"
              onChange={onProfileIconChange}
              data-testid="preferences-profile-upload-input"
            />
            {profileIcon && (
              <div className="mt-4 flex items-center gap-4">
                <img
                  src={profileIcon}
                  alt="Profile preview"
                  className="h-16 w-16 rounded-full border object-cover"
                  data-testid="preferences-profile-preview"
                />
                <div>
                  <p className="text-sm font-medium">Preview</p>
                  <p className="text-muted text-sm">Shown in the header profile menu.</p>
                </div>
              </div>
            )}
            {profileIcon && (
              <button
                type="button"
                className="btn-danger mt-4 px-3 py-2 text-sm"
                onClick={removeProfileIcon}
                data-testid="preferences-profile-remove-btn"
              >
                Remove Icon
              </button>
            )}
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
