import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "../lib/lenis";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    // Jump to top instantly on navigation. Going through Lenis keeps the
    // virtual scroll position in sync (window.scrollTo would fight it).
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  return null;
}