import { ArrowRight } from "lucide-react";
import GithubIcon, { GITHUB_REPO } from "../lib/github";

export default function Hero({ children }) {
  return (
    <section className="border-b border-[var(--border)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-16 pb-12 lg:pt-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold tracking-[0.12em] text-[var(--muted)]">
            OPEN SOURCE REACT UI COLLECTION
          </span>

          <h1 className="mt-5 text-[2.6rem] font-extrabold leading-[1.08] tracking-[-0.02em] text-[var(--foreground)] sm:text-6xl lg:text-7xl">
            Comot the UI<br className="hidden sm:block" /> you need.
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--secondary)] sm:text-base">
            A growing collection of carefully crafted React components you can
            explore, customize, and copy into your next project.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#components"
              className="group inline-flex h-10 items-center gap-2 rounded-lg bg-[var(--foreground)] px-5 text-sm font-semibold text-[var(--background)] transition-colors duration-150 hover:bg-[var(--accent-hover)]"
            >
              Browse Components
              <ArrowRight size={15} className="transition-transform duration-150 group-hover:translate-x-0.5" />
            </a>
            <a
              href={GITHUB_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-[var(--border)] px-5 text-sm font-semibold text-[var(--foreground)] transition-all duration-150 hover:border-[var(--border-strong)] hover:bg-[var(--surface-elevated)]"
            >
              <GithubIcon size={15} />
              View on GitHub
            </a>
          </div>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[12px] text-[var(--muted)]">
            <span>✓ Free &amp; open source</span>
            <span aria-hidden="true" className="text-[var(--border-strong)]">·</span>
            <span>✓ React + Tailwind</span>
            <span aria-hidden="true" className="text-[var(--border-strong)]">·</span>
            <span>✓ Copy any component</span>
          </div>
        </div>
      </div>

      {children}
    </section>
  );
}