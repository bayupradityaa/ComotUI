import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "./Logo";
import SearchCommand from "./SearchCommand";
import ThemeToggle from "./ThemeToggle";
import GithubIcon, { GITHUB_PROFILE, GITHUB_REPO } from "../lib/github";
import { useLenis } from "../lib/lenis";
import { cn } from "../lib/utils";

const NAV_LINKS = [
  { label: "Components", to: "/components" },
  { label: "Blocks", to: "/components" },
  { label: "Examples", to: "/components" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const lenis = useLenis();

  const scrollToComponents = () => {
    const target = document.getElementById("components");
    if (!target) return;
    if (lenis) {
      lenis.scrollTo(target, { offset: -64, duration: 1.1 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navClass = ({ isActive }) =>
    cn(
      "rounded-md px-2.5 py-1.5 text-[13px] font-medium transition-colors duration-150 hover:bg-[var(--accent-soft)] hover:text-[var(--foreground)]",
      isActive ? "text-[var(--foreground)]" : "text-[var(--secondary)]",
    );

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--header-bg)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <Link to="/" aria-label="ComotUI home" className="flex items-center gap-2.5">
          <Logo size={20} />
          <span className="text-[15px] font-bold tracking-tight text-[var(--foreground)]">
            ComotUI
          </span>
        </Link>

        <nav className="ml-6 hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.label} to={link.to} className={navClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden sm:block">
            <SearchCommand onChange={scrollToComponents} />
          </div>
          <div className="sm:hidden">
            <SearchCommand variant="icon" onChange={scrollToComponents} />
          </div>

          <a
            href={GITHUB_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="ComotUI on GitHub"
            title="GitHub"
            className="hidden sm:grid size-8 place-items-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--secondary)] transition-colors duration-150 hover:border-[var(--border-strong)] hover:text-[var(--foreground)]"
          >
            <GithubIcon size={15} />
          </a>

          <ThemeToggle
            onChange={(resolved) => {
              try {
                window.dispatchEvent(new CustomEvent("themechange", { detail: { resolved } }));
              } catch {
                /* no-op */
              }
            }}
          />

          {/* Mobile nav toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            className="grid size-8 place-items-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--secondary)] md:hidden"
          >
            <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              <path d="M2 4.5h12M2 8h12M2 11.5h12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="border-t border-[var(--border)] bg-[var(--surface)] px-4 py-2 md:hidden" aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="block rounded-md px-2 py-2 text-[13px] font-medium text-[var(--secondary)] hover:bg-[var(--accent-soft)] hover:text-[var(--foreground)]"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={GITHUB_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-md px-2 py-2 text-[13px] font-medium text-[var(--secondary)] hover:text-[var(--foreground)]"
          >
            <GithubIcon size={14} />
            GitHub
          </a>
        </nav>
      )}
    </header>
  );
}