import { useState, Suspense } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getComponent, getAdjacent } from "../lib/registry";
import CodeViewer from "../components/code/CodeViewer";
import CopyButton from "../components/CopyButton";
import LiveReceiptDemo from "../components/LiveReceiptDemo";
import StatusBadgeLiveDemo from "../demo/StatusBadgeLiveDemo";
import { cn } from "../lib/utils";

function MetaBadge({ children }) {
  return (
    <span className="rounded border border-[var(--border)] bg-[var(--surface-elevated)] px-2 py-0.5 text-[11px] font-medium text-[var(--secondary)]">
      {children}
    </span>
  );
}

// React / TypeScript source switcher. Both variants are pre-authored in the
// registry (source / sourceTs), so the viewer and the copy button always agree.
function SourceToggle({ variant, onChange }) {
  return (
    <div
      role="group"
      aria-label="Source language"
      className="inline-flex rounded-lg border border-[var(--border)] bg-[var(--surface)] p-0.5"
    >
      {["jsx", "tsx"].map((v) => (
        <button
          key={v}
          type="button"
          aria-pressed={variant === v}
          onClick={() => onChange(v)}
          className={cn(
            "rounded-md px-3 py-1 text-[12px] font-medium transition-colors duration-150",
            variant === v
              ? "bg-[var(--surface-elevated)] text-[var(--foreground)] shadow-[var(--shadow-1)]"
              : "text-[var(--secondary)] hover:text-[var(--foreground)]",
          )}
        >
          {v === "jsx" ? "React" : "TypeScript"}
        </button>
      ))}
    </div>
  );
}

function NextPrev({ prev, next }) {
  return (
    <div className="mt-12 grid gap-3 border-t border-[var(--border)] pt-6 sm:grid-cols-2">
      {prev ? (
        <Link
          to={`/components/${prev.slug}`}
          className="group flex items-start gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 transition-all duration-150 hover:border-[var(--border-strong)]"
        >
          <ChevronLeft size={16} className="mt-0.5 shrink-0 text-[var(--muted)] group-hover:text-[var(--foreground)]" />
          <div>
            <p className="text-[11px] text-[var(--muted)]">Previous</p>
            <p className="text-sm font-medium text-[var(--foreground)]">{prev.name}</p>
          </div>
        </Link>
      ) : <div />}
      {next ? (
        <Link
          to={`/components/${next.slug}`}
          className="group flex items-start justify-end gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-right transition-all duration-150 hover:border-[var(--border-strong)]"
        >
          <div>
            <p className="text-[11px] text-[var(--muted)]">Next</p>
            <p className="text-sm font-medium text-[var(--foreground)]">{next.name}</p>
          </div>
          <ChevronRight size={16} className="mt-0.5 shrink-0 text-[var(--muted)] group-hover:text-[var(--foreground)]" />
        </Link>
      ) : <div />}
    </div>
  );
}

export default function ComponentDetail() {
  const { slug } = useParams();
  const component = getComponent(slug);
  const [variant, setVariant] = useState("jsx");

  if (!component) {
    return <Navigate to="/components" replace />;
  }

  const { prev, next } = getAdjacent(slug);
  const NoDeps = component.installation === "";

  const isTs = variant === "tsx";
  const code =
    component.sourceTs && isTs ? component.sourceTs : component.source;
  const fileName =
    component.fileNameTs && isTs
      ? component.fileNameTs
      : component.fileName || `${component.slug}.jsx`;
  const language = isTs ? "tsx" : component.language || "jsx";
  const usageCode = component.usageTs && isTs ? component.usageTs : component.usage;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 lg:py-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-1.5 text-[13px] text-[var(--muted)]">
        <Link to="/components" className="transition-colors hover:text-[var(--foreground)]">
          Components
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-[var(--secondary)]">{component.category}</span>
        <span aria-hidden="true">/</span>
        <span className="text-[var(--foreground)]">{component.name}</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl">
          {component.name}
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] text-[var(--secondary)]">
          {component.description}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <MetaBadge>{component.framework}</MetaBadge>
          <MetaBadge>{component.styling}</MetaBadge>
          {component.category && <MetaBadge>{component.category}</MetaBadge>}
        </div>
      </header>

      {/* Live preview + full source, side by side on desktop */}
      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        {/* Preview pane */}
        <div className="relative flex flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]">
          <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-2">
            <span className="flex items-center gap-2 text-[11px] font-medium text-[var(--secondary)]">
              <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Live preview
            </span>
            <span className="mono text-[10px] uppercase tracking-[0.08em] text-[var(--muted)]">
              {component.language || "jsx"}
            </span>
          </div>
          <div
            className="relative flex min-h-[320px] items-center justify-center overflow-hidden bg-[var(--background)] px-4 py-8 sm:px-6"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 46%, var(--accent-soft) 0%, transparent 62%)",
            }}
          >
            {component.slug === "receipt-printer" ? (
              <Suspense fallback={<div className="h-80" />}>
                <LiveReceiptDemo className="w-full max-w-md" />
              </Suspense>
            ) : (
              <Suspense fallback={<div className="h-40" />}>
                <StatusBadgeLiveDemo className="w-full max-w-md" />
              </Suspense>
            )}
          </div>
        </div>

        {/* Source pane */}
        <div className="min-w-0">
          <div className="mb-3">
            <SourceToggle variant={variant} onChange={setVariant} />
          </div>
          <CodeViewer code={code} filename={fileName} language={language} />
        </div>
      </div>

      {/* Installation */}
      <section className="mt-12">
        <h2 className="text-lg font-bold tracking-tight text-[var(--foreground)]">Installation</h2>
        {NoDeps ? (
          <p className="mt-2 text-[13px] text-[var(--secondary)]">
            No additional dependencies required.
          </p>
        ) : (
          <div className="mt-3 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--code-bg)]">
            <div className="flex items-center justify-between border-b border-[var(--border)] px-3 py-2">
              <span className="text-[11px] font-medium text-[var(--secondary)]">Install</span>
              <CopyButton
                value={component.installation}
                label="Copy"
                copiedLabel="Copied"
                variant="subtle"
              />
            </div>
            <pre className="mono overflow-x-auto p-3 text-[13px] leading-relaxed text-[var(--code-fg)]">
              <code className="ct-keyword">npm install</code>{" "}
              <span className="text-[var(--code-string)]">
                {component.installation.replace("npm install ", "")}
              </span>
            </pre>
          </div>
        )}
      </section>

      {/* Usage */}
      <section className="mt-12">
        <h2 className="text-lg font-bold tracking-tight text-[var(--foreground)]">Usage</h2>
        <div className="mt-3">
          <CodeViewer
            code={usageCode}
            filename={isTs ? "usage.tsx" : "usage.jsx"}
            language={isTs ? "tsx" : "jsx"}
          />
        </div>
      </section>

      <NextPrev prev={prev} next={next} />
    </div>
  );
}