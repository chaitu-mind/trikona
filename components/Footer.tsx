import Link from "next/link";
import { site, founders, telLink } from "@/lib/site";
import { capabilities } from "@/lib/content";
import { nav } from "@/lib/nav";

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="tb">
          <div className="tb__top">
            <div className="tb__cell">
              <span className="k">Practice</span>
              <span className="v">{site.legal}</span>
              <span className="s">{site.tagline} · {site.region}</span>
              <span className="s">{site.gst}</span>
            </div>
            <div className="tb__cell">
              <span className="k">Contact</span>
              <a className="v" href={telLink()} style={{ textDecoration: "none" }}>{site.phone}</a>
              <a className="s" href={`mailto:${site.email}`} style={{ color: "inherit" }}>{site.email}</a>
              <span className="s">{site.street}, {site.city} {site.postal}</span>
            </div>
            <div className="tb__cell">
              <span className="k">Founders</span>
              {founders.map((f) => <span className="s" key={f.name}>{f.name}</span>)}
            </div>
          </div>

          <div className="fnav">
            <div>
              <h3>Pages</h3>
              <ul>{nav.map((n) => <li key={n.href}><Link href={n.href}>{n.label}</Link></li>)}</ul>
            </div>
            <div>
              <h3>Services</h3>
              <ul>
                {capabilities.slice(0, 5).map((c) => (
                  <li key={c.slug}><Link href={`/services/${c.slug}/`}>{c.title}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Also</h3>
              <ul>
                {capabilities.slice(5).map((c) => (
                  <li key={c.slug}><Link href={`/services/${c.slug}/`}>{c.title}</Link></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="tb__idx">
            {nav.map((n) => <span key={n.href}><b>{n.ref}</b> {n.label}</span>)}
            <span><b>F</b> Specification</span>
          </div>

          <div className="tb__rev">
            <span>Rev {site.revision} — {site.revNote}</span>
            <span>Scale NTS</span>
            <span>© {site.founded} {site.name}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
