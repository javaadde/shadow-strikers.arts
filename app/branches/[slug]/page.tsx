import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/app/components/motion/reveal";
import {
  BranchActions,
  BranchAddress,
} from "@/app/components/sections/branches";
import { Join } from "@/app/components/sections/join";
import { StarRow } from "@/app/components/ui/ornaments";
import { Container, SectionHeading } from "@/app/components/ui/primitives";
import { SiteShell } from "@/app/components/site/site-shell";
import { branchPlace, content, getBranch } from "@/app/lib/content";
import { dayLabels, formatTime, groupByDay } from "@/app/lib/schedule";

export function generateStaticParams() {
  return content.branches.map((branch) => ({ slug: branch.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const branch = getBranch(params.slug);
  if (!branch) return {};
  return {
    title: `${branchPlace(branch)} branch`,
    description: `${content.academy.name} at ${branch.address ?? `${branchPlace(branch)}, Kerala`}: location, class timings and how to join.`,
    alternates: { canonical: `/branches/${branch.slug}` },
  };
}

export default function BranchPage({ params }: { params: { slug: string } }) {
  const branch = getBranch(params.slug);
  if (!branch) notFound();

  const { academy, programs } = content;
  const programName = (id: string) =>
    programs.find((p) => p.id === id)?.name ?? id;
  const week = groupByDay(branch.schedule);

  return (
    <SiteShell>
      <section className="night pb-20 pt-[calc(var(--header-h)+4rem)]">
        <Container>
          <StarRow />
          <Reveal>
            <p className="mt-6 font-accent text-sm uppercase tracking-[0.35em] text-blood">
              {academy.shortName} branch
            </p>
            <h1 className="mt-3 font-display text-5xl sm:text-7xl">
              {branchPlace(branch)}
            </h1>
            <BranchAddress branch={branch} />
            <div className="mt-8 flex flex-wrap gap-3">
              <BranchActions branch={branch} academyName={academy.name} />
            </div>
          </Reveal>
        </Container>
      </section>

      <section
        className="paper py-20 sm:py-28"
        aria-labelledby="schedule-title"
      >
        <Container>
          <SectionHeading
            id="schedule-title"
            eyebrow="Schedule"
            title="Class timings"
          />
          {week.length > 0 ? (
            <dl className="mt-12 divide-y divide-maroon/15 border-y border-maroon/15">
              {week.map(({ day, sessions }) => (
                <div
                  key={day}
                  className="grid gap-2 py-5 sm:grid-cols-[12rem_1fr]"
                >
                  <dt className="font-display text-xl text-crimson">
                    {dayLabels[day]}
                  </dt>
                  <dd>
                    <ul className="space-y-1">
                      {sessions.map((s) => (
                        <li key={`${s.start}-${s.programId}`}>
                          <span className="font-semibold">
                            {formatTime(s.start)} – {formatTime(s.end)}
                          </span>{" "}
                          · {programName(s.programId)}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="mt-10 text-lg text-ink/70">Timetable coming soon.</p>
          )}
        </Container>
      </section>

      <Join branches={[branch]} academyName={academy.name} />
    </SiteShell>
  );
}
