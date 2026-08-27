import { useCallback, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "../lib/utils";

// Idle → copied feedback for any copyable value (source, install, usage).
export default function CopyButton({
  value,
  label = "Copy",
  copiedLabel = "Copied",
  title,
  variant = "subtle",
  className,
}) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
      } catch {
        /* ignore */
      }
      document.body.removeChild(textarea);
    }
    setCopied(true);
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setCopied(false), 1800);
  }, [value]);

  const base =
    variant === "primary"
      ? "border border-transparent bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent-hover)]"
      : variant === "solid"
        ? "border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--secondary)] hover:border-[var(--border-strong)] hover:text-[var(--foreground)]"
        : "border-transparent bg-transparent text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-elevated)]";

  const copiedClass =
    variant === "primary"
      ? "bg-[var(--success)] text-white border-transparent"
      : "bg-[var(--success-soft)] text-[var(--success)] border-[var(--success)]";

  const sizeClass =
    variant === "primary"
      ? "h-10 rounded-lg px-5 text-sm font-semibold"
      : "h-7 rounded-md px-2.5 text-[12px] font-medium";

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={title ?? copied ? copiedLabel : label}
      aria-live="polite"
      className={cn(
        "inline-flex items-center gap-1.5 border transition-colors duration-150",
        sizeClass,
        copied ? copiedClass : base,
        className,
      )}
    >
      {copied ? <Check size={13} /> : <Copy size={variant === "primary" ? 15 : 13} />}
      {copied ? copiedLabel : label}
    </button>
  );
}