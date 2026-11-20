import type { MetadataRoute } from "next";
import { absoluteUrl, branchPath, content } from "./lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    ...content.branches.map((branch) => ({
      url: absoluteUrl(branchPath(branch.slug)),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
