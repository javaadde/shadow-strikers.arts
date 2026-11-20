"use client";

import { m } from "framer-motion";
import { useId } from "react";
import { duration, ease, strokeDraw, viewportOnce } from "@/app/lib/motion";
import { cn } from "@/app/lib/utils";

const W = 700;
const H = 670;
const CX = W / 2;
const CY = H / 2;
const RX = 343;
const RY = 322;

/** SVG arc along an ellipse around the disc, angles in degrees (0 = right, clockwise). */
function arc(a0: number, a1: number, grow: number) {
  const rad = (deg: number) => (deg * Math.PI) / 180;
  const point = (deg: number) =>
    `${(CX + (RX + grow) * Math.cos(rad(deg))).toFixed(1)} ${(CY + (RY + grow) * Math.sin(rad(deg))).toFixed(1)}`;
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  return `M${point(a0)} A${RX + grow} ${RY + grow} 0 ${large} 1 ${point(a1)}`;
}

// Loose bristle flicks around the edge, as in the reference's brushed circle.
const flicks = [
  { d: arc(160, 205, 18), w: 7 },
  { d: arc(168, 192, 32), w: 3 },
  { d: arc(112, 136, 20), w: 6 },
  { d: arc(118, 131, 34), w: 3 },
  { d: arc(-10, 14, 16), w: 5 },
  { d: arc(40, 58, 14), w: 4 },
];

const tones = {
  crimson: { fill: "fill-crimson", stroke: "stroke-crimson" },
  night: { fill: "fill-night", stroke: "stroke-night" },
} as const;

/**
 * Brush-painted disc behind a cut-out photo: rough displaced edge, pressed-leather
 * texture, and a few dry-brush flicks. Decorative.
 *
 * `play="mount"` animates on load (hero); `play="view"` waits until it scrolls into view.
 */
export function BrushDisc({
  className,
  tone = "crimson",
  play = "mount",
}: {
  className?: string;
  tone?: keyof typeof tones;
  play?: "mount" | "view";
}) {
  const trigger =
    play === "view"
      ? { whileInView: "show", viewport: viewportOnce }
      : { animate: "show" };
  const id = useId().replace(/:/g, "");
  const brush = `brush-${id}`;
  const rough = `rough-${id}`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      aria-hidden
      className={className}
      overflow="visible"
    >
      <defs>
        <filter id={brush} x="-8%" y="-8%" width="116%" height="116%">
          {/* wobble the outline like a loaded brush */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.011"
            numOctaves="3"
            seed="4"
            result="warp"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="warp"
            scale="26"
            xChannelSelector="R"
            yChannelSelector="G"
            result="shape"
          />
          {/* pressed-leather surface */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.075"
            numOctaves="2"
            seed="11"
            result="grain"
          />
          <feDiffuseLighting
            in="grain"
            surfaceScale="2.2"
            lightingColor="#ffffff"
            result="light"
          >
            <feDistantLight azimuth="235" elevation="52" />
          </feDiffuseLighting>
          {/* re-centre the lighting around 1 so the disc averages to the crimson token */}
          <feComponentTransfer in="light" result="light2">
            <feFuncR type="linear" slope="1.28" />
            <feFuncG type="linear" slope="1.28" />
            <feFuncB type="linear" slope="1.28" />
          </feComponentTransfer>
          <feComposite in="light2" in2="shape" operator="in" result="lit" />
          <feBlend in="shape" in2="lit" mode="multiply" />
        </filter>
        <filter id={rough} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.06"
            numOctaves="2"
            seed="2"
            result="n"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="n"
            scale="9"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>

      <m.g
        style={{ originX: "50%", originY: "50%" }}
        initial="hidden"
        {...trigger}
        variants={{
          hidden: { opacity: 0, scale: 0.86, rotate: -8 },
          show: { opacity: 1, scale: 1, rotate: 0 },
        }}
        transition={{ duration: duration.slow, ease: ease.strike, delay: 0.15 }}
      >
        <ellipse
          cx={CX}
          cy={CY}
          rx={RX}
          ry={RY}
          className={tones[tone].fill}
          filter={`url(#${brush})`}
        />
      </m.g>

      <m.g
        initial="hidden"
        {...trigger}
        transition={{ staggerChildren: 0.12, delayChildren: 0.9 }}
        filter={`url(#${rough})`}
      >
        {flicks.map((flick, i) => (
          <m.path
            key={i}
            d={flick.d}
            fill="none"
            className={cn(tones[tone].stroke)}
            strokeWidth={flick.w}
            strokeLinecap="round"
            variants={strokeDraw}
          />
        ))}
      </m.g>
    </svg>
  );
}
