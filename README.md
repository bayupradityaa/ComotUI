# 🖨️ Receipt Printer UI

An interactive receipt printer UI component built with **React**, **Framer Motion**, and **Tailwind CSS**. Features a realistic stepped paper-feed animation, zigzag tearing effect, cutter blade flash, and a compound component API.

## ✨ Features

- **Stepped Paper Feed** — Receipt paper emerges from the printer slot with a rhythmic, realistic feeding motion
- **Tear Effect** — Zigzag clip-path transition simulates paper being torn from the printer
- **Cutter Blade Flash** — Amber flash effect across the printer slot during the tearing phase
- **Compound Component API** — Composable `ReceiptPrinter.Root`, `.Machine`, `.Screen`, `.Output`, `.Paper`, etc.
- **Accessibility** — Respects `prefers-reduced-motion` via Framer Motion's `useReducedMotion`
- **Interactive Demo** — Built-in replay button and stage indicator pills

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/struk-order-ui.git
cd struk-order-ui

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to see the interactive demo.

## 🏗️ Project Structure

```
src/
├── components/
│   └── ui/
│       └── ReceiptPrinter.jsx    # Main compound component
├── demo/
│   ├── DemoReceipt.jsx           # Demo with dummy data & replay
│   └── CodeViewer.jsx            # Source code viewer with syntax highlighting
├── lib/
│   └── utils.js                  # Utility functions (cn, formatCurrency)
├── App.jsx                       # Layout: demo + code viewer
├── App.css                       # (unused, styles in index.css)
├── index.css                     # Global styles + Tailwind
└── main.jsx                      # Entry point
```

## 🧩 Component API

```jsx
<ReceiptPrinter.Root stage={stage} feedMotion="stepped">
  <ReceiptPrinter.Machine>
    <ReceiptPrinter.Header>
      {/* Logo, buttons, etc. */}
    </ReceiptPrinter.Header>
    <ReceiptPrinter.Screen>
      {/* LED-like display content */}
      <ReceiptPrinter.Status />
    </ReceiptPrinter.Screen>
  </ReceiptPrinter.Machine>

  <ReceiptPrinter.Output>
    <ReceiptPrinter.Paper>
      {/* Receipt content */}
    </ReceiptPrinter.Paper>
  </ReceiptPrinter.Output>
</ReceiptPrinter.Root>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `stage` | `"processing" \| "printing" \| "tearing" \| "complete"` | — | Current animation stage |
| `feedMotion` | `"stepped" \| "smooth"` | `"stepped"` | Paper feed animation style |
| `animate` | `boolean` | `true` | Enable/disable animations |

### Animation Stages

1. **Processing** — Spinner icon, receipt hidden inside printer
2. **Printing** — Receipt feeds out with stepped motion
3. **Tearing** — Scissors icon, shake effect, cutter blade flash
4. **Complete** — Printer slides up and fades, receipt displayed with zigzag edges

## 🛠️ Tech Stack

- **React 19** — UI framework
- **Framer Motion** — Animation library
- **Tailwind CSS v4** — Utility-first styling
- **Lucide React** — Icon library
- **Prism.js** — Syntax highlighting (demo only)
- **Vite** — Build tool

## 📄 License

MIT — free to use, modify, and distribute.
