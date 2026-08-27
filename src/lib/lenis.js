// Lenis smooth-scroll thin wrapper.
// We mount <Lenis root> at the app root so the rAF loop is auto-managed and the
// scrollbar stays native. Components that need to animate to a target (ScrollToTop
// on route change, Navbar "Browse" quick-link) read the instance via useLenis().

export { default } from "lenis/react";
export { useLenis } from "lenis/react";