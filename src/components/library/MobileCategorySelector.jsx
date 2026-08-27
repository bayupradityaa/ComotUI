import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

/**
 * Mobile category picker. Native select styled to match — zero popover code
 * to get wrong, keyboard/screen-reader behavior for free.
 */
export default function MobileCategorySelector({
  categories,
  activeCategory,
  onCategoryChange,
  counts,
  totalComponents,
}) {
  const selectRef = useRef(null);

  useEffect(() => {
    // keep the visible value in sync when a desktop layout change re-renders
    if (selectRef.current && selectRef.current.value !== activeCategory) {
      selectRef.current.value = activeCategory;
    }
  }, [activeCategory]);

  return (
    <div className="relative">
      <select
        ref={selectRef}
        value={activeCategory}
        onChange={(event) => onCategoryChange(event.target.value)}
        aria-label="Filter by category"
        className="w-full cursor-pointer appearance-none rounded-lg border border-[var(--border)] bg-[var(--surface)] py-2.5 pl-3.5 pr-10 text-sm font-medium text-[var(--foreground)] transition-colors duration-150 focus:border-[var(--accent)] focus:outline-none"
      >
        {categories.map((category) => {
          const count =
            category === "All" ? totalComponents : (counts.get(category) ?? 0);
          return (
            <option key={category} value={category}>
              {category === "All"
                ? `All components (${totalComponents})`
                : count > 0
                  ? `${category} (${count})`
                  : category}
          </option>
        );
      })}
      </select>
      <ChevronDown
        size={16}
        aria-hidden="true"
        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)]"
      />
    </div>
  );
}
