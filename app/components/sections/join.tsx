import Image from "next/image";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatPhone, telLink, whatsappLink } from "@/app/lib/links";
import { Reveal } from "../motion/reveal";
import { StarRow } from "../ui/ornaments";
import { ButtonLink, Container } from "../ui/primitives";
import { BrushDisc } from "./brush-disc";

export function Join({
  academyName,
  contacts,
}: {
  academyName: string;
  contacts: { phone: string }[];
}) {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-crimson pt-24 text-paper sm:pt-28"
      aria-labelledby="contact-title"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-[-6rem] h-72 w-72 rounded-full border-[24px] border-night/25"
      />
      <Container className="relative grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
        <div className="lg:pb-28">
          <StarRow className="[&_svg]:fill-paper" />
          <Reveal>
            <h2
              id="contact-title"
              className="mt-6 font-display text-4xl sm:text-6xl"
            >
              Start your training
            </h2>
            <p className="mt-5 max-w-xl text-lg text-paper/85">
              Visit or message the branch nearest to you.
            </p>
          </Reveal>

          {contacts.length > 0 && (
            <ul className="mt-10 grid gap-5 sm:grid-cols-2">
              {contacts.map(({ phone }) => (
                <li key={phone} className="rounded-2xl bg-night/30 p-6">
                  <p className="font-accent text-sm font-medium uppercase tracking-[0.25em] text-paper/70">
                    Call or WhatsApp
                  </p>
                  <p className="mt-2 font-display text-2xl">
                    <a href={telLink(phone)} className="hover:underline">
                      {formatPhone(phone)}
                    </a>
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <ButtonLink href={telLink(phone)} variant="light">
                      <FontAwesomeIcon
                        icon={faPhone}
                        aria-hidden="true"
                        className="size-4 shrink-0"
                      />
                      Call
                    </ButtonLink>
                    <ButtonLink
                      external
                      variant="ghost"
                      href={whatsappLink(
                        phone,
                        `Hi ${academyName}, I'd like to know more about classes.`
                      )}
                    >
                      <FontAwesomeIcon
                        icon={faWhatsapp}
                        aria-hidden="true"
                        className="size-4 shrink-0"
                      />
                      WhatsApp
                    </ButtonLink>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {contacts.length === 0 ? (
            <p className="mt-10 font-accent uppercase tracking-[0.3em] text-paper/80">
              Contact details coming soon
            </p>
          ) : null}
        </div>

        {/* Fighting stance standing on the section's bottom edge. */}
        <div className="relative mx-auto h-[24rem] w-full max-w-[22rem] self-end sm:h-[28rem] lg:h-[34rem] lg:max-w-[26rem]">
          <BrushDisc
            tone="night"
            play="view"
            className="absolute inset-x-0 top-[6%] aspect-[700/670] w-full"
          />
          <Reveal className="absolute inset-x-[23%] inset-y-0">
            <Image
              src="/images/student-stance.webp"
              alt="A student in a white dobok in a fighting stance with fists raised"
              width={454}
              height={847}
              sizes="(min-width: 1024px) 14rem, 12rem"
              className="absolute bottom-0 h-auto w-full select-none"
              draggable={false}
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
