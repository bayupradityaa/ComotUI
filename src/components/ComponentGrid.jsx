import ComponentCard from "./ComponentCard";

function ComingSoonTile() {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-[var(--border-strong)] bg-[var(--surface)] px-6 py-12 text-center">
      <p className="text-[13px] font-semibold text-[var(--foreground)]">
        More components coming soon.
      </p>
      <p className="text-xs text-[var(--muted)]">
        Explore, preview, and contribute on GitHub.
      </p>
    </div>
  );
}

export default function ComponentGrid({ components: items }) {
  return (
    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((comp, i) => (
        <ComponentCard key={comp.slug} component={comp} index={i} />
      ))}
      <ComingSoonTile />
    </div>
  );
}