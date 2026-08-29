"use client";

import { type ComponentType } from "react";
import { CustomCursor } from "@/lab/custom-cursor";
import { cn } from "@/lib/utils";
import { ExplodingHeart } from "./exploding-heart";

type LabExperiment = {
  id: string;
  name: string;
  summary: string;
  tone: "dark" | "page";
  /** Fill the frame instead of centering (playgrounds that need the full hit area). */
  fill: boolean;
  Preview: ComponentType;
};

function WandPlayground() {
  return (
    <CustomCursor className="flex size-full items-center justify-center">
      <p className="pointer-events-none select-none text-sm text-white/50">
        Click to cast
      </p>
    </CustomCursor>
  );
}

const experiments: LabExperiment[] = [
  {
    id: "exploding-heart",
    name: "Exploding heart",
    summary: "A like button that bursts pastel particles when you tap it on.",
    tone: "dark",
    fill: false,
    Preview: ExplodingHeart,
  },
  {
    id: "wand-cursor",
    name: "Wand cursor",
    summary: "A custom wand cursor that sprinkles sparkles wherever you click.",
    tone: "dark",
    fill: true,
    Preview: WandPlayground,
  },
];

function frameClass(tone: LabExperiment["tone"]) {
  return tone === "dark" ? "bg-[hsl(210_15%_6%)]" : "bg-background";
}

export function LabGallery() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {experiments.map((experiment) => (
        <ExperimentCard key={experiment.id} experiment={experiment} />
      ))}
    </div>
  );
}

function ExperimentCard({ experiment }: { experiment: LabExperiment }) {
  const Preview = experiment.Preview;

  return (
    <article className="relative overflow-hidden rounded-xl border border-border bg-card">
      <div
        className={cn(
          "relative aspect-square overflow-hidden rounded-[12px]",
          frameClass(experiment.tone),
        )}
      >
        <div
          className={
            experiment.fill
              ? "absolute inset-0"
              : "flex size-full items-center justify-center p-8"
          }
        >
          <Preview />
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold leading-tight tracking-[-0.011em]">
          {experiment.name}
        </h2>
        <p className="mt-2 text-pretty text-sm text-stone-600 dark:text-stone-400">
          {experiment.summary}
        </p>
      </div>
    </article>
  );
}
