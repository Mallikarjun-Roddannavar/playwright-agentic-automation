import { NavLink } from "react-router-dom";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const navItems = [
  {
    to: "/",
    testId: "nav-home",
    title: "Home",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5.5 9.5V20h13V9.5" />
        <path d="M9.5 20v-5h5v5" />
      </svg>
    ),
  },
  {
    to: "/folders",
    testId: "nav-folders",
    title: "Folders",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M3.5 7.5h5l1.5 2H20.5v8.5a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z" />
        <path d="M3.5 7.5v-.5a2 2 0 0 1 2-2h4l1.5 2h7.5a2 2 0 0 1 2 2v.5" />
      </svg>
    ),
  },
  {
    to: "/preferences",
    testId: "nav-preferences",
    title: "Preferences",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />
        <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a1.8 1.8 0 0 1 0 2.5 1.8 1.8 0 0 1-2.5 0l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a1.8 1.8 0 0 1-1.8 1.8h-1.2A1.8 1.8 0 0 1 10.6 20v-.2a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a1.8 1.8 0 0 1-2.5 0 1.8 1.8 0 0 1 0-2.5l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H5.5A1.8 1.8 0 0 1 3.7 13v-1a1.8 1.8 0 0 1 1.8-1.8h.2a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a1.8 1.8 0 0 1 0-2.5 1.8 1.8 0 0 1 2.5 0l.1.1a1 1 0 0 0 1.1.2 1 1 0 0 0 .6-.9V4A1.8 1.8 0 0 1 12.4 2.2h1.2A1.8 1.8 0 0 1 15.4 4v.2a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a1.8 1.8 0 0 1 2.5 0 1.8 1.8 0 0 1 0 2.5l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.6h.2a1.8 1.8 0 0 1 1.8 1.8v1a1.8 1.8 0 0 1-1.8 1.8h-.2a1 1 0 0 0-.9.6Z" />
      </svg>
    ),
  },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <button
          type="button"
          className="app-overlay fixed inset-0 z-30"
          onClick={onClose}
          data-testid="sidebar-overlay"
          aria-label="Close menu overlay"
        />
      )}
      <aside
        id="app-sidebar-drawer"
        className={`app-drawer fixed left-0 top-0 z-40 flex h-screen w-72 flex-col p-4 transition-transform duration-200 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!isOpen}
        data-testid="sidebar-drawer"
      >
        <div className="app-sidebar-head">
          <div className="app-sidebar-shell-top">
            <div>
              <p className="app-header-eyebrow">Navigation</p>
              <p className="app-sidebar-title">Workspace</p>
            </div>
            <button
              className="icon-btn app-sidebar-close"
              onClick={onClose}
              data-testid="sidebar-close-btn"
              aria-label="Close navigation menu"
              tabIndex={isOpen ? 0 : -1}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
        </div>

        <nav className="app-sidebar-nav mt-5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              data-testid={item.testId}
              tabIndex={isOpen ? 0 : -1}
              className={({ isActive }) =>
                `nav-link app-sidebar-link ${isActive ? "nav-link-active" : ""}`
              }
            >
              <span className="app-sidebar-link-icon" aria-hidden="true">
                {item.icon}
              </span>
              <span className="app-sidebar-link-title">{item.title}</span>
            </NavLink>
          ))}
        </nav>

        <div className="app-sidebar-footer">
          <p className="text-sm font-medium">Stable automation surface</p>
          <p className="text-muted mt-1 text-sm">Selectors and flows stay predictable.</p>
        </div>
      </aside>
    </>
  );
}
