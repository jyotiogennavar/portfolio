/** Epitrochoid used by the seven-petal rose: x = R·cos(t) − d·cos(k·t) */

export const ROSE_DEFAULTS = { R: 7, k: 7, d: 3 } as const;
export const ROSE_VIEW = 100;

const CX = 50;
const CY = 50;
const FIT = 44;
const STEPS = 900;

export function buildRosePath(
  R: number = ROSE_DEFAULTS.R,
  k: number = ROSE_DEFAULTS.k,
  d: number = ROSE_DEFAULTS.d,
) {
  const scale = FIT / (R + d + 0.5);
  const parts = new Array<string>(STEPS + 1);
  for (let i = 0; i <= STEPS; i++) {
    const t = (i / STEPS) * Math.PI * 2;
    const x = CX + (R * Math.cos(t) - d * Math.cos(k * t)) * scale;
    const y = CY - (R * Math.sin(t) - d * Math.sin(k * t)) * scale;
    parts[i] = `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return parts.join("");
}

export const ROSE_PATH = buildRosePath();
