"use client";

import { cn } from "@/lib/utils";
import { SaveModal } from "./save-modal";
import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
} from "react";

type ExperimentId = "save-modal" | "exploding-heart" | "wand-cursor";

type LabExperiment = {
  id: ExperimentId;
  name: string;
  summary: string;
  tone: "dark" | "page";
  /** Fill the frame instead of centering (playgrounds that need the full hit area). */
  fill: boolean;
  /** How many gallery columns the card occupies. */
  span: 1 | 2;
};

const experiments: LabExperiment[] = [
  {
    id: "save-modal",
    name: "Save modal",
    summary:
      "Leave a draft with unsaved notes — save, retry, or stay, including slow and offline.",
    tone: "page",
    fill: true,
    span: 2,
  },
  {
    id: "exploding-heart",
    name: "Exploding heart",
    summary: "A like button that bursts pastel particles when you tap it on.",
    tone: "dark",
    fill: false,
    span: 1,
  },
  {
    id: "wand-cursor",
    name: "Wand cursor",
    summary: "A custom wand cursor that sprinkles sparkles wherever you click.",
    tone: "dark",
    fill: true,
    span: 1,
  },
];

const previewLoaders: Record<
  Exclude<ExperimentId, "save-modal">,
  () => Promise<ComponentType>
> = {
  "exploding-heart": () =>
    import("./exploding-heart").then((mod) => mod.ExplodingHeart),
  "wand-cursor": () =>
    import("./custom-cursor").then(({ CustomCursor }) => {
      function WandPlayground() {
        return (
          <CustomCursor className="flex size-full items-center justify-center">
            <p className="pointer-events-none select-none text-sm text-stone-300">
              Click to cast
            </p>
          </CustomCursor>
        );
      }
      return WandPlayground;
    }),
};

function frameClass(tone: LabExperiment["tone"]) {
  return tone === "dark" ? "bg-[hsl(210_15%_6%)]" : "bg-background";
}

export function LabGallery() {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
      {experiments.map((experiment) => (
        <ExperimentCard key={experiment.id} experiment={experiment} />
      ))}
    </div>
  );
}

function ExperimentCard({ experiment }: { experiment: LabExperiment }) {
  const wide = experiment.span === 2;

  return (
    <article
      className={cn(
        "relative min-w-0 overflow-hidden rounded-xl border border-border bg-card",
        wide && "md:col-span-2",
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-[12px]",
          wide ? "" : "aspect-square",
          frameClass(experiment.tone),
        )}
      >
        <div
          className={
            experiment.fill
              ? wide
                ? "flex w-full min-w-0 justify-center p-4 md:p-6"
                : "absolute inset-0"
              : "flex size-full items-center justify-center p-6 md:p-8"
          }
        >
          {experiment.id === "save-modal" ? (
            <SaveModal />
          ) : (
            <DeferredPreview load={previewLoaders[experiment.id]} />
          )}
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-base font-semibold leading-tight tracking-[-0.011em] md:text-lg">
          {experiment.name}
        </h2>
        <p className="mt-2 text-pretty text-sm text-stone-600 dark:text-stone-400">
          {experiment.summary}
        </p>
      </div>
    </article>
  );
}

function DeferredPreview({ load }: { load: () => Promise<ComponentType> }) {
  const ref = useRef<HTMLDivElement>(null);
  const [Preview, setPreview] = useState<ComponentType | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let cancelled = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        void load().then((Loaded) => {
          if (!cancelled) setPreview(() => Loaded);
        });
      },
      { rootMargin: "80px 0px" },
    );
    io.observe(node);

    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, [load]);

  return (
    <div ref={ref} className="size-full">
      {Preview ? <Preview /> : null}
    </div>
  );
}
