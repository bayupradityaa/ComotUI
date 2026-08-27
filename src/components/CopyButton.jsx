import { useCallback, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyButton({ text, className = "" }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
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
    timeoutRef.current = window.setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-live="polite"
      className={`flex h-7 items-center gap-1.5 rounded-md border px-2.5 text-[12px] font-medium transition-colors duration-150 ${
        copied
          ? "border-[var(--success-soft)] bg-[var(--success-soft)] text-[var(--success)]"
          : "border-[var(--border)] bg-[var(--surface)] text-[var(--secondary)] hover:border-[var(--border-strong)] hover:text-[var(--foreground)]"
      } ${className}`}
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
