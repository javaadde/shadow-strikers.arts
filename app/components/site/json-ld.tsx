import { absoluteUrl, branchPath, content } from "@/app/lib/content";

/** schema.org data for each branch, so search engines can show it as a local listing. */
export function JsonLd() {
  const { academy, branches } = content;
  const data = {
    "@context": "https://schema.org",
    "@graph": branches.map((branch) => ({
      "@type": "SportsActivityLocation",
      "@id": absoluteUrl(branchPath(branch.slug)),
      name: `${academy.name} — ${branch.name}`,
      url: absoluteUrl(branchPath(branch.slug)),
      image: absoluteUrl("/images/logo.webp"),
      ...(branch.phone && { telephone: `+${branch.phone}` }),
      address: {
        "@type": "PostalAddress",
        addressLocality: branch.name,
        addressRegion: "Kerala",
        addressCountry: "IN",
        ...(branch.address && { streetAddress: branch.address }),
      },
      ...(branch.geo && {
        geo: {
          "@type": "GeoCoordinates",
          latitude: branch.geo.lat,
          longitude: branch.geo.lng,
        },
      }),
      ...(branch.mapsUrl && { hasMap: branch.mapsUrl }),
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
