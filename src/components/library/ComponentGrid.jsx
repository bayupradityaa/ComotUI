import ComponentCard from "./ComponentCard";

/**
 * Library grid. Purely data-driven: maps whatever it's handed from the
 * registry. No hardcoded positions, no trailing "coming soon" tile —
 * sparse libraries resolve through the empty state instead.
 */
export default function ComponentGrid({ components }) {
  return (
    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
      {components.map((component) => (
        <ComponentCard key={component.slug} component={component} />
      ))}
    </div>
  );
}