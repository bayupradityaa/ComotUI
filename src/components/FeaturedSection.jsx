import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import LiveReceiptDemo from "./LiveReceiptDemo";
import Badge from "./Badge";

export default function FeaturedSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-16 lg:pb-20">
      <div className="relative">
        {/* Live component preview card — real component, not a screenshot */}
        <div className="relative z-10 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-2)]">
          {/* Top card bar */}
          <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3 sm:px-5">
            <div className="flex items-center gap-2.5">
              <span aria-hidden="true" className="grid size-7 place-items-center rounded-md bg-[var(--accent-soft)] text-[13px] font-bold text-[var(--foreground)]">
                R
              </span>
              <div>
                <p className="text-sm font-semibold leading-none text-[var(--foreground)]">
                  Receipt Printer
                </p>
                <p className="mt-0.5 text-[11px] text-[var(--muted)]">
                  POS receipt printing interface
                </p>
              </div>
            </div>
            <Link
              to="/components/receipt-printer"
              className="hidden items-center gap-1.5 text-xs font-medium text-[var(--secondary)] hover:text-[var(--foreground)] sm:inline-flex"
            >
              View component
              <ArrowUpRight size={13} />
            </Link>
          </div>

          {/* Preview area */}
          <div className="relative flex items-start justify-center overflow-hidden px-4 py-6 sm:px-6 lg:py-10">
            {/* subtle backdrop so the dark printer reads as a unit */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 bottom-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,var(--accent-soft),transparent)]"
            />
            <LiveReceiptDemo className="relative w-full max-w-md" />
          </div>

          {/* Footer bar */}
          <div className="flex flex-col gap-3 border-t border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div className="flex flex-wrap items-center gap-1.5">
              <Badge>React</Badge>
              <Badge>TypeScript</Badge>
              <Badge>Tailwind</Badge>
            </div>
            <Link
              to="/components/receipt-printer"
              className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--foreground)]"
            >
              View component
              <ArrowUpRight size={14} className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}