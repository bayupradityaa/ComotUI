import { useState, useEffect, useRef, useCallback } from "react";
import { Copy, Check } from "lucide-react";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";

import receiptPrinterSource from "./ui/ReceiptPrinter.jsx?raw";
import playgroundSource from "./InteractivePlayground.jsx?raw";

const CODE_TABS = [
  {
    id: "receipt-printer",
    label: "ReceiptPrinter.jsx",
    filename: "components/ui/ReceiptPrinter.jsx",
    code: receiptPrinterSource,
    description: "Compound component with stepped-feed animation, tearing effect, and cutter blade flash.",
  },
  {
    id: "playground",
    label: "InteractivePlayground.jsx",
    filename: "components/InteractivePlayground.jsx",
    code: playgroundSource,
    description: "Interactive demo with dummy data, auto-stage-advance, and replay button.",
  },
];

function CopyButton({ text }) {
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
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function CodeViewer() {
  const [activeTab, setActiveTab] = useState(CODE_TABS[0].id);
  const codeRef = useRef(null);

  const activeTabData = CODE_TABS.find((t) => t.id === activeTab);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [activeTab]);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--foreground)]">
          Source
        </h2>
        <p className="mt-2 text-[var(--secondary)] max-w-xl">
          The core component and demo implementation.
        </p>
      </div>

      <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-b border-[var(--border)] bg-[var(--surface)]">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-[var(--muted)]">{activeTabData?.filename}</span>
          </div>
          <div className="flex items-center gap-2">
            <CopyButton text={activeTabData?.code || ""} />
          </div>
        </div>

        <div className="flex border-b border-[var(--border)] bg-[var(--surface)] overflow-x-auto">
          {CODE_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative px-4 py-2.5 text-[12px] font-medium whitespace-nowrap
                transition-all duration-150
                ${activeTab === tab.id
                  ? "text-[var(--foreground)] bg-[var(--surface-elevated)]"
                  : "text-[var(--muted)] hover:text-[var(--secondary)] hover:bg-[var(--surface-elevated)]"
                }
              `}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent)]" />
              )}
            </button>
          ))}
        </div>

        <div className="overflow-auto max-h-[500px] p-4 code-scroll">
          <pre className="!m-0 !p-0 !bg-transparent text-[12px] leading-relaxed !border-none">
            <code ref={codeRef} className="language-jsx">
              {activeTabData?.code}
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
}
