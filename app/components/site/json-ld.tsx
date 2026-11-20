import {
  absoluteUrl,
  branchPath,
  branchPlace,
  content,
} from "@/app/lib/content";

/** schema.org data for each branch, so search engines can show it as a local listing. */
export function JsonLd() {
  const { academy, branches } = content;
  const data = {
    "@context": "https://schema.org",
    "@graph": branches.map((branch) => ({
      "@type": "SportsActivityLocation",
      "@id": absoluteUrl(branchPath(branch.slug)),
      name: `${academy.name} — ${branchPlace(branch)}`,
      url: absoluteUrl(branchPath(branch.slug)),
      image: absoluteUrl("/images/logo.webp"),
      telephone: [
        ...(branch.phone ? [branch.phone] : []),
        ...academy.contacts.map((c) => c.phone),
      ]
        .filter((phone, i, all) => all.indexOf(phone) === i)
        .map((phone) => `+${phone}`),
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
