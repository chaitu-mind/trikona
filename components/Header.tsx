"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/nav";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);

  const current = (href: string) =>
    href === "/" ? path === "/" : path.startsWith(href.replace(/\/$/, ""));

  return (
    <>
      <header className="hdr">
        <div className="wrap hdr__in">
          <Link className="mark" href="/">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 2.6 22.4 21H1.6L12 2.6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              <circle cx="12" cy="2.6" r="1.9" fill="currentColor" />
              <circle cx="1.6" cy="21" r="1.9" fill="currentColor" />
              <circle cx="22.4" cy="21" r="1.9" fill="currentColor" />
            </svg>
            <b>Trikona</b><i>Infra</i>
          </Link>

          <nav className="nav" aria-label="Primary">
            {nav.slice(1).map((n) => (
              <Link key={n.href} href={n.href} aria-current={current(n.href) ? "page" : undefined}>
                {n.label}
              </Link>
            ))}
          </nav>

          <ThemeToggle />

          <button className="navtoggle" type="button" aria-expanded={open}
            aria-controls="mobile-nav" onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}>
            {open ? (
              <svg viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" /></svg>
            ) : (
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M1 3.5h14M1 8h14M1 12.5h14" stroke="currentColor" strokeWidth="1.6" /></svg>
            )}
          </button>

          <Link className="btn btn--sm" href="/contact/">Get an estimate</Link>
        </div>
      </header>

      {open && (
        <div className="navdrawer" id="mobile-nav">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} aria-current={current(n.href) ? "page" : undefined}>
              {n.label}<span>{n.ref}</span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
