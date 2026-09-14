"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  packages, costSplit, paymentSchedule, exclusions, coverageFor, durationMonths,
} from "@/lib/rates";
import { site } from "@/lib/site";

const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n));

/** ₹ in lakh, the unit people actually speak in. */
const lakh = (n: number) => (n / 100000).toFixed(n < 1000000 ? 1 : 0);

export default function Estimator() {
  const [plot, setPlot] = useState(200);
  const [floors, setFloors] = useState(2);
  const [pkgId, setPkgId] = useState<"essential" | "standard" | "premium">("standard");
  const [manual, setManual] = useState<number | "">("");

  const pkg = packages.find((p) => p.id === pkgId)!;

  const derived = useMemo(() => {
    const coverage = coverageFor(plot);
    const perFloor = Math.round(plot * 9 * coverage);
    const builtUp = manual === "" ? perFloor * floors : Number(manual);
    const low = builtUp * pkg.low;
    const high = builtUp * pkg.high;
    const mid = (low + high) / 2;
    return { coverage, perFloor, builtUp, low, high, mid, months: durationMonths(builtUp, floors) };
  }, [plot, floors, pkg, manual]);

  return (
    <div className="est">
      <form className="est__form" onSubmit={(e) => e.preventDefault()}>
        <div className="field">
          <label htmlFor="e-plot">Plot area, in square yards</label>
          <input id="e-plot" type="number" min={50} max={4000} step={10} value={plot}
            onChange={(e) => setPlot(Math.max(50, Number(e.target.value) || 0))} />
          <span className="field__note mono">
            {inr(plot * 9)} sq.ft · typical coverage after setbacks {Math.round(derived.coverage * 100)}%
          </span>
        </div>

        <div className="field">
          <label htmlFor="e-floors">Floors</label>
          <div className="seg" role="group" aria-label="Number of floors">
            {[1, 2, 3, 4].map((f) => (
              <button key={f} type="button" className="seg__b" aria-pressed={floors === f}
                onClick={() => setFloors(f)}>
                {f === 1 ? "G" : `G+${f - 1}`}
              </button>
            ))}
          </div>
          <span className="field__note mono">
            {inr(derived.perFloor)} sq.ft per floor
          </span>
        </div>

        <div className="field">
          <label htmlFor="e-manual">Built-up area, if you already know it</label>
          <input id="e-manual" type="number" min={0} step={50} placeholder={String(derived.perFloor * floors)}
            value={manual} onChange={(e) => setManual(e.target.value === "" ? "" : Number(e.target.value))} />
          <span className="field__note mono">Leave blank to use the estimate from plot and floors</span>
        </div>

        <fieldset className="field">
          <legend>Specification</legend>
          <div className="packs">
            {packages.map((p) => (
              <button key={p.id} type="button" className="pack" aria-pressed={pkgId === p.id}
                onClick={() => setPkgId(p.id)}>
                <span className="pack__n">{p.name}</span>
                <span className="pack__r mono">₹{inr(p.low)}–{inr(p.high)}<i>/sq.ft</i></span>
                <span className="pack__b">{p.blurb}</span>
              </button>
            ))}
          </div>
        </fieldset>
      </form>

      <div className="est__out">
        <div className="est__head">
          <span className="eyebrow">Indicative estimate</span>
          <div className="est__big mono">
            ₹{lakh(derived.low)}<span>–</span>{lakh(derived.high)}<i> lakh</i>
          </div>
          <dl className="est__meta">
            <div><dt>Built-up area</dt><dd className="mono">{inr(derived.builtUp)} sq.ft</dd></div>
            <div><dt>Rate applied</dt><dd className="mono">₹{inr(pkg.low)}–{inr(pkg.high)}/sq.ft</dd></div>
            <div><dt>Likely programme</dt><dd className="mono">{derived.months} months</dd></div>
          </dl>
        </div>

        <div className="est__panel">
          <h3>Where the money goes</h3>
          <p className="est__note">
            Percentages of construction cost, against the midpoint of the range above.
          </p>
          <table className="est__tbl">
            <thead>
              <tr><th scope="col">Stage</th><th scope="col">Share</th><th scope="col">Amount</th></tr>
            </thead>
            <tbody>
              {costSplit.map((c) => (
                <tr key={c.stage}>
                  <th scope="row"><span>{c.stage}</span><em>{c.note}</em></th>
                  <td className="mono">
                    <span className="bar" style={{ ["--p" as string]: `${c.pct * 3.2}px` }} aria-hidden="true" />
                    {c.pct}%
                  </td>
                  <td className="mono">₹{inr((derived.mid * c.pct) / 100)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="est__panel">
          <h3>When you would pay</h3>
          <p className="est__note">
            Against work finished and measured, never against a calendar date.
          </p>
          <table className="est__tbl est__tbl--pay">
            <tbody>
              {paymentSchedule.map((s) => (
                <tr key={s.at}>
                  <th scope="row">{s.at}</th>
                  <td className="mono">{s.pct}%</td>
                  <td className="mono">₹{inr((derived.mid * s.pct) / 100)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="est__panel est__panel--warn">
          <h3>Not included in this figure</h3>
          <ul className="ticks ticks--plain">
            {exclusions.map((x) => <li key={x}>{x}</li>)}
          </ul>
        </div>

        <div className="est__cta">
          <p>
            This is an indicative range from published rates, not a quotation. A real
            number needs the plot, the soil and your drawings. The first visit and the
            written estimate cost nothing.
          </p>
          <div className="cta__btns">
            <Link className="btn" href="/contact/">Get a written estimate</Link>
            <Link className="btn btn--ghost" href="/process/#specification">See the full specification</Link>
          </div>
        </div>

        <p className="est__fine">
          Rates are reviewed periodically and apply to {site.region}. Steel and cement
          move with the market, so a rate quoted today is held for the period stated in
          your agreement and not indefinitely.
        </p>
      </div>
    </div>
  );
}
