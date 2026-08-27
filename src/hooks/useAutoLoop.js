import { useEffect, useRef, useState } from "react";

/**
 * Generically auto-loops through a list of states, driving a demo preview.
 * - Respects prefers-reduced-motion: no timers, freezes on the first state.
 * - Each state holds its own duration so animations feel deliberate.
 * - `renderKey` lets callers force the transition to a known state
 *   (e.g. finishing the receipt in "complete") before resetting.
 */
export function useAutoLoop(states, { honorReducedMotion = true } = {}) {
  const [index, setIndex] = useState(0);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduce = honorReducedMotion && prefersReduced.matches;
    if (reduce || states.length <= 1) {
      setIndex(0);
      return () => {
        mounted.current = false;
      };
    }

    let timeout;
    const tick = () => {
      timeout = window.setTimeout(() => {
        if (!mounted.current) return;
        setIndex((i) => (i + 1) % states.length);
        tick();
      }, states[index].hold ?? 1600);
    };
    tick();

    return () => {
      mounted.current = false;
      window.clearTimeout(timeout);
    };
  }, [states, index, honorReducedMotion]);

  return { index, state: states[index] };
}