import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getCategories, components } from "../lib/registry";
import CategoryFilter from "../components/CategoryFilter";
import ComponentGrid from "../components/ComponentGrid";
import TearDivider from "../components/TearDivider";

function filterByCategory(list, cat) {
  if (cat === "All") return list;
  return list.filter((c) => c.category === cat);
}

export default function ComponentExplorer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initial = searchParams.get("category");
  const [category, setCategory] = useState(
    getCategories().includes(initial) ? initial : "All",
  );

  useEffect(() => {
    const fromUrl = searchParams.get("category");
    setCategory(getCategories().includes(fromUrl) ? fromUrl : "All");
  }, [searchParams]);

  const pick = (cat) => {
    setCategory(cat);
    if (cat === "All") setSearchParams({});
    else setSearchParams({ category: cat });
  };

  const visible = filterByCategory(components, category);
  const isEmpty = visible.length === 0;

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-10 lg:py-14">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
          Browse Components
        </h1>
        <p className="mt-1.5 text-sm text-[var(--secondary)]">
          Find a component. Make it yours.
        </p>
      </div>

      <CategoryFilter categories={getCategories()} active={category} onSelect={pick} />
      <TearDivider className="group/tear mt-3 mb-6" />

      {isEmpty ? (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-16 text-center">
          <p className="text-sm font-medium text-[var(--foreground)]">Nothing here yet.</p>
          <p className="mt-1 text-[13px] text-[var(--muted)]">More components are on the way.</p>
          <button
            type="button"
            onClick={() => pick("All")}
            className="mt-4 rounded-lg border border-[var(--border)] px-3 py-1.5 text-[13px] font-medium text-[var(--secondary)] hover:text-[var(--foreground)]"
          >
            View all components
          </button>
        </div>
      ) : (
        <ComponentGrid components={visible} />
      )}
    </section>
  );
}