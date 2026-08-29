"use client";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";

type CustomCursorProps = {
  className?: string;
  children?: ReactNode;
};

type Sparkle = {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  rotate: number;
};

const FADE_DURATION = 1000;
const FADE_DELAY = 300;
const SPARKLE_COUNT = 10;
const SPARKLE_PATH =
  "M6.52883 3.29752L4.73958 2.38585C3.22909 1.61622 1.6162 3.2291 2.38584 4.73959L3.2975 6.52884C3.34667 6.62534 3.32811 6.74253 3.25153 6.81911L1.83158 8.23906C0.632845 9.4378 1.66838 11.4702 3.34277 11.205L5.32616 10.8908C5.43314 10.8739 5.53886 10.9277 5.58803 11.0242L6.49969 12.8135C7.26932 14.324 9.52221 13.9672 9.78741 12.2928L10.1015 10.3094C10.1185 10.2024 10.2024 10.1185 10.3094 10.1016L12.2927 9.78742C13.9671 9.52222 14.324 7.26933 12.8135 6.4997L11.0242 5.58804C10.9277 5.53887 10.8739 5.43315 10.8908 5.32618L11.2049 3.34279C11.4701 1.6684 9.43779 0.632852 8.23905 1.83159L6.8191 3.25154C6.74252 3.32813 6.62533 3.34669 6.52883 3.29752Z";

function wandSvg(pressed: boolean) {
  const transform = pressed
    ? "transform: rotate(10deg); transform-origin: 80% 80%;"
    : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="48" style="fill: none; overflow: visible; ${transform}"><path d="M21 21L12 12" stroke="hsl(210 15% 6%)" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" /><path d="${SPARKLE_PATH}" fill="hsl(50 100% 50%)" stroke="hsl(210 15% 6%)" stroke-width="1.5" /><path d="M21 21L13 13" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></svg>`;
}

function cursorValue(pressed: boolean) {
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(wandSvg(pressed))}") 0 0, auto`;
}

const WAND_CURSOR = cursorValue(false);
const WAND_CURSOR_ACTIVE = cursorValue(true);

const CUSTOM_CURSOR_STYLES = `
@media (hover: hover) and (pointer: fine) {
  .custom-cursor {
    cursor: ${WAND_CURSOR};
  }
  .custom-cursor:active {
    cursor: ${WAND_CURSOR_ACTIVE};
  }
}

@keyframes custom-cursor-disperse {
  from {
    transform: translate(0px, 0px) rotate(0deg);
  }
}

@keyframes custom-cursor-fade {
  to {
    opacity: 0;
  }
}

.custom-cursor-sparkle {
  position: absolute;
  user-select: none;
  pointer-events: none;
  animation:
    custom-cursor-disperse 1000ms cubic-bezier(0.26, 0.95, 0, 1),
    custom-cursor-fade var(--fade-duration) ease;
  animation-delay: 0ms, var(--fade-delay);
  animation-fill-mode: forwards;
}
`;

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function polarToCartesian(angleDeg: number, distance: number) {
  const radians = (angleDeg * Math.PI) / 180;
  return {
    x: Math.cos(radians) * distance,
    y: Math.sin(radians) * distance,
  };
}

export function CustomCursor({ className, children }: CustomCursorProps) {
  const reduce = useReducedMotion();
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const nextId = useRef(0);
  const timeouts = useRef<number[]>([]);

  useEffect(() => {
    const ids = timeouts.current;
    return () => {
      ids.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    if (reduce) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const originX = event.clientX - rect.left;
    const originY = event.clientY - rect.top;

    const burst: Sparkle[] = Array.from({ length: SPARKLE_COUNT }, () => {
      const { x, y } = polarToCartesian(
        randomInt(225 - 30, 225 + 30),
        randomInt(30, 90),
      );

      return {
        id: nextId.current++,
        x: originX,
        y: originY,
        dx: x,
        dy: y,
        rotate: randomInt(90, 360),
      };
    });

    setSparkles((prev) => [...prev, ...burst]);

    const timeoutId = window.setTimeout(() => {
      setSparkles((prev) =>
        prev.filter((sparkle) => !burst.some((item) => item.id === sparkle.id)),
      );
    }, FADE_DURATION + FADE_DELAY + 200);
    timeouts.current.push(timeoutId);
  }

  return (
    <div
      className={cn("custom-cursor relative overflow-hidden", className)}
      onClick={handleClick}
    >
      <style href="custom-cursor" precedence="medium">
        {CUSTOM_CURSOR_STYLES}
      </style>
      {children}
      {sparkles.map((sparkle) => (
        <svg
          key={sparkle.id}
          aria-hidden="true"
          viewBox="0 0 16 16"
          width="16"
          height="16"
          fill="none"
          className="custom-cursor-sparkle"
          style={
            {
              top: sparkle.y,
              left: sparkle.x,
              transform: `translate(${sparkle.dx}px, ${sparkle.dy}px) rotate(${sparkle.rotate}deg)`,
              "--fade-duration": `${FADE_DURATION}ms`,
              "--fade-delay": `${FADE_DELAY}ms`,
            } as CSSProperties
          }
        >
          <path d={SPARKLE_PATH} fill="hsl(50 100% 50%)" />
        </svg>
      ))}
    </div>
  );
}
