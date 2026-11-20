import Image from "next/image";
import { branchPlace } from "@/app/lib/content";
import type { Branch } from "@/app/lib/content/schema";
import { Reveal } from "../motion/reveal";
import { StarRow } from "../ui/ornaments";
import { Container } from "../ui/primitives";
import { BranchActions } from "./branches";
import { BrushDisc } from "./brush-disc";

export function Join({
  branches,
  academyName,
}: {
  branches: Branch[];
  academyName: string;
}) {
  const reachable = branches.filter((b) => b.whatsapp || b.phone || b.mapsUrl);
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-crimson pt-24 text-paper sm:pt-28"
      aria-labelledby="contact-title"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-[-6rem] h-72 w-72 rounded-full border-[24px] border-night/25"
      />
      <Container className="relative grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
        <div className="lg:pb-28">
          <StarRow className="[&_svg]:fill-paper" />
          <Reveal>
            <h2
              id="contact-title"
              className="mt-6 font-display text-4xl sm:text-6xl"
            >
              Start your training
            </h2>
            <p className="mt-5 max-w-xl text-lg text-paper/85">
              Visit or message the branch nearest to you.
            </p>
          </Reveal>

          {reachable.length > 0 ? (
            <ul className="mt-10 grid gap-5 sm:grid-cols-2">
              {reachable.map((branch) => (
                <li key={branch.slug} className="rounded-2xl bg-night/30 p-6">
                  <p className="font-display text-2xl">{branchPlace(branch)}</p>
                  {branch.address && (
                    <p className="mt-1 text-sm text-paper/75">
                      {branch.address}
                    </p>
                  )}
                  <div className="mt-5 flex flex-wrap gap-3">
                    <BranchActions branch={branch} academyName={academyName} />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-10 font-accent uppercase tracking-[0.3em] text-paper/80">
              Contact details coming soon
            </p>
          )}
        </div>

        {/* Fighting stance standing on the section's bottom edge. */}
        <div className="relative mx-auto h-[24rem] w-full max-w-[22rem] self-end sm:h-[28rem] lg:h-[34rem] lg:max-w-[26rem]">
          <BrushDisc
            tone="night"
            play="view"
            className="absolute inset-x-0 top-[6%] aspect-[700/670] w-full"
          />
          <Reveal className="absolute inset-x-[23%] inset-y-0">
            <Image
              src="/images/student-stance.webp"
              alt="A student in a white dobok in a fighting stance with fists raised"
              width={454}
              height={847}
              sizes="(min-width: 1024px) 14rem, 12rem"
              className="absolute bottom-0 h-auto w-full select-none"
              draggable={false}
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
