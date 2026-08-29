"use client";

import { cn } from "@/lib/utils";
import { ROSE_VIEW, buildRosePath } from "@/lib/rose-path";
import {
  animate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

/**
 * RoseDemo — epitrochoid as an SVG stroke:
 *   x = R·cos(t) − d·cos(k·t)
 *   y = R·sin(t) − d·sin(k·t)
 *
 * Sliders write R, k, d 1:1. Motion only springs those values back on reset.
 */
const DEFAULTS = { R: 7, k: 7, d: 3 } as const;
const RESET_SPRING = { type: "spring", duration: 0.5, bounce: 0 } as const;

const RANGE_CLASS = [
  "m-0 h-4 w-full cursor-pointer appearance-none bg-transparent outline-none",
  "focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f5c518]",
  "[&::-webkit-slider-runnable-track]:h-[3px] [&::-webkit-slider-runnable-track]:rounded-full",
  "[&::-webkit-slider-runnable-track]:bg-[linear-gradient(to_right,#fff_var(--pct),rgba(255,255,255,0.18)_var(--pct))]",
  "[&::-webkit-slider-thumb]:mt-[-4.5px] [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-none",
  "[&::-moz-range-track]:h-[3px] [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-[rgba(255,255,255,0.18)]",
  "[&::-moz-range-progress]:h-[3px] [&::-moz-range-progress]:rounded-full [&::-moz-range-progress]:bg-white",
  "[&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-none",
].join(" ");

function formatD(n: number) {
  const rounded = Math.round(n * 2) / 2;
  return Number.isInteger(rounded) ? `${rounded}` : rounded.toFixed(1);
}

export function RoseDemo() {
  const R = useMotionValue<number>(DEFAULTS.R);
  const k = useMotionValue<number>(DEFAULTS.k);
  const d = useMotionValue<number>(DEFAULTS.d);
  const reduce = useReducedMotion();
  const anims = useRef<Array<ReturnType<typeof animate>>>([]);

  const [dirty, setDirty] = useState(false);

  const syncDirty = useCallback(() => {
    setDirty(
      R.get() !== DEFAULTS.R || k.get() !== DEFAULTS.k || d.get() !== DEFAULTS.d,
    );
  }, [R, d, k]);

  useMotionValueEvent(R, "change", syncDirty);
  useMotionValueEvent(k, "change", syncDirty);
  useMotionValueEvent(d, "change", syncDirty);

  const stopReset = useCallback(() => {
    anims.current.forEach((a) => a.stop());
    anims.current = [];
  }, []);

  const reset = useCallback(() => {
    stopReset();
    if (reduce) {
      R.set(DEFAULTS.R);
      k.set(DEFAULTS.k);
      d.set(DEFAULTS.d);
      return;
    }
    anims.current = [
      animate(R, DEFAULTS.R, RESET_SPRING),
      animate(k, DEFAULTS.k, RESET_SPRING),
      animate(d, DEFAULTS.d, RESET_SPRING),
    ];
  }, [R, d, k, reduce, stopReset]);

  return (
    <figure className="not-prose relative left-1/2 box-border my-8 w-[min(800px,calc(100vw-2rem))] max-w-none -translate-x-1/2 rounded-[1.25rem] border border-white/10 bg-[#0f0f0f] px-7 pb-7 pt-6">
      <Formula R={R} k={k} d={d} />

      <div className="grid grid-cols-[minmax(0,1fr)_240px] items-center gap-8 max-[720px]:grid-cols-1 max-[720px]:gap-6">
        <div className="aspect-square w-full">
          <RoseStage R={R} k={k} d={d} />
        </div>

        <div className="grid content-start gap-[1.15rem]">
          <Control label="R" value={R} min={2} max={12} step={1} onInteract={stopReset} />
          <Control label="k" value={k} min={2} max={12} step={1} onInteract={stopReset} />
          <Control
            label="d"
            value={d}
            min={0.5}
            max={8}
            step={0.5}
            format={formatD}
            onInteract={stopReset}
          />
          <button
            type="button"
            className={cn(
              "mt-[0.35rem] min-h-11 cursor-pointer justify-self-start rounded-full border border-white/55 bg-transparent px-5 py-[0.4rem] font-sans text-[0.82rem] text-white",
              "transition-[opacity,background-color,transform] duration-150 ease",
              "hoverable:hover:bg-white/[0.06] active:scale-[0.97]",
              "motion-reduce:transition-[opacity,background-color] motion-reduce:active:scale-100",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#f5c518]",
              "disabled:cursor-default",
              dirty ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
            )}
            onClick={reset}
            disabled={!dirty}
            aria-hidden={!dirty}
            aria-label="Reset to original values"
            tabIndex={dirty ? 0 : -1}
          >
            Reset
          </button>
        </div>
      </div>
    </figure>
  );
}

const RoseStage = memo(function RoseStage({
  R,
  k,
  d,
}: {
  R: MotionValue<number>;
  k: MotionValue<number>;
  d: MotionValue<number>;
}) {
  const pathRef = useRef<SVGPathElement>(null);

  const apply = useCallback(() => {
    const el = pathRef.current;
    if (!el) return;
    el.setAttribute("d", buildRosePath(R.get(), k.get(), d.get()));
  }, [R, d, k]);

  useMotionValueEvent(R, "change", apply);
  useMotionValueEvent(k, "change", apply);
  useMotionValueEvent(d, "change", apply);
  useEffect(apply, [apply]);

  return (
    <svg
      className="block size-full"
      viewBox={`0 0 ${ROSE_VIEW} ${ROSE_VIEW}`}
      aria-hidden="true"
    >
      <path
        ref={pathRef}
        className="fill-none stroke-[#f5c518] stroke-[4] [filter:drop-shadow(0_0_2.5px_color-mix(in_srgb,#f5c518_38%,transparent))]"
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
});

function Formula({
  R,
  k,
  d,
}: {
  R: MotionValue<number>;
  k: MotionValue<number>;
  d: MotionValue<number>;
}) {
  const [r, setR] = useState(R.get());
  const [kk, setK] = useState(k.get());
  const [dd, setD] = useState(d.get());
  useMotionValueEvent(R, "change", setR);
  useMotionValueEvent(k, "change", setK);
  useMotionValueEvent(d, "change", setD);

  return (
    <div className="mb-5 whitespace-pre-line text-left font-mono text-[0.72rem] leading-[1.75] tracking-[0.02em] text-[#8a8a8a]">
      {`x = ${Math.round(r)}cos(t) − ${formatD(dd)}·cos(${Math.round(kk)}t)`}
      {"\n"}
      {`y = ${Math.round(r)}sin(t) − ${formatD(dd)}·sin(${Math.round(kk)}t)`}
    </div>
  );
}

function Control({
  label,
  value,
  min,
  max,
  step,
  format = (n) => `${Math.round(n)}`,
  onInteract,
}: {
  label: string;
  value: MotionValue<number>;
  min: number;
  max: number;
  step: number;
  format?: (n: number) => string;
  onInteract: () => void;
}) {
  const [current, setCurrent] = useState(() => value.get());
  useMotionValueEvent(value, "change", setCurrent);
  const pct = ((current - min) / (max - min)) * 100;

  return (
    <label className="grid gap-[0.45rem] font-sans text-[0.82rem] text-[#f2f2f2]">
      <span className="flex items-baseline justify-between text-[#c8c8c8]">
        <span>{label}</span>
        <span className="tabular-nums">{format(current)}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={current}
        className={RANGE_CLASS}
        style={{ "--pct": `${pct}%` } as CSSProperties}
        onPointerDown={onInteract}
        onChange={(e) => value.set(Number(e.target.value))}
        aria-label={`${label} (${format(current)})`}
      />
    </label>
  );
}
