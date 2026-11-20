import type { Program } from "@/app/lib/content/schema";
import { RevealGroup, RevealItem } from "../motion/reveal";
import { Star } from "../ui/ornaments";
import { Container, SectionHeading } from "../ui/primitives";

/** Renders nothing until programs are added to data/academy.json. */
export function Programs({ programs }: { programs: Program[] }) {
  if (programs.length === 0) return null;
  return (
    <section
      id="programs"
      className="paper py-24 sm:py-32"
      aria-labelledby="programs-title"
    >
      <Container>
        <SectionHeading
          id="programs-title"
          eyebrow="Programs"
          title="Find your path"
        />
        <RevealGroup
          as="ul"
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {programs.map((program) => (
            <RevealItem
              as="li"
              key={program.id}
              className="group rounded-2xl border border-maroon/15 bg-paper/60 p-7 transition-transform duration-300 hover:-translate-y-1"
            >
              <Star className="h-5 w-5 transition-transform duration-500 group-hover:rotate-90" />
              <h3 className="mt-5 font-display text-2xl text-crimson">
                {program.name}
              </h3>
              {program.ageGroup && (
                <p className="mt-1 font-accent text-sm uppercase tracking-widest text-maroon">
                  {program.ageGroup}
                </p>
              )}
              <p className="mt-4 leading-relaxed text-ink/80">
                {program.description}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
