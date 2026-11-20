import Image from "next/image";
import Link from "next/link";
import { branchPath, content } from "@/app/lib/content";
import { whatsappLink } from "@/app/lib/links";
import { Container } from "../ui/primitives";

export function Footer() {
  const { academy, branches } = content;
  const social = [
    academy.social.instagram && {
      label: "Instagram",
      href: academy.social.instagram,
    },
    academy.social.facebook && {
      label: "Facebook",
      href: academy.social.facebook,
    },
    academy.social.youtube && {
      label: "YouTube",
      href: academy.social.youtube,
    },
    academy.social.whatsapp && {
      label: "WhatsApp",
      href: whatsappLink(academy.social.whatsapp),
    },
  ].filter((item): item is { label: string; href: string } => Boolean(item));

  return (
    <footer className="night py-16">
      <Container className="grid gap-10 sm:grid-cols-[auto_1fr_auto] sm:items-start">
        <Image
          src="/images/logo-sm.webp"
          alt={academy.name}
          width={160}
          height={160}
          className="h-24 w-24 rounded-full ring-2 ring-blood/70"
        />
        <nav aria-label="Branches">
          <p className="font-accent text-sm uppercase tracking-[0.3em] text-blood">
            Branches
          </p>
          <ul className="mt-3 space-y-2">
            {branches.map((branch) => (
              <li key={branch.slug}>
                <Link
                  href={branchPath(branch.slug)}
                  className="font-display text-xl text-paper/85 hover:text-blood"
                >
                  {branch.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {social.length > 0 && (
          <ul className="flex gap-4">
            {social.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-paper/75 hover:text-blood"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </Container>
      <Container className="mt-12 border-t border-paper/10 pt-6 text-sm text-paper/50">
        © {new Date().getFullYear()} {academy.name}
      </Container>
    </footer>
  );
}
