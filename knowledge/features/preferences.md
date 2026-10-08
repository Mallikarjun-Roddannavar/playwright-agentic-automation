# Preferences

## Purpose and requirements

Requirement: [REQ-PREFERENCES-001](../../requirements/incoming/REQ-PREFERENCES-001.md).

Authenticated users must be able to manage supported appearance and profile-icon
preferences without changing core workspace data.

### Expected outcomes

- The current theme is visible to the signed-in user.
- A supported profile icon can be selected and previewed.
- A selected profile icon can be removed.
- Preference state is retained for the signed-in user where supported.
- Preference changes do not modify core workspace data.

## Current implementation

1. `PreferencesPage` displays the current theme and a theme toggle.
2. `ThemeContext` supports light/dark and stores the theme under the browser-wide `playwright_theme_mode` key; without saved state it follows the system color preference.
3. A selected image is read as a data URL, previewed, and saved under a username-specific `playwright_profile_icon_<username>` local-storage key.
4. Removing an icon deletes that key and notifies the header with `profile-icon-updated`.

Theme storage is browser-wide; icon storage is per username. Neither is server-side preference persistence.

## Manual checks

1. Sign in and confirm the current theme is shown; toggle it and refresh.
2. Select an image and confirm its preview and header icon.
3. Refresh, then remove the icon and confirm the preview disappears.
4. Switch users and check icon isolation; observe that theme storage is shared in the browser.
5. Confirm folders and files are unchanged by preference actions.

## Automated tests

There is no dedicated preference Page Object, UI spec, or API spec in the current framework. Application source and manual checks explain this feature; they do not establish automated coverage.

Reading these specs identifies intended checks. It does not mean Playwright has been run or passed.

## Gaps and questions

- The required theme values, icon validation/size policy, retention duration, and meaning of "where supported" remain unspecified.
- Clarify whether theme must be per user or synchronized across devices; current browser-wide storage does not decide the requirement.
- Preference persistence, removal, user isolation, and unchanged workspace data lack automated assertions.

- The supported theme values and profile-icon catalog are not specified.
- The persistence mechanism and retention duration require confirmation.
- The exact meaning of “where supported” requires clarification.

## Source links

- [app/frontend/src/pages/PreferencesPage.tsx](../../app/frontend/src/pages/PreferencesPage.tsx)
- [app/frontend/src/context/ThemeContext.tsx](../../app/frontend/src/context/ThemeContext.tsx)
- [app/frontend/src/components/ThemeToggle.tsx](../../app/frontend/src/components/ThemeToggle.tsx)
- [app/frontend/src/components/AppLayout.tsx](../../app/frontend/src/components/AppLayout.tsx)
