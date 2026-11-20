"use client";

import { m, useScroll, useTransform, type Variants } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { duration, ease, fadeUp, stagger } from "@/app/lib/motion";
import { cn } from "@/app/lib/utils";
import { AnimatedStar } from "../ui/ornaments";
import { ButtonLink } from "../ui/primitives";
import { BrushDisc } from "./brush-disc";
import styles from "./hero.module.css";
import { SocialIcons, type SocialLink } from "./social-icons";

type HeroProps = {
  titleLines: string[];
  subtitle: string;
  intro: string;
  cta: string;
  branchNames: string[];
  social: SocialLink[];
};

const drawLine = (axis: "x" | "y", delay: number): Variants => ({
  hidden: axis === "x" ? { scaleX: 0 } : { scaleY: 0 },
  show: {
    ...(axis === "x" ? { scaleX: 1 } : { scaleY: 1 }),
    transition: { duration: duration.slow, ease: ease.brush, delay },
  },
});

const slideIn: Variants = {
  hidden: { opacity: 0, x: 32 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.base, ease: ease.strike },
  },
};

/** Home hero: a faithful build of the reference template's landing screen. */
export function Hero({
  titleLines,
  subtitle,
  intro,
  cta,
  branchNames,
  social,
}: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Gentle depth on scroll: the photo drifts up faster than the disc behind it.
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "-9%"]);
  const discY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);

  return (
    <section
      id="home"
      ref={ref}
      className="paper relative overflow-hidden"
      aria-labelledby="hero-title"
    >
      <m.div
        className={styles.board}
        initial="hidden"
        animate="show"
        variants={stagger(0.08)}
      >
        {/* Hairlines */}
        <m.span
          aria-hidden
          className={cn(styles.ruleLeft, "bg-rule")}
          variants={drawLine("x", 0.1)}
        />
        <m.span
          aria-hidden
          className={cn(styles.ruleTop, "bg-rule")}
          variants={drawLine("y", 0.3)}
        />
        <m.span
          aria-hidden
          className={cn(styles.ruleRight, "bg-rule")}
          variants={drawLine("x", 0.5)}
        />

        {/* Photo on the brush disc */}
        <div className={styles.visual}>
          <m.div style={{ y: discY }} className={styles.circle}>
            <BrushDisc className="h-full w-full" />
          </m.div>
          <m.div style={{ y: photoY }} className={styles.photo}>
            <m.div
              initial={{ opacity: 0, y: 48 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: duration.slow,
                ease: ease.strike,
                delay: 0.45,
              }}
            >
              <Image
                src="/images/hero-students.webp"
                alt="Two students in white doboks practising a self-defence hold"
                width={1239}
                height={1865}
                priority
                sizes="(min-width: 1024px) 36vw, 26rem"
                className="h-auto w-full select-none"
                draggable={false}
              />
            </m.div>
          </m.div>
        </div>

        {/* Headline */}
        <m.div className={styles.copy} variants={stagger(0.12, 0.25)}>
          <h1
            id="hero-title"
            className={cn(styles.title, "font-display uppercase text-blood")}
          >
            {titleLines.map((line) => (
              <m.span key={line} className="block" variants={fadeUp}>
                {line}
              </m.span>
            ))}
          </h1>
          <m.p
            variants={fadeUp}
            className={cn(styles.subtitle, "font-display text-ink")}
          >
            {subtitle}
          </m.p>
        </m.div>

        {/* Stars */}
        <StarRow className={styles.starsLeft} delay={0.9} />
        <StarRow className={styles.starsRight} delay={1.1} />
        <BigStar className={styles.starTop} delay={1.25} />
        <BigStar className={styles.starBottom} delay={1.4} />

        {/* Intro + call to action */}
        <m.div className={styles.side} variants={stagger(0.12, 0.6)}>
          <m.p
            variants={slideIn}
            className={cn(styles.intro, "font-medium text-ink")}
          >
            {intro}
          </m.p>
          <m.div variants={slideIn} className={styles.cta}>
            <ButtonLink href="/#contact" className={styles.button}>
              {cta}
            </ButtonLink>
          </m.div>
        </m.div>

        {/* Bottom row: where we are (in place of the template's web address) + socials */}
        <m.div
          className={cn(
            styles.foot,
            "flex flex-wrap items-center justify-between gap-4"
          )}
          variants={fadeUp}
        >
          <p className="text-sm font-medium lowercase tracking-[0.14em] text-ink lg:text-[max(0.8rem,calc(var(--u)*20))]">
            {branchNames.join(" · ")}
          </p>
          <SocialIcons links={social} />
        </m.div>
      </m.div>
    </section>
  );
}

function StarRow({ className, delay }: { className: string; delay: number }) {
  return (
    <m.div
      aria-hidden
      className={cn(className, styles.row)}
      variants={stagger(0.06, delay)}
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <AnimatedStar key={i} className={styles.rowStar} />
      ))}
    </m.div>
  );
}

function BigStar({ className, delay }: { className: string; delay: number }) {
  return (
    <m.div aria-hidden className={className} variants={stagger(0, delay)}>
      <AnimatedStar className={styles.bigStar} />
    </m.div>
  );
}
