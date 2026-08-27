import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CornerRightUp, Search, Square, SearchX } from "lucide-react";
import { getCategories, components } from "../lib/registry";
import { cn } from "../lib/utils";

const easeOut = [0.16, 1, 0.3, 1];

function CommandIcon({ slug }) {
  const c = components.find((x) => x.slug === slug);
  const tone =
    c.category === "Commerce"
      ? "bg-amber-500/15 text-amber-600"
      : "bg-[var(--surface-elevated)] text-[var(--secondary)]";
  return (
    <span
      className={cn(
        "grid size-7 shrink-0 place-items-center rounded-md border border-[var(--border)] font-sans text-[11px] font-extrabold text-[var(--secondary)]",
        tone,
      )}
      aria-hidden="true"
    >
      {String(c?.name ? c.name.slice(0, 1) : "?").toUpperCase()}
    </span>
  );
}

export default function SearchCommand({ variant = "input" }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onKey = (e) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return components.map((c) => ({ comp: c, diff: 0 }));
    }
    const scored = components
      .map((c) => {
        const name = `${c.category} ${c.name} ${c.description}`.toLowerCase();
        const idx = name.indexOf(q);
        return { comp: c, diff: idx === -1 ? Infinity : idx };
      })
      .filter((x) => x.diff !== Infinity);
    return scored.sort((a, b) => a.diff - b.diff);
  }, [query]);


  const go = useCallback(
    (slug) => {
      setOpen(false);
      navigate(`/components/${slug}`);
    },
    [navigate],
  );

  useEffect(() => {
    if (!open) return;

    // When there is no query, rows are the flat union: all components then all
    // categories. When there is a query, only filtered components render.
    const cats = getCategories().filter((c) => c !== "All");
    const rowCount = (query.trim() ? matches.length : components.length + cats.length);

    const onKey = (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => {
          const next = rowCount === 0 ? 0 : (i + 1) % rowCount;
          return next;
        });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => {
          const next = rowCount === 0 ? 0 : (i - 1 + rowCount) % rowCount;
          return next;
        });
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (query.trim()) {
          const m = matches[active];
          if (m) go(m.slug);
        } else {
          const totalCats = cats.length;
          if (active < components.length) {
            go(components[active].slug);
          } else if (active < components.length + totalCats) {
            const cat = cats[active - components.length];
            setOpen(false);
            navigate(`/components?category=${cat}`);
            return;
          } else {
            setActive(0);
          }
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, active, matches, query, go, navigate]);

  return (
    <>
      {variant === "icon" ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Search components (⌘K)"
          className="grid size-8 place-items-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--secondary)] transition-colors duration-150 hover:border-[var(--border-strong)] hover:text-[var(--foreground)]"
        >
          <Search size={15} />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Search components"
          className="flex h-8 w-full max-w-[15rem] items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2.5 text-[13px] text-[var(--muted)] ring-[var(--accent)] transition-shadow duration-150 hover:border-[var(--border-strong)] focus-visible:ring-2"
        >
          <Search size={14} className="shrink-0" />
          <span className="truncate">Search components...</span>
          <span className="mono ml-auto flex shrink-0 items-center gap-0.5 border border-[var(--border)] rounded px-1 text-[10px] text-[var(--muted)]">
            ⌘K
          </span>
        </button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setOpen(false)}
            role="dialog"
            aria-label="Command palette"
            aria-modal="true"
            className="fixed inset-0 z-[60] grid place-items-center bg-[var(--background)]/70 px-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 6 }}
              transition={{ duration: 0.18, ease: easeOut }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg overflow-hidden rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] shadow-[var(--shadow-2)]"
            >
              <div className="flex items-center gap-2.5 border-b border-[var(--border)] px-3.5">
                <Search size={15} className="shrink-0 text-[var(--muted)]" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                              }}
                  placeholder="Search components…"
                  aria-label="Search components"
                  className="h-12 min-w-0 flex-1 bg-transparent text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none"
                />
                <Square size={14} className="hidden sm:block text-[var(--muted)]" />
              </div>

              <div className="max-h-[19rem] overflow-y-auto p-2" ref={listRef}>
                {query.trim() ? (
                  matches.length === 0 ? (
                    <div className="flex items-center gap-3 px-3 py-6 text-[var(--muted)]">
                      <SearchX size={16} className="shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-[var(--foreground)]">Nothing found.</p>
                        <p className="text-xs text-[var(--muted)]">No component matches that query.</p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="px-2.5 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">Components</p>
                      {matches.map(({ comp }, i) => (
                        <button
                          key={comp.slug}
                          type="button"
                          onClick={() => go(comp.slug)}
                          onMouseMove={() => setActive(i)}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors duration-100",
                            i === Math.min(active, matches.length - 1) && "bg-[var(--accent-soft)]",
                          )}
                        >
                          <CommandIcon slug={comp.slug} />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-[var(--foreground)]">{comp.name}</p>
                            <p className="truncate text-xs text-[var(--muted)]">{comp.category} · {comp.description}</p>
                          </div>
                          {i === Math.min(active, matches.length - 1) ? (
                            <CornerRightUp size={14} className="shrink-0 text-[var(--secondary)]" />
                          ) : null}
                        </button>
                      ))}
                    </div>
                  )
                ) : (
                  <>
                    <p className="px-2.5 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">Components</p>
                    {components.map((c, i) => (
                      <button
                        key={c.slug}
                        type="button"
                        onClick={() => go(c.slug)}
                        onMouseMove={() => setActive(i)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors duration-150",
                          i === active && "bg-[var(--accent-soft)]",
                        )}
                      >
                        <CommandIcon slug={c.slug} />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-[var(--foreground)]">{c.name}</p>
                          <p className="truncate text-xs text-[var(--muted)]">{c.category}</p>
                        </div>
                        {i === active ? (
                          <CornerRightUp size={14} className="shrink-0 text-[var(--secondary)]" />
                        ) : null}
                      </button>
                    ))}

                    <p className="px-2.5 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">Categories</p>
                    {getCategories().filter((c) => c !== "All").map((cat, j) => {
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => navigate(`/components?category=${cat}`)}
                          onMouseMove={() => setActive(components.length + j)}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors duration-150",
                            components.length + j === active && "bg-[var(--accent-soft)]",
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className="grid size-7 shrink-0 place-items-center rounded-md border border-[var(--border)] text-[var(--muted)]"
                          >
                            <span className="text-[11px] font-bold">#</span>
                          </span>
                          <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-[var(--foreground)]">{cat}</span>
                        </button>
                      );
                    })}
                  </>
                )}
              </div>

              <div className="hidden sm:flex items-center gap-3 border-t border-[var(--border)] px-3.5 py-2 text-[11px] text-[var(--muted)]">
                <span className="flex items-center gap-1">
                  <span className="mono inline-block border border-[var(--border)] rounded px-1 leading-4">↵</span> Open
                </span>
                <span className="flex items-center gap-1">
                  <span className="mono inline-block border border-[var(--border)] rounded px-1 leading-4">↑↓</span> Navigate
                </span>
                <span className="flex items-center gap-1">
                  <span className="mono inline-block border border-[var(--border)] rounded px-1 leading-4">esc</span> Close
                </span>
                <span className="ml-auto">{String(components.length)} components</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}