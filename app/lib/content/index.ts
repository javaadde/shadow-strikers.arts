import raw from "../../../data/academy.json";
import { whatsappLink } from "../links";
import { parseAcademy, type Branch } from "./schema";

/** Validated site content. A bad edit to data/academy.json fails the build here. */
export const content = parseAcademy(raw);

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const absoluteUrl = (path: string) =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export const branchPath = (slug: string) => `/branches/${slug}`;

/** "Pullur, Manjeri" when the branch has a locality, otherwise just the town. */
export function branchPlace(branch: Pick<Branch, "name" | "locality">) {
  return branch.locality ? `${branch.locality}, ${branch.name}` : branch.name;
}

export function getBranch(slug: string) {
  return content.branches.find((branch) => branch.slug === slug);
}

/** Configured social profiles, in the reference's icon order. */
export function socialLinks() {
  const { instagram, facebook, youtube, whatsapp } = content.academy.social;
  return [
    instagram && { label: "Instagram" as const, href: instagram },
    facebook && { label: "Facebook" as const, href: facebook },
    youtube && { label: "YouTube" as const, href: youtube },
    whatsapp && { label: "WhatsApp" as const, href: whatsappLink(whatsapp) },
  ].filter((link) => Boolean(link)) as {
    label: "Instagram" | "Facebook" | "YouTube" | "WhatsApp";
    href: string;
  }[];
}
