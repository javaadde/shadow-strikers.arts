import { z } from "zod";

const time = z
  .string()
  .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Expected a 24h HH:MM time");

const url = z.string().url();

/** Digits only, with country code, e.g. "919876543210". */
const phone = z
  .string()
  .regex(/^\d{10,15}$/, "Expected digits with country code");

export const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;

const sessionSchema = z.object({
  day: z.enum(days),
  start: time,
  end: time,
  programId: z.string(),
});

const branchSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  // Not known yet: everything about the location is optional until the owner provides it.
  address: z.string().optional(),
  mapsUrl: url.optional(),
  geo: z.object({ lat: z.number(), lng: z.number() }).optional(),
  phone: phone.optional(),
  whatsapp: phone.optional(),
  schedule: z.array(sessionSchema).default([]),
});

const programSchema = z.object({
  id: z.string(),
  name: z.string(),
  ageGroup: z.string().optional(),
  description: z.string(),
  image: z.string().optional(),
});

const instructorSchema = z.object({
  name: z.string(),
  rank: z.string().optional(),
  bio: z.string().optional(),
  image: z.string().optional(),
  branches: z.array(z.string()).default([]),
});

const testimonialSchema = z.object({
  quote: z.string(),
  name: z.string(),
  detail: z.string().optional(),
});

export const academySchema = z
  .object({
    site: z.object({
      title: z.string(),
      description: z.string(),
    }),
    academy: z.object({
      name: z.string().min(1),
      shortName: z.string().min(1),
      tagline: z.string(),
      motto: z.string().optional(),
      about: z.array(z.string()).default([]),
      /** Copy for the home hero, laid out like the reference template. */
      hero: z.object({
        titleLines: z.array(z.string().min(1)).min(1).max(3),
        subtitle: z.string(),
        intro: z.string(),
        cta: z.string().default("Join now"),
      }),
      founded: z
        .string()
        .regex(/^\d{4}$/)
        .optional(),
      social: z
        .object({
          instagram: url.optional(),
          facebook: url.optional(),
          youtube: url.optional(),
          whatsapp: phone.optional(),
        })
        .default({}),
    }),
    branches: z.array(branchSchema).min(1),
    programs: z.array(programSchema).default([]),
    instructors: z.array(instructorSchema).default([]),
    testimonials: z.array(testimonialSchema).default([]),
  })
  .superRefine((data, ctx) => {
    const programIds = new Set(data.programs.map((p) => p.id));
    const branchSlugs = new Set(data.branches.map((b) => b.slug));

    if (branchSlugs.size !== data.branches.length) {
      ctx.addIssue({ code: "custom", message: "Branch slugs must be unique" });
    }
    data.branches.forEach((branch, b) =>
      branch.schedule.forEach((session, s) => {
        if (!programIds.has(session.programId)) {
          ctx.addIssue({
            code: "custom",
            path: ["branches", b, "schedule", s, "programId"],
            message: `Unknown program "${session.programId}"`,
          });
        }
        if (session.end <= session.start) {
          ctx.addIssue({
            code: "custom",
            path: ["branches", b, "schedule", s, "end"],
            message: "Session must end after it starts",
          });
        }
      })
    );
    data.instructors.forEach((instructor, i) =>
      instructor.branches.forEach((slug) => {
        if (!branchSlugs.has(slug)) {
          ctx.addIssue({
            code: "custom",
            path: ["instructors", i, "branches"],
            message: `Unknown branch "${slug}"`,
          });
        }
      })
    );
  });

export type AcademyContent = z.infer<typeof academySchema>;
export type Branch = AcademyContent["branches"][number];
export type Program = AcademyContent["programs"][number];
export type Day = (typeof days)[number];

export function parseAcademy(input: unknown): AcademyContent {
  return academySchema.parse(input);
}
