import { SearchX } from "lucide-react";
import { GITHUB_REPO } from "../../lib/github";

/**
 * Differentiated empty states. No decoration, no giant illustrations —
 * just a quiet icon, a calm line, and one action.
 */
export default function ComponentEmptyState({ type, category, query, onClear }) {
  const searching = type === "search";

  return (
    <div className="flex flex-col items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-16 text-center">
      <SearchX size={22} aria-hidden="true" className="mb-1 text-[var(--muted)]" />
      {searching ? (
        <>
          <p className="text-sm font-semibold text-[var(--foreground)]">
            No components found.
          </p>
          <p className="max-w-sm text-[13px] leading-relaxed text-[var(--secondary)]">
            We couldn&apos;t find anything matching{" "}
            <span className="mono text-[var(--foreground)]">“{query}”</span>.
            Try another search or category.
          </p>
          <button
            type="button"
            onClick={onClear}
            className="mt-4 rounded-lg border border-[var(--border-strong)] px-3 py-1.5 text-[13px] font-medium text-[var(--secondary)] transition-colors duration-150 hover:border-[var(--accent-hover)] hover:text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
          >
            Clear search
          </button>
        </>
      ) : (
        <>
          <p className="text-sm font-semibold text-[var(--foreground)]">{category}</p>
          <p className="max-w-sm text-[13px] leading-relaxed text-[var(--secondary)]">
            No components in this category yet. Check back later — or contribute
            one yourself.
          </p>
          <a
            href={GITHUB_REPO}
            target="_blank"
            rel="noreferrer"
            className="mt-4 rounded-lg border border-[var(--border-strong)] px-3 py-1.5 text-[13px] font-medium text-[var(--secondary)] transition-colors duration-150 hover:border-[var(--accent-hover)] hover:text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
          >
            View on GitHub
          </a>
        </>
      )}
    </div>
  );
}