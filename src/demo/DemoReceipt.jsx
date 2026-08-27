import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Check } from "lucide-react";
import { ReceiptPrinter } from "../components/ui/ReceiptPrinter";
import { formatCurrency } from "../lib/utils";

/* ─── Timing (ms) for the staged animation ─── */
const PROCESSING_DURATION = 1500;
const PRINTING_DURATION = 3500;
const TEARING_DURATION = 600;
const easeOutSmooth = [0.16, 1, 0.3, 1];

/* ─── Dummy order data ─── */
const DEMO_ORDER = {
  customer_name: "Budi Santoso",
  order_type: "vc",
  total_fee: 350000,
  contact_twitter: "@budisantoso",
  contact_line: "08123456789",
  contact_email: "budi@email.com",
  created_at: new Date().toISOString(),
  note: [
    "1. 28 Agt 2026 | Show 1 | Freya Jayawardana | 2 Tiket",
    "2. 28 Agt 2026 | Show 2 | Marsha Lenathea | 1 Tiket",
    "3. 29 Agt 2026 | Show 1 | Shani Indira | 1 Tiket",
  ].join("\n"),
};

/* ─── Stage display config ─── */
const STAGES = [
  { key: "processing", label: "Processing", color: "bg-gray-500" },
  { key: "printing", label: "Printing", color: "bg-blue-500" },
  { key: "tearing", label: "Tearing", color: "bg-amber-500" },
  { key: "complete", label: "Complete", color: "bg-emerald-500" },
];

/* ─── Dotted line on receipt ─── */
function DottedDivider() {
  return (
    <div
      aria-hidden="true"
      className="my-1.5 border-b border-dashed border-gray-400"
    />
  );
}

/* ─── Single key:value row on receipt ─── */
function ReceiptRow({ label, value, bold = false }) {
  if (!value) return null;
  return (
    <div className="flex justify-between gap-3 text-[11px] leading-relaxed">
      <span className="text-gray-500 uppercase tracking-wider shrink-0">{label}</span>
      <span className={`text-right break-all ${bold ? "font-bold text-gray-900" : "text-gray-700"}`}>{value}</span>
    </div>
  );
}

