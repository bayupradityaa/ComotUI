import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { ReceiptPrinter } from "./ui/ReceiptPrinter";
import { formatCurrency } from "../lib/utils";
import { useEffect, useState, useCallback, useRef } from "react";

const PROCESSING_DURATION = 1500;
const PRINTING_DURATION = 3500;
const TEARING_DURATION = 600;
const easeOutSmooth = [0.16, 1, 0.3, 1];

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

const STAGE_LABELS = {
  processing: "Processing",
  printing: "Printing",
  tearing: "Tearing",
  complete: "Complete",
};

const STAGE_COLORS = {
  processing: "text-[var(--muted)] bg-[var(--surface-elevated)]",
  printing: "text-[var(--accent)] bg-[var(--accent-soft)]",
  tearing: "text-[var(--warning)] bg-[rgba(245,158,11,0.12)]",
  complete: "text-[var(--success)] bg-[var(--success-soft)]",
};

function DottedDivider() {
  return (
    <div
      aria-hidden="true"
      className="my-1.5 border-b border-dashed border-gray-400"
    />
  );
}

function ReceiptRow({ label, value, bold = false }) {
  if (!value) return null;
  return (
    <div className="flex justify-between gap-3 text-[11px] leading-relaxed">
      <span className="text-gray-500 uppercase tracking-wider shrink-0">{label}</span>
      <span className={`text-right break-all ${bold ? "font-bold text-gray-900" : "text-gray-700"}`}>{value}</span>
    </div>
  );
}

function StatusIndicator({ stage }) {
  const colorClass = STAGE_COLORS[stage] || STAGE_COLORS.processing;
  const label = STAGE_LABELS[stage] || "Processing";

  return (
    <div className="flex items-center gap-2">
      <div className={`size-2 rounded-full ${colorClass.replace("bg-", "bg-").replace("text-", "")}`} aria-hidden="true" />
      <span className={`text-sm font-medium ${colorClass.split(" ")[0]}`}>{label}</span>
    </div>
  );
}

export default function InteractivePlayground() {
  const [stage, setStage] = useState("processing");
  const [runKey, setRunKey] = useState(0);
  const receiptRef = useRef(null);
  const order = DEMO_ORDER;

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
    <section id="playground" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
      <div className="text-center mb-12 lg:mb-16">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--foreground)]">
          Interactive playground
        </h2>
        <p className="mt-2 text-[var(--secondary)] max-w-xl mx-auto">
          Watch the receipt print in real-time. Click <kbd className="px-1.5 py-0.5 text-xs bg-[var(--surface-elevated)] rounded border border-[var(--border)] font-mono">Replay</kbd> to run it again.
        </p>
      </div>

      <div className="flex flex-col items-center">
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider">Status</span>
            <StatusIndicator stage={stage} />
          </div>
        </div>

        <div className="w-full max-w-md mx-auto mb-8">
          <ReceiptPrinter.Root stage={stage} feedMotion="stepped" key={runKey}>
            <ReceiptPrinter.Machine>
              <ReceiptPrinter.Header>
                <div className="size-7 rounded-md bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-[10px] font-black text-white shadow-md">
                  R
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold text-gray-400 bg-gray-700/60 rounded-lg border border-gray-600">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Demo Mode
                </div>
              </ReceiptPrinter.Header>

              <ReceiptPrinter.Screen>
                <div className="space-y-3">
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

                  <ReceiptPrinter.Status />
                </div>
              </ReceiptPrinter.Screen>
            </ReceiptPrinter.Machine>

            <ReceiptPrinter.Output>
              <ReceiptPrinter.Paper ref={receiptRef}>
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

                <div className="space-y-0.5">
                  <ReceiptRow label="Tanggal" value={orderDate} />
                  <ReceiptRow label="Nama" value={order.customer_name} />
                  <ReceiptRow label="Twitter" value={order.contact_twitter} />
                  <ReceiptRow label="WhatsApp" value={order.contact_line} />
                  <ReceiptRow label="Email" value={order.contact_email} />
                </div>

                <DottedDivider />

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

                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-900 uppercase">Total Biaya</span>
                  <span className="text-base font-black text-gray-900">
                    {formatCurrency(order.total_fee)}
                  </span>
                </div>

                <DottedDivider />

                <div className="space-y-0.5 mt-1">
                  <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">Langkah Selanjutnya?</p>
                  <ol className="list-decimal list-inside space-y-0 text-[10px] text-gray-500 leading-snug">
                    <li>Tim kami akan menghubungi kamu via DM X / WA</li>
                    <li>Pembayaran dilakukan setelah tiket berhasil</li>
                    <li>Hasil war akan segera kami informasikan</li>
                  </ol>
                </div>

                <DottedDivider />

                <div className="text-center mt-1">
                  <p className="text-[10px] font-semibold text-gray-700">TERIMAKASIH ATAS KEPERCAYAAN ANDA!</p>
                </div>
              </ReceiptPrinter.Paper>
            </ReceiptPrinter.Output>
          </ReceiptPrinter.Root>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: easeOutSmooth }}
        >
          <button
            onClick={handleReplay}
            className="group flex items-center gap-2.5 px-5 py-2.5 text-sm font-semibold rounded-lg
              border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--secondary)]
              hover:bg-[var(--surface)] hover:text-[var(--foreground)] hover:border-[var(--border-strong)]
              transition-all duration-150
              shadow-[var(--shadow-1)]
              active:scale-[0.98]"
            aria-label="Replay animation"
          >
            <RotateCcw size={15} className="group-hover:rotate-[-360deg] transition-transform duration-500" />
            Replay animation
          </button>
        </motion.div>
      </div>
    </section>
  );
}