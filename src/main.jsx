import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Lenis from "lenis/react";
import App from "./App";
import "./index.css";

/** Respect prefers-reduced-motion: skip Lenis entirely so scrolling is native. */
const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {prefersReducedMotion ? (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    ) : (
      <Lenis root options={{ lerp: 0.1, wheelMultiplier: 1 }}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Lenis>
    )}
  </StrictMode>,
);