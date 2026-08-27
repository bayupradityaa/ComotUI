import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function ComponentCard({ component, index }) {
  const Preview = component.component;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1], delay: index * 0.04 }}
      className="group flex flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-1)] transition-all duration-150 hover:-translate-y-px hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-2)]"
    >
      <Link
        to={`/components/${component.slug}`}
        className="flex flex-col"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="relative flex h-44 items-center justify-center overflow-hidden border-b border-[var(--border)] bg-[var(--surface-elevated)] transition-transform duration-150 group-hover:[&>*]:scale-[1.01]">
          <div className="flex w-full items-center justify-center py-2">
            <Preview />
          </div>
        </div>
      </Link>

      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="min-w-0">
          <Link
            to={`/components/${component.slug}`}
            className="group/title flex items-center gap-2"
          >
            <h3 className="truncate text-[13px] font-semibold text-[var(--foreground)] hover:underline">
              {component.name}
            </h3>
            <span className="shrink-0 rounded border border-[var(--border)] bg-[var(--surface-elevated)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--muted)]">
              {component.category}
            </span>
          </Link>
          <p className="mt-0.5 truncate text-xs text-[var(--muted)]">
            {component.description}
          </p>
        </div>
        <Link
          to={`/components/${component.slug}`}
          aria-label={`View ${component.name}`}
          className="grid size-7 shrink-0 place-items-center rounded-md border border-[var(--border)] text-[var(--secondary)] transition-colors duration-150 group-hover:border-[var(--border-strong)] group-hover:text-[var(--foreground)]"
        >
          <ArrowUpRight size={14} className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}