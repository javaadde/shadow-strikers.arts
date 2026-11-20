import Link from "next/link";
import { cn } from "@/app/lib/utils";
import { Reveal } from "../motion/reveal";
import { StarRow } from "./ornaments";

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-site px-4 sm:px-8", className)}>
      {children}
    </div>
  );
}

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline" | "light";
  className?: string;
  external?: boolean;
};

/** Pill-shaped link styled like the template's "JOIN NOW" button. */
export function ButtonLink({
  href,
  children,
  variant = "solid",
  className,
  external,
}: ButtonLinkProps) {
  const classes = cn(
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 font-display text-base uppercase tracking-[0.2em] transition-[transform,background-color,color] duration-200 active:scale-[0.97]",
    variant === "solid" && "bg-maroon text-paper hover:bg-crimson",
    variant === "outline" &&
      "border border-maroon/70 text-maroon hover:bg-maroon hover:text-paper",
    variant === "light" &&
      "bg-paper text-night hover:bg-blood hover:text-paper",
    className
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={classes}
      >
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  tone = "paper",
  className,
  id,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  lede?: string;
  tone?: "paper" | "night";
  className?: string;
}) {
  return (
    <header className={cn("max-w-2xl", className)}>
      <StarRow className="mb-5" />
      <Reveal>
        {eyebrow && (
          <p className="mb-3 font-accent text-sm font-medium uppercase tracking-[0.3em] text-blood">
            {eyebrow}
          </p>
        )}
        <h2
          id={id}
          className={cn(
            "font-display text-4xl leading-tight sm:text-5xl",
            tone === "paper" ? "text-crimson" : "text-paper"
          )}
        >
          {title}
        </h2>
        {lede && (
          <p
            className={cn(
              "mt-4 text-lg leading-relaxed",
              tone === "paper" ? "text-ink/80" : "text-paper/75"
            )}
          >
            {lede}
          </p>
        )}
      </Reveal>
    </header>
  );
}
