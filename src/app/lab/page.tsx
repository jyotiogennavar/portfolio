import { LabGallery } from "@/lab/lab-gallery";

export default function LabsPage() {
  return (
    <div className="bg-background text-foreground">
      <div className="mt-20 mb-8">
        <h1 className="mb-4 text-4xl font-bold">Labs</h1>
        <p className="mb-6 max-w-[65ch] text-pretty text-base text-stone-600 dark:text-stone-400">
          Small experiments in motion, CSS, and interaction. Things I build to
          learn how something should feel.
        </p>
      </div>

      <LabGallery />
    </div>
  );
}
