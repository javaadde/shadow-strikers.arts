import { SiteShell } from "./components/site/site-shell";
import { ButtonLink, Container } from "./components/ui/primitives";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="paper grid min-h-[70svh] place-items-center pt-[var(--header-h)]">
        <Container className="text-center">
          <h1 className="font-display text-6xl text-crimson">Page not found</h1>
          <p className="mt-4 text-lg text-ink/75">
            That page is not on the mat.
          </p>
          <ButtonLink href="/" className="mt-8">
            Back home
          </ButtonLink>
        </Container>
      </section>
    </SiteShell>
  );
}
