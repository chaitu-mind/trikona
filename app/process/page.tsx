import type { Metadata } from "next";
import PageHeader, { SectionHead, Cta } from "@/components/PageHeader";
import { method, spec } from "@/lib/content";
import { site } from "@/lib/site";
import { breadcrumbJsonLd, JsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Process & specification",
  description: "The six stages of a build, in order, and the full material specification we work to: concrete grades, steel, cement, blockwork, wiring, plumbing and testing.",
  alternates: { canonical: "/process/" },
};

const trail = [{ name: "Home", path: "/" }, { name: "Process", path: "/process/" }];

export default function Process() {
  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How ${site.name} builds a house, stage by stage`,
    description: "The six stages of a residential build, each ending in a document the owner keeps.",
    step: method.map((m, i) => ({
      "@type": "HowToStep", position: i + 1, name: m.title, text: m.desc,
      url: `${site.url}/process/#stage-${m.no}`,
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <JsonLd data={howTo} />
      <PageHeader bubble="E" eyebrow="Process" title="Six stages, in order" trail={trail}
        lede="Nothing on this list can be skipped or resequenced. Each stage ends in a document you keep, which is what makes the next stage checkable." />

      <section className="sheet">
        <div className="wrap">
          <div className="steps">
            {method.map((m) => (
              <article className="step" key={m.no} id={`stage-${m.no}`}>
                <div className="step__no">{m.no}</div>
                <h2 style={{ fontSize: "var(--fs-lg)" }}>{m.title}</h2>
                <p>{m.desc}</p>
                <div className="step__out">→ {m.out}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sheet sheet--sunk" id="specification">
        <div className="wrap">
          <SectionHead bubble="F" eyebrow="Specification" title="Published, not negotiated on site"
            lede="The grade of every material we build with, in writing, before you sign. If another quote is cheaper, this table is where the difference will be." />
          <div className="spec">
            <table>
              <caption>{spec.caption}</caption>
              <thead>
                <tr><th scope="col">Element</th><th scope="col">Specification</th><th scope="col">Standard</th></tr>
              </thead>
              <tbody>
                {spec.rows.map(([el, sp, st]) => (
                  <tr key={el}><th scope="row">{el}</th><td>{sp}</td><td className="is-code">{st}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="sheet">
        <div className="wrap">
          <Cta title="Compare this against any other quote" body="Take this table to whoever else has quoted you and ask them to fill in the same rows. That comparison is worth more than a headline rate." />
        </div>
      </section>
    </>
  );
}
