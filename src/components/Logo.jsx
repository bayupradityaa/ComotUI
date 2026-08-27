export default function Logo({ size = 20 }) {
  return (
    <span
      aria-hidden="true"
      className="grid shrink-0 place-items-center rounded-[0.5rem] border border-[var(--border-strong)] bg-[var(--accent)] font-sans font-extrabold leading-none text-[var(--accent-contrast)] shadow-[var(--shadow-1)]"
      style={{ width: size, height: size, fontSize: size * 0.52 }}
    >
      C
    </span>
  );
}