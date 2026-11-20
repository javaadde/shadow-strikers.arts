import Link from "next/link";
import { branchPath, branchPlace } from "@/app/lib/content";
import type { Branch } from "@/app/lib/content/schema";
import { telLink, whatsappLink } from "@/app/lib/links";
import { cn } from "@/app/lib/utils";
import { RevealGroup, RevealItem } from "../motion/reveal";
import { ButtonLink, Container, SectionHeading } from "../ui/primitives";

export function Branches({
  branches,
  academyName,
}: {
  branches: Branch[];
  academyName: string;
}) {
  return (
    <section
      id="branches"
      className="paper py-24 sm:py-32"
      aria-labelledby="branches-title"
    >
      <Container>
        <SectionHeading
          id="branches-title"
          eyebrow="Branches"
          title={`Train with us in ${branches.map(branchPlace).join(" or ")}`}
        />
        <RevealGroup as="ul" className="mt-14 grid gap-6 md:grid-cols-2">
          {branches.map((branch) => (
            <RevealItem
              as="li"
              key={branch.slug}
              className="relative overflow-hidden rounded-2xl bg-night p-8 text-paper sm:p-10"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border-[14px] border-blood/70"
              />
              {branch.locality && (
                <p className="font-accent text-sm font-medium uppercase tracking-[0.3em] text-blood">
                  {branch.locality}
                </p>
              )}
              <h3
                className={cn(
                  "font-display text-4xl",
                  branch.locality && "mt-2"
                )}
              >
                <Link
                  href={branchPath(branch.slug)}
                  className="hover:text-blood"
                >
                  {branch.name}
                </Link>
              </h3>
              <BranchAddress branch={branch} />
              <div className="mt-8 flex flex-wrap gap-3">
                <BranchActions branch={branch} academyName={academyName} />
                <ButtonLink href={branchPath(branch.slug)} variant="light">
                  Details
                </ButtonLink>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}

export function BranchAddress({ branch }: { branch: Branch }) {
  return branch.address ? (
    <address className="mt-4 whitespace-pre-line not-italic leading-relaxed text-paper/80">
      {branch.address}
    </address>
  ) : (
    <p className="mt-4 text-paper/60">Location coming soon.</p>
  );
}

/** Map, call and WhatsApp buttons, each shown only when its detail is known. */
export function BranchActions({
  branch,
  academyName,
}: {
  branch: Branch;
  academyName: string;
}) {
  return (
    <>
      {branch.whatsapp && (
        <ButtonLink
          external
          href={whatsappLink(
            branch.whatsapp,
            `Hi ${academyName} (${branchPlace(branch)}), I'd like to know more about classes.`
          )}
        >
          WhatsApp
        </ButtonLink>
      )}
      {branch.phone && (
        <ButtonLink href={telLink(branch.phone)} variant="light">
          Call
        </ButtonLink>
      )}
      {branch.mapsUrl && (
        <ButtonLink external href={branch.mapsUrl} variant="light">
          Map
        </ButtonLink>
      )}
    </>
  );
}
