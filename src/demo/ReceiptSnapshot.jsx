import { ReceiptPrinter } from "../components/ui/ReceiptPrinter";
import { formatCurrency } from "../lib/utils";

// Static, non-interactive still of the ReceiptPrinter component, sized to fit a
// component-grid preview tile. Reuses the real compound component (stage
// "complete") so it always reflects the actual structure.
function Row({ label, value }) {
  return (
    <div
      className="flex justify-between gap-2 text-[8px] leading-relaxed text-gray-600"
    >
      <span className="truncate uppercase tracking-wider text-gray-400">{label}</span>
      <span className="shrink-0 text-gray-700">{value}</span>
    </div>
  );
}

function Dashed() {
  return <div aria-hidden="true" className="my-1 border-t border-dashed border-gray-300" />;
}

export default function ReceiptSnapshot() {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-full max-w-[16rem]">
        <ReceiptPrinter.Root stage="complete" animate={false}>
          <ReceiptPrinter.Machine>
            <ReceiptPrinter.Header>
              <div className="flex size-6 items-center justify-center rounded bg-gradient-to-br from-amber-400 to-orange-600 text-[9px] font-black text-white">
                R
              </div>
              <div className="flex items-center gap-1 rounded border border-gray-600 bg-gray-700/60 px-2 py-0.5 text-[9px] font-semibold text-gray-400">
                <span className="size-1 rounded-full bg-emerald-400" />
                Live
              </div>
            </ReceiptPrinter.Header>
            <ReceiptPrinter.Screen>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-white">Budi Santoso</p>
                  <p className="text-[9px] text-gray-500">Joki VC JKT48</p>
                </div>
                <strong className="text-sm font-bold text-amber-400">
                  {formatCurrency(350000)}
                </strong>
              </div>
            </ReceiptPrinter.Screen>
          </ReceiptPrinter.Machine>

          <ReceiptPrinter.Output>
            <ReceiptPrinter.Paper>
              <div className="mb-1 flex items-start justify-between">
                <h4 className="text-[11px] font-bold leading-none text-gray-900">RECEH48</h4>
                <div className="size-6 rounded bg-gray-200 text-[8px] font-black text-gray-500 grid place-items-center">
                  R48
                </div>
              </div>
              <Dashed />
              <Row label="Nama" value="Budi" />
              <Row label="Metode" value="Virtual Call" />
              <Dashed />
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold uppercase text-gray-900">Total</span>
                <span className="text-sm font-black text-gray-900">{formatCurrency(350000)}</span>
              </div>
            </ReceiptPrinter.Paper>
          </ReceiptPrinter.Output>
        </ReceiptPrinter.Root>
      </div>
    </div>
  );
}