import { site, founders } from "./site";
import { capabilities, faqs } from "./content";
import type { Work } from "./works";

const abs = (p = "") => `${site.url}${p.startsWith("/") ? p : `/${p}`}`;

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: site.street,
  addressLocality: site.city,
  addressRegion: site.state,
  postalCode: site.postal,
  addressCountry: site.country,
};

/** GeneralContractor is the schema.org type Google maps to a builder.
 *  This is the single most valuable block on the site for local search. */
export function businessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": abs("/#organisation"),
    name: site.name,
    legalName: site.legal,
    url: abs("/"),
    description: `${site.name} is a civil engineering and construction practice in ${site.city}, building turnkey residential, commercial and interior projects across ${site.region}.`,
    slogan: "The strongest shape in engineering is a triangle.",
    foundingDate: site.founded,
    telephone: site.phone,
    email: site.email,
    address: postalAddress,
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    openingHours: site.hours,
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    knowsLanguage: ["en", "te", "hi"],
    areaServed: site.areaServed.map((n) => ({ "@type": "City", name: n })),
    founder: founders.map((f) => ({ "@type": "Person", name: f.name, jobTitle: f.role })),
    employee: founders.map((f) => ({ "@type": "Person", name: f.name, jobTitle: f.role })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Construction services",
      itemListElement: capabilities.map((c) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: c.title, description: c.desc, serviceType: c.title },
      })),
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": abs("/#website"),
    url: abs("/"),
    name: site.name,
    inLanguage: "en-IN",
    publisher: { "@id": abs("/#organisation") },
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Only real projects are described as completed work. A sample entry is
 *  excluded from structured data entirely — never claim work you have not done. */
export function workJsonLd(w: Work) {
  if (w.sample) return null;
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": abs(`/works/${w.slug}/#project`),
    name: w.name,
    headline: w.name,
    description: w.note,
    dateCreated: w.year,
    creator: { "@id": abs("/#organisation") },
    locationCreated: { "@type": "Place", name: w.location, address: { "@type": "PostalAddress", addressLocality: w.locality, addressRegion: site.state, addressCountry: site.country } },
    about: w.category,
    ...(w.photo ? { image: abs(w.photo) } : {}),
  };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: abs(t.path),
    })),
  };
}

export function JsonLd({ data }: { data: object | null }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
