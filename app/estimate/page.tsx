import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Estimator from "@/components/Estimator";
import { site } from "@/lib/site";
import { packages } from "@/lib/rates";
import { breadcrumbJsonLd, JsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: `House construction cost in ${site.city}`,
  description: `Work out what a house costs to build in ${site.city}. Enter the plot size and floors and see the rate per square foot, where every rupee goes stage by stage, the payment schedule and what is excluded.`,
  alternates: { canonical: "/estimate/" },
  openGraph: {
    title: `House construction cost calculator — ${site.name}`,
    description: `Plot size and floors in, a stage-by-stage cost breakdown out. Published rates, nothing hidden.`,
    url: "/estimate/", type: "article",
  },
};

const trail = [{ name: "Home", path: "/" }, { name: "Cost estimate", path: "/estimate/" }];

export default function Estimate() {
  const lo = Math.min(...packages.map((p) => p.low));
  const hi = Math.max(...packages.map((p) => p.high));

  const ld = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `House construction cost calculator — ${site.city}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: `${site.url}/estimate/`,
    provider: { "@id": `${site.url}/#organisation` },
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description: `Estimates residential construction cost in ${site.city} from plot area, floors and specification, with a stage-wise breakdown.`,
  };

  const priceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Turnkey house construction",
    provider: { "@id": `${site.url}/#organisation` },
    areaServed: site.areaServed.map((n) => ({ "@type": "City", name: n })),
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: lo, highPrice: hi,
      unitText: "per square foot of built-up area",
      offerCount: packages.length,
    },
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <JsonLd data={ld} />
      <JsonLd data={priceLd} />
      <PageHeader bubble="C.0" eyebrow="Cost" title={`What will it cost to build?`} trail={trail}
        lede="Most builders will not answer this until you are sitting in their office. Here is the arithmetic we use, with our rates in it, so you can do the sum yourself before you call anyone." />
      <section className="sheet">
        <div className="wrap">
          <Estimator />
        </div>
      </section>
    </>
  );
}
