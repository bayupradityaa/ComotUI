import { ExternalLink } from "lucide-react";

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--foreground)] leading-[1.1]">
        Receipt Printer
      </h1>
      <p className="mt-6 text-base sm:text-lg text-[var(--secondary)] max-w-2xl mx-auto leading-relaxed">
        An animated receipt printer component for React.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-[var(--accent-contrast)] bg-[var(--accent)] rounded-lg
            hover:bg-[var(--accent-hover)] transition-colors duration-150"
        >
          View source
          <ExternalLink size={14} aria-hidden="true" />
        </a>
        <a
          href="#playground"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-[var(--foreground)] bg-[var(--surface-elevated)] rounded-lg border border-[var(--border)]
            hover:bg-[var(--surface)] hover:border-[var(--border-strong)] transition-all duration-150"
        >
          Try demo
        </a>
      </div>
    </section>
  );
}