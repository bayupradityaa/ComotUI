import { Scissors } from "lucide-react";
import { cn } from "../lib/utils";

// Tear-tape divider — ComotUI's structural signature. A receipt-style dashed
// rule with a scissors notch where you'd tear the tape. Used to separate
// sections the way receipt paper separates: dashed, deliberate, and thematic
// ("comot" = grab/tear).
export default function TearDivider({ className }) {
  return (
    <div
      role="separator"
      aria-hidden="true"
      className={cn("relative flex items-center", className)}
    >
      {/* the tear line: receipt-paper dashes */}
      <span
        className="h-px w-full"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border-strong) 55%, transparent 45%)",
          backgroundSize: "10px 1px",
          backgroundRepeat: "repeat-x",
        }}
      />
      {/* scissors parked at the tear point, quiet until hover */}
      <Scissors
        size={12}
        className="absolute -left-0.5 bg-[var(--background)] pr-1 text-[var(--muted)] opacity-60 transition-opacity duration-200 group-hover/tear:opacity-100"
      />
    </div>
  );
}
