import { LabGallery } from "@/lab/lab-gallery";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lab",
  description:
    "Interactive experiments and motion studies — small builds I use to learn.",
};

export default function LabsPage() {
  return (
    <div className="bg-background text-foreground">
      <div className="mb-6 mt-12 md:mb-8 md:mt-20">
        <h1 className="mb-3 text-3xl font-bold md:mb-4 md:text-4xl">Labs</h1>
        <p className="max-w-[65ch] text-pretty text-base text-stone-600 dark:text-stone-400">
          Small experiments in motion, CSS, and interaction. Things I build to
          learn how something should feel.
        </p>
      </div>

      <LabGallery />
    </div>
  );
}
