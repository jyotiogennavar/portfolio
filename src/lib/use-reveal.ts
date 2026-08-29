"use client";

import { useLayoutEffect, type RefObject } from "react";

const DURATION = 700;
const STAGGER = 70;
const DISTANCE = 14;
const BLUR = 4;
const EASING = "cubic-bezier(0.23, 1, 0.32, 1)";

/**
 * First-load entrance. This is predetermined one-shot motion, so WAAPI
 * (not Motion) owns it — no React re-renders, and it stays off the bundle
 * path that the dock and hover pill need.
 *
 * Tailwind hides `[data-reveal]` while `data-reveal-pending` is on the root.
 * We drop that attribute, then stagger each node: fade + 14px rise + 4px blur,
 * 70ms apart, expo-out. Reduced motion skips the animation entirely.
 */
export function useReveal(rootRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.removeAttribute("data-reveal-pending");
    if (reduce) return;

    const nodes = [...root.querySelectorAll<HTMLElement>("[data-reveal]")];
    const animations = nodes.map((el, index) =>
      el.animate(
        [
          {
            opacity: 0,
            transform: `translateY(${DISTANCE}px)`,
            filter: `blur(${BLUR}px)`,
          },
          { opacity: 1, transform: "none", filter: "blur(0px)" },
        ],
        {
          duration: DURATION,
          delay: index * STAGGER,
          easing: EASING,
          fill: "both",
        },
      ),
    );

    return () => {
      animations.forEach((animation) => animation.cancel());
    };
  }, [rootRef]);
}
