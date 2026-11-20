import { About } from "./components/sections/about";
import { Branches } from "./components/sections/branches";
import { Hero } from "./components/sections/hero";
import { Join } from "./components/sections/join";
import { Programs } from "./components/sections/programs";
import { JsonLd } from "./components/site/json-ld";
import { SiteShell } from "./components/site/site-shell";
import { branchPlace, content, socialLinks } from "./lib/content";

export default function HomePage() {
  const { academy, branches, programs } = content;
  return (
    <SiteShell overlayHeader>
      <JsonLd />
      <Hero
        titleLines={academy.hero.titleLines}
        subtitle={academy.hero.subtitle}
        intro={academy.hero.intro}
        cta={academy.hero.cta}
        academyName={academy.name}
        contactPhone={academy.contacts[0]?.phone}
        branchNames={branches.map(branchPlace)}
        social={socialLinks()}
      />
      <Programs programs={programs} />
      <About
        name={academy.name}
        paragraphs={academy.about}
        motto={academy.motto}
      />
      <Branches branches={branches} academyName={academy.name} />
      <Join
        academyName={academy.name}
        contacts={academy.contacts}
      />
    </SiteShell>
  );
}
