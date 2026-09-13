import type { Work } from "@/lib/works";
import type { ReactNode } from "react";

/* Every project drawing is generated from that project's own numbers —
   bays, floors, storey height, plinth — and rendered on the server, so it
   ships inside the static HTML with no client JavaScript at all. */

const r = Math.round;

function Frame({ vb, label, children }: { vb: string; label: string; children: ReactNode }) {
  return (
    <svg className="dwg" viewBox={vb} role="img" aria-label={label}>
      <title>{label}</title>
      {children}
    </svg>
  );
}

export default function Elevation({ work }: { work: Work }) {
  if (work.type === "site") return <SiteWall work={work} />;
  if (work.type === "interior") return <InteriorSection work={work} />;
  return <Building work={work} />;
}

function Building({ work }: { work: Work }) {
  const retail = work.type === "retail";
  const bays = Math.max(2, Math.min(7, work.bays));
  const bayW = retail ? 6000 : 3600;
  const W = bays * bayW;
  const plinth = 600;
  const flr = retail ? 3600 : 3200;
  const para = 900;
  const floors = Math.max(1, Math.min(6, work.floors));
  const H = plinth + floors * flr + para;

  const ml = Math.max(2800, W * 0.15);
  const mr = Math.max(4600, W * 0.34);
  const mt = H * 0.13;
  const mb = H * 0.3;
  const vbW = W + ml + mr;
  const vbH = H + mt + mb;
  const fs = r(Math.max(vbW, vbH) * 0.028);
  const gl = H;
  const lvl = (i: number) => gl - plinth - i * flr;

  const n: ReactNode[] = [];
  let k = 0;
  const push = (el: ReactNode) => n.push(<g key={k++}>{el}</g>);

  // ground line and hatch
  push(<line className="ln ln--bold" x1={-ml * 0.75} y1={gl} x2={W + mr * 0.75} y2={gl} />);
  const hatch: ReactNode[] = [];
  for (let g = -ml * 0.6, i = 0; g < W + mr * 0.6; g += 420, i++)
    hatch.push(<line key={i} className="ln ln--hair" x1={r(g)} y1={gl} x2={r(g - 300)} y2={gl + 300} />);
  push(<>{hatch}</>);

  // mass, plinth, slabs, parapet
  push(<><rect className="glass" x={0} y={0} width={W} height={H} />
        <rect className="ln ln--bold" x={0} y={0} width={W} height={H} />
        <line className="ln ln--thin" x1={0} y1={gl - plinth} x2={W} y2={gl - plinth} />
        <rect className="sol" x={0} y={gl - plinth} width={W} height={plinth} /></>);

  const slabs: ReactNode[] = [];
  for (let f = 1; f <= floors; f++)
    slabs.push(<g key={f}>
      <line className="ln ln--thin" x1={0} y1={lvl(f)} x2={W} y2={lvl(f)} />
      <rect className="sol" x={0} y={lvl(f) - 160} width={W} height={160} />
    </g>);
  push(<>{slabs}<line className="ln ln--thin" x1={0} y1={para} x2={W} y2={para} /></>);

  const cols: ReactNode[] = [];
  for (let b = 1; b < bays; b++)
    cols.push(<line key={b} className="ln ln--hair" x1={b * bayW} y1={0} x2={b * bayW} y2={gl} />);
  push(<>{cols}</>);

  // openings
  const doorBay = Math.floor(bays / 2);
  const op: ReactNode[] = [];
  for (let f = 0; f < floors; f++) {
    for (let b = 0; b < bays; b++) {
      const cx = b * bayW + bayW / 2;
      const key = `${f}-${b}`;
      if (retail) {
        const wid = bayW - 900, hgt = flr - 1500, top = lvl(f) - 750 - hgt;
        const mull: ReactNode[] = [];
        for (let m = 1; m < 4; m++) {
          const mx = r(cx - wid / 2 + (wid / 4) * m);
          mull.push(<line key={m} className="ln ln--hair" x1={mx} y1={r(top)} x2={mx} y2={r(top + hgt)} />);
        }
        op.push(<g key={key}>
          <rect className="glass" x={r(cx - wid / 2)} y={r(top)} width={r(wid)} height={r(hgt)} />
          <rect className="ln ln--thin" x={r(cx - wid / 2)} y={r(top)} width={r(wid)} height={r(hgt)} />
          {mull}
        </g>);
      } else if (f === 0 && b === doorBay) {
        const wid = 1200, hgt = 2100, top = gl - plinth - hgt;
        const steps: ReactNode[] = [];
        for (let s = 0; s < 3; s++)
          steps.push(<rect key={s} className="ln ln--hair" x={r(cx - 1100 - s * 130)}
            y={r(gl - plinth + (s * plinth) / 3)} width={r(2200 + s * 260)} height={r(plinth / 3)} />);
        op.push(<g key={key}>
          <rect className="ln ln--thin" x={r(cx - wid / 2)} y={r(top)} width={wid} height={hgt} />
          <line className="ln ln--hair" x1={r(cx)} y1={r(top)} x2={r(cx)} y2={r(top + hgt)} />
          {steps}
        </g>);
      } else {
        const wid = r(bayW * 0.5), hgt = 1350, top = lvl(f) - 900 - hgt;
        op.push(<g key={key}>
          <rect className="glass" x={r(cx - wid / 2)} y={r(top)} width={wid} height={hgt} />
          <rect className="ln ln--thin" x={r(cx - wid / 2)} y={r(top)} width={wid} height={hgt} />
          <line className="ln ln--hair" x1={r(cx)} y1={r(top)} x2={r(cx)} y2={r(top + hgt)} />
          <line className="ln ln--hair" x1={r(cx - wid / 2 - 130)} y1={r(top + hgt)} x2={r(cx + wid / 2 + 130)} y2={r(top + hgt)} />
        </g>);
      }
    }
  }
  push(<>{op}</>);

  // level tags (ground line is self-evident from the hatch, so it carries no tag)
  const tags: [number, string][] = [[gl - plinth, "+0.600"]];
  for (let t = 1; t <= floors; t++) tags.push([lvl(t), `+${((plinth + t * flr) / 1000).toFixed(3)}`]);
  push(<>{tags.map(([y, t], i) => (
    <g key={i}>
      <line className="ln ln--hair" x1={W} y1={r(y)} x2={r(W + mr * 0.3)} y2={r(y)} />
      <path className="sol" d={`M${r(W + mr * 0.3)} ${r(y)} l-260 -130 l0 260 Z`} />
      <text x={r(W + mr * 0.36)} y={r(y - 130)} fontSize={fs}>{t}</text>
    </g>
  ))}</>);

  // dimensions
  const dx = -ml * 0.55;
  push(<>
    <line className="ln ln--thin" x1={r(dx)} y1={0} x2={r(dx)} y2={gl} />
    {[0, gl].map((y, i) => (
      <g key={i}>
        <line className="ln ln--thin" x1={r(dx - 170)} y1={r(y + 170)} x2={r(dx + 170)} y2={r(y - 170)} />
        <line className="ln ln--hair" x1={r(dx - 280)} y1={r(y)} x2={0} y2={r(y)} />
      </g>
    ))}
    <text x={r(dx - 320)} y={r(gl / 2)} fontSize={fs} textAnchor="middle"
      transform={`rotate(-90 ${r(dx - 320)} ${r(gl / 2)})`}>{(H / 1000).toFixed(1)} m</text>
  </>);

  const dy = gl + mb * 0.6;
  const ticks: ReactNode[] = [];
  for (let i = 0; i <= bays; i++) {
    const x = i * bayW;
    ticks.push(<line key={i} className="ln ln--thin" x1={r(x - 170)} y1={r(dy + 170)} x2={r(x + 170)} y2={r(dy - 170)} />);
  }
  push(<>
    <line className="ln ln--thin" x1={0} y1={r(dy)} x2={W} y2={r(dy)} />
    {ticks}
    <text x={r(W / 2)} y={r(dy + fs * 1.5)} fontSize={fs} textAnchor="middle">{bays} × {bayW} = {W}</text>
  </>);

  return (
    <Frame vb={`${-ml} ${-mt} ${vbW} ${vbH}`}
      label={`Front elevation of ${work.name}, ${work.config}, drawn to ${work.structure}.`}>
      {n}
    </Frame>
  );
}

