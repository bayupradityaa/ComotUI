/**
 * Centralized component filtering — the only filtering logic in the app.
 *
 * Every surface (sidebar search, category counts, the ⌘K palette) funnels
 * through here, so behavior stays identical everywhere a component is added
 * to the registry with nothing else to update.
 */

const normalize = (value) => value.toLowerCase().trim();

/**
 * @param {{
 *   components: Array,
 *   category?: string, // "All" or a registry category name ("Commerce", ...)
 *   query?: string,    // free-text; matches name/description/category/tags
 * }} params
 * @returns {Array} filtered components (registry order preserved)
 */
export function filterComponents({ components, category = "All", query = "" }) {
  const q = normalize(query);

  return components.filter((component) => {
    const inCategory =
      !category || category === "All" || component.category === category;
    if (!inCategory) return false;

    if (!q) return true;
    const haystack = [
      component.name,
      component.description,
      component.category,
      ...(component.tags ?? []),
    ]
      .filter(Boolean)
      .map(normalize);
    return haystack.some((field) => field.includes(q));
  });
}

/** Per-category counts for sidebar badges. Zero counts are omitted by callers. */
export function countByCategory(components) {
  const counts = new Map();
  for (const component of components) {
    counts.set(component.category, (counts.get(component.category) ?? 0) + 1);
  }
  return counts;
}

/**
 * Result-count copy. Grammar variants live in ONE place so every surface
 * phrases results identically.
 */
export function describeResults({ total, shown, query }) {
  if (query?.trim()) {
    return {
      primary: `${shown} result${shown === 1 ? "" : "s"}`,
      secondary: `for "${query.trim()}"`,
    };
  }
  if (total !== undefined && total !== shown) {
    return { primary: `Showing ${shown} of ${total}`, secondary: "components" };
  }
  return { primary: `${shown} component${shown === 1 ? "" : "s"}`, secondary: "" };
}
