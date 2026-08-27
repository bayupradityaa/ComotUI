import Header from "./components/Header";
import Hero from "./components/Hero";
import DemoLayout from "./components/DemoLayout";
import Features from "./components/Features";
import Installation from "./components/Installation";
import Usage from "./components/Usage";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--accent-soft)]">
      {/* ─── Header ─── */}
      <Header />

      {/* ─── Main Content ─── */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <Hero />

        {/* Demo Layout: Playground + Source side by side on desktop */}
        <DemoLayout />

        {/* Features */}
        <Features />

        {/* Installation */}
        <Installation />

        {/* Usage */}
        <Usage />
      </main>

      {/* ─── Footer ─── */}
      <Footer />
    </div>
  );
}