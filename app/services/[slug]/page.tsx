import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PageHeader, { SectionHead } from "@/components/PageHeader";
import { capabilities } from "@/lib/content";
import { site } from "@/lib/site";
import { works } from "@/lib/works";
import { breadcrumbJsonLd, JsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return capabilities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = capabilities.find((x) => x.slug === slug);
  if (!c) return {};
  return {
    title: `${c.title} in ${site.city}`,
    description: c.desc,
    alternates: { canonical: `/services/${c.slug}/` },
    openGraph: { title: `${c.title} — ${site.name}`, description: c.desc, url: `/services/${c.slug}/`, type: "article" },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = capabilities.find((x) => x.slug === slug);
  if (!c) notFound();

  const i = capabilities.indexOf(c);
  const prev = capabilities[i - 1];
  const next = capabilities[i + 1];
  const trail = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services/" },
    { name: c.title, path: `/services/${c.slug}/` },
  ];

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: c.title,
    serviceType: c.title,
    description: c.desc,
    provider: { "@id": `${site.url}/#organisation` },
    areaServed: site.areaServed.map((n) => ({ "@type": "City", name: n })),
    hasOfferCatalog: {
      "@type": "OfferCatalog", name: `${c.title} scope`,
      itemListElement: c.includes.map((x) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: x } })),
    },
  };

  const related = works.filter((w) =>
    (c.slug === "turnkey-residential" && w.category === "Residential") ||
    (c.slug === "commercial-shell-core" && w.category === "Commercial") ||
    (c.slug === "interiors-fit-out" && w.category === "Interiors") ||
    (c.slug === "site-development" && w.category === "Site works")
  );

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <JsonLd data={serviceLd} />
      <PageHeader bubble={c.ref} eyebrow="Service" title={c.title} trail={trail} lede={c.intro} />

      <section className="sheet">
        <div className="wrap">
          <div className="twocol">
            <div>
              <SectionHead bubble="1" eyebrow="Scope" title="What the engagement includes" as="h2" />
              <ul className="ticks">{c.includes.map((x) => <li key={x}>{x}</li>)}</ul>

              <div style={{ marginTop: 40 }}>
                <SectionHead bubble="2" eyebrow="Deliverables" title="What you are handed" as="h2" />
                <ul className="ticks">{c.deliverables.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
            </div>

            <div className="side">
              <div className="panel">
                <h3>Who this suits</h3>
                <p>{c.fit}</p>
              </div>
              <div className="panel">
                <h3>Filed under</h3>
                <ul className="taglist">
                  {c.tags.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </div>
              <div className="panel">
                <h3>Next step</h3>
                <p>Send the plot details and any drawings you already have. The first site visit and the outline estimate cost nothing.</p>
                <div className="cta__btns" style={{ marginTop: 4 }}>
                  <Link className="btn" href="/contact/">Get an estimate</Link>
                </div>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <div style={{ marginTop: 56 }}>
              <SectionHead bubble="3" eyebrow="Related work" title="Projects under this service" as="h2" />
              <div className="caps">
                {related.map((w) => (
                  <Link className="cardlink" key={w.slug} href={`/works/${w.slug}/`}>
                    <div className="cap__ref">{w.ref} · {w.year}</div>
                    <h3>{w.name}</h3>
                    <p>{w.location} · {w.area} · {w.config}</p>
                    <span className="more">Open the sheet →</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="pager">
            {prev
              ? <Link href={`/services/${prev.slug}/`}><span className="k">Previous</span><span className="v">{prev.title}</span></Link>
              : <Link href="/services/"><span className="k">Index</span><span className="v">All services</span></Link>}
            {next
              ? <Link href={`/services/${next.slug}/`}><span className="k">Next</span><span className="v">{next.title}</span></Link>
              : <Link href="/works/"><span className="k">Next</span><span className="v">The works record</span></Link>}
          </div>
        </div>
      </section>
    </>
  );
}
