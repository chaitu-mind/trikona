import Link from "next/link";
import type { Metadata } from "next";
import SettingOut from "@/components/drawings/SettingOut";
import Elevation from "@/components/drawings/Elevation";
import { SectionHead, Cta } from "@/components/PageHeader";
import { site, founders } from "@/lib/site";
import { capabilities, assurance } from "@/lib/content";
import { works } from "@/lib/works";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  const featured = works.slice(0, 3);

  return (
    <>
      {/* A — the firm */}
      <section className="sheet hero">
        <div className="wrap">
          <div className="hero__grid">
            <div>
              <div className="dim"><span className="dim__txt">Sheet A · The firm</span><span className="dim__line" /></div>
              <p className="eyebrow" style={{ marginTop: 22 }}>
                Civil engineering &amp; construction · {site.region}
              </p>
              <h1 className="hero__name">TRI<span>KONA</span></h1>
              <p className="hero__lede">
                <b>Trikona</b> is the Sanskrit word for triangle — the only polygon that
                cannot deform, and the shape every truss on every site is built from.
              </p>
              <p className="hero__note">
                Three brothers, three founders. One vertex each: the client and the design,
                the site and its execution, the cost and the schedule. Take any one away and
                the frame racks.
              </p>
              <div className="hero__cta">
                <Link className="btn" href="/contact/">Get an estimate</Link>
                <Link className="btn btn--ghost" href="/works/">See the works</Link>
              </div>
            </div>

            <figure className="hero__fig">
              <SettingOut />
              <figcaption>
                <span>Setting-out plan · Grid A–D / 1–3</span>
                <span>Scale 1:100 · Dims in mm</span>
              </figcaption>
            </figure>
          </div>

          <dl className="tblock">
            <div><dt>Practice</dt><dd>{site.legal}</dd></div>
            <div><dt>Founded</dt><dd>{site.founded}</dd></div>
            <div><dt>Base</dt><dd>{site.city}, {site.state}</dd></div>
            <div><dt>Works to</dt><dd>IS 456:2000</dd></div>
          </dl>
        </div>
      </section>

      {/* C — capabilities */}
      <section className="sheet sheet--sunk">
        <div className="wrap">
          <SectionHead bubble="C" eyebrow="Capabilities" title="What we take on"
            lede="From a single compound wall to a turnkey apartment block. Where the job is better served by supervision than by a contract, we will say so." />
          <div className="caps">
            {capabilities.map((c) => (
              <Link className="cap cardlink" key={c.slug} href={`/services/${c.slug}/`}>
                <div className="cap__ref">{c.ref}</div>
                <h3>{c.title}</h3>
                <p>{c.short}</p>
                <span className="more">Read more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* D — works */}
      <section className="sheet">
        <div className="wrap">
          <SectionHead bubble="D" eyebrow="Works" title="The record"
            lede="Each project is filed with its configuration, built-up area and structure." />
          <div className="works">
            {featured.map((w) => (
              <article key={w.slug}>
                <Link className="work" href={`/works/${w.slug}/`} style={{ display: "grid" }}>
                  <span className="work__plate">
                    {w.photo ? <img src={w.photo} alt={`${w.name}, ${w.location}`} /> : <Elevation work={w} />}
                    {w.sample && <span className="work__stamp mono">PLACEHOLDER</span>}
                  </span>
                  <span className="work__body">
                    <span className="work__ref"><span>{w.ref}</span><span>{w.category}</span></span>
                    <h3 style={{ fontSize: "1.06rem" }}>{w.name}</h3>
                    <span className="work__loc">{w.location}</span>
                    <span className="work__data"><span>{w.area}</span><span>{w.config}</span><span>{w.year}</span></span>
                    <span className={`status ${w.status === "Ongoing" ? "status--ongoing" : "status--done"}`}>{w.status}</span>
                  </span>
                </Link>
              </article>
            ))}
          </div>
          <div className="hero__cta" style={{ marginTop: 26 }}>
            <Link className="btn btn--ghost" href="/works/">All {works.length} projects</Link>
          </div>
        </div>
      </section>

      {/* B — founders */}
      <section className="sheet sheet--sunk">
        <div className="wrap">
          <SectionHead bubble="B" eyebrow="Founders" title="Three vertices"
            lede="Three founders, equal partners. What differs is the function each one owns and signs for." />
          <div className="plist">
            {founders.map((f) => (
              <article className="pcard" key={f.name}>
                <div className="pcard__top">
                  <span className="pcard__no mono">{f.no}</span>
                  <h3>{f.name}</h3>
                </div>
                <div className="pcard__role">{f.role}</div>
                <p>{f.bio}</p>
              </article>
            ))}
          </div>
          <div className="hero__cta" style={{ marginTop: 26 }}>
            <Link className="btn btn--ghost" href="/about/">More about the practice</Link>
          </div>
        </div>
      </section>

      {/* G — assurance */}
      <section className="sheet">
        <div className="wrap">
          <SectionHead bubble="G" eyebrow="Assurance" title="How we hold ourselves to it"
            lede="We are new. These are the commitments that let you check us against an established firm on the things that matter." />
          <div className="assure">
            {assurance.map((a) => (
              <div className="ass" key={a.title}>
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2 8.6 6 12.5 14 3.5" stroke="currentColor" strokeWidth="1.9" />
                </svg>
                <div><h3>{a.title}</h3><p>{a.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sheet sheet--sunk">
        <div className="wrap">
          <Cta title="Start with a site visit"
            body="The first visit and the outline estimate cost nothing. Tell us where the plot is and what you want built." />
        </div>
      </section>
    </>
  );
}
