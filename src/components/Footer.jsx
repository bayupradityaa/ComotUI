import { Link } from "react-router-dom";
import Logo from "./Logo";
import GithubIcon, { GITHUB_REPO, GITHUB_PROFILE } from "../lib/github";
import { BRAND } from "../lib/brand";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <Logo size={18} />
              <span className="text-sm font-bold tracking-tight text-[var(--foreground)]">
                ComotUI
              </span>
            </Link>
            <p className="mt-2 text-[13px] text-[var(--secondary)]">
              {BRAND.tagline}
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] font-medium text-[var(--secondary)]" aria-label="Footer">
            <Link to="/components" className="transition-colors duration-150 hover:text-[var(--foreground)]">
              Components
            </Link>
            <a
              href={GITHUB_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 transition-colors duration-150 hover:text-[var(--foreground)]"
            >
              <GithubIcon size={14} />
              GitHub
            </a>
            <span className="cursor-default">About</span>
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-[var(--border)] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-[var(--muted)]">
            © 2026 ComotUI
          </p>
          <p className="text-[12px] text-[var(--muted)]">
            Open source components for the React community.
          </p>
        </div>
        <div className="mt-3 flex flex-col gap-1 text-[11px] text-[var(--muted)]">
          <p>
            Built for developers who don't want to build everything from scratch.
          </p>
          <p>
            Built by{" "}
            <a
              href={GITHUB_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--secondary)] transition-colors duration-150 hover:text-[var(--foreground)] hover:underline"
            >
              Bayu Praditya
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}