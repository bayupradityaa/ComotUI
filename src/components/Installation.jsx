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

export default function Installation() {
  const npmCommand = "npm install receipt-printer-ui";
  const yarnCommand = "yarn add receipt-printer-ui";
  const pnpmCommand = "pnpm add receipt-printer-ui";
  const cloneCommand = "git clone https://github.com/your-org/receipt-printer-ui\ncd receipt-printer-ui\nnpm install\nnpm run dev";

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20 border-y border-[var(--border)]">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--foreground)]">
          Installation
        </h2>
        <p className="mt-2 text-[var(--secondary)] max-w-xl">
          Install the package from npm or clone the repository.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--surface)]">
            <span className="text-[11px] font-mono text-[var(--muted)]">npm</span>
            <CopyButton text={npmCommand} />
          </div>
          <div className="p-4 overflow-x-auto">
            <pre className="!m-0 !p-0 !bg-transparent text-[12px] leading-relaxed !border-none">
              <code className="language-bash">{npmCommand}</code>
            </pre>
          </div>
        </div>

        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--surface)]">
            <span className="text-[11px] font-mono text-[var(--muted)]">yarn</span>
            <CopyButton text={yarnCommand} />
          </div>
          <div className="p-4 overflow-x-auto">
            <pre className="!m-0 !p-0 !bg-transparent text-[12px] leading-relaxed !border-none">
              <code className="language-bash">{yarnCommand}</code>
            </pre>
          </div>
        </div>

        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--surface)]">
            <span className="text-[11px] font-mono text-[var(--muted)]">pnpm</span>
            <CopyButton text={pnpmCommand} />
          </div>
          <div className="p-4 overflow-x-auto">
            <pre className="!m-0 !p-0 !bg-transparent text-[12px] leading-relaxed !border-none">
              <code className="language-bash">{pnpmCommand}</code>
            </pre>
          </div>
        </div>

        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--surface)]">
            <span className="text-[11px] font-mono text-[var(--muted)]">git clone</span>
            <CopyButton text={cloneCommand} />
          </div>
          <div className="p-4 overflow-x-auto">
            <pre className="!m-0 !p-0 !bg-transparent text-[12px] leading-relaxed !border-none">
              <code className="language-bash">{cloneCommand}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}