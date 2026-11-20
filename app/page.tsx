import { About } from "./components/sections/about";
import { Branches } from "./components/sections/branches";
import { Hero } from "./components/sections/hero";
import { Join } from "./components/sections/join";
import { Programs } from "./components/sections/programs";
import { JsonLd } from "./components/site/json-ld";
import { SiteShell } from "./components/site/site-shell";
import { content, socialLinks } from "./lib/content";

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
        branchNames={branches.map((b) => b.name)}
        social={socialLinks()}
      />
      <Programs programs={programs} />
      <About
        name={academy.name}
        paragraphs={academy.about}
        motto={academy.motto}
      />
      <Branches branches={branches} academyName={academy.name} />
      <Join branches={branches} academyName={academy.name} />
    </SiteShell>
  );
}
