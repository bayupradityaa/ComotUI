import { cn } from "../lib/utils";

export default function CategoryFilter({ categories, active, onSelect }) {
  return (
    <div className="flex gap-1.5 overflow-x-auto pb-1">
      {categories.map((cat) => {
        const isActive = cat === active;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onSelect(cat)}
            aria-pressed={isActive}
            className={cn(
              "shrink-0 rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors duration-150",
              isActive
                ? "text-[var(--foreground)] bg-[var(--accent-soft)]"
                : "text-[var(--secondary)] hover:bg-[var(--surface-elevated)] hover:text-[var(--foreground)]",
            )}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}