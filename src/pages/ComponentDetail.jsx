import { useState, Suspense } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getComponent, getAdjacent } from "../lib/registry";
import CodeViewer from "../components/code/CodeViewer";
import CopyButton from "../components/CopyButton";
import LiveReceiptDemo from "../components/LiveReceiptDemo";
import { cn } from "../lib/utils";

function MetaBadge({ children }) {
  return (
    <span className="rounded border border-[var(--border)] bg-[var(--surface-elevated)] px-2 py-0.5 text-[11px] font-medium text-[var(--secondary)]">
      {children}
    </span>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 className="text-lg font-bold tracking-tight text-[var(--foreground)]">
      {children}
    </h2>
  );
}

function Tabs({ active, onChange }) {
  return (
    <div
      role="tablist"
      aria-label="Preview and code"
      className="inline-flex rounded-lg border border-[var(--border)] bg-[var(--surface)] p-0.5"
    >
      {[
        { id: "preview", label: "Preview" },
        { id: "code", label: "Code" },
      ].map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={active === tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "rounded-md px-4 py-1.5 text-[13px] font-medium transition-colors duration-150",
            active === tab.id
              ? "bg-[var(--surface-elevated)] text-[var(--foreground)] shadow-[var(--shadow-1)]"
              : "text-[var(--secondary)] hover:text-[var(--foreground)]",
          )}
        >
          {tab.label}
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

function CodeBlock({ code, filename, language }) {
  return <CodeViewer code={code} filename={filename} language={language} />;
}

export default function ComponentDetail() {
  const { slug } = useParams();
  const component = getComponent(slug);
  const [tab, setTab] = useState("preview");

  if (!component) {
    return <Navigate to="/components" replace />;
  }

  const { prev, next } = getAdjacent(slug);
  const NoDeps = component.installation === "";

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 lg:py-12">
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
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl">
          {component.name}
        </h1>
        <p className="mt-3 max-w-xl text-[15px] text-[var(--secondary)]">
          {component.description}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <MetaBadge>{component.framework}</MetaBadge>
          <MetaBadge>{component.styling}</MetaBadge>
          {component.category && <MetaBadge>{component.category}</MetaBadge>}
        </div>
      </header>

      {/* Tabs */}
      <div className="mb-4 flex items-center justify-between">
        <Tabs active={tab} onChange={setTab} />
        {tab === "code" && (
          <CopyButton
            value={component.source}
            label="Copy Code"
            copiedLabel="Copied"
            variant="solid"
          />
        )}
      </div>

      {/* Preview pane */}
      {tab === "preview" ? (
        <div className="relative flex items-center justify-center overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-8 sm:px-6">
          {component.slug === "receipt-printer" ? (
            <Suspense fallback={<div className="h-80" />}>
              <LiveReceiptDemo className="w-full max-w-md" />
            </Suspense>
          ) : (
            <Suspense fallback={<div className="h-40" />}>
              <component.component className="w-full" />
            </Suspense>
          )}
        </div>
      ) : (
        <CodeBlock
          code={component.source}
          filename={component.fileName || `${component.slug}.jsx`}
          language={component.language || "jsx"}
        />
      )}

      {/* Installation */}
      <section className="mt-10">
        <SectionTitle>Installation</SectionTitle>
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
      <section className="mt-10">
        <SectionTitle>Usage</SectionTitle>
        <div className="mt-3">
          <CodeBlock
            code={component.usage}
            filename={`usage.jsx`}
            language="jsx"
          />
        </div>
      </section>

      <NextPrev prev={prev} next={next} />
    </div>
  );
}