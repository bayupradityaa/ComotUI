import { useSearchParams } from "react-router-dom";
import { GITHUB_REPO } from "../lib/github";
import { components, CATEGORIES } from "../lib/registry";
import {
  filterComponents,
  countByCategory,
  describeResults,
} from "../lib/componentFilter";
import ComponentsSidebar from "../components/library/ComponentsSidebar";
import MobileCategorySelector from "../components/library/MobileCategorySelector";
import ComponentGrid from "../components/library/ComponentGrid";
import ComponentEmptyState from "../components/library/ComponentEmptyState";

/**
 * Components library. A quiet sidebar + search + content grid, all driven by
 * the registry. URL params (?category=, ?q=) keep filtered/sorted views
 * shareable and survive back/forward.
 */
export default function ComponentExplorer() {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = CATEGORIES.includes(searchParams.get("category"))
    ? searchParams.get("category")
    : "All";
  const query = searchParams.get("q") ?? "";

  const updateParams = (changes) => {
    const next = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(changes)) {
      if (value) next.set(key, value);
      else next.delete(key);
    }
    setSearchParams(next, { replace: true });
  };

  const setCategory = (cat) =>
    updateParams({ category: cat === "All" ? "" : cat });
  const setQuery = (q) => updateParams({ q });

  const counts = countByCategory(components);
  const visible = filterComponents({
    components,
    category,
    query,
    tags: [],
  });
  const total = filterComponents({ components, category }).length;

  const { primary, secondary } = describeResults({
    total,
    shown: visible.length,
    query,
  });

  const isEmpty = visible.length === 0;
  const searching = query.trim().length > 0;

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-10 pt-8 lg:pt-12 lg:grid-cols-[240px_1fr]">
        {/* ═ Sidebar ═ */}
        <aside className="lg:sticky lg:top-[96px] lg:self-start">
          <h2
            className="mono mb-4 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)] lg:mb-3 lg:px-0 lg:pt-8"
            id="library-categories"
          >
            Components
          </h2>

          {/* Mobile: so stacked search + native category selector */}
          <div className="flex flex-col gap-3 lg:hidden">
            <ComponentsSidebar
              categories={CATEGORIES}
              activeCategory={category}
              onCategoryChange={setCategory}
              query={query}
              onQueryChange={setQuery}
              counts={counts}
              totalComponents={components.length}
              showNav={false}
            />
            <MobileCategorySelector
              categories={CATEGORIES}
              activeCategory={category}
              onCategoryChange={setCategory}
              counts={counts}
              totalComponents={components.length}
            />
          </div>

          {/* Desktop: nav + search */}
          <nav
            className="hidden lg:block"
            aria-labelledby="library-categories"
          >
            <ComponentsSidebar
              categories={CATEGORIES}
              activeCategory={category}
              onCategoryChange={setCategory}
              query={query}
              onQueryChange={setQuery}
              counts={counts}
              totalComponents={components.length}
            />
          </nav>
        </aside>

        {/* ═ Content ═ */}
        <div className="min-w-0 pb-16 lg:pb-20">
          <header className="pt-8 lg:pt-12">
            <h1 className="text-[28px] font-bold tracking-[-0.02em] text-[var(--foreground)] lg:text-[32px]">
              Components
            </h1>
            <p className="mt-1.5 text-[15px] text-[var(--secondary)]">
              Browse the collection. Make it yours.
            </p>
          </header>

          <div className="mt-6 border-t border-[var(--border)] pt-4">
            <p
              className="text-[13px] font-medium text-[var(--secondary)]"
              aria-live="polite"
              aria-atomic="true"
            >
              {primary}
              {secondary && (
                <>
                  {" "}
                  <span className="text-[var(--muted)]">{secondary}</span>
                </>
              )}
            </p>
          </div>

          {isEmpty ? (
            <ComponentEmptyState
              type={searching ? "search" : "category"}
              category={category}
              query={query}
              onClear={() => setQuery("")}
            />
          ) : (
            <>
              <ComponentGrid components={visible} />
              {/* Subtle contribution row — links to the existing flow, not a
                  re-created homepage section. */}
              <p className="mt-10 text-center text-[13px] text-[var(--muted)]">
                Have something worth sharing?{" "}
                <a
                  href={GITHUB_REPO}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-[var(--secondary)] underline decoration-[var(--border-strong)] underline-offset-4 transition-colors duration-150 hover:text-[var(--accent-hover)]"
                >
                  Contribute on GitHub
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}