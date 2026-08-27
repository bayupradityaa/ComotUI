import { Suspense, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { getComponent, getAdjacent } from "../lib/registry";
import CodeViewer from "../components/code/CodeViewer";
import CopyButton from "../components/CopyButton";
import GithubIcon from "../lib/github";
import { cn } from "../lib/utils";

/** Small quiet chip for framework / styling / category metadata. */
function Tag({ children }) {
  return (
    <span className="inline-flex items-center rounded-md border border-[var(--border)] bg-[var(--surface-elevated)] px-2 py-0.5 text-[11px] font-medium text-[var(--secondary)]">
      {children}
    </span>
  );
}

/**
 * React / TypeScript source switcher. Rendered only when the component defines
 * a TypeScript variant; every value comes from registry metadata, so the page
 * stays generic.
 */
function SourceToggle({ hasTs, variant, onChange }) {
  if (!hasTs) return null;
  return (
    <div
      role="group"
      aria-label="Source language"
      className="inline-flex rounded-lg border border-[var(--border)] bg-[var(--surface)] p-0.5"
    >
      {[
        { v: "jsx", label: "React" },
        { v: "tsx", label: "TypeScript" },
      ].map(({ v, label }) => (
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
          {label}
        </button>
      ))}
    </div>
  );
}

/** Live preview pane — the component rendering itself, centered on a subtle stage. */
function PreviewPane({ component }) {
  const Preview = component.previewLive ?? component.component;
  const language = component.language || "jsx";

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]">
      <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-2">
        <span className="flex items-center gap-2 text-[11px] font-medium text-[var(--secondary)]">
          <span
            aria-hidden="true"
            className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--success)]"
          />
          Live preview
        </span>
        <span className="mono text-[10px] uppercase tracking-[0.08em] text-[var(--muted)]">
          {language}
        </span>
      </div>

      <div
        className="relative flex min-h-[320px] items-center justify-center overflow-hidden bg-[var(--background)] px-4 py-10 sm:px-6"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 45%, var(--accent-soft) 0%, transparent 62%)",
        }}
      >
        <Suspense fallback={<div className="h-52" />}>
          <Preview className="flex w-full justify-center" />
        </Suspense>
      </div>
    </div>
  );
}

/** Previous / Next navigation, generated from registry order. */
function NextPrev({ prev, next }) {
  return (
    <div className="mt-14 grid gap-3 border-t border-[var(--border)] pt-6 sm:grid-cols-2">
      {prev ? (
        <Link
          to={`/components/${prev.slug}`}
          className="group flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3.5 transition-colors duration-150 hover:border-[var(--border-strong)]"
        >
          <ChevronLeft
            size={17}
            className="mt-1 shrink-0 text-[var(--muted)] transition-colors group-hover:text-[var(--foreground)]"
          />
          <div>
            <p className="text-[11px] font-medium text-[var(--muted)]">Previous</p>
            <p className="mt-0.5 text-sm font-semibold text-[var(--foreground)]">{prev.name}</p>
            <p className="mt-0.5 text-[11px] text-[var(--muted)]">{prev.category}</p>
          </div>
        </Link>
      ) : (
        <div aria-hidden="true" />
      )}

      {next ? (
        <Link
          to={`/components/${next.slug}`}
          className="group flex items-start justify-end gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3.5 text-right transition-colors duration-150 hover:border-[var(--border-strong)]"
        >
          <div>
            <p className="text-[11px] font-medium text-[var(--muted)]">Next</p>
            <p className="mt-0.5 text-sm font-semibold text-[var(--foreground)]">{next.name}</p>
            <p className="mt-0.5 text-[11px] text-[var(--muted)]">{next.category}</p>
          </div>
          <ChevronRight
            size={17}
            className="mt-1 shrink-0 text-[var(--muted)] transition-colors group-hover:text-[var(--foreground)]"
          />
        </Link>
      ) : (
        <div aria-hidden="true" />
      )}
    </div>
  );
}

