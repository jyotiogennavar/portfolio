"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useEffect, useId, useRef, useState } from "react";
import type { SaveDialogCopy, SaveDialogPhase } from "./save-modal-dialog";

const SaveDialogOverlay = dynamic(
  () =>
    import("./save-modal-dialog").then((mod) => ({
      default: mod.SaveDialogOverlay,
    })),
  { ssr: false },
);

type Phase = "editing" | "unsaved" | "saving" | "success" | "failed" | "left";
type Outcome = "success" | "slow" | "error" | "offline";
type Failure = "error" | "offline";

const OUTCOMES: {
  value: Outcome;
  label: string;
  hint: string;
}[] = [
  { value: "success", label: "Success", hint: "Save succeeds" },
  { value: "slow", label: "Slow", hint: "Slow connection" },
  { value: "error", label: "Error", hint: "Server error" },
  { value: "offline", label: "Offline", hint: "You're offline" },
];

const OUTCOME_CLASS: Record<Outcome, { idle: string; active: string }> = {
  success: {
    idle: "border-emerald-800/35 text-emerald-800 hoverable:hover:bg-emerald-800/10 dark:border-emerald-400/40 dark:text-emerald-300",
    active:
      "border-emerald-800 bg-emerald-800 text-white dark:border-emerald-700 dark:bg-emerald-700",
  },
  slow: {
    idle: "border-amber-900/35 text-amber-900 hoverable:hover:bg-amber-900/10 dark:border-amber-300/40 dark:text-amber-300",
    active:
      "border-amber-900 bg-amber-900 text-white dark:border-amber-800 dark:bg-amber-800",
  },
  error: {
    idle: "border-red-800/35 text-red-800 hoverable:hover:bg-red-800/10 dark:border-red-400/40 dark:text-red-300",
    active: "border-red-800 bg-red-800 text-white dark:border-red-700 dark:bg-red-700",
  },
  offline: {
    idle: "border-sky-800/35 text-sky-800 hoverable:hover:bg-sky-800/10 dark:border-sky-300/40 dark:text-sky-300",
    active: "border-sky-800 bg-sky-800 text-white dark:border-sky-700 dark:bg-sky-700",
  },
};

const SAVE_MS: Record<Outcome, number> = {
  success: 800,
  slow: 4000,
  error: 900,
  offline: 500,
};

const SUCCESS_HOLD_MS = 1100;

type SaveModalProps = {
  className?: string;
};

