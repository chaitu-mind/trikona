import type { Metadata } from "next";
import PageHeader, { SectionHead } from "@/components/PageHeader";
import EnquiryForm from "@/components/EnquiryForm";
import { site, waLink, telLink } from "@/lib/site";
import { breadcrumbJsonLd, JsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact & estimate",
  description: `Talk to ${site.name} about a build in ${site.city}. The first site visit and the outline estimate cost nothing. Call, WhatsApp or email one of the three founders directly.`,
  alternates: { canonical: "/contact/" },
};

const trail = [{ name: "Home", path: "/" }, { name: "Contact", path: "/contact/" }];

export default function Contact() {
  const contactLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${site.name}`,
    url: `${site.url}/contact/`,
    mainEntity: { "@id": `${site.url}/#organisation` },
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <JsonLd data={contactLd} />
      <PageHeader bubble="H" eyebrow="Enquiry" title="Start with a site visit" trail={trail}
        lede="The first visit and the outline estimate cost nothing. Tell us where the plot is and what you want built, and one of the three of us will call you back." />

      <section className="sheet">
        <div className="wrap">
          <div className="enq">
            <div>
              <SectionHead bubble="1" eyebrow="Enquiry form" title="Send the details" as="h2" />
              <EnquiryForm />
            </div>

            <div className="side">
              <SectionHead bubble="2" eyebrow="Direct" title="Or reach us straight away" as="h2" />
              <div className="reach">
                <a href={telLink()}>
                  <span className="k">Call</span>
                  <span className="v">{site.phone}</span>
                  <span className="s">Monday to Saturday, 9:00 to 19:00</span>
                </a>
                <a href={waLink(`Hello ${site.name}, I would like an estimate.`)} target="_blank" rel="noopener">
                  <span className="k">WhatsApp</span>
                  <span className="v">{site.phone}</span>
                  <span className="s">Send a photo of the plot and we will call back</span>
                </a>
                <a href={`mailto:${site.email}`}>
                  <span className="k">Email</span>
                  <span className="v">{site.email}</span>
                  <span className="s">Drawings, bills of quantities and tender documents</span>
                </a>
                <div>
                  <span className="k">Office</span>
                  <span className="v">{site.city}</span>
                  <span className="s">{site.street}, {site.city} {site.postal}</span>
                </div>
                <div>
                  <span className="k">Works across</span>
                  <span className="v">{site.region}</span>
                  <span className="s">{site.areaServed.join(" · ")}</span>
                </div>
              </div>

              <div className="panel">
                <h3>What to have ready</h3>
                <p>None of this is required, but each one makes the first estimate sharper: the plot dimensions and survey number, any architectural drawings you already have, the sanctioned plan if approvals are done, and roughly what you want to spend.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
