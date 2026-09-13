"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { categories, type Work } from "@/lib/works";

/* Every project stays in the DOM at all times and is only hidden by the
   filter, so the static HTML a crawler receives contains all of them. */
export default function WorksGrid({
  works, plates,
}: { works: Work[]; plates: Record<string, ReactNode> }) {
  const [active, setActive] = useState<string>("All");
  const shown = works.filter((w) => active === "All" || w.category === active);

  return (
    <>
      <div className="filters" role="group" aria-label="Filter works by category">
        {categories.map((c) => (
          <button key={c} className="chip" type="button"
            aria-pressed={active === c} onClick={() => setActive(c)}>
            {c}
          </button>
        ))}
        <span className="filters__count mono">{shown.length} of {works.length} shown</span>
      </div>

      <div className="works">
        {works.map((w) => {
          const visible = active === "All" || w.category === active;
          return (
            <article key={w.slug} hidden={!visible}>
              <Link className="work" href={`/works/${w.slug}/`} style={{ display: "grid" }}>
                <span className="work__plate">
                  {w.photo
                    ? <img src={w.photo} alt={`${w.name}, ${w.location}`} loading="lazy" />
                    : plates[w.slug]}
                  {w.sample && <span className="work__stamp mono">PLACEHOLDER</span>}
                </span>
                <span className="work__body">
                  <span className="work__ref"><span>{w.ref}</span><span>{w.category}</span></span>
                  <h2 style={{ fontSize: "1.06rem" }}>{w.name}</h2>
                  <span className="work__loc">{w.location}</span>
                  <span className="work__data">
                    <span>{w.area}</span><span>{w.config}</span><span>{w.year}</span>
                  </span>
                  <span className={`status ${w.status === "Ongoing" ? "status--ongoing" : "status--done"}`}>
                    {w.status}
                  </span>
                </span>
              </Link>
            </article>
          );
        })}
      </div>

      {shown.length === 0 && <p className="works__empty">No projects filed under this category yet.</p>}
    </>
  );
}
