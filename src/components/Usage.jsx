import { Copy, Check } from "lucide-react";
import { useState, useCallback } from "react";

function CopyButton({ text, label = "Copy" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className={`
        flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium rounded-md
        transition-all duration-150
        ${copied
          ? "bg-[var(--success-soft)] text-[var(--success)] border border-[var(--success)]"
          : "bg-[var(--surface-elevated)] text-[var(--secondary)] border border-[var(--border)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
        }
      `}
      title={copied ? "Copied!" : "Copy to clipboard"}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? "Copied" : label}
    </button>
  );
}

export default function Usage() {
  const basicUsage = `import { ReceiptPrinter } from "receipt-printer-ui";

<ReceiptPrinter />`;

  const withProps = `import { ReceiptPrinter } from "receipt-printer-ui";

<ReceiptPrinter
  status="complete"
  feedMotion="stepped"
/>`;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--foreground)]">
          Usage
        </h2>
        <p className="mt-2 text-[var(--secondary)] max-w-xl">
          Import and use the component. Pass props to control the animation state.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic */}
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--surface)]">
            <span className="text-[11px] font-mono text-[var(--muted)]">Basic</span>
            <CopyButton text={basicUsage} />
          </div>
          <div className="p-4 overflow-x-auto">
            <pre className="!m-0 !p-0 !bg-transparent text-[12px] leading-relaxed !border-none">
              <code className="language-jsx">{basicUsage}</code>
            </pre>
          </div>
        </div>

        {/* With Props */}
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--surface)]">
            <span className="text-[11px] font-mono text-[var(--muted)]">With props</span>
            <CopyButton text={withProps} />
          </div>
          <div className="p-4 overflow-x-auto">
            <pre className="!m-0 !p-0 !bg-transparent text-[12px] leading-relaxed !border-none">
              <code className="language-jsx">{withProps}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Props table */}
      <div className="mt-8 overflow-x-auto">
        <table className="w-full text-sm border border-[var(--border)] rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-[var(--surface)] border-b border-[var(--border)]">
              <th className="px-4 py-3 text-left font-medium text-[var(--foreground)]">Prop</th>
              <th className="px-4 py-3 text-left font-medium text-[var(--foreground)]">Type</th>
              <th className="px-4 py-3 text-left font-medium text-[var(--foreground)]">Default</th>
              <th className="px-4 py-3 text-left font-medium text-[var(--foreground)]">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            <tr>
              <td className="px-4 py-3 font-mono text-[var(--foreground)]">status</td>
              <td className="px-4 py-3 text-[var(--secondary)]">"processing" | "printing" | "tearing" | "complete"</td>
              <td className="px-4 py-3 font-mono text-[var(--muted)]">"processing"</td>
              <td className="px-4 py-3 text-[var(--secondary)]">Current animation stage</td>
            </tr>
            <tr className="bg-[var(--surface)]">
              <td className="px-4 py-3 font-mono text-[var(--foreground)]">feedMotion</td>
              <td className="px-4 py-3 text-[var(--secondary)]">"stepped" | "smooth"</td>
              <td className="px-4 py-3 font-mono text-[var(--muted)]">"stepped"</td>
              <td className="px-4 py-3 text-[var(--secondary)]">Paper feed animation style</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-[var(--foreground)]">animate</td>
              <td className="px-4 py-3 text-[var(--secondary)]">boolean</td>
              <td className="px-4 py-3 font-mono text-[var(--muted)]">true</td>
              <td className="px-4 py-3 text-[var(--secondary)]">Enable/disable animations</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}