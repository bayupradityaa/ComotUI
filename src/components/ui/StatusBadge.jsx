import { cn } from "../../lib/utils";

// Dependency-free status badge. Colors map to the app's semantic tokens so the
// badge adapts automatically to light and dark themes.

const tones = {
  success: { fg: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500" },
  warning: { fg: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500" },
  danger: { fg: "text-red-600 dark:text-red-400", bg: "bg-red-500" },
  neutral: { fg: "text-[var(--secondary)]", bg: "bg-[var(--muted)]" },
};

export default function StatusBadge({
  tone = "neutral",
  dot = true,
  label,
  className,
}) {
  const t = tones[tone] ?? tones.neutral;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] bg-[var(--surface-elevated)] px-2 py-0.5 text-xs font-medium",
        t.fg,
        className,
      )}
    >
      {dot && <span aria-hidden="true" className={cn("size-1.5 rounded-full", t.bg)} />}
      {label || "Status"}
    </span>
  );
}