import { lazy } from "react";
import ReceiptSnapshot from "../demo/ReceiptSnapshot";

// ?raw vite imports — real source of each component, shown verbatim in the
// code viewer. Keeping these here centralises "what to show" with "the source".
import receiptPrinterSource from "../components/ui/ReceiptPrinter.jsx?raw";
import statusBadgeSource from "../components/ui/StatusBadge.jsx?raw";
import receiptPrinterTs from "./tsSources/receipt-printer.tsx.txt?raw";
import statusBadgeTs from "./tsSources/status-badge.tsx.txt?raw";

export const CATEGORIES = [
  "All",
  "Buttons",
  "Cards",
  "Forms",
  "Navigation",
  "Feedback",
  "Commerce",
  "Dashboard",
  "Experimental",
];

export const components = [
  {
    slug: "receipt-printer",
    name: "Receipt Printer",
    category: "Commerce",
    tags: ["receipt", "printing", "pos", "checkout", "thermal"],
    status: "stable",
    description:
      "A compact receipt printing interface for modern POS systems, with a realistic stepped paper feed and tear animation.",
    framework: "React",
    styling: "Tailwind",
    dependencies: ["lucide-react", "framer-motion"],
    component: ReceiptSnapshot,
    featured: true,
    preview: { height: "360px" },
    source: receiptPrinterSource,
    sourceTs: receiptPrinterTs,
    language: "jsx",
    fileName: "ReceiptPrinter.jsx",
    fileNameTs: "ReceiptPrinter.tsx",
    usage: `import { ReceiptPrinter } from "./ReceiptPrinter";

function CheckoutReceipt() {
  return (
    <ReceiptPrinter.Root stage="printing">
      <ReceiptPrinter.Machine>
        <ReceiptPrinter.Screen>
          <ReceiptPrinter.Status />
        </ReceiptPrinter.Screen>
      </ReceiptPrinter.Machine>
      <ReceiptPrinter.Output>
        <ReceiptPrinter.Paper>{/* your receipt content */}</ReceiptPrinter.Paper>
      </ReceiptPrinter.Output>
    </ReceiptPrinter.Root>
  );
}`,
    usageTs: `import { ReceiptPrinter } from "./ReceiptPrinter";

function CheckoutReceipt() {
  return (
    <ReceiptPrinter.Root stage="printing">
      <ReceiptPrinter.Machine>
        <ReceiptPrinter.Screen>
          <ReceiptPrinter.Status />
        </ReceiptPrinter.Screen>
      </ReceiptPrinter.Machine>
      <ReceiptPrinter.Output>
        <ReceiptPrinter.Paper>{/* your receipt content */}</ReceiptPrinter.Paper>
      </ReceiptPrinter.Output>
    </ReceiptPrinter.Root>
  );
}`,
    installation: "npm install lucide-react framer-motion",
  },
  {
    slug: "status-badge",
    name: "Status Badge",
    category: "Feedback",
    tags: ["status", "badge", "indicator", "pill", "feedback"],
    status: "stable",
    description:
      "A dependency-free status badge with semantic tones that adapt to light and dark themes.",
    framework: "React",
    styling: "Tailwind",
    dependencies: [],
    component: lazy(() => import("../demo/StatusBadgeDemo.jsx")),
    featured: false,
    preview: { height: "240px" },
    source: statusBadgeSource,
    sourceTs: statusBadgeTs,
    language: "jsx",
    fileName: "StatusBadge.jsx",
    fileNameTs: "StatusBadge.tsx",
    usage: `import StatusBadge from "./StatusBadge";

function Dashboard() {
  return (
    <div className="flex gap-3">
      <StatusBadge tone="success" label="Live" />
      <StatusBadge tone="warning" label="Building" />
      <StatusBadge tone="danger" label="Down" variant="outline" />
      <StatusBadge tone="neutral" label="Paused" dot={false} />
    </div>
  );
}`,
    usageTs: `import StatusBadge, { type StatusBadgeProps } from "./StatusBadge";

function Dashboard() {
  return (
    <div className="flex gap-3">
      <StatusBadge tone="success" label="Live" />
      <StatusBadge tone="warning" label="Building" />
      <StatusBadge tone="danger" label="Down" variant="outline" />
      <StatusBadge tone="neutral" label="Paused" dot={false} />
    </div>
  );
}`,
    installation: "", // no external dependencies
  },
];

export function getComponent(slug) {
  return components.find((c) => c.slug === slug);
}

export function getFeatured() {
  return components.filter((c) => c.featured);
}


export function getAdjacent(slug) {
  const idx = components.findIndex((c) => c.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  const prev = idx > 0 ? components[idx - 1] : null;
  const next = idx < components.length - 1 ? components[idx + 1] : null;
  return { prev, next };
}

export function getCategories() {
  return CATEGORIES;
}