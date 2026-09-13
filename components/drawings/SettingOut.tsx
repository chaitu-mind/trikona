import type { ReactNode } from "react";

/** The hero drawing: a structural column grid in plan, indexed the way a real
 *  setting-out drawing is, with the rigid triangle that names the firm
 *  marked across it in revision red. */
export default function SettingOut() {
  const X = [0, 4200, 7800, 12000];
  const Y = [0, 4500, 9000];
  const W = X[X.length - 1];
  const H = Y[Y.length - 1];
  const ml = 2000, mr = 2200, mt = 1700, mb = 3400;
  const vbW = W + ml + mr, vbH = H + mt + mb;
  const fs = Math.round(vbW * 0.026);
  const fsm = Math.round(vbW * 0.022);
  const letters = ["A", "B", "C", "D"];
  const c = 230;
  const dy = H + 1700;

  const cols: ReactNode[] = [];
  X.forEach((x) =>
    Y.forEach((y) =>
      cols.push(
        <g key={`${x}-${y}`}>
          <rect className="sol" x={x - c} y={y - c} width={c * 2} height={c * 2} />
          <rect className="ln ln--bold" x={x - c} y={y - c} width={c * 2} height={c * 2} />
        </g>
      )
    )
  );

  const tri: [number, number][] = [[X[0], Y[2]], [X[2], Y[0]], [X[3], Y[2]]];
  const nx = W + 1150, ny = 0;

  return (
    <svg className="dwg" viewBox={`${-ml} ${-mt} ${vbW} ${vbH}`} role="img"
      aria-label="Setting-out plan: a four by three structural column grid, with a rigid triangle marked across it.">
      <title>Setting-out plan, grid A to D by 1 to 3</title>

      {X.map((x, i) => (
        <g key={`v${i}`}>
          <line className="ln ln--dash" x1={x} y1={-620} x2={x} y2={H + 700} />
          <circle className="node" cx={x} cy={-1050} r={400} />
          <text x={x} y={-1050} fontSize={fs} textAnchor="middle" dominantBaseline="central" className="t-ink">{letters[i]}</text>
        </g>
      ))}
      {Y.map((y, i) => (
        <g key={`h${i}`}>
          <line className="ln ln--dash" x1={-620} y1={y} x2={W + 700} y2={y} />
          <circle className="node" cx={-1050} cy={y} r={400} />
          <text x={-1050} y={y} fontSize={fs} textAnchor="middle" dominantBaseline="central" className="t-ink">{i + 1}</text>
        </g>
      ))}
      {cols}

      <polygon className="red" points={tri.map((p) => p.join(",")).join(" ")} />
      {tri.map((p, i) => <circle key={i} className="redfill" cx={p[0]} cy={p[1]} r={270} />)}

      <text x={6600} y={5750} fontSize={fs} textAnchor="middle" className="t-red">RIGID TRIANGLE</text>
      <text x={6600} y={6420} fontSize={fsm} textAnchor="middle">THE ONLY POLYGON THAT</text>
      <text x={6600} y={6920} fontSize={fsm} textAnchor="middle">CANNOT DEFORM</text>

      <line className="ln ln--thin" x1={0} y1={dy} x2={W} y2={dy} />
      {X.map((x, i) => (
        <g key={`d${i}`}>
          <line className="ln ln--thin" x1={x - 170} y1={dy + 170} x2={x + 170} y2={dy - 170} />
          <line className="ln ln--hair" x1={x} y1={H + 700} x2={x} y2={dy + 280} />
        </g>
      ))}
      {X.slice(0, -1).map((x, i) => (
        <text key={`s${i}`} x={(x + X[i + 1]) / 2} y={dy - 320} fontSize={fsm} textAnchor="middle">{X[i + 1] - x}</text>
      ))}
      <text x={W / 2} y={dy + 950} fontSize={fsm} textAnchor="middle">{W} OVERALL</text>

      <circle className="ln ln--hair" cx={nx} cy={ny} r={520} />
      <path className="ln ln--bold" d={`M${nx} ${ny + 420} L${nx} ${ny - 420}`} />
      <path className="sol" d={`M${nx} ${ny - 520} L${nx - 190} ${ny - 60} L${nx + 190} ${ny - 60} Z`} />
      <text x={nx} y={ny + 1050} fontSize={fsm} textAnchor="middle">N</text>
    </svg>
  );
}