/* ─── Demo Receipt Component ─── */
export default function DemoReceipt() {
  const [stage, setStage] = useState("processing");
  const [runKey, setRunKey] = useState(0);
  const receiptRef = useRef(null);
  const order = DEMO_ORDER;

  // Auto-advance through processing → printing → tearing → complete
  useEffect(() => {
    setStage("processing");

    const t1 = setTimeout(() => setStage("printing"), PROCESSING_DURATION);
    const t2 = setTimeout(
      () => setStage("tearing"),
      PROCESSING_DURATION + PRINTING_DURATION,
    );
    const t3 = setTimeout(
      () => setStage("complete"),
      PROCESSING_DURATION + PRINTING_DURATION + TEARING_DURATION,
    );

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [runKey]);

  const handleReplay = useCallback(() => {
    setRunKey((k) => k + 1);
  }, []);

  /* ─── Parse note lines into member list for receipt ─── */
  const orderItems = (order.note || "")
    .split("\n")
    .filter((line) => line.trim())
    .map((line) => {
      const cleaned = line.replace(/^\d+\.\s*/, "");
      const parts = cleaned.split("|").map((s) => s.trim());
      return {
        date: parts[0] || "",
        session: parts[1] || "",
        member: parts[2] || "",
        qty: parts[3] || "",
      };
    });

  const orderDate = new Date(order.created_at).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex flex-col items-center w-full">
      {/* ─── Stage Indicator Pills ─── */}
      <div className="flex items-center gap-1.5 mb-6 flex-wrap justify-center">
        {STAGES.map((s) => (
          <div
            key={s.key}
            className={`
              flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider
              transition-all duration-300
              ${stage === s.key
                ? `${s.color} text-white shadow-lg`
                : "bg-gray-800/60 text-gray-500 border border-gray-700/50"
              }
            `}
          >
            <span className={`size-1.5 rounded-full ${stage === s.key ? "bg-white" : "bg-gray-600"}`} />
            {s.label}
          </div>
        ))}
      </div>

      {/* ─── Success Header ─── */}
      <AnimatePresence>
        {stage === "complete" && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15, ease: easeOutSmooth }}
            className="text-center mb-4 flex flex-col items-center"
          >
            <div className="inline-flex items-center justify-center size-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 mb-2 shadow-[0_0_20px_rgba(16,185,129,0.25)]">
              <Check size={20} strokeWidth={2.5} />
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight">Pesanan Berhasil Dibuat!</h2>
            <p className="text-[11px] text-gray-400 mt-0.5">Struk transaksi kamu sudah siap</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Receipt Printer ─── */}
      <ReceiptPrinter.Root stage={stage} feedMotion="stepped" key={runKey}>
        <ReceiptPrinter.Machine>
          {/* Header with logo placeholder */}
          <ReceiptPrinter.Header>
            <div className="size-7 rounded-md bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-[10px] font-black text-white shadow-md">
              R
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold text-gray-400 bg-gray-700/60 rounded-lg border border-gray-600">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Demo Mode
            </div>
          </ReceiptPrinter.Header>

          {/* Screen content */}
          <ReceiptPrinter.Screen>
            <div className="space-y-3">
              {/* Plan summary on screen */}
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold text-white">{order.customer_name}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    {order.order_type === "vc" ? "Joki Video Call" : order.order_type === "2s" ? "Joki 2Shot" : "Joki Tiket"} JKT48
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-500 leading-none">Total</p>
                  <strong className="text-amber-400 text-sm font-bold">
                    {formatCurrency(order.total_fee)}
                  </strong>
                </div>
              </div>

              {/* Status indicator */}
              <ReceiptPrinter.Status />
            </div>
          </ReceiptPrinter.Screen>
        </ReceiptPrinter.Machine>

        {/* ─── Paper output ─── */}
        <ReceiptPrinter.Output>
          <ReceiptPrinter.Paper ref={receiptRef}>
            {/* Receipt header */}
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-sm font-bold text-gray-900 tracking-tight leading-none">RECEH48</h3>
                <p className="text-[9px] text-gray-400 mt-0.5">Joki Tiket JKT48 Terpercaya</p>
                <p className="text-[9px] text-gray-400">receh48.web.id</p>
              </div>
              <div className="size-8 rounded bg-gray-200 flex items-center justify-center text-[10px] font-black text-gray-500">
                R48
              </div>
            </div>

            <DottedDivider />

            {/* Order info */}
            <div className="space-y-0.5">
              <ReceiptRow label="Tanggal" value={orderDate} />
              <ReceiptRow label="Nama" value={order.customer_name} />
              <ReceiptRow label="Twitter" value={order.contact_twitter} />
              <ReceiptRow label="WhatsApp" value={order.contact_line} />
              <ReceiptRow label="Email" value={order.contact_email} />
            </div>

            <DottedDivider />

            {/* Items */}
            <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-1">Detail Pesanan</p>
            <div className="space-y-1">
              {orderItems.map((item, i) => (
                <div key={i} className="text-[11px] leading-snug">
                  <div className="flex justify-between gap-2">
                    <span className="font-semibold text-gray-800">{item.member}</span>
                    <span className="text-gray-500 shrink-0">{item.qty}</span>
                  </div>
                  <p className="text-[10px] text-gray-400">
                    {item.date} · {item.session}
                  </p>
                </div>
              ))}
            </div>

            <DottedDivider />

            {/* Total */}
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-gray-900 uppercase">Total Biaya</span>
              <span className="text-base font-black text-gray-900">
                {formatCurrency(order.total_fee)}
              </span>
            </div>

            <DottedDivider />

            {/* Next steps */}
            <div className="space-y-0.5 mt-1">
              <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">Langkah Selanjutnya?</p>
              <ol className="list-decimal list-inside space-y-0 text-[10px] text-gray-500 leading-snug">
                <li>Tim kami akan menghubungi kamu via DM X / WA</li>
                <li>Pembayaran dilakukan setelah tiket berhasil</li>
                <li>Hasil war akan segera kami informasikan</li>
              </ol>
            </div>

            <DottedDivider />

            {/* Thank you */}
            <div className="text-center mt-1">
              <p className="text-[10px] font-semibold text-gray-700">TERIMAKASIH ATAS KEPERCAYAAN ANDA!</p>
            </div>
          </ReceiptPrinter.Paper>
        </ReceiptPrinter.Output>
      </ReceiptPrinter.Root>

      {/* ─── Replay Button ─── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: easeOutSmooth }}
        className="mt-8"
      >
        <button
          onClick={handleReplay}
          className="group flex items-center gap-2.5 px-5 py-2.5 text-sm font-semibold rounded-xl
            border border-gray-700 bg-gray-800/60 text-gray-300
            hover:bg-gray-700 hover:text-white hover:border-gray-600
            transition-all duration-200
            backdrop-blur-sm
            shadow-[0_2px_8px_rgba(0,0,0,0.3)]
            active:scale-[0.97]"
        >
          <RotateCcw size={15} className="group-hover:rotate-[-360deg] transition-transform duration-500" />
          Replay Animation
        </button>
      </motion.div>
    </div>
  );
}