export function SaveModal({ className }: SaveModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const groupId = useId();
  const leaveRef = useRef<HTMLButtonElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const saveGeneration = useRef(0);
  const skipInitialFocus = useRef(true);

  const [phase, setPhase] = useState<Phase>("editing");
  const [outcome, setOutcome] = useState<Outcome>("success");
  const [failure, setFailure] = useState<Failure>("error");
  const [dialogMounted, setDialogMounted] = useState(false);
  const [reduce, setReduce] = useState(false);

  const modalOpen =
    phase === "unsaved" ||
    phase === "saving" ||
    phase === "success" ||
    phase === "failed";
  const busy = phase === "saving" || phase === "success";
  const copy = dialogCopy(phase, failure);

  useEffect(() => {
    if (!modalOpen) return;
    setDialogMounted(true);
  }, [modalOpen]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (phase !== "success") return;
    const timeout = window.setTimeout(() => setPhase("left"), SUCCESS_HOLD_MS);
    return () => window.clearTimeout(timeout);
  }, [phase]);

  useEffect(() => {
    if (skipInitialFocus.current) {
      skipInitialFocus.current = false;
      return;
    }

    if (modalOpen) {
      dialogRef.current?.focus();
      return;
    }

    if (phase === "left") resetRef.current?.focus();
    if (phase === "editing") leaveRef.current?.focus();
  }, [modalOpen, phase]);

  useEffect(() => {
    if (phase !== "unsaved" && phase !== "failed") return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setPhase("editing");
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [phase]);

  function startSave() {
    if (busy) return;
    const generation = ++saveGeneration.current;
    setPhase("saving");

    window.setTimeout(() => {
      if (generation !== saveGeneration.current) return;
      if (outcome === "error" || outcome === "offline") {
        setFailure(outcome);
        setPhase("failed");
        return;
      }
      setPhase("success");
    }, SAVE_MS[outcome]);
  }

  function returnToEditing() {
    saveGeneration.current += 1;
    setPhase("editing");
  }

  function preloadDialog() {
    void import("./save-modal-dialog");
  }

  return (
    <div className={cn("mx-auto w-full max-w-[480px]", className)}>
      <div className="relative min-h-[450px] overflow-hidden rounded-xl border border-border bg-background">
        {phase === "left" ? (
          <div className="flex min-h-[450px] flex-col items-center justify-center gap-4 p-6 text-center">
            <p className="text-sm text-muted-foreground">You left the page.</p>
            <Button ref={resetRef} type="button" onClick={returnToEditing}>
              Start editing again
            </Button>
          </div>
        ) : (
          <div className="flex min-h-[450px] flex-col justify-between p-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.04em] text-muted-foreground">
                Draft
              </p>
              <p className="mt-2 text-base text-foreground">
                Meeting notes for Thursday
              </p>
              <p className="mt-1 text-sm text-muted-foreground">Unsaved changes</p>
              <ul className="mt-6 space-y-2 text-sm leading-relaxed text-foreground/75">
                <li>Review the homepage nav treatment</li>
                <li>Decide how leaving a draft should feel</li>
                <li>Ship the lab write-up this week</li>
              </ul>
            </div>
            <div className="flex justify-end">
              <Button
                ref={leaveRef}
                type="button"
                variant="outline"
                onPointerEnter={preloadDialog}
                onFocus={preloadDialog}
                onClick={() => setPhase("unsaved")}
              >
                Leave page
              </Button>
            </div>
          </div>
        )}

        {dialogMounted ? (
          <SaveDialogOverlay
            open={modalOpen}
            dialogRef={dialogRef}
            titleId={titleId}
            descriptionId={descriptionId}
            phase={phase as SaveDialogPhase}
            copy={copy}
            reduce={reduce}
            onCancel={returnToEditing}
            onSave={startSave}
          />
        ) : null}
      </div>

      <div className="mt-6">
        <p id={groupId} className="text-sm font-medium text-foreground">
          Simulate save response
        </p>
        <div
          role="radiogroup"
          aria-labelledby={groupId}
          className="mt-3 flex flex-wrap gap-1.5"
        >
          {OUTCOMES.map((option) => {
            const active = outcome === option.value;
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={active}
                aria-label={option.hint}
                disabled={busy}
                onClick={() => setOutcome(option.value)}
                className={cn(
                  "relative h-7 rounded-md border px-2.5 text-xs font-medium",
                  "before:absolute before:-inset-y-2 before:inset-x-0 before:content-['']",
                  "transition-[color,background-color,border-color,opacity,transform] duration-150 ease",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  "active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 disabled:active:scale-100",
                  active
                    ? OUTCOME_CLASS[option.value].active
                    : OUTCOME_CLASS[option.value].idle,
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function dialogCopy(phase: Phase, failure: Failure): SaveDialogCopy {
  if (phase === "saving") {
    return {
      key: "saving",
      title: "Unsaved changes",
      description: "Saving your changes...",
    };
  }

  if (phase === "success") {
    return {
      key: "success",
      title: "Changes saved",
      description: "Continuing...",
    };
  }

  if (phase === "failed" && failure === "offline") {
    return {
      key: "offline",
      title: "You're offline",
      description: "Your changes haven't been saved yet. Reconnect and try again.",
    };
  }

  if (phase === "failed") {
    return {
      key: "error",
      title: "Couldn't save your changes",
      description: "Your changes are still here. Try saving again.",
    };
  }

  return {
    key: "unsaved",
    title: "Unsaved changes",
    description: "Save before you leave, or stay and keep editing.",
  };
}
