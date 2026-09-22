"use client";

import { LayoutGroup, MotionConfig } from "motion/react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { LabProject } from "./projects";
import { SiteDock } from "./site-dock";
import { useReveal } from "../../lib/use-reveal";
import { WorkDetail } from "./work-detail";
import { WorkList } from "./work-list";

type LabSurfaceProps = {
  /**
   * Gallery embed: stay inside the parent, don't hide site chrome,
   * and skip the first-load reveal / dock.
   */
  embed?: boolean;
};

/**
 * Shared-element project list. Full-page mode is a viewport overlay so /lab
 * can hide the real site chrome without rewriting the root layout.
 * `LayoutGroup` is what lets title/year/frame share layoutIds across the
 * list and the detail overlay.
 */
export function LabSurface({ embed = false }: LabSurfaceProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const skipRevealRef = useRef<HTMLDivElement>(null);
  const [project, setProject] = useState<LabProject | null>(null);

  useReveal(embed ? skipRevealRef : rootRef);

  useEffect(() => {
    if (embed) return;
    const chrome = document.querySelectorAll("header, footer, a[href='#content']");
    chrome.forEach((node) => node.setAttribute("inert", ""));
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      chrome.forEach((node) => node.removeAttribute("inert"));
      document.body.style.overflow = previousOverflow;
    };
  }, [embed]);

  const closeProject = useCallback(() => setProject(null), []);

  return (
    <div
      ref={rootRef}
      className={cn(
        "bg-background text-foreground",
        embed
          ? "relative isolate size-full overflow-hidden"
          : "fixed inset-0 z-modal overflow-y-auto overscroll-contain data-[locked=true]:overflow-hidden [&[data-reveal-pending]_[data-reveal]]:opacity-0 motion-reduce:[&[data-reveal-pending]_[data-reveal]]:opacity-100",
      )}
      data-reveal-pending={embed ? undefined : "true"}
      data-locked={project ? "true" : "false"}
    >
      {embed ? null : (
        <>
          <noscript>
            <style>{`[data-reveal-pending] [data-reveal]{opacity:1}`}</style>
          </noscript>
          <Link
            href="/"
            className="fixed left-4 top-[calc(16px+env(safe-area-inset-top))] z-10 inline-flex min-h-11 items-center rounded-md px-1 text-sm tracking-[-0.01em] text-muted-foreground no-underline transition-[color] duration-150 ease-out hoverable:hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            data-reveal="true"
          >
            Back to site
          </Link>
        </>
      )}

      {/* reducedMotion="user" keeps opacity/color and drops movement app-wide. */}
      <MotionConfig reducedMotion="user">
        <LayoutGroup>
          <div
            className={cn(
              "flex items-center justify-center",
              embed
                ? "size-full px-3 py-4"
                : "min-h-dvh px-4 pt-[calc(56px+env(safe-area-inset-top))] pb-[calc(96px+env(safe-area-inset-bottom))] sm:px-6",
            )}
          >
            <div className="w-full max-w-[580px]" inert={!!project}>
              <section aria-labelledby="lab-work-title">
                <h2
                  id="lab-work-title"
                  className={
                    embed
                      ? "sr-only"
                      : "m-0 text-[15px] font-normal leading-normal tracking-[-0.01em] text-muted-foreground"
                  }
                  data-reveal={embed ? undefined : "true"}
                >
                  Projects
                </h2>
                <WorkList
                  openId={project?.id ?? null}
                  onOpen={setProject}
                  contained={embed}
                />
              </section>
            </div>
          </div>

          <WorkDetail
            project={project}
            onClose={closeProject}
            contained={embed}
          />
          {embed ? null : <SiteDock hidden={!!project} />}
        </LayoutGroup>
      </MotionConfig>
    </div>
  );
}
