import StatusBadge from "../components/ui/StatusBadge";
import { cn } from "../lib/utils";

// A small fixture showing the StatusBadge component in context, used for the
// component-card preview tile and the detail page live preview. This is a
// recipe (composition), not part of the component itself.

export function StatusBadgeShowcase({ className }) {
  return (
    <div className={cn("flex w-full flex-col gap-4 px-5", className)}>
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge tone="success" label="Live" />
        <StatusBadge tone="warning" label="Building" />
        <StatusBadge tone="danger" label="Down" />
        <StatusBadge tone="neutral" label="Paused" />
      </div>

      <div className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5">
        <div className="flex flex-col gap-1">
          <span className="h-2.5 w-24 rounded-full bg-[var(--border-strong)]/70" />
          <span className="h-2 w-16 rounded-full bg-[var(--border)]" />
        </div>
        <StatusBadge tone="success" label="All systems go" />
      </div>
    </div>
  );
}