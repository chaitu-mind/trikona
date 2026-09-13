import Link from "next/link";
import type { Metadata } from "next";
import PageHeader, { Cta } from "@/components/PageHeader";
import { capabilities } from "@/lib/content";
import { site } from "@/lib/site";
import { breadcrumbJsonLd, JsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Services",
  description: `Turnkey residential construction, structural design, commercial shell and core, interiors, renovation, site development, estimation and project management across ${site.region}.`,
  alternates: { canonical: "/services/" },
};

const trail = [{ name: "Home", path: "/" }, { name: "Services", path: "/services/" }];

export default function Services() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <PageHeader bubble="C" eyebrow="Services" title="What we take on" trail={trail}
        lede="Nine engagements, from a compound wall to a turnkey apartment block. Some of them are contracts and some are supervision only. Where supervision serves you better, we will say so rather than sell you a contract." />
      <section className="sheet">
        <div className="wrap">
          <div className="caps">
            {capabilities.map((c) => (
              <Link className="cap cardlink" key={c.slug} href={`/services/${c.slug}/`}>
                <div className="cap__ref">{c.ref}</div>
                <h2 style={{ fontSize: "1.1875rem" }}>{c.title}</h2>
                <p>{c.desc}</p>
                <ul>{c.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                <span className="more">Read more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="sheet sheet--sunk">
        <div className="wrap">
          <Cta title="Not sure which one you need?" body="Describe the plot and what you want built. We will tell you which engagement fits, including when the answer is none of them." />
        </div>
      </section>
    </>
  );
}
