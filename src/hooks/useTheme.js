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
}

/**
 * Dark / light / system theme management.
 * - Persists the raw preference ("dark" | "light" | "system") in localStorage
 * - Resolves "system" against prefers-color-scheme, live
 * - Applies the resolved theme as a class on <html> so CSS variables switch
 */
export function useTheme() {
  const [theme, setThemeState] = useState(() => readStoredTheme() ?? "dark");

  const setTheme = useCallback((next) => {
    setThemeState(next);
    try {
      window.localStorage.setItem("rp-theme", next);
    } catch {
      /* storage unavailable — theme still applies for this session */
    }
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Re-resolve when the OS preference flips while in "system" mode
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
