"use client";

import {
  AnimatePresence,
  motion,
  MotionConfig,
  useReducedMotion,
} from "motion/react";
import { FileText, Moon, Share2, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { useMeasure } from "../../lib/use-measure";

const CLOSED_HEIGHT = 52;
const CLOSED_WIDTH = 132;
const OPEN_WIDTH = 280;
const HIDE_Y = 80;

const SWAP = { type: "spring", duration: 0.4, bounce: 0 } as const;
const TAP = { duration: 0.15 } as const;

const dockControlClass =
  "relative flex h-full min-w-9 shrink-0 cursor-pointer touch-manipulation items-center justify-center rounded-2xl border-0 bg-transparent px-2 text-sm font-medium text-muted-foreground transition-[color,background-color] duration-150 ease-out before:absolute before:inset-x-0 before:-inset-y-1 before:rounded-[20px] before:content-[''] hoverable:hover:bg-foreground/[0.08] hoverable:hover:text-foreground focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_2px_hsl(var(--ring))]";

const dockLinkClass =
  "relative flex h-10 w-full min-w-0 items-center justify-between gap-2 rounded-lg px-3 text-sm font-medium tracking-[-0.01em] text-inherit no-underline transition-[color,background-color] duration-150 ease-out hoverable:hover:bg-foreground/[0.08] hoverable:hover:text-foreground focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_2px_hsl(var(--ring))]";

const dockSocials = [
  { name: "GitHub", href: "https://github.com/jyotiogennavar" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/jyoti-ogennavar/" },
  { name: "Twitter", href: "https://x.com/JOgennavar" },
  { name: "Peerlist", href: "https://peerlist.io/jyotiogennavar" },
];

// 60% travel (not 110%) so this small pill doesn't feel like a full-page slide.
const panelVariants = {
  initial: (direction: number) => ({ x: `${70 * direction}%`, opacity: 0 }),
  active: { x: "0%", opacity: 1 },
  exit: (direction: number) => ({ x: `${-70 * direction}%`, opacity: 0 }),
};

const reducedPanelVariants = {
  initial: { opacity: 0 },
  active: { opacity: 1 },
  exit: { opacity: 0 },
};

const socialList = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.05 } },
};

type TabIndex = 0 | 1;

type SiteDockProps = {
  hidden?: boolean;
};

/**
 * Family-drawer dock: a 52×132 pill that grows to fit Socials or Files.
 * Height is measured (Motion can't do auto → auto). Tab swaps use
 * AnimatePresence + `custom` so the exiting panel still knows the direction.
 */
