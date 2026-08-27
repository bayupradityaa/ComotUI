import GithubIcon, { GITHUB_REPO } from "../lib/github";

export default function CTASection() {
  return (
    <section className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 text-center">
        <h2 className="mx-auto max-w-xl text-xl font-bold tracking-tight text-[var(--foreground)] sm:text-2xl">
          Have something worth sharing?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-[var(--secondary)]">
          Every component here belongs to the community. Open a PR with your
          best component and drop it into the registry.
        </p>
        <a
          href={`${GITHUB_REPO}/issues`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-5 py-2.5 text-sm font-semibold text-[var(--foreground)] transition-all duration-150 hover:border-[var(--border-strong)] hover:bg-[var(--surface-elevated)]"
        >
          <GithubIcon size={15} />
          Contribute a component
        </a>
      </div>
    </section>
  );
}