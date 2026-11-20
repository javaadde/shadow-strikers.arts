"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

/** Loads framer-motion's DOM features once and honours the OS reduced-motion setting. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
