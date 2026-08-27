import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import GithubIcon, { GITHUB_REPO } from "../lib/github";
import { BRAND } from "../lib/brand";
import HeroCodeEditor from "./HeroCodeEditor";

export default function Hero() {
  return (
    <section className="relative border-b border-[var(--border)]">
      {/* extremely subtle radial vignette behind the editor column */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_72%_38%,var(--accent-soft),transparent)]"
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-14 sm:px-6 lg:pb-20 lg:pt-[5.5rem]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[42fr_58fr] lg:gap-10">
          {/* LEFT — content */}
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              Open source React UI collection
            </span>

            <h1 className="mt-4 font-extrabold leading-[1.06] tracking-[-0.02em] text-[var(--foreground)] text-[clamp(2.5rem,7vw,3.75rem)]">
              Comot the UI
              <br />
              you need.
            </h1>

            <p className="mt-5 max-w-[520px] text-[15px] leading-relaxed text-[var(--secondary)]">
              A growing collection of carefully crafted React components you can
              explore, customize, and copy into your next project.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/components"
                className="group inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[var(--foreground)] px-5 text-sm font-semibold text-[var(--background)] transition-colors duration-150 hover:bg-[var(--accent-hover)]"
              >
                Browse Components
                <ArrowRight
                  size={15}
                  aria-hidden="true"
                  className="transition-transform duration-150 group-hover:translate-x-0.5"
                />
              </Link>
              <a
                href={GITHUB_REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[var(--border)] px-5 text-sm font-semibold text-[var(--foreground)] transition-colors duration-150 hover:border-[var(--border-strong)] hover:bg-[var(--surface-elevated)]"
              >
                <GithubIcon size={15} aria-hidden="true" />
                GitHub
              </a>
            </div>

            <ul className="mt-7 flex flex-col gap-1.5 text-[12px] text-[var(--muted)]">
              {["Free & open source", "React + Tailwind", "Copy any component"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span aria-hidden="true" className="text-[var(--success)]">✓</span>
                    {item}
                  </li>
                ),
              )}
            </ul>

            {/* Brand signature — the three-step workflow. Each word lifts
                gently on hover; reduced-motion users get a static read. */}
            <p className="mt-8 text-[13px] font-semibold tracking-[-0.01em] text-[var(--secondary)]">
              {BRAND.tagline.split(" ").map((word, i) => (
                <span key={i} className="group/tagline inline-block">
                  <span
                    className="inline-block transition-transform duration-150 ease-out motion-reduce:transition-none group-hover/tagline:-translate-y-px"
                  >
                    {word}
                  </span>
                  {i < BRAND.tagline.split(" ").length - 1 && (
                    <span aria-hidden="true" className="block">{" "}</span>
                  )}
                </span>
              ))}
            </p>
          </div>

          {/* RIGHT — code → interface build animation */}
          <div className="min-w-0">
            <HeroCodeEditor />
          </div>
        </div>
      </div>
    </section>
  );
}
