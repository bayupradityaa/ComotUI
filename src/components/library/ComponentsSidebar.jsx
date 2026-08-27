import { Search, X } from "lucide-react";

/**
 * Desktop library nav. Quiet by design: no icons per category, counts shown
 * only when they carry information (>0), one accent edge marks where you are.
 */
export default function ComponentsSidebar({
  categories,
  activeCategory,
  onCategoryChange,
  query,
  onQueryChange,
  counts,
  totalComponents,
  showNav = true,
}) {
  return (
    <div className="flex h-full flex-col gap-5">
      {/* Search */}
      <div className="relative">
        <Search
          size={15}
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
        />
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search components…"
          aria-label="Search components"
          className="mono w-full rounded-lg border border-[var(--border)] bg-[var(--background)] py-2 pl-9 pr-8 text-[13px] text-[var(--foreground)] placeholder:text-[var(--muted)] transition-colors duration-150 focus:border-[var(--accent)] focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => onQueryChange("")}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-[var(--muted)] transition-colors duration-150 hover:text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
          >
            <X size={14} aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Categories */}
      <nav aria-label="Component categories" hidden={!showNav}>
        <ul className="flex flex-col gap-0.5">
          {categories.map((category) => {
            const count =
              category === "All"
                ? totalComponents
                : (counts.get(category) ?? 0);
            const active = category === activeCategory;
            // A category with zero components is a dead end — omit the count
            // and let its absence say "nothing here yet".
            const showCount = count > 0;

            return (
              <li key={category}>
                <button
                  type="button"
                  onClick={() => onCategoryChange(category)}
                  aria-current={active ? "page" : undefined}
                  className={`group relative flex w-full items-center justify-between rounded-lg px-3 py-[7px] text-left text-[13.5px] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--accent)] ${
                    active
                      ? "bg-[var(--accent-soft)] font-semibold text-[var(--accent-hover)]"
                      : "font-medium text-[var(--secondary)] hover:bg-[var(--surface-elevated)] hover:text-[var(--foreground)]"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute inset-y-[7px] left-0 w-[2px] rounded-full bg-[var(--accent)] transition-opacity duration-150 ${
                      active ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <span>{category}</span>
                  {showCount && (
                    <span
                      className={`mono text-[11px] tabular-nums ${
                        active
                          ? "text-[var(--accent-hover)]"
                          : "text-[var(--muted)] group-hover:text-[var(--secondary)]"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
