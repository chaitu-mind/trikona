"use client";

import { useEffect, useState } from "react";

type Mode = "system" | "light" | "dark";
const order: Mode[] = ["system", "light", "dark"];

export default function ThemeToggle() {
  const [mode, setMode] = useState<Mode>("system");

  useEffect(() => {
    let saved: Mode = "system";
    try { saved = (localStorage.getItem("trikona-theme") as Mode) || "system"; } catch { }
    setMode(saved);
  }, []);

  useEffect(() => {
    const el = document.documentElement;
    if (mode === "system") el.removeAttribute("data-theme");
    else el.setAttribute("data-theme", mode);
    try { localStorage.setItem("trikona-theme", mode); } catch { }
  }, [mode]);

  return (
    <button className="themer" type="button"
      title={`Colour scheme: ${mode}`}
      aria-label={`Colour scheme: ${mode}. Change it.`}
      onClick={() => setMode(order[(order.indexOf(mode) + 1) % order.length])}>
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="4.2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 .8v2M8 13.2v2M.8 8h2M13.2 8h2M2.9 2.9l1.4 1.4M11.7 11.7l1.4 1.4M13.1 2.9l-1.4 1.4M4.3 11.7l-1.4 1.4"
          stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    </button>
  );
}