function SiteWall({ work }: { work: Work }) {
  const W = 24000, wall = 1800, pier = 2100, gate = 4800;
  const H = pier + 900;
  const ml = 3000, mr = 3000, mt = 2200, mb = 4200;
  const vbW = W + ml + mr, vbH = H + mt + mb, gl = H;
  const fs = r(vbW * 0.024);
  const gs = (W - gate) / 2, ge = gs + gate;

  const hatch: ReactNode[] = [];
  for (let g = -ml * 0.7, i = 0; g < W + mr * 0.7; g += 620, i++)
    hatch.push(<line key={i} className="ln ln--hair" x1={r(g)} y1={gl} x2={r(g - 380)} y2={gl + 380} />);

  const segs: ReactNode[] = [[0, gs], [ge, W]].map(([a, b], si) => {
    const courses: ReactNode[] = [];
    for (let c = 1; c < 5; c++)
      courses.push(<line key={c} className="ln ln--hair" x1={r(a)} y1={r(gl - (wall / 5) * c)} x2={r(b)} y2={r(gl - (wall / 5) * c)} />);
    const piers: ReactNode[] = [];
    for (let x = a, i = 0; x <= b - 600; x += 3000, i++)
      piers.push(<g key={i}>
        <rect className="sol" x={r(x)} y={r(gl - pier)} width={450} height={pier} />
        <rect className="ln ln--thin" x={r(x)} y={r(gl - pier)} width={450} height={pier} />
      </g>);
    return <g key={si}>
      <rect className="glass" x={r(a)} y={r(gl - wall)} width={r(b - a)} height={wall} />
      <rect className="ln ln--bold" x={r(a)} y={r(gl - wall)} width={r(b - a)} height={wall} />
      {courses}{piers}
    </g>;
  });

  const bars: ReactNode[] = [];
  for (let v = 1; v < 12; v++)
    bars.push(<line key={v} className="ln ln--hair" x1={r(gs + (gate / 12) * v)} y1={r(gl - pier + 200)} x2={r(gs + (gate / 12) * v)} y2={r(gl - 200)} />);

  return (
    <Frame vb={`${-ml} ${-mt} ${vbW} ${vbH}`}
      label={`Elevation of the compound wall and gate at ${work.name}, with piers at 3000 mm centres.`}>
      <line className="ln ln--bold" x1={-ml * 0.8} y1={gl} x2={W + mr * 0.8} y2={gl} />
      {hatch}{segs}
      <rect className="ln ln--bold" x={r(gs)} y={r(gl - pier)} width={gate} height={pier} />
      {bars}
      <line className="ln ln--thin" x1={r(gs + gate / 2)} y1={r(gl - pier)} x2={r(gs + gate / 2)} y2={gl} />
      <text x={r(gs + gate / 2)} y={r(gl - pier - 500)} fontSize={fs} textAnchor="middle">M.S. GATE 4800</text>
      <line className="ln ln--thin" x1={0} y1={r(gl + mb * 0.55)} x2={W} y2={r(gl + mb * 0.55)} />
      {[0, gs, ge, W].map((x, i) => (
        <line key={i} className="ln ln--thin" x1={r(x - 220)} y1={r(gl + mb * 0.55 + 220)} x2={r(x + 220)} y2={r(gl + mb * 0.55 - 220)} />
      ))}
      <text x={r(W / 2)} y={r(gl + mb * 0.55 + fs * 1.6)} fontSize={fs} textAnchor="middle">TYPICAL BAY — PIERS AT 3000 c/c</text>
      <text x={r(gs / 2)} y={r(gl + mb * 0.55 - 400)} fontSize={fs} textAnchor="middle">R.R. MASONRY 1800 HIGH</text>
    </Frame>
  );
}

