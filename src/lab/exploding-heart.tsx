"use client";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties } from "react";

type ExplodingHeartProps = {
  className?: string;
};

type Particle = {
  id: number;
  x: number;
  y: number;
  rotate: number;
  size: number;
  color: string;
};

const FADE_DURATION = 1000;
const MAGNITUDE = 80;
const NUM_OF_PARTICLES = 48;
const HEART_RED = "oklch(0.65 0.3 19.41)";
const HEART_PATH =
  "M3.68546 5.43796C8.61936 1.29159 11.8685 7.4309 12.0406 7.4309C12.2126 7.43091 15.4617 1.29159 20.3956 5.43796C26.8941 10.8991 13.5 21.8215 12.0406 21.8215C10.5811 21.8215 -2.81297 10.8991 3.68546 5.43796Z";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomUltraBrightPastel() {
  return `hsl(${randomInt(0, 360)} ${randomInt(65, 85)}% ${randomInt(80, 92)}%)`;
}

export function ExplodingHeart({ className }: ExplodingHeartProps) {
  const reduce = useReducedMotion();
  const [liked, setLiked] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const nextId = useRef(0);
  const timeouts = useRef<number[]>([]);

  useEffect(() => {
    const ids = timeouts.current;
    return () => {
      ids.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  function handleClick() {
    const next = !liked;
    setLiked(next);
    if (!next || reduce) return;

    const burst: Particle[] = Array.from({ length: NUM_OF_PARTICLES }, () => ({
      id: nextId.current++,
      x: randomInt(-MAGNITUDE, MAGNITUDE),
      y: randomInt(-MAGNITUDE, MAGNITUDE),
      rotate: randomInt(0, 360),
      size: randomInt(10, 20),
      color: randomUltraBrightPastel(),
    }));

    setParticles((prev) => [...prev, ...burst]);

    const timeoutId = window.setTimeout(() => {
      setParticles((prev) =>
        prev.filter((particle) => !burst.some((item) => item.id === particle.id)),
      );
    }, FADE_DURATION + 200);
    timeouts.current.push(timeoutId);
  }

  return (
    <button
      type="button"
      aria-pressed={liked}
      data-liked={liked}
      onClick={handleClick}
      className={cn(
        "relative cursor-pointer rounded-full border-none bg-transparent p-5",
        "transition-transform duration-150 [transition-timing-function:ease] motion-reduce:transition-none",
        "hoverable:hover:scale-90 hoverable:hover:bg-white/10",
        "data-[liked=true]:scale-110 hoverable:hover:data-[liked=true]:scale-110",
        "motion-reduce:hoverable:hover:scale-100 motion-reduce:data-[liked=true]:scale-100",
        "hoverable:hover:[&:not([data-liked=true])_path]:fill-[oklch(0.65_0.3_19.41)]",
        "hoverable:hover:[&:not([data-liked=true])_path]:stroke-[oklch(0.65_0.3_19.41)]",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="relative block size-24"
      >
        <path
          d={HEART_PATH}
          fill={liked ? HEART_RED : "none"}
          stroke={liked ? HEART_RED : "white"}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <span className="sr-only">Like this post</span>
      {particles.map((particle) => (
        <span
          key={particle.id}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 m-auto animate-exploding-heart-particle rounded-full"
          style={
            {
              width: particle.size,
              height: particle.size,
              background: particle.color,
              transform: `translate(${particle.x}px, ${particle.y}px) rotate(${particle.rotate}deg)`,
              "--fade-duration": `${FADE_DURATION}ms`,
            } as CSSProperties
          }
        />
      ))}
    </button>
  );
}
