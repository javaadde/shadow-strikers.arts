"use client";

import { m, type Variants } from "framer-motion";
import { fadeUp, stagger, viewportOnce } from "@/app/lib/motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  as?: "div" | "section" | "ul" | "li" | "header";
};

/** Animates its children in once when scrolled into view. */
export function Reveal({
  children,
  className,
  variants = fadeUp,
  as = "div",
}: RevealProps) {
  const Component = m[as];
  return (
    <Component
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </Component>
  );
}

/** Staggers direct <RevealItem> children. */
export function RevealGroup({
  children,
  className,
  as = "div",
  step,
}: Omit<RevealProps, "variants"> & { step?: number }) {
  return (
    <Reveal as={as} className={className} variants={stagger(step)}>
      {children}
    </Reveal>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: Omit<RevealProps, "variants">) {
  const Component = m[as];
  return (
    <Component className={className} variants={fadeUp}>
      {children}
    </Component>
  );
}
