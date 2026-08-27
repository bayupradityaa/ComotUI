import { useCallback, useEffect, useMemo, useState } from "react";

export const THEMES = ["dark", "light", "system"];

function getSystemTheme() {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function resolveTheme(preference) {
  return preference === "system" ? getSystemTheme() : preference;
}

function readStoredTheme() {
  try {
    const stored = window.localStorage.getItem("rp-theme");
    return THEMES.includes(stored) ? stored : null;
  } catch {
    return null;
  }
}

function applyTheme(theme) {
  const root = document.documentElement;
  const resolved = resolveTheme(theme);

  root.classList.remove("dark", "light");
  root.classList.add(resolved);
  root.style.colorScheme = resolved;

  try {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", resolved === "dark" ? "#080616" : "#F6F8FE");
  } catch {
    /* ignore */
  }
}

export function useTheme() {
  const [theme, setThemeState] = useState(() => readStoredTheme() ?? "system");

  const setTheme = useCallback((next) => {
    setThemeState(next);
    try {
      window.localStorage.setItem("rp-theme", next);
    } catch {
    }
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (theme !== "system") return;
    const mql = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => applyTheme("system");
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [theme]);

  const resolved = useMemo(() => resolveTheme(theme), [theme]);

  return { theme, resolved, setTheme };
}
