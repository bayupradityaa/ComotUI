import { useEffect, useMemo, useState } from "react";
import { Check } from "lucide-react";
import { tokenizeLines } from "../lib/highlight";
import { codeScenes, READY_TEXT } from "../lib/codeScenes";

/* Timeline (ms) — typed per line, char-by-char, then scene closes out:
 * type → hold → preview fades in + footer goes "✓ Ready to comot"
 * → reset → next file. Longer files naturally take longer. */
const CHAR_MS = 42; // within the 35–70ms band
const LINE_BREAK_MS = 110; // beat between logical lines
const STANZA_PAUSE_MS = 420; // longer pause after import/export blocks
const HOLD_AFTER_TYPE_MS = 900;
const SCENE_GAP_MS = 500;

function stanzaPauseFor(prevLine = "", nextLine = "") {
  const boundary =
    /^(export|import)/.test(nextLine.trim()) || /^<\/?[A-Za-z]/.test(nextLine.trim());
  return prevLine.trim() === "" || boundary ? STANZA_PAUSE_MS : LINE_BREAK_MS;
}

// Typing timeline builder: returns flat [{type:'char'|'line'|'scene', ...}] steps
// so the single effect below just walks a cursor through an array. No timers are
// created per character — one advancing timeout at a time.
function buildTimeline(scene) {
  const lines = scene.code.split("\n");
  const steps = [];
  lines.forEach((line, li) => {
    for (let c = 1; c <= line.length; c++) {
      steps.push({ kind: "char", line: li, chars: c });
    }
    steps.push({
      kind: "line",
      line: li,
      pauseAfter: stanzaPauseFor(lines[li - 1], lines[li]),
    });
  });
  return { steps, totalLines: lines.length };
}

export default function HeroCodeEditor({ scenes = codeScenes }) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  const scene = scenes[sceneIndex];
  const { steps } = useMemo(() => buildTimeline(scene), [scene]);

  // A scene is "complete" once the cursor has walked past its last step.
  const sceneComplete = stepIndex >= steps.length;

  // Walk one step at a time with a single active timeout.
  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    if (sceneComplete) {
      // typed → hold (ready state shows) → advance to the next file
      const t = window.setTimeout(() => {
        setStepIndex(0);
        setSceneIndex((i) => (i + 1) % scenes.length);
      }, HOLD_AFTER_TYPE_MS + SCENE_GAP_MS);
      return () => window.clearTimeout(t);
    }

    const step = steps[stepIndex];
    const delay = step.kind === "char" ? CHAR_MS : step.pauseAfter ?? 0;
    const t = window.setTimeout(() => setStepIndex((i) => i + 1), delay);
    return () => window.clearTimeout(t);
  }, [stepIndex, steps, sceneComplete, prefersReducedMotion, scenes.length]);

  // Jump to the finished state when the visitor prefers reduced motion.
  useEffect(() => {
    if (prefersReducedMotion && !sceneComplete) setStepIndex(steps.length);
  }, [prefersReducedMotion]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Visible slice of the code */
  const visibleLines = useMemo(() => {
    const all = scene.code.split("\n");
    if (prefersReducedMotion || sceneComplete) return all;
    const cur = steps[stepIndex];
    const out = all.slice(0, cur.line + 1);
    if (cur.kind === "char") out[cur.line] = all[cur.line].slice(0, cur.chars);
    return out;
  }, [stepIndex, steps, scene, sceneComplete, prefersReducedMotion]);

  const ready = sceneComplete || prefersReducedMotion;

  const syntax = useMemo(() => tokenizeLines(visibleLines.join("\n")), [visibleLines]);

  const statusText = ready ? READY_TEXT : "Compiling…";

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-2)]">
      {/* Title bar */}
      <div className="flex items-center gap-3 border-b border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-2.5">
        <div aria-hidden="true" className="flex shrink-0 items-center gap-1.5">
          {[0, 1, 2].map((d) => (
            <span key={d} className="size-2 rounded-full bg-[var(--border-strong)]" />
          ))}
        </div>
        <span className="mono min-w-0 flex-1 truncate text-xs text-[var(--secondary)]">
          {scene.filename}
        </span>
        <span className="mono shrink-0 text-[10px] font-medium tracking-wide text-[var(--muted)]">
          {scene.language}
        </span>
      </div>

      {/* Code + mini interface preview */}
      <div className="relative min-h-[300px] px-4 py-4 sm:px-5 md:min-h-[340px]">
        <pre className="mono text-[12px] leading-[1.75] text-[var(--code-fg)] md:text-[12.5px]">
          <code>
            {syntax.map((tokens, i) => (
              <div key={`${sceneIndex}-${i}`} className="flex">
                <span
                  aria-hidden="true"
                  className="w-6 shrink-0 select-none pr-3 text-right text-[var(--code-muted)] opacity-50 tabular-nums"
                >
                  {i + 1}
                </span>
                <span className="whitespace-pre-wrap break-all sm:whitespace-pre sm:break-normal">
                  {tokens.map((tk, j) => (
                    <span key={j} className={`ct-${tk.type}`}>{tk.text}</span>
                  ))}
                  {/* blinking caret on the line currently being typed */}
                  {!ready && i === visibleLines.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="ml-px inline-block h-[1em] w-[2px] translate-y-[3px] animate-[caret_1s_steps(2)_infinite] bg-[var(--accent)]"
                    />
                  )}
                </span>
              </div>
            ))}
          </code>
        </pre>

        {/* CODE → INTERFACE moment */}
        <div
          aria-hidden={true}
          className={`absolute bottom-3 right-3 w-36 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-elevated)] p-2 shadow-[var(--shadow-1)] transition-all duration-500 sm:w-44 ${
            ready ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <p className="mb-1.5 px-0.5 text-[8px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
            ComotUI
          </p>
          <scene.Preview />
        </div>
      </div>

      {/* Footer / build status */}
      <footer
        aria-live="polite"
        className="flex items-center justify-between border-t border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-2.5"
      >
        <span
          className={`flex items-center gap-1.5 text-[11px] font-medium transition-colors duration-300 ${
            ready ? "text-[var(--success)]" : "text-[var(--muted)]"
          }`}
        >
          <Check size={12} aria-hidden="true" />
          {statusText}
        </span>
        <span className="mono shrink-0 text-[10px] tabular-nums text-[var(--muted)]">
          {scene.tech.join(" · ")}
        </span>
      </footer>
    </div>
  );
}

