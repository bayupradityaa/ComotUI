// Hero narrative scenes — the ComotUI homepage being written, file by file.
// Filenames mirror the real project structure; snippets are condensed but
// faithful to what each file actually renders.

const APP_TSX = `import { Hero } from "./components/Hero";
import { ComponentGrid } from "./components/ComponentGrid";

export default function App() {
  return (
    <main>
      <Hero />
      <ComponentGrid />
    </main>
  );
}`;

const HERO_TSX = `export function Hero() {
  return (
    <section>
      <Badge>
        Open Source React UI Collection
      </Badge>

      <h1>
        Comot the UI
        you need.
      </h1>

      <p>
        A growing collection of carefully
        crafted React components.
      </p>
    </section>
  );
}`;

const GRID_TSX = `export function ComponentGrid() {
  return (
    <section>
      <h2>Browse Components</h2>

      <ComponentCard />
      <ComponentCard />
      <ComponentCard />
    </section>
  );
}`;

const COMMUNITY_TSX = `export function Community() {
  return (
    <section>
      <h2>Have something worth sharing?</h2>

      <Button>
        Contribute a component
      </Button>
    </section>
  );
}`;

// statusText shown in the footer once a scene finishes typing.
const READY_TEXT = "Ready to comot"; // brand signature microcopy

/* Mini interface previews — one per scene, rendered next to the code once
 * that file finishes. Small by design; the code stays dominant. */

function AppPreview() {
  return (
    <div className="flex w-full flex-col gap-1">
      <div className="h-6 rounded-t-md border border-b-0 border-[var(--border-strong)] bg-[var(--surface-elevated)]" />
      <div className="rounded-md border border-[var(--border-strong)] bg-[var(--surface)] p-2">
        <div className="h-1.5 w-16 rounded-full bg-[var(--accent)]/70" />
        <div className="mt-1 h-2 w-24 rounded-full bg-[var(--foreground)]/60" />
        <div className="mt-0.5 h-2 w-20 rounded-full bg-[var(--foreground)]/25" />
      </div>
      <div className="grid grid-cols-3 gap-1">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-5 rounded-md border border-[var(--border-strong)] bg-[var(--surface)]" />
        ))}
      </div>
    </div>
  );
}

function HeroPreview() {
  return (
    <div className="flex w-full flex-col gap-1.5 px-1 py-1">
      <span className="w-fit rounded border border-[var(--border-strong)] px-1.5 py-px text-[7px] font-semibold tracking-wide text-[var(--muted)]">
        OPEN SOURCE REACT UI
      </span>
      <p className="text-[11px] font-extrabold leading-tight text-[var(--foreground)]">
        Comot the UI<br />you need.
      </p>
      <span className="inline-flex w-fit items-center rounded-md bg-[var(--foreground)] px-2 py-0.5 text-[8px] font-semibold text-[var(--background)]">
        Browse Components →
      </span>
    </div>
  );
}

function GridPreview() {
  return (
    <div className="grid w-full grid-cols-3 gap-1.5">
      {["Button", "Card", "Badge"].map((name) => (
        <div key={name} className="overflow-hidden rounded-md border border-[var(--border-strong)]">
          <div className="h-4 border-b border-[var(--border)] bg-[var(--surface-elevated)]" />
          <div className="bg-[var(--surface)] px-1 py-0.5">
            <p className="text-[7px] font-semibold text-[var(--secondary)]">{name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function CommunityPreview() {
  return (
    <div className="flex w-full flex-col items-center gap-1.5 px-2 py-1.5 text-center">
      <p className="text-[9px] font-bold leading-tight text-[var(--foreground)]">
        Have something worth sharing?
      </p>
      <span className="inline-flex items-center gap-1 rounded-md border border-[var(--border-strong)] px-2 py-0.5 text-[8px] font-medium text-[var(--secondary)]">
        ♥ Contribute
      </span>
    </div>
  );
}

export const codeScenes = [
  {
    filename: "App.tsx",
    language: "TSX",
    tech: ["React", "TypeScript", "Tailwind"],
    code: APP_TSX,
    Preview: AppPreview,
  },
  {
    filename: "Hero.tsx",
    language: "TSX",
    tech: ["React", "Tailwind"],
    code: HERO_TSX,
    Preview: HeroPreview,
  },
  {
    filename: "ComponentGrid.tsx",
    language: "TSX",
    tech: ["React", "Tailwind"],
    code: GRID_TSX,
    Preview: GridPreview,
  },
  {
    filename: "Community.tsx",
    language: "TSX",
    tech: ["React", "Tailwind"],
    code: COMMUNITY_TSX,
    Preview: CommunityPreview,
  },
];

export { READY_TEXT };
