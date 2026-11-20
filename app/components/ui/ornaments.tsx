"use client";

import { m } from "framer-motion";
import { popIn, stagger } from "@/app/lib/motion";
import { cn } from "@/app/lib/utils";

const STAR_PATH =
  "M12 0C13 8 16 11 24 12C16 13 13 16 12 24C11 16 8 13 0 12C8 11 11 8 12 0Z";

/** Four-point star from the reference template. Decorative. */
export function Star({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={cn("fill-blood", className ?? "h-6 w-6")}
    >
      <path d={STAR_PATH} />
    </svg>
  );
}

/** A star that pops in; must sit inside a parent with hidden/show variants. */
export function AnimatedStar({ className }: { className?: string }) {
  return (
    <m.svg
      viewBox="0 0 24 24"
      aria-hidden
      variants={popIn}
      className={cn("fill-blood", className ?? "h-6 w-6")}
    >
      <path d={STAR_PATH} />
    </m.svg>
  );
}

/** Row of small stars used as a divider. Pops in left to right when shown. */
export function StarRow({
  count = 6,
  className,
  animate = true,
}: {
  count?: number;
  className?: string;
  animate?: boolean;
}) {
  const stars = Array.from({ length: count });
  if (!animate) {
    return (
      <div className={cn("flex gap-3", className)} aria-hidden>
        {stars.map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5" />
        ))}
      </div>
    );
  }
  return (
    <m.div
      className={cn("flex gap-3", className)}
      aria-hidden
      variants={stagger(0.07)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {stars.map((_, i) => (
        <AnimatedStar key={i} className="h-3.5 w-3.5" />
      ))}
    </m.div>
  );
}
