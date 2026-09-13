import type { Metadata } from "next";
import PageHeader, { Cta } from "@/components/PageHeader";
import { faqs } from "@/lib/content";
import { breadcrumbJsonLd, faqJsonLd, JsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Questions owners ask",
  description: "Construction cost per square foot, how long a G+1 takes, per sq.ft versus item rate, Vaastu, approvals, and what happens if something is defective after handover.",
  alternates: { canonical: "/faq/" },
};

const trail = [{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq/" }];

export default function Faq() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <JsonLd data={faqJsonLd()} />
      <PageHeader bubble="G.2" eyebrow="Questions" title="Questions owners ask" trail={trail}
        lede="Straight answers, including where the honest answer is that it depends. The first two are the questions we are asked before anything else." />
      <section className="sheet">
        <div className="wrap">
          <div className="faq">
            {faqs.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary><h2 style={{ font: "inherit", margin: 0 }}>{f.q}</h2></summary>
                <div className="a">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="sheet sheet--sunk">
        <div className="wrap">
          <Cta title="Still need an answer?" body="Ask on WhatsApp. You will get a reply from one of the three founders, not a call centre." />
        </div>
      </section>
    </>
  );
}
