import type { Transition, Variants } from "framer-motion";

/** Shared motion vocabulary. Reuse these instead of inlining new timings. */

export const ease = {
  /** Fast start, soft landing: a strike that stops cleanly. */
  strike: [0.16, 1, 0.3, 1],
  brush: [0.65, 0, 0.35, 1],
} as const;

export const duration = {
  fast: 0.25,
  base: 0.6,
  slow: 1.2,
};

export const spring: Record<"press" | "lift", Transition> = {
  press: { type: "spring", stiffness: 600, damping: 30 },
  lift: { type: "spring", stiffness: 300, damping: 22 },
};

export const viewportOnce = { once: true, margin: "0px 0px -10% 0px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: ease.strike },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: duration.base } },
};

export const stagger = (step = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren: delay } },
});

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0, rotate: -45 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 500, damping: 18 },
  },
};

// framer-motion 11's Variants type rejects numeric pathLength, though it animates fine.
export const strokeDraw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: duration.slow, ease: ease.brush },
      opacity: { duration: duration.fast },
    },
  },
} as unknown as Variants;
