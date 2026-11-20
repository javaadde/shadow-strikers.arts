import type { Branch } from "@/app/lib/content/schema";
import { Reveal } from "../motion/reveal";
import { StarRow } from "../ui/ornaments";
import { Container } from "../ui/primitives";
import { BranchActions } from "./branches";

export function Join({
  branches,
  academyName,
}: {
  branches: Branch[];
  academyName: string;
}) {
  const reachable = branches.filter((b) => b.whatsapp || b.phone);
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-crimson py-24 text-paper sm:py-28"
      aria-labelledby="contact-title"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-[-6rem] h-72 w-72 rounded-full border-[24px] border-night/25"
      />
      <Container className="relative text-center">
        <StarRow className="justify-center [&_svg]:fill-paper" />
        <Reveal>
          <h2
            id="contact-title"
            className="mt-6 font-display text-4xl sm:text-6xl"
          >
            Start your training
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-paper/85">
            Visit or message the branch nearest to you.
          </p>
        </Reveal>

        {reachable.length > 0 ? (
          <ul className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
            {reachable.map((branch) => (
              <li key={branch.slug} className="rounded-2xl bg-night/30 p-6">
                <p className="font-display text-2xl">{branch.name}</p>
                <div className="mt-4 flex flex-wrap justify-center gap-3">
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
      </Container>
    </section>
  );
}
