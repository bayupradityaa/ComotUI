# 🔗 ComotUI — Comot. Copy. Build.

A collection of crafted React UI components, ready to **comot** (grab) for your next project. Homepage at [comotui.my.id](https://comotui.my.id).

**Discover → Preview → Comot → Build.**

## ✨ What it is

ComotUI is a developer-first React UI component library. The pattern:

1. **Discover** a component
2. **Preview** it live (real components, not screenshots)
3. **Comot** the code you need — source, install, and usage

The current flagship component is the **Receipt Printer** — an interactive POS receipt-printing interface with realistic stepped paper-feed, zigzag tearing, and a cutter blade flash.

## 🖥️ Routes

| Route | Purpose |
|-------|---------|
| `/` | Homepage (hero + featured preview + browse) |
| `/components` | Component explorer with category filter |
| `/components/:slug` | Component detail — live preview, source code, install, usage |

Deep links work because `vercel.json` rewrites all paths to the SPA shell.

## 🚀 Quick Start

```bash
git clone https://github.com/bayupradityaa/comotui.git
cd ComotUI
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## 🏗️ Project Structure

```
src/
├── App.jsx                          # Router shell (Navbar + routes + Footer)
├── pages/
│   ├── Home.jsx                     # Homepage composition
│   ├── ComponentExplorer.jsx        # /components
│   └── ComponentDetail.jsx          # /components/:slug
├── components/
│   ├── Navbar.jsx                   # Sticky nav + ⌘K search dialog
│   ├── SearchCommand.jsx            # Command palette (components + categories)
│   ├── ThemeToggle.jsx              # Light / Dark / System
│   ├── ComponentCard.jsx            # Grid tile → detail page
│   ├── ComponentGrid.jsx            # Responsive grid + "coming soon" tile
│   ├── FeaturedSection.jsx          # Live receipt preview on home
│   ├── LiveReceiptDemo.jsx          # Interactive printer demo
│   ├── CopyButton.jsx               # Idle → Copied feedback
│   ├── Hero.jsx / Footer.jsx / CTASection.jsx
│   ├── code/CodeViewer.jsx          # Syntax-highlighted source viewer
│   ├── ui/                          # ★ Real reusable components
│   │   ├── ReceiptPrinter.jsx
│   │   └── StatusBadge.jsx
│   └── demo/                        # Preview fixtures
├── lib/
│   ├── registry.jsx                 # ★ Component registry (single source of truth)
│   ├── github.jsx                   # GitHub identity
│   └── utils.js                     # cn(), formatting
└── hooks/useTheme.js                # Light / dark / system resolution
```

## 🔌 Component registry

The single source of truth lives in `src/lib/registry.jsx`. Add a component here
and the homepage grid, search palette, and detail page all pick it up — no page
rewriting needed. Source is imported via Vite `?raw` so the Code tab always shows
the **real** component source.

```ts
{
  slug: "receipt-printer",
  name: "Receipt Printer",
  category: "Commerce",
  description: "…",
  framework: "React",
  styling: "Tailwind",
  dependencies: ["lucide-react", "framer-motion"],
  component: ReceiptPrinter,
  source: receiptPrinterSource,   // ?raw import → real code
  usage: "<ReceiptPrinter />",
  installation: "npm install lucide-react framer-motion",
  featured: true,
}
```

To add a new component: **create the component → add metadata → run `?raw` source → register it.** Grid, search, and detail page handle the rest.

## 🎨 Design

- **Font:** Plus Jakarta Sans (JetBrains Mono for code)
- **Palette:** neutral-first (light `#FCFCFD`) + deep-navy dark (`#091540`), with a restrained blue accent
- **Principles:** less decoration, more product — actual component previews over decorative graphics
- **Dark mode:** developer-environment dark, persistent preference, system fallback

## 📄 License

MIT