export default function ComponentDetail() {
  const { slug } = useParams();
  const component = getComponent(slug);
  const [variant, setVariant] = useState("jsx");

  if (!component) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
          Component not found
        </h1>
        <p className="mt-3 text-sm text-[var(--secondary)]">
          The component you're looking for doesn't exist or may have been moved.
        </p>
        <Link
          to="/components"
          className="mt-8 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[var(--foreground)] px-5 text-sm font-semibold text-[var(--background)] transition-colors duration-150 hover:bg-[var(--accent-hover)]"
        >
          Browse components
        </Link>
      </section>
    );
  }

  const { prev, next } = getAdjacent(slug);
  const NoDeps = !component.installation;

  const hasTs = Boolean(component.sourceTs);
  const isTs = variant === "tsx" && hasTs;
  const language = isTs ? "tsx" : component.language || "jsx";
  const code = isTs ? component.sourceTs : component.source;
  const fileName = isTs
    ? component.fileNameTs
    : component.fileName || `${component.slug}.jsx`;
  const usage = isTs ? component.usageTs : component.usage;

  return (
    <div className="mx-auto max-w-[880px] px-4 pb-20 pt-8 sm:px-6 lg:pt-12">
      {/* Breadcrumb — current page is text, not a link */}
      <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5 text-[12px] text-[var(--muted)]">
        <Link
          to="/components"
          className="shrink-0 transition-colors hover:text-[var(--foreground)]"
        >
          Components
        </Link>
        <span aria-hidden="true" className="shrink-0 text-[var(--border-strong)]">/</span>
        <span className="shrink-0 text-[var(--secondary)]">{component.category}</span>
        <span aria-hidden="true" className="shrink-0 text-[var(--border-strong)]">/</span>
        <span className="truncate font-medium text-[var(--foreground)]">{component.name}</span>
      </nav>

      {/* Header */}
      <header className="mt-6">
        <h1 className="text-3xl font-extrabold tracking-[-0.01em] text-[var(--foreground)] sm:text-4xl">
          {component.name}
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[var(--secondary)]">
          {component.description}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Tag>{component.framework}</Tag>
          <Tag>{component.styling}</Tag>
          {component.category && <Tag>{component.category}</Tag>}
        </div>
      </header>

      {/* Live preview */}
      <div className="mt-8">
        <PreviewPane component={component} />
      </div>

      {/* Primary actions */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <CopyButton
          value={code}
          label="Copy component"
          copiedLabel="Component copied"
          title="Copy full component source"
          variant="primary"
          className="w-full justify-center sm:w-auto"
        />
        {component.githubUrl && (
          <a
            href={component.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-5 text-sm font-semibold text-[var(--foreground)] transition-colors duration-150 hover:border-[var(--border-strong)] hover:bg-[var(--surface-elevated)]"
          >
            <GithubIcon size={15} />
            View source on GitHub
            <ArrowUpRight size={14} className="text-[var(--muted)]" />
          </a>
        )}
      </div>

      {/* Installation */}
      <section className="mt-12">
        <div className="mb-3">
          <h2 className="text-lg font-bold tracking-tight text-[var(--foreground)]">
            Installation
          </h2>
          {NoDeps && (
            <p className="mt-1 text-[13px] text-[var(--secondary)]">
              No additional dependencies required.
            </p>
          )}
        </div>

        {!NoDeps && (
          <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--code-bg)]">
            <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-2">
              <span className="mono text-[11px] text-[var(--secondary)]">Install</span>
              <CopyButton
                value={component.installation}
                label="Copy"
                copiedLabel="Copied"
                variant="subtle"
              />
            </div>
            <pre className="mono overflow-x-auto whitespace-pre px-4 py-3 text-[13px] leading-relaxed text-[var(--code-fg)]">
              <code>
                <span className="ct-keyword">npm install</span>{" "}
                <span className="text-[var(--code-string)]">
                  {component.installation.replace("npm install ", "")}
                </span>
              </code>
            </pre>
          </div>
        )}
      </section>

      {/* Source code */}
      <section className="mt-12">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-[var(--foreground)]">
              Source Code
            </h2>
            <p className="mt-1 text-[13px] text-[var(--secondary)]">
              Copy the component and customize it for your project.
            </p>
          </div>
          <SourceToggle hasTs={hasTs} variant={variant} onChange={setVariant} />
        </div>
        <CodeViewer
          code={code}
          filename={fileName}
          language={language}
          minHeight="260px"
          maxHeight="620px"
        />
      </section>

      {/* Usage */}
      <section className="mt-12">
        <div className="mb-3">
          <h2 className="text-lg font-bold tracking-tight text-[var(--foreground)]">
            Usage
          </h2>
          <p className="mt-1 text-[13px] text-[var(--secondary)]">
            Import the component and use it in your project.
          </p>
        </div>
        <CodeViewer
          code={usage}
          filename={`usage.${language}`}
          language={language}
          minHeight="160px"
          maxHeight="480px"
        />
      </section>

      <NextPrev prev={prev} next={next} />
    </div>
  );
}