import type { Metadata, Viewport } from "next";
import { Archivo, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";
import { businessJsonLd, websiteJsonLd, JsonLd } from "@/lib/seo";
import "./globals.css";

/* Self-hosted at build time: no third-party request, no render-blocking
   stylesheet, no layout shift. All three matter for Core Web Vitals. */
const display = Archivo({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-display", display: "swap" });
const body = Source_Serif_4({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — civil engineering & construction in ${site.city}`,
    template: `%s — ${site.name}`,
  },
  description:
    `${site.name} builds turnkey homes, commercial shells and interiors across ${site.region}. Published material specification, stage-wise billing and a written agreement on every project.`,
  applicationName: site.name,
  authors: [{ name: site.legal }],
  generator: "Next.js",
  keywords: [
    "civil contractor Hyderabad", "construction company Hyderabad",
    "turnkey house construction", "RCC structural design",
    "building contractor Telangana", "house construction cost per sq ft",
    "interior fit-out contractor", "structural consultant Hyderabad",
  ],
  category: "construction",
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "512x512" }],
    shortcut: [{ url: "/icon.png" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    url: site.url,
    title: `${site.name} — civil engineering & construction in ${site.city}`,
    description: `Turnkey construction, structural design and interiors across ${site.region}.`,
    images: [{
      url: "/og.png", width: 1200, height: 630,
      alt: `${site.name} — the only polygon that cannot deform`,
      type: "image/png",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — civil engineering & construction`,
    description: `Turnkey construction, structural design and interiors across ${site.region}.`,
    images: ["/og.png"],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { telephone: true, address: true, email: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#E9EBE4" },
    { media: "(prefers-color-scheme: dark)", color: "#0D141A" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <JsonLd data={businessJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <a className="skip" href="#main">Skip to content</a>
        <div className="rail" aria-hidden="true"><span>{site.name} · Rev {site.revision}</span></div>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
