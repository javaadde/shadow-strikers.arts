import { content } from "@/app/lib/content";
import { Footer } from "./footer";
import { Header, type NavItem } from "./header";

/** Nav links for sections that actually render (empty sections are hidden). */
function navItems(): NavItem[] {
  const items: NavItem[] = [{ label: "Home", href: "/#home" }];
  if (content.programs.length)
    items.push({ label: "Programs", href: "/#programs" });
  if (content.academy.about.length)
    items.push({ label: "About", href: "/#about" });
  items.push(
    { label: "Branches", href: "/#branches" },
    { label: "Contact", href: "/#contact" }
  );
  return items;
}

export function SiteShell({
  children,
  overlayHeader = false,
}: {
  children: React.ReactNode;
  /** Transparent header over the page's first section (home hero). */
  overlayHeader?: boolean;
}) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-menu focus:rounded-full focus:bg-paper focus:px-5 focus:py-3 focus:text-ink"
      >
        Skip to content
      </a>
      <Header
        items={navItems()}
        name={content.academy.shortName}
        tagline={content.academy.tagline}
        overlay={overlayHeader}
      />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
