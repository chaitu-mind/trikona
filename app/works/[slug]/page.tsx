import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PageHeader, { SectionHead } from "@/components/PageHeader";
import Elevation from "@/components/drawings/Elevation";
import { works, getWork } from "@/lib/works";
import { site } from "@/lib/site";
import { breadcrumbJsonLd, workJsonLd, JsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const w = getWork(slug);
  if (!w) return {};
  const title = `${w.name} — ${w.config}, ${w.locality}`;
  return {
    title,
    description: w.note,
    alternates: { canonical: `/works/${w.slug}/` },
    openGraph: { title: `${w.name} — ${site.name}`, description: w.note, url: `/works/${w.slug}/`, type: "article" },
    // A sample entry must never be indexed as if it were real work.
    robots: w.sample ? { index: false, follow: true } : undefined,
  };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const w = getWork(slug);
  if (!w) notFound();

  const i = works.indexOf(w);
  const prev = works[i - 1];
  const next = works[i + 1];
  const trail = [
    { name: "Home", path: "/" },
    { name: "Works", path: "/works/" },
    { name: w.name, path: `/works/${w.slug}/` },
  ];

  const facts: [string, string][] = [
    ["Location", w.location],
    ["Category", w.category],
    ["Configuration", w.config],
    ["Built-up area", w.area],
    ["Scope", w.scope],
    ["Structure", w.structure],
    ["Duration", w.duration],
    ["Year", w.year],
    ["Status", w.status],
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <JsonLd data={workJsonLd(w)} />
      <PageHeader bubble={w.ref} eyebrow={`${w.category} · ${w.locality}`} title={w.name} trail={trail} lede={w.note} />

      <section className="sheet">
        <div className="wrap">
          {w.sample && (
            <div className="notice" style={{ marginTop: 0, marginBottom: 28 }}>
              <b>Placeholder</b>
              <span>This is a sample entry showing how a finished project reads. It is marked as not indexable and carries no structured data, so it is never presented to a search engine as completed work.</span>
            </div>
          )}

          <div className="wdetail">
            <div>
              <figure className="wplate">
                {w.photo
                  ? <img src={w.photo} alt={`${w.name}, ${w.location}`} />
                  : <Elevation work={w} />}
                <figcaption>
                  {w.photo ? <>{w.name} · {w.location}</> : <>Front elevation generated from the project record · {w.config} · Dims in mm</>}
                </figcaption>
              </figure>

              <div className="prose" style={{ marginTop: 34 }}>
                <h2 style={{ fontSize: "var(--fs-xl)" }}>On this project</h2>
                {w.detail.map((p, n) => <p key={n}>{p}</p>)}
              </div>
            </div>

            <div className="side">
              <div>
                <SectionHead bubble="i" eyebrow="Project record" title="Filed as" as="h2" />
                <dl className="wfacts">
                  {facts.map(([k, v]) => (
                    <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                  ))}
                </dl>
              </div>
              <div className="panel">
                <h3>Building something similar?</h3>
                <p>Send the plot details and we will tell you what this kind of project takes, in time and in cost.</p>
                <div className="cta__btns" style={{ marginTop: 4 }}>
                  <Link className="btn" href="/contact/">Get an estimate</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="pager">
            {prev
              ? <Link href={`/works/${prev.slug}/`}><span className="k">Previous</span><span className="v">{prev.name}</span></Link>
              : <Link href="/works/"><span className="k">Index</span><span className="v">All works</span></Link>}
            {next
              ? <Link href={`/works/${next.slug}/`}><span className="k">Next</span><span className="v">{next.name}</span></Link>
              : <Link href="/works/"><span className="k">Index</span><span className="v">All works</span></Link>}
          </div>
        </div>
      </section>
    </>
  );
}
