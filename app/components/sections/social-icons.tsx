export type SocialLink = {
  label: "Instagram" | "Facebook" | "YouTube" | "WhatsApp";
  href: string;
};

const paths: Record<SocialLink["label"], React.ReactNode> = {
  Instagram: (
    <>
      <rect
        x="6.5"
        y="6.5"
        width="11"
        height="11"
        rx="3.2"
        fill="none"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="2.6" fill="none" strokeWidth="1.6" />
      <circle cx="15.2" cy="8.8" r="0.8" stroke="none" />
    </>
  ),
  Facebook: (
    <path
      stroke="none"
      d="M13.2 18v-5.1h1.7l.3-2h-2V9.6c0-.6.2-1 1-1h1.1V6.8c-.2 0-.9-.1-1.6-.1-1.6 0-2.6.9-2.6 2.7v1.5H9.4v2h1.7V18z"
    />
  ),
  YouTube: (
    <>
      <rect
        x="5.5"
        y="7.8"
        width="13"
        height="8.4"
        rx="2.4"
        fill="none"
        strokeWidth="1.6"
      />
      <path stroke="none" d="M11 10.2v3.6l3-1.8z" />
    </>
  ),
  WhatsApp: (
    <>
      <path
        fill="none"
        strokeWidth="1.5"
        d="M7.3 16.8l.6-2.2a5.2 5.2 0 1 1 1.9 1.7z"
      />
      <path
        stroke="none"
        d="M10.4 9.6c.2-.4.4-.4.6-.4h.4c.1 0 .3 0 .4.3l.5 1.2c0 .1 0 .3-.1.4l-.3.4c-.1.1-.1.2 0 .4.4.7 1 1.2 1.7 1.5.1.1.3 0 .4-.1l.4-.5c.1-.1.2-.2.4-.1l1.1.5c.2.1.3.2.3.3 0 .5-.2 1-.7 1.2-.5.3-1.2.3-2.2-.2a7 7 0 0 1-2.8-2.7c-.6-.9-.6-1.6-.3-2.2z"
      />
    </>
  ),
};

/** Round maroon social badges from the reference's bottom-right corner. Renders nothing without links. */
export function SocialIcons({ links }: { links: SocialLink[] }) {
  if (links.length === 0) return null;
  return (
    <ul className="flex items-center gap-2.5 lg:gap-[max(0.5rem,calc(var(--u)*10))]">
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${link.label} (opens in a new tab)`}
            className="grid h-11 w-11 place-items-center rounded-full transition-transform duration-200 hover:-translate-y-0.5 active:scale-95"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden
              className="h-7 w-7 fill-paper stroke-paper lg:h-[max(1.6rem,calc(var(--u)*30))] lg:w-[max(1.6rem,calc(var(--u)*30))]"
            >
              <circle
                cx="12"
                cy="12"
                r="12"
                className="fill-maroon stroke-none"
              />
              {paths[link.label]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
