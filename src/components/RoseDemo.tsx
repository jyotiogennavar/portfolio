"use client";

import { useState, type CSSProperties } from "react";

/**
 * RoseDemo — a seven-petal rose (r = cos(kθ)) rendered as glowing dots whose
 * positions are computed entirely by CSS sin()/cos(). React only holds the
 * parameters; the cascade does the geometry.
 *
 * Drop this in components/blog/RoseDemo.tsx and import it from the MDX.
 */
export function RoseDemo() {
  const [k, setK] = useState(7);
  const [density, setDensity] = useState(220);
  const [scale, setScale] = useState(150);

  // odd k closes the curve in half a sweep; even k needs the full 360°
  const turns = k % 2 === 0 ? 1 : 0.5;
  const dots = Array.from({ length: density }, (_, i) => (i / density) * 360 * turns);

  const petalLabel = k % 2 === 0 ? `${2 * k} petals` : `${k} petals`;

  return (
    <div className="rosedemo">
      <div
        className="rosedemo__stage"
        style={{ "--k": k, "--scale": `${scale}px` } as CSSProperties}
      >
        <div className="rosedemo__axis rosedemo__axis--x" />
        <div className="rosedemo__axis rosedemo__axis--y" />
        {dots.map((t, i) => (
          <span
            key={i}
            className="rosedemo__dot"
            style={{ "--t": `${t}deg` } as CSSProperties}
          />
        ))}
      </div>

      <div className="rosedemo__controls">
        <Control
          label="k"
          hint={petalLabel}
          value={k}
          min={1}
          max={12}
          step={1}
          onChange={setK}
        />
        <Control
          label="density"
          hint={`${density} dots`}
          value={density}
          min={40}
          max={400}
          step={20}
          onChange={setDensity}
        />
        <Control
          label="scale"
          hint={`${scale}px`}
          value={scale}
          min={80}
          max={170}
          step={5}
          onChange={setScale}
        />
      </div>

      <style>{css}</style>
    </div>
  );
}

function Control({
  label,
  hint,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="rosedemo__ctrl">
      <span className="rosedemo__ctrl-label">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={`${label} (${hint})`}
      />
      <span className="rosedemo__ctrl-hint tabular-nums">{hint}</span>
    </label>
  );
}

const css = `
.rosedemo {
  --accent: #e8c97a;
  --radius: 1.5rem;
  background: #0f0f18;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: var(--radius);
  padding: 2rem;
  display: grid;
  gap: 1.5rem;
}
.rosedemo__stage {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  max-width: 380px;
  margin: 0 auto;
  display: grid;
  place-items: center;
}
.rosedemo__axis {
  position: absolute;
  background: rgba(255,255,255,0.05);
  pointer-events: none;
}
.rosedemo__axis--x { width: 88%; height: 1px; }
.rosedemo__axis--y { width: 1px; height: 88%; }

/* Each dot positions itself with CSS trig. --t is its angle; --k the petal
   count; --scale the radius in px. r = cos(k·t), then x=cos(t)·r, y=sin(t)·r. */
.rosedemo__dot {
  --r: cos(calc(var(--k) * var(--t)));
  --x: calc(cos(var(--t)) * var(--r) * var(--scale));
  --y: calc(sin(var(--t)) * var(--r) * var(--scale) * -1);
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--accent);
  transform: translate(var(--x), var(--y));
  pointer-events: none;
  box-shadow:
    0 0 4px var(--accent),
    0 0 12px color-mix(in srgb, var(--accent) 70%, transparent),
    0 0 22px color-mix(in srgb, var(--accent) 40%, transparent);
}

.rosedemo__controls {
  display: grid;
  gap: 0.9rem;
  max-width: 380px;
  width: 100%;
  margin: 0 auto;
}
.rosedemo__ctrl {
  display: grid;
  grid-template-columns: 4.5rem 1fr 4.5rem;
  align-items: center;
  gap: 0.8rem;
  font-family: ui-monospace, "Space Mono", monospace;
  font-size: 0.72rem;
  color: #d4cfc4;
}
.rosedemo__ctrl-label { color: var(--accent); }
.rosedemo__ctrl-hint { color: #5a5650; text-align: right; }

.rosedemo input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 2px;
  background: rgba(255,255,255,0.12);
  outline: none;
  cursor: pointer;
}
.rosedemo input[type="range"]:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 4px;
}
.rosedemo input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 8px var(--accent);
}
.rosedemo input[type="range"]::-moz-range-thumb {
  width: 12px;
  height: 12px;
  border: none;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 8px var(--accent);
}

@media (prefers-reduced-motion: reduce) {
  .rosedemo__dot { transition: none; }
}
`;
