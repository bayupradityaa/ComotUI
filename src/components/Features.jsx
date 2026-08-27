import { MoveRight, Scissors, Zap, Accessibility } from "lucide-react";

const features = [
  {
    number: "01",
    title: "Stepped feed",
    description: "Simulates realistic paper movement with micro-pauses.",
    icon: MoveRight,
  },
  {
    number: "02",
    title: "Tear effect",
    description: "Creates a thermal-paper zig-zag edge when tearing.",
    icon: Scissors,
  },
  {
    number: "03",
    title: "Cutter animation",
    description: "Subtle blade flash transition after printing completes.",
    icon: Zap,
  },
  {
    number: "04",
    title: "Reduced motion",
    description: "Respects prefers-reduced-motion for accessibility.",
    icon: Accessibility,
  },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20 border-y border-[var(--border)]">
      <div className="mb-12 lg:mb-16">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--foreground)]">
          Features
        </h2>
        <p className="mt-2 text-[var(--secondary)] max-w-xl">
          Built for realistic thermal printer simulation with attention to detail.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <article key={feature.title} className="flex flex-col gap-3">
              <div className="flex items-baseline gap-2">
                <span className="text-[var(--muted)] font-mono text-sm shrink-0">{feature.number}</span>
                <Icon size={16} className="text-[var(--muted)] shrink-0" aria-hidden="true" />
                <h3 className="text-base font-medium text-[var(--foreground)]">{feature.title}</h3>
              </div>
              <p className="text-sm text-[var(--secondary)] leading-relaxed ml-6">
                {feature.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}