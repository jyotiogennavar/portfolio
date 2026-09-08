"use client";

import { Button } from "@/components/ui/button";
import { useMeasure } from "@/lib/use-measure";
import { Check, Loader2 } from "lucide-react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { type RefObject } from "react";

const easeOutExpo = [0.19, 1, 0.22, 1] as const;
const enterTransition = { duration: 0.2, ease: easeOutExpo };
const exitTransition = { duration: 0.15, ease: easeOutExpo };
const failShake = [0, 5, -4, 2.5, 0];

export type SaveDialogPhase = "unsaved" | "saving" | "success" | "failed";

export type SaveDialogCopy = {
  key: string;
  title: string;
  description: string;
};

type SaveDialogOverlayProps = {
  open: boolean;
  dialogRef: RefObject<HTMLDivElement | null>;
  titleId: string;
  descriptionId: string;
  phase: SaveDialogPhase;
  copy: SaveDialogCopy;
  reduce: boolean;
  onCancel: () => void;
  onSave: () => void;
};

export function SaveDialogOverlay({
  open,
  dialogRef,
  titleId,
  descriptionId,
  phase,
  copy,
  reduce,
  onCancel,
  onSave,
}: SaveDialogOverlayProps) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ type: "spring", duration: 0.3, bounce: 0 }}
    >
      <AnimatePresence>
        {open ? (
          <motion.div
            key="save-dialog"
            className="absolute inset-0 flex items-center justify-center p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: enterTransition }}
            exit={{ opacity: 0, transition: exitTransition }}
          >
            <div
              className="absolute inset-0 bg-foreground/15"
              onClick={phase === "saving" || phase === "success" ? undefined : onCancel}
            />
            <SaveDialog
              dialogRef={dialogRef}
              titleId={titleId}
              descriptionId={descriptionId}
              phase={phase}
              copy={copy}
              reduce={reduce}
              onCancel={onCancel}
              onSave={onSave}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </MotionConfig>
  );
}

function SaveDialog({
  dialogRef,
  titleId,
  descriptionId,
  phase,
  copy,
  reduce,
  onCancel,
  onSave,
}: {
  dialogRef: RefObject<HTMLDivElement | null>;
  titleId: string;
  descriptionId: string;
  phase: SaveDialogPhase;
  copy: SaveDialogCopy;
  reduce: boolean;
  onCancel: () => void;
  onSave: () => void;
}) {
  const [bodyRef, bounds] = useMeasure<HTMLDivElement>();

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      aria-busy={phase === "saving"}
      tabIndex={-1}
      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1, transition: enterTransition }}
      exit={{ opacity: 0, transition: exitTransition }}
      className="relative z-10 w-full max-w-[360px] overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-lg outline-none"
      style={{ borderRadius: 12 }}
    >
      <motion.div
        animate={{
          height: reduce || !bounds.height ? "auto" : bounds.height,
        }}
        className="overflow-hidden"
      >
        <motion.div
          ref={bodyRef}
          animate={!reduce && phase === "failed" ? { x: failShake } : { x: 0 }}
          transition={
            !reduce && phase === "failed"
              ? { duration: 0.28, ease: "linear" }
              : { duration: 0 }
          }
        >
          <DialogBody
            titleId={titleId}
            descriptionId={descriptionId}
            phase={phase}
            copy={copy}
            reduce={reduce}
            onCancel={onCancel}
            onSave={onSave}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function DialogBody({
  titleId,
  descriptionId,
  phase,
  copy,
  reduce,
  onCancel,
  onSave,
}: {
  titleId: string;
  descriptionId: string;
  phase: SaveDialogPhase;
  copy: SaveDialogCopy;
  reduce: boolean;
  onCancel: () => void;
  onSave: () => void;
}) {
  const label =
    phase === "saving"
      ? "Saving..."
      : phase === "failed"
        ? "Try again"
        : "Save changes";

  return (
    <div className="p-5">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={copy.key}
          initial={{
            opacity: 0,
            y: reduce ? 0 : -8,
            filter: reduce ? "blur(0px)" : "blur(2px)",
          }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{
            opacity: 0,
            y: reduce ? 0 : 8,
            filter: reduce ? "blur(0px)" : "blur(2px)",
          }}
        >
          <h2
            id={titleId}
            className="flex items-center gap-2 text-base font-semibold tracking-[-0.011em]"
          >
            {phase === "success" ? (
              <Check className="size-4" aria-hidden="true" />
            ) : null}
            {copy.title}
          </h2>
          <p
            id={descriptionId}
            aria-live="polite"
            className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground"
          >
            {copy.description}
          </p>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {phase !== "success" ? (
          <motion.div
            key="actions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-5 flex items-center justify-end gap-2"
          >
            <Button
              type="button"
              variant="outline"
              disabled={phase === "saving"}
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              type="button"
              disabled={phase === "saving"}
              onClick={onSave}
              className="overflow-hidden"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={label}
                  className="inline-flex items-center gap-2"
                  initial={{ opacity: 0, y: reduce ? 0 : -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduce ? 0 : 8 }}
                >
                  {phase === "saving" ? (
                    <Loader2
                      className="size-4 motion-safe:animate-spin motion-reduce:animate-none"
                      aria-hidden="true"
                    />
                  ) : null}
                  {label}
                </motion.span>
              </AnimatePresence>
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
