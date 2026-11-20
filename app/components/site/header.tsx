"use client";

import { AnimatePresence, m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { duration, ease, fadeUp, stagger } from "@/app/lib/motion";
import { cn } from "@/app/lib/utils";

export type NavItem = { label: string; href: string };

/**
 * Site header: a frosted-glass bar. The blur lives on its own background layer, not on
 * `<header>`, because `backdrop-filter` would trap the fixed mobile menu inside the bar.
 * With `overlay` (home page) the glass is lighter over the hero and firms up once you scroll.
 */
export function Header({
  items,
  name,
  tagline,
  overlay = false,
}: {
  items: NavItem[];
  name: string;
  tagline: string;
  overlay?: boolean;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const firm = scrolled || !overlay;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-header h-[var(--header-h)] transition-colors duration-300",
        open ? "text-paper" : "text-ink"
      )}
    >
      {/* Glass layer */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 -z-10 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300",
          open
            ? "border-paper/10 bg-night/90 backdrop-blur-xl backdrop-saturate-150"
            : firm
              ? "border-white/40 bg-paper/70 shadow-[inset_0_1px_0_rgb(255_255_255/0.55),0_10px_30px_-14px_rgb(var(--night)/0.4)] backdrop-blur-xl backdrop-saturate-150"
              : "border-transparent bg-transparent shadow-none"
        )}
      />
      <div className="mx-auto flex h-full w-full max-w-[2208px] items-center justify-between px-4 sm:px-8 lg:pl-[calc(var(--u)*77)] lg:pr-[calc(var(--u)*75)]">
        <Link
          href="/"
          className="flex items-center gap-3 lg:gap-[max(0.75rem,calc(var(--u)*12))]"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/images/logo-sm.webp"
            alt=""
            width={160}
            height={160}
            priority
            className="h-10 w-10 rounded-full shadow-sm lg:h-[max(2.5rem,calc(var(--u)*56))] lg:w-[max(2.5rem,calc(var(--u)*56))]"
          />
          <span className="flex flex-col leading-none">
            <span
              className={cn(
                "text-[0.9rem] font-bold uppercase tracking-[0.02em] lg:text-[max(0.9rem,calc(var(--u)*22))]",
                open ? "text-paper" : "text-maroon"
              )}
            >
              {name}
            </span>
            <span
              className={cn(
                "mt-1 text-[0.55rem] font-medium uppercase tracking-[0.14em] lg:text-[max(0.55rem,calc(var(--u)*12))]",
                open ? "text-paper/70" : "text-maroon/85"
              )}
            >
              {tagline}
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-8 lg:gap-[max(1.5rem,calc(var(--u)*44))]">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="relative font-display text-lg transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-blood after:transition-transform after:duration-300 hover:text-blood hover:after:scale-x-100 lg:text-[max(1rem,calc(var(--u)*28))]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="relative -mr-2 grid h-11 w-11 place-items-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span
            className={cn(
              "absolute h-0.5 w-6 bg-current transition-transform duration-300",
              open ? "rotate-45" : "-translate-y-1.5"
            )}
          />
          <span
            className={cn(
              "absolute h-0.5 w-6 bg-current transition-transform duration-300",
              open ? "-rotate-45" : "translate-y-1.5"
            )}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <m.nav
            id="mobile-menu"
            aria-label="Main"
            className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-menu bg-night px-6 pt-10 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.fast, ease: ease.strike }}
          >
            <m.ul
              variants={stagger(0.06, 0.05)}
              initial="hidden"
              animate="show"
            >
              {items.map((item) => (
                <m.li key={item.href} variants={fadeUp}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-paper/10 py-5 font-display text-3xl text-paper"
                  >
                    {item.label}
                  </Link>
                </m.li>
              ))}
            </m.ul>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