function InteriorSection({ work }: { work: Work }) {
  const W = 14000, ceil = 2700, slab = 3300;
  const ml = 2600, mr = 2600, mt = 2000, mb = 3400;
  const vbW = W + ml + mr, vbH = slab + mt + mb, gl = slab;
  const fs = r(vbW * 0.024);

  const hangers: ReactNode[] = [];
  for (let h = 700, i = 0; h < W; h += 1400, i++)
    hangers.push(<line key={i} className="ln ln--hair" x1={h} y1={0} x2={h} y2={slab - ceil} />);

  const rooms: [number, number, number, string][] = [
    [900, 2600, 1050, "RECEPTION"],
    [5200, 2900, 750, "CONSULTING"],
    [10000, 3200, 900, "PROCEDURE"],
  ];

  return (
    <Frame vb={`${-ml} ${-mt} ${vbW} ${vbH}`}
      label={`Section through the interior fit-out at ${work.name}, showing false ceiling, partitions and joinery.`}>
      <rect className="sol" x={-ml * 0.6} y={-500} width={r(W + ml * 1.2)} height={500} />
      <rect className="ln ln--bold" x={-ml * 0.6} y={-500} width={r(W + ml * 1.2)} height={500} />
      <rect className="sol" x={-ml * 0.6} y={gl} width={r(W + ml * 1.2)} height={420} />
      <line className="ln ln--bold" x1={-ml * 0.6} y1={gl} x2={r(W + mr * 0.6)} y2={gl} />
      <line className="ln ln--thin" x1={0} y1={slab - ceil} x2={W} y2={slab - ceil} />
      {hangers}
      <text x={r(W - 300)} y={r(slab - ceil + fs * 1.4)} fontSize={fs} textAnchor="end">FALSE CEILING +2.700</text>
      {[4200, 9000].map((x) => (
        <g key={x}>
          <rect className="sol" x={x} y={slab - ceil} width={115} height={ceil} />
          <rect className="ln ln--thin" x={x} y={slab - ceil} width={115} height={ceil} />
        </g>
      ))}
      <rect className="ln ln--hair" x={9000} y={slab - 2100} width={115} height={2100} fill="none" strokeDasharray="90 70" />
      {rooms.map(([x, w, h, t]) => (
        <g key={t}>
          <rect className="glass" x={x} y={gl - h} width={w} height={h} />
          <rect className="ln ln--thin" x={x} y={gl - h} width={w} height={h} />
          <text x={x + w / 2} y={gl - h - 200} fontSize={fs} textAnchor="middle">{t}</text>
        </g>
      ))}
      <line className="ln ln--thin" x1={r(-ml * 0.55)} y1={0} x2={r(-ml * 0.55)} y2={gl} />
      <text x={r(-ml * 0.55 - 330)} y={r(gl / 2)} fontSize={fs} textAnchor="middle"
        transform={`rotate(-90 ${r(-ml * 0.55 - 330)} ${r(gl / 2)})`}>SLAB 3.300</text>
      <line className="ln ln--thin" x1={0} y1={r(gl + mb * 0.5)} x2={W} y2={r(gl + mb * 0.5)} />
      {[0, 4200, 9000, W].map((x, i) => (
        <line key={i} className="ln ln--thin" x1={r(x - 190)} y1={r(gl + mb * 0.5 + 190)} x2={r(x + 190)} y2={r(gl + mb * 0.5 - 190)} />
      ))}
      <text x={r(W / 2)} y={r(gl + mb * 0.5 + fs * 1.6)} fontSize={fs} textAnchor="middle">SECTION A-A — TENANCY 14.0 m DEEP</text>
    </Frame>
  );
}
