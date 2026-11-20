import type { Metadata, Viewport } from "next";
import font from "next/font/local";
import "./globals.css";
import { MotionProvider } from "./components/motion/motion-provider";
import { SITE_URL, content } from "./lib/content";

// Self-hosted (OFL) like the portfolio's fonts; next/font/google fails on Next 14.2.6.
const display = font({
  src: "../public/fonts/Marcellus.woff2",
  weight: "400",
  variable: "--font-display",
});

const body = font({
  src: "../public/fonts/Montserrat-Variable.woff2",
  weight: "100 900",
  variable: "--font-body",
});

const accent = font({
  src: "../public/fonts/Oswald-Variable.woff2",
  weight: "200 700",
  variable: "--font-accent",
});

const { site, academy } = content;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: site.title, template: `%s — ${academy.shortName}` },
  description: site.description,
  applicationName: academy.name,
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: academy.name,
    locale: "en_IN",
    title: site.title,
    description: site.description,
    images: [{ url: "/images/og.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/images/og.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0E0A0B",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${accent.variable}`}
    >
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
