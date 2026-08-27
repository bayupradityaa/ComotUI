import { cn } from "../lib/utils";

export default function Logo({ size = 20, className }) {
  return (
    <img
      src="/comotui-logo.png"
      alt=""
      className={cn(
        "shrink-0 rounded-[0.35rem] object-contain",
        className,
      )}
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  );
}