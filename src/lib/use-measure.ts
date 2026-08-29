"use client";

import { useLayoutEffect, useRef, useState } from "react";

/**
 * Tracks an element's live size. Motion cannot animate `auto → auto` height,
 * so the dock measures its panel and animates to this pixel value instead.
 */
export function useMeasure<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [bounds, setBounds] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      setBounds({ width: rect.width, height: rect.height });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, bounds] as const;
}
