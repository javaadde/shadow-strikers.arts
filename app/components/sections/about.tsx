import { Reveal, RevealGroup, RevealItem } from "../motion/reveal";
import { Star } from "../ui/ornaments";
import { Container, SectionHeading } from "../ui/primitives";

export function About({
  name,
  paragraphs,
  motto,
}: {
  name: string;
  paragraphs: string[];
  motto?: string;
}) {
  if (paragraphs.length === 0) return null;
  return (
    <section
      id="about"
      className="night py-24 sm:py-32"
      aria-labelledby="about-title"
    >
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <div>
          <SectionHeading
            id="about-title"
            eyebrow="About us"
            title={name}
            tone="night"
          />
          {motto && (
            <Reveal className="mt-10 flex items-center gap-4">
              <Star className="h-8 w-8 shrink-0" />
              <p className="font-accent text-2xl font-bold uppercase tracking-wider text-paper">
                {motto}
              </p>
            </Reveal>
          )}
        </div>
        <RevealGroup className="space-y-6 text-lg leading-relaxed text-paper/80">
          {paragraphs.map((paragraph) => (
            <RevealItem key={paragraph} as="div">
              <p>{paragraph}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
