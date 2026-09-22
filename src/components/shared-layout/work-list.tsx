"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import { labProjects, type LabProject } from "./projects";

const PILL_SPRING = { type: "spring", duration: 0.35, bounce: 0 } as const;
const COPY_SPRING = { type: "spring", duration: 0.3, bounce: 0 } as const;
/** Brief delay so the pill doesn't flicker when moving between rows. */
const LEAVE_MS = 80;

/** Signed square so tilt lean keeps the pointer's direction (n² is always positive). */
function signedSquare(n: number) {
  return n * Math.abs(n);
}

type WorkListProps = {
  openId: string | null;
  onOpen: (project: LabProject) => void;
  /** Skip the viewport-fixed hover preview (lab gallery card). */
  contained?: boolean;
};

export function WorkList({ openId, onOpen, contained = false }: WorkListProps) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const leaveTimer = useRef<number>(0);
  /** Pointer hover gets 3D tilt; keyboard hover must not. */
  const pointerActive = useRef(false);

  const [hovered, setHovered] = useState<LabProject | null>(null);
  const [box, setBox] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0, rx: 0, ry: 0, ox: 50, oy: 50 });
  const [desktop, setDesktop] = useState(false);
  const [previewPos, setPreviewPos] = useState<{ top: number; left: number } | null>(
    null,
  );

  useEffect(() => {
    if (contained) return;
    const media = window.matchMedia("(min-width: 901px)");
    const sync = () => setDesktop(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, [contained]);

  const measure = useCallback((project: LabProject | null) => {
    const wrap = wrapRef.current;
    const row = project ? document.getElementById(project.id) : null;
    if (!wrap || !row) return;
    const wrapRect = wrap.getBoundingClientRect();
    const rowRect = row.getBoundingClientRect();
    // Pill is absolutely positioned inside the wrap, so convert to wrap-local coords.
    setBox({
      top: rowRect.top - wrapRect.top,
      left: rowRect.left - wrapRect.left,
      width: rowRect.width,
      height: rowRect.height,
    });
  }, []);

  const resetTilt = () => {
    setTilt({ x: 0, y: 0, rx: 0, ry: 0, ox: 50, oy: 50 });
  };

  const hover = (project: LabProject, source: "pointer" | "keyboard") => {
    window.clearTimeout(leaveTimer.current);
    setHovered(project);
    pointerActive.current = source === "pointer";
    if (source === "keyboard") resetTilt();
    measure(project);
  };

  const leaveSoon = () => {
    window.clearTimeout(leaveTimer.current);
    pointerActive.current = false;
    resetTilt();
    leaveTimer.current = window.setTimeout(() => setHovered(null), LEAVE_MS);
  };

  useEffect(() => () => window.clearTimeout(leaveTimer.current), []);

  const placePreview = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const wrapRect = wrap.getBoundingClientRect();
    const frameWidth = Math.min(window.innerWidth * 0.42, 420);
    const gap = 32;
    // Keep the frame beside the list, and at least 24px past viewport center
    // so it sits in the right half of the centered 580px column.
    const left = Math.max(wrapRect.right + gap, window.innerWidth / 2 + 24);
    const maxLeft = window.innerWidth - frameWidth - 24;
    setPreviewPos({
      top: wrapRect.top,
      left: Math.min(left, Math.max(24, maxLeft)),
    });
  }, []);

  useLayoutEffect(() => {
    if (!desktop) return;
    placePreview();
  }, [desktop, placePreview]);

  useEffect(() => {
    if (!desktop) return;
    const onMove = () => placePreview();
    window.addEventListener("resize", onMove);
    window.addEventListener("scroll", onMove, true);
    return () => {
      window.removeEventListener("resize", onMove);
      window.removeEventListener("scroll", onMove, true);
    };
  }, [desktop, placePreview]);

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!hovered || !pointerActive.current || reduce) return;
    const row = document.getElementById(hovered.id);
    if (!row) return;
    const rect = row.getBoundingClientRect();
    const nx = Math.max(
      -1,
      Math.min(1, (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)),
    );
    const ny = Math.max(
      -1,
      Math.min(1, (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)),
    );
    const aspect = Math.max(1, rect.width / rect.height);
    setTilt({
      rx: -ny * Math.min(1.6, 0.7 + 0.18 * aspect),
      ry: 0.8 * nx,
      x: 12 * signedSquare(nx),
      y: 8 * signedSquare(ny),
      ox: 30 + 40 * Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)),
      oy: 30 + 40 * Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height)),
    });
  };

  const showPill = hovered !== null && !openId;
  const showPreview = showPill && desktop && hovered;

  return (
    <div
      className={contained ? "relative isolate -ml-2 mt-0" : "relative isolate -ml-4 mt-3.5"}
      ref={wrapRef}
      onPointerMove={onPointerMove}
      onPointerLeave={leaveSoon}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 [perspective:1400px]"
        aria-hidden="true"
      >
        {/*
          One pill for the whole list. We animate its box to the hovered row
          instead of mounting a new highlight — that's what makes it morph.
          Tilt is pointer-only; reduced motion keeps opacity and drops movement.
        */}
        <motion.span
          className="pointer-events-none absolute left-0 top-0 h-0 w-0 rounded-2xl border border-[#e8e8ecb3] bg-[linear-gradient(#fcfcfc,#f8f8f8)] shadow-[inset_0_2px_4px_#ffffffbf,inset_0_-4px_4px_#fff6,inset_0_-4px_16px_#ffffffa6,inset_0_4px_10px_#6f6f750e,0_4px_14px_-10px_#35354f42,0_11px_28px_-10px_#35354f12] dark:border-[#1c1c1c38] dark:bg-[linear-gradient(#131313,#111)] dark:shadow-[inset_0_2px_4px_#ffffff03,inset_0_-4px_4px_#ffffff02,inset_0_-4px_16px_#ffffff03,inset_0_4px_10px_#6f6f7512,0_4px_14px_-10px_#0000000d,0_11px_28px_-10px_#00000003]"
          initial={false}
          style={{
            borderRadius: 16,
            transformOrigin: `${tilt.ox}% ${tilt.oy}%`,
          }}
          animate={{
            opacity: showPill ? 1 : 0,
            top: box.top,
            left: box.left,
            width: box.width,
            height: box.height,
            x: showPill && !reduce ? tilt.x : 0,
            y: showPill && !reduce ? tilt.y : 0,
            rotateX: showPill && !reduce ? tilt.rx : 0,
            rotateY: showPill && !reduce ? tilt.ry : 0,
          }}
          transition={reduce ? { duration: 0 } : PILL_SPRING}
        />
      </div>

      <ul className="relative z-[1] m-0 flex w-fit list-none flex-col gap-2 p-0">
        {labProjects.map((project) => {
          const active = hovered?.id === project.id && !openId;
          return (
            <li
              key={project.id}
              data-reveal={contained ? undefined : "true"}
              data-lab-row=""
              className="w-fit"
              id={project.id}
            >
              <motion.button
                type="button"
                className="flex min-h-10 cursor-pointer rounded-2xl border-0 bg-transparent px-4 py-2 text-left text-inherit no-underline transition-[color] duration-150 ease-out hover:no-underline focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-ring"
                aria-label={`${project.name}, ${project.period}`}
                initial={false}
                whileTap={reduce ? undefined : { scale: 0.96 }}
                onClick={() => onOpen(project)}
                onPointerEnter={() => hover(project, "pointer")}
                onFocus={() => hover(project, "keyboard")}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    leaveSoon();
                  }
                }}
              >
                <motion.span
                  className="flex flex-col items-start gap-1"
                  initial={false}
                  animate={{
                    x: active && !reduce ? tilt.x * 0.15 : 0,
                    y: active && !reduce ? tilt.y * 0.15 : 0,
                  }}
                  transition={COPY_SPRING}
                >
                  {/*
                    Shared layoutIds: the list title/year become the detail
                    title/year. Skip them under reduced motion so nothing flies.
                  */}
                  <motion.h3
                    className={
                      contained
                        ? "relative z-[8] m-0 text-sm font-normal leading-tight tracking-[-0.011em] underline decoration-border decoration-2 underline-offset-2 [text-decoration-skip-ink:none]"
                        : "relative z-[8] m-0 text-base font-normal leading-tight tracking-[-0.011em] underline decoration-border decoration-2 underline-offset-2 [text-decoration-skip-ink:none]"
                    }
                    layoutId={reduce ? undefined : `project-title-${project.id}`}
                    style={{ borderRadius: 0 }}
                  >
                    {project.name}
                  </motion.h3>
                  <motion.p
                    className={
                      contained
                        ? "relative z-[8] m-0 text-xs leading-tight tracking-[-0.01em] text-muted-foreground/85 tabular-nums"
                        : "relative z-[8] m-0 text-sm leading-tight tracking-[-0.01em] text-muted-foreground/85 tabular-nums"
                    }
                    layoutId={reduce ? undefined : `project-year-${project.id}`}
                    style={{ borderRadius: 0 }}
                  >
                    {project.period}
                  </motion.p>
                </motion.span>
              </motion.button>
            </li>
          );
        })}
      </ul>

      <AnimatePresence>
        {showPreview ? (
          <motion.div
            key={hovered.id}
            className="pointer-events-none fixed z-0 w-[min(42vw,420px)] max-[900px]:hidden"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            transition={COPY_SPRING}
            style={
              previewPos
                ? { top: previewPos.top, left: previewPos.left }
                : { visibility: "hidden" }
            }
          >
            {/*
              Same layoutId as the detail frame so this box morphs into the
              hero when a project opens. Empty bordered div — no image asset.
            */}
            <motion.div
              className="block aspect-[1440/852] w-full rounded-[10px] border border-border"
              layoutId={reduce ? undefined : "project-preview"}
              aria-hidden="true"
              style={{ borderRadius: 10 }}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
