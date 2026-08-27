import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const OPTIONS = [
  { value: "dark", label: "Dark", icon: Moon },
  { value: "light", label: "Light", icon: Sun },
  { value: "system", label: "System", icon: Monitor },
];

const easeOut = [0.16, 1, 0.3, 1];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  // Close the menu on outside click / Escape
  useEffect(() => {
    if (!open) return;
    function onPointerDown(event) {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    }
    function onKeyDown(event) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const active = OPTIONS.find((o) => o.value === theme);
  const ActiveIcon = active?.icon ?? Sun;

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Theme: ${active?.label ?? "System"}. Change theme.`}
        className="grid size-8 place-items-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--secondary)] transition-colors duration-150 hover:text-[var(--foreground)] hover:border-[var(--border-strong)]"
      >
        <ActiveIcon size={16} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.16, ease: easeOut }}
            role="menu"
            className="absolute right-0 top-full z-50 mt-2 w-36 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1 shadow-[var(--shadow-2)]"
          >
            {OPTIONS.map((option) => {
              const selected = option.value === theme;
              const OptionIcon = option.icon;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="menuitemradio"
                  aria-checked={selected}
                  onClick={() => {
                    setTheme(option.value);
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[13px] text-[var(--secondary)] transition-colors duration-100 hover:bg-[var(--surface-elevated)] hover:text-[var(--foreground)] data-[selected=true]:text-[var(--foreground)]"
                  data-selected={selected}
                >
                  <OptionIcon size={14} className={selected ? "text-[var(--accent)]" : ""} />
                  <span className="flex-1">{option.label}</span>
                  {selected && (
                    <span
                      aria-hidden="true"
                      className="size-1.5 rounded-full bg-[var(--accent)]"
                    />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
