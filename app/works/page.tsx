import type { Metadata } from "next";
import PageHeader, { Cta } from "@/components/PageHeader";
import WorksGrid from "@/components/WorksGrid";
import Elevation from "@/components/drawings/Elevation";
import { works } from "@/lib/works";
import { site } from "@/lib/site";
import { breadcrumbJsonLd, JsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Works",
  description: `Completed and ongoing construction projects by ${site.name} across ${site.region}, filed with configuration, built-up area and structure.`,
  alternates: { canonical: "/works/" },
};

const trail = [{ name: "Home", path: "/" }, { name: "Works", path: "/works/" }];

export default function Works() {
  // Drawings are rendered on the server, then handed to the client grid as
  // ready-made markup, so filtering costs no extra JavaScript.
  const plates = Object.fromEntries(works.map((w) => [w.slug, <Elevation key={w.slug} work={w} />]));

  const listLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Works by ${site.name}`,
    numberOfItems: works.length,
    itemListElement: works.map((w, i) => ({
      "@type": "ListItem", position: i + 1, name: w.name, url: `${site.url}/works/${w.slug}/`,
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <JsonLd data={listLd} />
      <PageHeader bubble="D" eyebrow="Works" title="The record" trail={trail}
        lede="Every project is filed with its configuration, built-up area and structure. Where no photograph exists yet, the elevation is drawn from the project's own numbers." />
      <section className="sheet">
        <div className="wrap">
          <WorksGrid works={works} plates={plates} />
          <div className="notice">
            <b>Note</b>
            <span>Entries stamped <strong>PLACEHOLDER</strong> are samples showing how a finished project reads here. They are excluded from the site&rsquo;s structured data, so they are never presented to a search engine as completed work.</span>
          </div>
        </div>
      </section>
      <section className="sheet sheet--sunk">
        <div className="wrap">
          <Cta title="Your project could be the next sheet" body="Send the plot details and what you want built. The first visit and the outline estimate cost nothing." />
        </div>
      </section>
    </>
  );
}
