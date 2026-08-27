import { CheckCircle, Loader2, Scissors } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { createContext, forwardRef, useContext } from "react";
import { cn } from "../../lib/utils";

/* ─── Context ─── */
const ReceiptPrinterContext = createContext(null);

/* ─── Premium Apple-style Smooth Easings ─── */
const easeOutSmooth = [0.16, 1, 0.3, 1];
const easeInOutSmooth = [0.65, 0, 0.35, 1];

/* ─── Receipt teeth calculations ─── */
const receiptToothCount = 36;
const receiptToothDepth = 3.5;

// Top teeth: left to right (from x=0% to x=100%)
const topToothPoints = Array.from(
  { length: receiptToothCount * 2 + 1 },
  (_, index) => {
    const x = ((index) * 100) / (receiptToothCount * 2);
    const y = index % 2 === 0 ? "0px" : `${receiptToothDepth}px`;
    return `${x}% ${y}`;
  },
).join(", ");

// Bottom teeth: right to left (from x=100% to x=0%)
const bottomToothPoints = Array.from(
  { length: receiptToothCount * 2 + 1 },
  (_, index) => {
    const x = 100 - ((index) * 100) / (receiptToothCount * 2);
    const y = index % 2 === 0 ? "100%" : `calc(100% - ${receiptToothDepth}px)`;
    return `${x}% ${y}`;
  },
).join(", ");

// Attached (flat top, zigzag bottom)
const receiptClipPathAttached = `polygon(0 0, 100% 0, 100% calc(100% - ${receiptToothDepth}px), ${bottomToothPoints})`;

// Torn (zigzag top AND zigzag bottom)
const receiptClipPathTorn = `polygon(${topToothPoints}, 100% calc(100% - ${receiptToothDepth}px), ${bottomToothPoints})`;

/* ─── Stepped-feed keyframes (Keluar berirama halus dari slot printer) ─── */
const printingTransformKeyframes = [
  "translateY(calc(-100% + 4px))",
  "translateY(-90%)",
  "translateY(-90%)",
  "translateY(-80%)",
  "translateY(-80%)",
  "translateY(-69%)",
  "translateY(-69%)",
  "translateY(-57%)",
  "translateY(-57%)",
  "translateY(-45%)",
  "translateY(-45%)",
  "translateY(-33%)",
  "translateY(-33%)",
  "translateY(-22%)",
  "translateY(-22%)",
  "translateY(-12%)",
  "translateY(-12%)",
  "translateY(-4%)",
  "translateY(-4%)",
  "translateY(0%)",
];

const printingKeyframeTimes = [
  0, 0.08, 0.11, 0.19, 0.22, 0.30, 0.33, 0.41, 0.44, 0.52, 0.55, 0.63,
  0.66, 0.74, 0.77, 0.85, 0.88, 0.94, 0.96, 1,
];

/* ─── Default status labels ─── */
const statusLabels = {
  processing: "Memproses pesanan kamu...",
  printing: "Mencetak struk pesanan...",
  tearing: "Menyobek struk...",
  complete: "Pesanan berhasil dibuat!",
};

/* ─── Hook ─── */
function useReceiptPrinter(component) {
  const context = useContext(ReceiptPrinterContext);
  if (!context) {
    throw new Error(`${component} must be used inside ReceiptPrinter.Root.`);
  }
  return context;
}

/* ─── Root ─── */
function ReceiptPrinterRoot({
  "aria-label": ariaLabel = "Receipt printer",
  animate = true,
  children,
  className,
  feedMotion = "stepped",
  stage,
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();
  const context = {
    animate,
    feedMotion,
    shouldMove: animate && !shouldReduceMotion,
    stage,
  };

  return (
    <ReceiptPrinterContext.Provider value={context}>
      <section
        aria-label={ariaLabel}
        className={cn(
          "relative isolate flex w-full max-w-sm flex-col items-center",
          className,
        )}
        data-stage={stage}
        {...props}
      >
        {children}
      </section>
    </ReceiptPrinterContext.Provider>
  );
}

/* ─── Machine (printer body) ─── */
function ReceiptPrinterMachine({ children, className, ...props }) {
  const { stage, shouldMove } = useReceiptPrinter("ReceiptPrinter.Machine");
  const isTearing = stage === "tearing";
  const isComplete = stage === "complete";

  return (
    <motion.div
      animate={{
        y: isComplete && shouldMove ? -80 : 0,
        opacity: isComplete && shouldMove ? 0 : 1,
        scale: isComplete && shouldMove ? 0.94 : 1,
        marginBottom: isComplete && shouldMove ? -150 : 0,
      }}
      transition={{ duration: 0.65, ease: easeOutSmooth }}
      className={cn(
        "relative isolate w-full overflow-hidden rounded-[1.5rem] border border-gray-700 bg-gray-800 p-3 pb-6 z-30",
        "shadow-[0_20px_36px_-20px_rgba(0,0,0,0.55),0_6px_14px_-8px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(0,0,0,0.35)]",
        isComplete && "pointer-events-none",
        className,
      )}
      {...props}
    >
      {children}
      {/* Printer slot bar - tepat di celah keluar kertas */}
      <div
        aria-hidden="true"
        className="absolute inset-x-6 bottom-2 z-40 h-2.5 rounded-[0.25rem] border border-gray-600 bg-gray-950 shadow-[inset_0_2px_4px_rgba(0,0,0,0.95)] flex items-center justify-center overflow-hidden"
      >
        {/* Cutter blade flash effect during tear */}
        {isTearing && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: [0, 1, 0.4, 0], scaleX: [0, 1, 1, 1] }}
            transition={{ duration: 0.35, ease: easeOutSmooth }}
            className="w-full h-full bg-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.8)]"
          />
        )}
      </div>
    </motion.div>
  );
}

