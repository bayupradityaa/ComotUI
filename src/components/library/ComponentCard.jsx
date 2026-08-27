import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

/**
 * Whole card is one link (stretched-link pattern): the arrow is decoration,
 * the title text labels the hit area. Preview sits in an isolated container
 * so component styles can never bleed into the grid.
 */
export default function ComponentCard({ component }) {
  return (
    <Link
      to={`/components/${component.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-[var(--accent-hover)] hover:shadow-[0_12px_32px_-16px_var(--accent-soft)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
    >
      {/* Isolated preview stage */}
      <div
        aria-hidden="true"
        className="relative flex h-[220px] items-center justify-center overflow-hidden border-b border-[var(--border)] bg-[var(--background)] px-6 sm:h-[240px]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 42%, var(--accent-soft) 0%, transparent 62%)",
        }}
      >
        <div className="pointer-events-none scale-[0.82] transition-transform duration-200 group-hover:scale-[0.87]">
          <component.component />
        </div>
        <span
          className="absolute right-4 top-4 rounded-full border border-[var(--border-strong)] bg-[var(--surface-elevated)] p-1.5 text-[var(--muted)] opacity-0 transition-all duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
          aria-hidden="true"
        >
          <ArrowUpRight size={14} />
        </span>
      </div>

      {/* Metadata — secondary treatment, no competing pills */}
      <div className="flex flex-1 flex-col gap-1 px-5 py-4">
        <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-[var(--foreground)]">
          {component.name}
        </h3>
        <p className="line-clamp-2 text-[13px] leading-relaxed text-[var(--secondary)]">
          {component.description}
        </p>
        <span className="mono mt-auto pt-2 text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">
          {component.category}
        </span>
      </div>
    </Link>
  );
}
