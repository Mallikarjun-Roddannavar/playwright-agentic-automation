import { useTheme } from "../context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="btn-primary mt-4 px-4 py-2 dark:bg-white dark:text-black"
      data-testid="theme-toggle-btn"
    >
      Switch to {theme === "dark" ? "Light" : "Dark"} Theme
    </button>
  );
}
