"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Animates a number from 0 → target over `duration` ms (cubic ease-out).
 * Returns the current display value.
 */
export function useCountUp(
  target: number,
  duration = 600,
  enabled = true,
): number {
  const [current, setCurrent] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const startTime = performance.now();

    function easeOut(t: number) {
      return 1 - Math.pow(1 - t, 3);
    }

    function tick(now: number) {
      const progress = Math.min((now - startTime) / duration, 1);
      setCurrent(Math.round(target * easeOut(progress)));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, enabled]);

  return current;
}
