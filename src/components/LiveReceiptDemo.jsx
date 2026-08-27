import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { ReceiptPrinter } from "./ui/ReceiptPrinter";
import { formatCurrency } from "../lib/utils";

const PROCESSING = 1500;
const PRINTING = 3500;
const TEARING = 600;

const ORDER = {
  customer_name: "Budi Santoso",
  order_type: "vc",
  total_fee: 350000,
  contact_twitter: "@budisantoso",
  contact_line: "08123456789",
  contact_email: "budi@email.com",
  created_at: new Date().toISOString(),
  note: [
    "1. 28 Agt 2026 | Show 1 | Freya Jayawardana | 2 Tick",
    "2. 28 Agt 2026 | Show 2 | Marsha Lenathea | 1 Tick",
    "3. 29 Agt 2026 | Show 1 | Shani Indira | 1 Tick",
  ].join("\n"),
};

const STAGES = [
  { value: "processing", label: "Processing" },
  { value: "printing", label: "Printing" },
  { value: "tearing", label: "Tearing" },
  { value: "complete", label: "Complete" },
];

// Start in "complete" so the preview reads as a finished receipt rather than
// replaying the whole print cycle on every page load.
const INITIAL_STAGE = "complete";

function DottedDivider() {
  return (
    <div aria-hidden="true" className="my-1.5 border-b border-dashed border-gray-400" />
  );
}

function ReceiptRow({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex justify-between gap-3 text-[11px] leading-relaxed">
      <span className="shrink-0 uppercase tracking-wider text-gray-500">{label}</span>
      <span className="break-all text-right text-gray-700">{value}</span>
    </div>
  );
}

function PaperContent({ order, allSteps }) {
  const orderDate = new Date(order.created_at).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <div className="mb-2 flex items-start justify-between">
        <div>
          <h3 className="text-sm font-bold leading-none tracking-tight text-gray-900">RECEH48</h3>
          <p className="mt-0.5 text-[9px] text-gray-400">Joki Tiket JKT48 Terpercaya</p>
          <p className="text-[9px] text-gray-400">receh48.web.id</p>
        </div>
        <div className="flex size-8 flex-col items-center justify-center rounded bg-gray-200 text-gray-500">
          <span className="text-[9px] font-black">R48</span>
        </div>
      </div>

      <DottedDivider />

      <div className="space-y-0.5">
        <ReceiptRow label="Tanggal" value={orderDate} />
        <ReceiptRow label="Nama" value={order.customer_name} />
        <ReceiptRow label="Twitter" value={order.contact_twitter} />
        <ReceiptRow label="LINE" value={order.contact_line} />
      </div>

      <DottedDivider />

      {allSteps ? (
        <>
          <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-gray-400">Detail Pesanan</p>
          <div className="space-y-1">
            {order.note.split("\n").map((line, i) => {
              const parts = line.replace(/^\d+\.\s*/, "").split("|").map((s) => s.trim());
              return (
                <div key={i} className="text-[11px] leading-snug">
                  <div className="flex justify-between gap-2">
                    <span className="font-semibold text-gray-800">{parts[2]}</span>
                    <span className="shrink-0 text-gray-500">{parts[3]}</span>
                  </div>
                  <p className="text-[10px] text-gray-400">{parts[0]} · {parts[1]}</p>
                </div>
              );
            })}
          </div>
          <DottedDivider />
        </>
      ) : null}

      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase text-gray-900">Total Blaya</span>
        <span className="text-base font-black text-gray-900">{formatCurrency(order.total_fee)}</span>
      </div>

      <DottedDivider />

      <div className="mt-1 space-y-0.5">
        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">Langkah Selanjutnya?</p>
        <ol className="list-decimal space-y-0 pl-4 text-[10px] leading-snug text-gray-500">
          <li>Tim kami akan menghubungi kamu</li>
          <li>Pembayaran setelah ticket berhasil</li>
        </ol>
      </div>

      <div className="mt-2 text-center">
        <p className="text-[10px] font-semibold text-gray-700">TERIMA KASIH!</p>
      </div>
    </>
  );
}

export default function LiveReceiptDemo({ className }) {
  const [stage, setStage] = useState(INITIAL_STAGE);

  const handleReplay = () => {
    setStage("processing");
    window.setTimeout(() => setStage("printing"), PROCESSING);
    window.setTimeout(() => setStage("tearing"), PROCESSING + PRINTING);
    window.setTimeout(() => setStage("complete"), PROCESSING + PRINTING + TEARING);
  };

  return (
    <div className={className}>
      <ReceiptPrinter.Root stage={stage} feedMotion="stepped">
        <ReceiptPrinter.Machine>
          <ReceiptPrinter.Header>
            <div className="flex size-7 items-center justify-center rounded-md bg-gradient-to-br from-amber-400 to-orange-600 text-[10px] font-black text-white shadow-md">
              R
            </div>
            <div className="flex items-center gap-1.5 rounded-lg border border-gray-600 bg-gray-700/60 px-2.5 py-1 text-[11px] font-semibold text-gray-400">
              <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
              Live demo
            </div>
          </ReceiptPrinter.Header>

          <ReceiptPrinter.Screen>
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">{ORDER.customer_name}</p>
                  <p className="mt-0.5 text-[11px] text-gray-500">
                    {ORDER.order_type === "vc"
                      ? "Joki Video Call"
                      : ORDER.order_type === "2s"
                        ? "Joki 2Shot"
                        : "Joki Ticket"}{" "}
                    JKT48
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] leading-none text-gray-500">Total</p>
                  <strong className="text-sm font-bold text-amber-400">
                    {formatCurrency(ORDER.total_fee)}
                  </strong>
                </div>
              </div>
              <ReceiptPrinter.Status />
            </div>
          </ReceiptPrinter.Screen>
        </ReceiptPrinter.Machine>

        <ReceiptPrinter.Output>
          <ReceiptPrinter.Paper>
            <PaperContent order={ORDER} allSteps />
          </ReceiptPrinter.Paper>
        </ReceiptPrinter.Output>
      </ReceiptPrinter.Root>

      <div className="flex items-center justify-center gap-3 pt-6">
        {STAGES.map((s) => (
          <button
            key={s.value}
            type="button"
            onClick={() => setStage(s.value)}
            aria-pressed={stage === s.value}
            className="rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors duration-150"
            style={{
              color: stage === s.value ? "var(--foreground)" : "var(--muted)",
              background: stage === s.value ? "var(--accent-soft)" : "transparent",
            }}
          >
            {s.label}
          </button>
        ))}
        <button
          type="button"
          onClick={handleReplay}
          aria-label="Replay print animation"
          title="Replay"
          className="grid size-7 place-items-center rounded-md border border-[var(--border)] text-[var(--secondary)] transition-colors duration-150 hover:text-[var(--foreground)]"
        >
          <RotateCcw size={13} />
        </button>
      </div>
    </div>
  );
}