export function SiteDock({ hidden = false }: SiteDockProps) {
  const reduce = useReducedMotion();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [tab, setTab] = useState<TabIndex | null>(null);
  const [direction, setDirection] = useState(1);
  const [measureRef, bounds] = useMeasure<HTMLDivElement>();
  const rootRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";
  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const close = () => setTab(null);

  const selectTab = (next: TabIndex) => {
    if (tab === next) {
      close();
      return;
    }
    // Stored at the same time as the tab change so the exit slide points the right way.
    setDirection(tab === null ? 1 : next > tab ? 1 : -1);
    setTab(next);
  };

  useEffect(() => {
    if (tab === null) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Element && target.closest("[data-lab-dock]")) return;
      close();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [tab]);

  // Global `D` shortcut, ignored while typing in a field.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "d" && event.key !== "D") return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT")
      ) {
        return;
      }
      event.preventDefault();
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [resolvedTheme, setTheme]);

  const onTabKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const buttons = tabRefs.current.filter(Boolean) as HTMLButtonElement[];
    const index = buttons.indexOf(event.target as HTMLButtonElement);
    if (index < 0) return;

    if (event.key === "ArrowRight") {
      event.preventDefault();
      buttons[(index + 1) % buttons.length]?.focus();
      return;
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      buttons[(index - 1 + buttons.length) % buttons.length]?.focus();
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      buttons[0]?.focus();
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      buttons[buttons.length - 1]?.focus();
    }
  };

  // First frame is 0; fall back so Motion treats it as auto and we don't jump.
  const openHeight =
    bounds.height > 0 ? bounds.height + CLOSED_HEIGHT : null;
  const height = tab === null ? CLOSED_HEIGHT : openHeight;
  const width = tab === null ? CLOSED_WIDTH : OPEN_WIDTH;

  return (
    <nav
      ref={rootRef}
      data-lab-dock=""
      className="fixed bottom-[calc(20px+env(safe-area-inset-bottom))] left-[50vw] z-dropdown -translate-x-1/2 drop-shadow-[0_8px_24px_hsl(0_0%_0%/0.12)] dark:drop-shadow-[0_8px_24px_hsl(0_0%_0%/0.55)]"
      aria-label="Site"
      aria-hidden={hidden || undefined}
    >
      <div data-reveal="dock">
        <MotionConfig
          transition={reduce ? { duration: 0 } : SWAP}
          reducedMotion="user"
        >
          <motion.div
            initial={false}
            animate={{
              y: hidden && !reduce ? HIDE_Y : 0,
              opacity: hidden ? 0 : 1,
            }}
            style={{ pointerEvents: hidden ? "none" : undefined }}
          >
            {/*
              Pixel borderRadius so layout/scale doesn't warp the corners.
              The measure ref lives on an INNER node — if it sat on this
              element, the animated height would freeze and stop reacting.
            */}
            <motion.div
              className="relative overflow-hidden bg-background shadow-[0_0_0_1px_hsl(0_0%_0%/0.06),0_1px_3px_hsl(0_0%_0%/0.06),0_8px_24px_hsl(0_0%_0%/0.08)] dark:bg-[hsl(24_10%_12%)] dark:shadow-[0_0_0_1px_hsl(0_0%_100%/0.14),0_8px_24px_hsl(0_0%_0%/0.45)]"
              initial={false}
              animate={{
                height: height ?? CLOSED_HEIGHT,
                width,
              }}
              style={{ borderRadius: 24 }}
              onKeyDown={onTabKeyDown}
            >
              <div ref={measureRef}>
                <div
                  id="lab-dock-panel"
                  role={tab === null ? undefined : "region"}
                  aria-labelledby={tab === null ? undefined : `lab-dock-tab-${tab}`}
                >
                  {/*
                    popLayout: old and new content overlap while the shell
                    resizes. `custom` must be on both Presence and the child
                    or the exiting panel reads a stale direction.
                  */}
                  <AnimatePresence
                    mode="popLayout"
                    initial={false}
                    custom={tab === null ? 0 : direction}
                  >
                    {tab !== null ? (
                      <motion.div
                        key={tab}
                        className="bg-background/80 p-4"
                        variants={reduce ? reducedPanelVariants : panelVariants}
                        initial="initial"
                        animate="active"
                        exit="exit"
                        custom={direction}
                      >
                        {tab === 0 ? (
                          <motion.div
                            className="flex flex-col gap-0.5"
                            variants={socialList}
                            initial="hidden"
                            animate="show"
                          >
                            {dockSocials.map((social) => (
                              <a
                                key={social.name}
                                className={dockLinkClass}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <span className="truncate">{social.name}</span>
                              </a>
                            ))}
                          </motion.div>
                        ) : (
                          <div className="flex flex-col gap-0.5">
                            <a
                              className={dockLinkClass}
                              href="/resume-jyoti-ogennavar.pdf"
                              download="Jyoti-Ogennavar-Resume.pdf"
                            >
                              <span className="truncate">Resume</span>
                              <FileText className="size-4" aria-hidden />
                            </a>
                          </div>
                        )}
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>

              <div className="absolute bottom-0 w-full bg-background p-2 dark:bg-[hsl(24_10%_12%)]">
                <div
                  className="grid h-9 w-full grid-cols-3 items-center gap-1 data-[open=true]:flex data-[open=true]:justify-center"
                  data-open={tab !== null}
                >
                  <DockTab
                    ref={(node) => {
                      tabRefs.current[0] = node;
                    }}
                    id="lab-dock-tab-0"
                    label="Socials"
                    active={tab === 0}
                    reduce={!!reduce}
                    onClick={() => selectTab(0)}
                  >
                    <Share2 className="size-4" aria-hidden />
                  </DockTab>
                  <DockTab
                    ref={(node) => {
                      tabRefs.current[1] = node;
                    }}
                    id="lab-dock-tab-1"
                    label="Files"
                    active={tab === 1}
                    reduce={!!reduce}
                    onClick={() => selectTab(1)}
                  >
                    <FileText className="size-4" aria-hidden />
                  </DockTab>
                  <motion.button
                    type="button"
                    ref={(node) => {
                      tabRefs.current[2] = node;
                    }}
                    className={dockControlClass}
                    initial={false}
                    whileTap={reduce ? undefined : { scale: 0.96, transition: TAP }}
                    onClick={toggleTheme}
                    aria-label={
                      mounted
                        ? isDark
                          ? "Light theme"
                          : "Dark theme"
                        : "Toggle theme"
                    }
                    aria-keyshortcuts="d"
                  >
                    {mounted && isDark ? (
                      <Sun className="size-4" aria-hidden />
                    ) : (
                      <Moon className="size-4" aria-hidden />
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </MotionConfig>
      </div>
    </nav>
  );
}

function DockTab({
  id,
  label,
  active,
  reduce,
  onClick,
  children,
  ref,
}: {
  id: string;
  label: string;
  active: boolean;
  reduce: boolean;
  onClick: () => void;
  children: ReactNode;
  ref: (node: HTMLButtonElement | null) => void;
}) {
  return (
    <motion.button
      type="button"
      ref={ref}
      id={id}
      className={cn(
        dockControlClass,
        "data-[active=true]:bg-foreground/[0.08] data-[active=true]:text-foreground",
      )}
      data-active={active}
      aria-expanded={active}
      aria-controls={active ? "lab-dock-panel" : undefined}
      aria-label={label}
      initial={false}
      whileTap={reduce ? undefined : { scale: 0.96, transition: TAP }}
      animate={{
        gap: active ? 8 : 0,
        paddingInline: active ? 16 : 8,
      }}
      onClick={onClick}
    >
      {children}
      {/* Width 0 → auto so the label grows the tab instead of popping in. */}
      <AnimatePresence initial={false}>
        {active ? (
          <motion.span
            className="overflow-hidden whitespace-nowrap tracking-[-0.01em]"
            initial={reduce ? { opacity: 0 } : { width: 0, opacity: 0 }}
            animate={
              reduce
                ? { opacity: 1 }
                : { width: "auto", opacity: 1 }
            }
            exit={reduce ? { opacity: 0 } : { width: 0, opacity: 0 }}
          >
            {label}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </motion.button>
  );
}


