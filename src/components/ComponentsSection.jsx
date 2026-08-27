import { useState } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES, components } from "../lib/registry";
import CategoryFilter from "./CategoryFilter";
import ComponentGrid from "./ComponentGrid";

function filterByCategory(list, cat) {
  if (cat === "All") return list;
  return list.filter((c) => c.category === cat);
}

export default function ComponentsSection() {
  const [category, setCategory] = useState("All");

  const visible = filterByCategory(components, category);
  const isEmpty = visible.length === 0;

  return (
    <section id="components" className="scroll-mt-20 mx-auto max-w-6xl px-4 sm:px-6 py-12 lg:py-16">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
          Browse Components
        </h2>
        <p className="mt-1.5 text-sm text-[var(--secondary)]">
          Find a component. Make it yours.
        </p>
      </div>

      <CategoryFilter
        categories={CATEGORIES}
        active={category}
        onSelect={setCategory}
      />
      <hr className="mt-3 mb-6 border-[var(--border)]" />

      {isEmpty ? (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-16 text-center">
          <p className="text-sm font-medium text-[var(--foreground)]">
            Nothing here yet.
          </p>
          <p className="mt-1 text-[13px] text-[var(--muted)]">
            More components are on the way.
          </p>
          <button
            type="button"
            onClick={() => setCategory("All")}
            className="mt-4 rounded-lg border border-[var(--border)] px-3 py-1.5 text-[13px] font-medium text-[var(--secondary)] hover:text-[var(--foreground)]"
          >
            View all components
          </button>
        </div>
      ) : (
        <ComponentGrid components={visible} />
      )}

      <div className="mt-8 text-center">
        <Link
          to="/components"
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--foreground)] hover:underline"
        >
          View all components
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}