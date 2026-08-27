import { useMemo } from "react";
import CopyButton from "../CopyButton";
import { tokenizeLines } from "../../lib/highlight";
import "./codeviewer.css";

export default function CodeViewer({
  code,
  language = "jsx",
  filename = "source.jsx",
  height = "460px",
}) {
  const lines = useMemo(() => tokenizeLines(code), [code]);

  const languageLabel = language === "tsx" ? "TSX" : language === "jsx" ? "JSX" : language.toUpperCase();

  return (
    <div
      className="overflow-hidden rounded-xl border border-[var(--border)]"
      style={{ maxHeight: height }}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-[var(--secondary)]">
            {filename}
          </span>
          <span className="rounded border border-[var(--border)] bg-[var(--surface)] px-1.5 py-px text-[10px] font-medium text-[var(--muted)]">
            {languageLabel}
          </span>
        </div>
        <CopyButton value={code} label="Copy" copiedLabel="Copied" variant="subtle" />
      </div>

      {/* Code body */}
      <div className="code-scroll overflow-auto bg-[var(--code-bg)] custom-scrollbar">
        <pre className="px-0 py-3 text-[13px] leading-[1.7] font-mono text-[var(--code-fg)]">
          <code>
            <table className="border-collapse">
              <tbody>
                {lines.map((tokens, i) => (
                  <tr key={i} className="align-top">
                    <td
                      aria-hidden="true"
                      className="select-none pr-4 pl-3 text-right text-[var(--code-muted)]"
                    >
                      {i + 1}
                    </td>
                    <td className="pr-4 whitespace-pre">
                      {tokens.map((tk, j) => (
                        <span key={j} className={`ct-${tk.type}`}>{tk.text}</span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </code>
        </pre>
      </div>
    </div>
  );
}