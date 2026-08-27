import { useMemo } from "react";
import CopyButton from "../CopyButton";
import "./codeviewer.css";

// Minimal JSX/TSX tokenizer for display only. Good enough for source viewing
// without pulling a full highlighter into the bundle. Colors come from the
// --code-* tokens in index.css so they follow the theme.

const tokenPattern =
  /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("[^"]*"|'[^']*'|`[^`]*`)|\b(\d+(?:\.\d+)?)\b|\b(import|from|export|default|const|let|let|function|return|if|else|for|while|new|class|extends|async|await|type|interface|=>|of|in)\b|([A-Za-z_$][\w$]*)(?=\s*\()|\b([A-Za-z_$][\w$]*)\b/g;

function tokenize(code) {
  const tokens = [];
  let lastIndex = 0;
  let match;
  while ((match = tokenPattern.exec(code)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ text: code.slice(lastIndex, match.index), type: "plain" });
    }
    const [full, comment, str, num, kw, fn, ident] = match;
    if (comment) tokens.push({ text: full, type: "comment" });
    else if (str) tokens.push({ text: full, type: "string" });
    else if (num) tokens.push({ text: full, type: "number" });
    else if (kw) tokens.push({ text: full, type: "keyword" });
    else if (fn) tokens.push({ text: full, type: "function" });
    else if (ident) tokens.push({ text: full, type: "plain" });
    else tokens.push({ text: full, type: "plain" });
    lastIndex = match.index + full.length;
  }
  if (lastIndex < code.length) {
    tokens.push({ text: code.slice(lastIndex), type: "plain" });
  }
  return tokens;
}

export default function CodeViewer({
  code,
  language = "jsx",
  filename = "source.jsx",
  height = "460px",
}) {
  const lines = useMemo(() => {
    const raw = code.replace(/\n$/, "");
    return raw.split("\n").map((line) => tokenize(line));
  }, [code]);

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