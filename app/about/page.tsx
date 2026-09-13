import type { Metadata } from "next";
import PageHeader, { SectionHead, Cta } from "@/components/PageHeader";
import TriangleDiagram from "@/components/drawings/TriangleDiagram";
import { site, founders } from "@/lib/site";
import { assurance } from "@/lib/content";
import { breadcrumbJsonLd, JsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About the practice",
  description: `${site.name} is a civil engineering and construction practice founded in ${site.city} by three brothers, each owning one function: client and design, site and execution, cost and schedule.`,
  alternates: { canonical: "/about/" },
};

const trail = [{ name: "Home", path: "/" }, { name: "About", path: "/about/" }];

export default function About() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <PageHeader bubble="B" eyebrow="About" title="Three vertices" trail={trail}
        lede="Trikona is the Sanskrit word for triangle. A triangle is the only polygon whose shape is fixed by its side lengths alone, which is why every truss on every site is built from them. It is also three brothers, and three functions that hold a building job together." />

      <section className="sheet">
        <div className="wrap">
          <div className="partners">
            <figure className="partners__fig">
              <TriangleDiagram />
              <p>Remove any one vertex and the frame racks. The same is true of a construction job missing its design, its site management or its cost control.</p>
            </figure>
            <div className="plist">
              {founders.map((f) => (
                <article className="pcard" key={f.name}>
                  <div className="pcard__top">
                    <span className="pcard__no mono">{f.no}</span>
                    <h2 style={{ fontSize: "1.1875rem" }}>{f.name}</h2>
                  </div>
                  <div className="pcard__role">{f.role}</div>
                  <p>{f.bio}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sheet sheet--sunk">
        <div className="wrap">
          <SectionHead bubble="B.2" eyebrow="Why we started" title="A new practice, not a new trade" />
          <div className="twocol">
            <div className="prose">
              <p>Most complaints about building a house in India are not about skill. They are about information. The owner cannot tell what grade of steel went in, cannot tell whether the bill matches the work, and finds out about a change only when it appears on an invoice.</p>
              <p>We started {site.name} in {site.founded} because the three of us kept seeing the same fixable problems from three different sides of the same job. The answer was not a new technique. It was publishing the specification, measuring before billing, photographing the reinforcement before the pour, and putting all of it in writing before anyone signs.</p>
              <p>We are a young practice and we say so plainly. What we will not do is inflate a record. Every project on this site is filed with its real configuration and status, and anything still marked as a placeholder is exactly that.</p>
            </div>
            <div className="side">
              <div className="panel">
                <h3>The practice at a glance</h3>
                <dl className="wfacts" style={{ marginTop: 4 }}>
                  <div><dt>Registered as</dt><dd>{site.legal}</dd></div>
                  <div><dt>Founded</dt><dd>{site.founded}</dd></div>
                  <div><dt>Base</dt><dd>{site.city}, {site.state}</dd></div>
                  <div><dt>Works across</dt><dd>{site.region}</dd></div>
                  <div><dt>Designs to</dt><dd>IS 456:2000</dd></div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sheet">
        <div className="wrap">
          <SectionHead bubble="G" eyebrow="Assurance" title="What we commit to in writing" />
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
          <Cta title="Talk to one of us directly" body="There is no sales team. You will speak to whichever of the three of us owns the part of the job you are asking about." />
        </div>
      </section>
    </>
  );
}
