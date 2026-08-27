import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import ComponentExplorer from "./pages/ComponentExplorer";
import ComponentDetail from "./pages/ComponentDetail";

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--accent-soft)]">
      <ScrollToTop />
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/components" element={<ComponentExplorer />} />
          <Route path="/components/:slug" element={<ComponentDetail />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}