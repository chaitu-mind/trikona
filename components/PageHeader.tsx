import Link from "next/link";
import type { ReactNode } from "react";

export function Crumbs({ trail }: { trail: { name: string; path: string }[] }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {trail.map((t, i) => (
          <li key={t.path}>
            {i > 0 && <span className="sep" aria-hidden="true">/</span>}
            {i === trail.length - 1
              ? <span aria-current="page">{t.name}</span>
              : <Link href={t.path}>{t.name}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default function PageHeader({
  bubble, eyebrow, title, lede, trail,
}: {
  bubble: string; eyebrow: string; title: string; lede?: ReactNode;
  trail: { name: string; path: string }[];
}) {
  return (
    <div className="phead">
      <div className="wrap">
        <Crumbs trail={trail} />
        <div className="phead__top">
          <span className={`bubble${bubble.length > 2 ? " bubble--wide" : ""}`} aria-hidden="true">{bubble}</span>
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
          </div>
        </div>
        {lede && <p className="phead__lede">{lede}</p>}
      </div>
    </div>
  );
}

export function SectionHead({
  bubble, eyebrow, title, lede, as: As = "h2",
}: {
  bubble: string; eyebrow: string; title: string; lede?: ReactNode; as?: "h2" | "h3";
}) {
  return (
    <div className="shead">
      <span className={`bubble${bubble.length > 2 ? " bubble--wide" : ""}`} aria-hidden="true">{bubble}</span>
      <div className="shead__body">
        <p className="eyebrow">{eyebrow}</p>
        <As>{title}</As>
        {lede && <p>{lede}</p>}
      </div>
    </div>
  );
}

export function Cta({ title, body }: { title: string; body: string }) {
  return (
    <div className="cta">
      <div>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      <div className="cta__btns">
        <Link className="btn" href="/contact/">Get an estimate</Link>
        <Link className="btn btn--ghost" href="/works/">See the works</Link>
      </div>
    </div>
  );
}
