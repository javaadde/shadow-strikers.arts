import Image from "next/image";
import { Reveal, RevealGroup, RevealItem } from "../motion/reveal";
import { Star } from "../ui/ornaments";
import { Container, SectionHeading } from "../ui/primitives";
import { BrushDisc } from "./brush-disc";

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
      className="night overflow-hidden py-24 sm:py-32"
      aria-labelledby="about-title"
    >
      <Container className="grid items-center gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        {/* Salute on a brush disc: respect first. */}
        <div className="relative order-2 mx-auto aspect-[700/860] w-full max-w-[26rem] lg:order-1 lg:max-w-[30rem]">
          <BrushDisc
            play="view"
            className="absolute inset-x-0 top-[18%] aspect-[700/670] w-full"
          />
          <Reveal className="absolute inset-x-[14%] bottom-[5%]">
            <Image
              src="/images/student-salute.webp"
              alt="A student in a white dobok bowing with a fist-in-palm salute"
              width={1246}
              height={1587}
              sizes="(min-width: 1024px) 22rem, 70vw"
              className="h-auto w-full select-none [mask-image:linear-gradient(to_bottom,black_72%,transparent_98%)]"
              draggable={false}
            />
          </Reveal>
        </div>

        <div className="order-1 lg:order-2">
          <SectionHeading
            id="about-title"
            eyebrow="About us"
            title={name}
            tone="night"
          />
          <RevealGroup className="mt-8 space-y-6 text-lg leading-relaxed text-paper/80">
            {paragraphs.map((paragraph) => (
              <RevealItem key={paragraph} as="div">
                <p>{paragraph}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          {motto && (
            <Reveal className="mt-10 flex items-center gap-4">
              <Star className="h-8 w-8 shrink-0" />
              <p className="font-accent text-2xl font-bold uppercase tracking-wider text-paper">
                {motto}
              </p>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