/* ─── Header ─── */
function ReceiptPrinterHeader({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "relative z-10 flex h-11 items-start justify-between",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* ─── Screen (LED-like display) ─── */
function ReceiptPrinterScreen({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "relative z-10 isolate overflow-hidden rounded-[calc(1.5rem_-_0.75rem)] border border-gray-700 bg-[#0A0E17] p-4 text-white",
        "shadow-inner shadow-gray-950/80",
        "after:pointer-events-none after:absolute after:inset-0 after:z-20 after:rounded-[inherit] after:shadow-[inset_0_0_24px_4px_rgba(0,0,0,0.52)] after:content-['']",
        className,
      )}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/* ─── Status indicator (spinner → scissors → checkmark) ─── */
function StatusIndicator({ animate, move, stage }) {
  const isComplete = stage === "complete";
  const isTearing = stage === "tearing";

  return (
    <span
      aria-hidden="true"
      className="relative grid size-5 shrink-0 place-items-center"
    >
      <AnimatePresence initial={false} mode="sync">
        {isComplete ? (
          <motion.span
            animate={{ opacity: 1, transform: "scale(1)" }}
            className="col-start-1 row-start-1 grid place-items-center text-emerald-400"
            exit={{
              opacity: animate ? 0 : 1,
              transform: move ? "scale(0.96)" : "scale(1)",
            }}
            initial={{
              opacity: animate ? 0 : 1,
              transform: move ? "scale(0.94)" : "scale(1)",
            }}
            key="complete"
            transition={{ duration: animate ? 0.2 : 0, ease: easeOutSmooth }}
          >
            <CheckCircle size={18} />
          </motion.span>
        ) : isTearing ? (
          <motion.span
            animate={{ opacity: 1, rotate: [0, -18, 12, 0] }}
            className="col-start-1 row-start-1 grid place-items-center text-amber-400"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0, scale: 0.85 }}
            key="tearing"
            transition={{ duration: 0.4, ease: easeOutSmooth }}
          >
            <Scissors size={17} />
          </motion.span>
        ) : (
          <motion.span
            animate={{ opacity: 1, transform: "scale(1)" }}
            className="col-start-1 row-start-1 grid place-items-center text-gray-400"
            exit={{
              opacity: animate ? 0 : 1,
              transform: move ? "scale(0.96)" : "scale(1)",
            }}
            initial={{
              opacity: animate ? 0 : 1,
              transform: move ? "scale(0.94)" : "scale(1)",
            }}
            key="working"
            transition={{ duration: animate ? 0.2 : 0, ease: easeOutSmooth }}
          >
            <Loader2
              className={cn(animate && "animate-spin")}
              size={18}
            />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

/* ─── Status label ─── */
function ReceiptPrinterStatus({ children, className, ...props }) {
  const { animate, shouldMove, stage } = useReceiptPrinter(
    "ReceiptPrinter.Status",
  );

  return (
    <div
      className={cn("flex min-w-0 items-center gap-2", className)}
      {...props}
    >
      <StatusIndicator animate={animate} move={shouldMove} stage={stage} />
      <div
        aria-live="polite"
        className="grid min-w-0 flex-1 items-center"
        role="status"
      >
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            className="col-start-1 row-start-1 truncate font-medium text-gray-400 text-xs leading-none"
            exit={{
              opacity: animate ? 0 : 1,
              transform: shouldMove ? "translateY(-4px)" : "translateY(0px)",
            }}
            initial={{
              opacity: animate ? 0 : 1,
              transform: shouldMove ? "translateY(4px)" : "translateY(0px)",
            }}
            key={stage}
            transition={{ duration: animate ? 0.22 : 0, ease: easeOutSmooth }}
          >
            {children ?? statusLabels[stage]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Paper (the receipt itself) ─── */
const ReceiptPrinterPaper = forwardRef(function ReceiptPrinterPaper({ children, className, style, ...props }, ref) {
  const { stage } = useReceiptPrinter("ReceiptPrinter.Paper");
  const isTorn = stage === "tearing" || stage === "complete";

  return (
    <article
      ref={ref}
      className={cn(
        "relative z-10 bg-[#faf8f5] px-5 pt-3 pb-5 font-mono text-gray-900 transition-[clip-path] duration-300",
        className,
      )}
      style={{ clipPath: isTorn ? receiptClipPathTorn : receiptClipPathAttached, ...style }}
      {...props}
    >
      {children}
    </article>
  );
});

/* ─── Output (paper feed container - tepat tersambung di bawah slot bar) ─── */
function ReceiptPrinterOutput({ children, className, ...props }) {
  const { animate, feedMotion, shouldMove, stage } = useReceiptPrinter(
    "ReceiptPrinter.Output",
  );
  const isReceiptVisible = stage !== "processing";
  const isComplete = stage === "complete";
  const shouldUseSteppedFeed =
    feedMotion === "stepped" && stage === "printing" && shouldMove;

  return (
    <motion.div
      animate={{
        marginTop: isComplete && shouldMove ? "0.25rem" : "-1.15rem",
      }}
      transition={{ duration: 0.65, ease: easeOutSmooth }}
      className={cn(
        "relative z-10 w-[calc(80%+3rem)] max-w-full px-6",
        isComplete ? "overflow-visible h-auto" : "h-[32rem] overflow-hidden",
        className,
      )}
      {...props}
    >
      {/* Top slot blur shadow (only during printing when emerging from slot) */}
      {isReceiptVisible && !isComplete ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-6 top-0 z-20 h-2 bg-black/80 blur-[4px]"
        />
      ) : null}

      <motion.div
        animate={
          stage === "printing" && shouldMove
            ? {
                opacity: 1,
                transform: shouldUseSteppedFeed
                  ? printingTransformKeyframes
                  : "translateY(0%)",
                x: 0,
                rotate: 0,
              }
            : stage === "tearing" && shouldMove
              ? {
                  opacity: 1,
                  transform: "translateY(0%)",
                  x: [0, -2, 1.5, -0.5, 0],
                  rotate: [0, -0.6, 0.4, 0],
                }
              : isComplete && shouldMove
                ? {
                    opacity: 1,
                    transform: "translateY(0%)",
                    x: 0,
                    rotate: 0,
                  }
                : {
                    opacity: isReceiptVisible ? 1 : 0,
                    transform: isReceiptVisible
                      ? "translateY(0%)"
                      : "translateY(calc(-100% + 4px))",
                    x: 0,
                    rotate: 0,
                  }
        }
        aria-hidden={stage !== "complete"}
        className={cn(
          "relative isolate transition-shadow duration-500",
          isComplete
            ? "before:pointer-events-none before:absolute before:inset-x-2 before:top-2 before:bottom-2 before:z-0 before:rounded-sm before:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.65),0_4px_16px_rgba(0,0,0,0.3)] before:content-['']"
            : "before:pointer-events-none before:absolute before:inset-x-3 before:top-3 before:bottom-4 before:z-0 before:rounded-sm before:shadow-[0_8px_24px_rgba(0,0,0,0.24)] before:content-[''] after:pointer-events-none after:absolute after:right-[8%] after:bottom-0 after:left-[8%] after:z-0 after:h-3 after:translate-y-1.5 after:rounded-full after:bg-black/10 after:blur-lg after:content-['']",
        )}
        whileHover={
          isComplete && shouldMove
            ? {
                y: -3,
                scale: 1.01,
                transition: { duration: 0.25, ease: easeOutSmooth },
              }
            : undefined
        }
        initial={false}
        transition={{
          opacity: { duration: animate ? 0.2 : 0, ease: easeOutSmooth },
          transform: {
            duration: shouldMove ? 3.4 : 0,
            ease: shouldUseSteppedFeed ? "linear" : easeInOutSmooth,
            times: shouldUseSteppedFeed ? printingKeyframeTimes : undefined,
          },
          x: { duration: 0.4, ease: easeOutSmooth },
          rotate: { duration: 0.4, ease: easeOutSmooth },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export const ReceiptPrinter = {
  Header: ReceiptPrinterHeader,
  Machine: ReceiptPrinterMachine,
  Output: ReceiptPrinterOutput,
  Paper: ReceiptPrinterPaper,
  Root: ReceiptPrinterRoot,
  Screen: ReceiptPrinterScreen,
  Status: ReceiptPrinterStatus,
};
