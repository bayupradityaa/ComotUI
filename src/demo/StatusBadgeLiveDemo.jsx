import { useAutoLoop } from "../hooks/useAutoLoop";
import StatusBadge from "../components/ui/StatusBadge";

// Auto-looping composition for the component detail live preview: the status
// row cycles through semantic states so the badge reads as "alive".
const ROW = [
  { label: "Live", tone: "success" },
  { label: "Building", tone: "warning" },
  { label: "Deploying", tone: "neutral" },
  { label: "Down", tone: "danger" },
];

const CYCLE = [
  { key: "live", hold: 1500 },
  { key: "building", hold: 1200 },
  { key: "deploying", hold: 1200 },
  { key: "down", hold: 1000 },
];

const TONE_FOR = {
  live: "success",
  building: "warning",
  deploying: "neutral",
  down: "danger",
};

export default function StatusBadgeLiveDemo({ className }) {
  const { state } = useAutoLoop(CYCLE);
  const active = TONE_FOR[state.key] ?? "success";

  return (
    <div className={className + " w-full"}>
      <div className="flex flex-col items-center gap-5">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {ROW.map((b) => (
            <StatusBadge
              key={b.label}
              tone={b.tone}
              label={b.label}
              dot={b.label !== "Paused"}
            />
          ))}
        </div>

        <div className="flex items-center justify-between gap-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-3.5">
          <div className="flex flex-col gap-1.5">
            <span className="flex items-center gap-2 text-sm font-semibold text-[var(--foreground)]">
              Status
              <span className="mono text-[10px] uppercase tracking-[0.1em] text-[var(--muted)]">
                0{ROW.findIndex((r) => r.tone === active) + 1}/4
              </span>
            </span>
            <span className="h-2 w-24 rounded-full bg-[var(--border)]" />
          </div>
          <StatusBadge tone={active} label={ROW.find((r) => r.tone === active).label} />
        </div>
      </div>
    </div>
  );
}
