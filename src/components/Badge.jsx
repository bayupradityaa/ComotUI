import { cn } from "../lib/utils";

export default function Badge({ children, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-1.5 py-0.5 border text-[11px] font-medium leading-4",
        "border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--secondary)]",
        className,
      )}
    >
      {children}
    </span>
  );
}