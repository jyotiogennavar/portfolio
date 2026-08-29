"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import type { LabProject } from "./projects";

type WorkDetailProps = {
  project: LabProject | null;
  onClose: () => void;
  /** Position inside the parent instead of the viewport (lab gallery card). */
  contained?: boolean;
};

export function WorkDetail({
  project,
  onClose,
  contained = false,
}: WorkDetailProps) {
  const reduce = useReducedMotion();
  const backRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const previous = document.activeElement;
    backRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      // Capture + stop so a parent gallery doesn't close on the same key.
      event.preventDefault();
      event.stopImmediatePropagation();
      onClose();
    };
    window.addEventListener("keydown", onKey, true);
    return () => {
      window.removeEventListener("keydown", onKey, true);
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          key={project.id}
          className={
            contained
              ? "absolute inset-0 z-[6] overflow-y-auto overscroll-contain bg-background"
              : "fixed inset-0 z-[6] overflow-y-auto overscroll-contain bg-background"
          }
          role="dialog"
          aria-modal={contained ? undefined : true}
          aria-labelledby="lab-detail-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          // Overlay leaves fast so the shared-element morph isn't waiting on a fade.
          exit={{ opacity: 0, transition: { duration: 0.05 } }}
        >
          <div
            className={
              contained
                ? "flex h-full flex-col px-4 py-4"
                : "mx-auto w-[min(100%-48px,580px)] pt-24 pb-[calc(96px+env(safe-area-inset-bottom))] max-sm:w-[calc(100%-32px)] max-sm:pt-[72px] max-sm:pb-[calc(112px+env(safe-area-inset-bottom))]"
            }
          >
            <div className={contained ? "mb-3 flex items-center gap-2" : "mb-5 flex items-center gap-2.5"}>
              <button
                type="button"
                ref={backRef}
                className="relative inline-flex size-5 shrink-0 cursor-pointer touch-manipulation items-center justify-center border-0 bg-transparent p-0 text-muted-foreground before:absolute before:inset-[-12px] before:content-[''] hoverable:hover:text-foreground focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_2px_hsl(var(--ring))] active:scale-[0.96]"
                onClick={onClose}
                aria-label="Back to projects"
              >
                <BackArrow />
              </button>
              <motion.h2
                id="lab-detail-title"
                className={
                  contained
                    ? "relative z-[8] m-0 w-fit text-base font-medium leading-tight tracking-[-0.02em]"
                    : "relative z-[8] m-0 w-fit text-[32px] font-medium leading-[1.2] tracking-[-0.03em] max-sm:text-[26px]"
                }
                layoutId={reduce ? undefined : `project-title-${project.id}`}
                style={{ borderRadius: 0 }}
              >
                {project.name}
              </motion.h2>
              <motion.p
                className={
                  contained
                    ? "relative z-[8] m-0 ml-auto shrink-0 text-xs leading-tight tracking-[-0.01em] text-muted-foreground/85 tabular-nums"
                    : "relative z-[8] m-0 ml-auto shrink-0 text-base leading-normal tracking-[-0.01em] text-muted-foreground/85 tabular-nums max-sm:text-sm"
                }
                layoutId={reduce ? undefined : `project-year-${project.id}`}
                style={{ borderRadius: 0 }}
              >
                {project.period}
              </motion.p>
            </div>

            <div className="w-full h-full">
              {/* Continues the hover-frame layoutId so the bordered box flies here. */}
              <motion.div
                className="block aspect-[1440/852] w-full rounded-[10px] border border-border bg-background"
                layoutId={reduce ? undefined : "project-preview"}
                aria-hidden="true"
                style={{ borderRadius: 10 }}
              />
            </div>

            {/*
              Description only exists in the open state. `layout` lets it ride
              the height change; the exit is short so it doesn't linger while
              the shared elements shrink back to the list.
            */}
            <motion.p
              className={
                contained
                  ? "mt-3 text-xs leading-relaxed tracking-[-0.01em] text-pretty text-muted-foreground"
                  : "mt-6 text-lg leading-[1.6] tracking-[-0.011em] text-pretty text-muted-foreground max-sm:text-base"
              }
              layout={!reduce}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
            >
              {project.summary}
            </motion.p>

            {project.href ? (
              <motion.a
                className={
                  contained
                    ? "mt-3 inline-flex text-xs text-foreground underline decoration-border underline-offset-[0.2em] hoverable:hover:decoration-current"
                    : "mt-5 inline-flex text-[15px] text-foreground underline decoration-border underline-offset-[0.2em] hoverable:hover:decoration-current"
                }
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.05 } }}
              >
                View on GitHub
              </motion.a>
            ) : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function BackArrow() {
  return (
    <svg viewBox="0 0 16 16" width="20" height="20" aria-hidden="true">
      <path
        d="M14 8H2.5m4.5 4.5L2.5 8 7 3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
