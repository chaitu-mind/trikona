import { founders } from "@/lib/site";

/** Each founder sits at one vertex. The internal medians are the bracing. */
export default function TriangleDiagram() {
  const v: [number, number][] = [[62, 372], [280, 108], [498, 372]];
  const labels = [
    { p: v[1], f: founders[0], ny: -46, ry: -26 },  // apex — first in the list
    { p: v[0], f: founders[1], ny: 40, ry: 60 },    // bottom left
    { p: v[2], f: founders[2], ny: 40, ry: 60 },    // bottom right
  ];
  return (
    <svg className="dwg" viewBox="0 0 560 530" role="img"
      aria-label="Triangle diagram with each of the three founders at one vertex: client and design, site and execution, cost and schedule.">
      <title>The three founders, one at each vertex</title>
      <polygon className="red" points={v.map((p) => p.join(",")).join(" ")} />
      <line className="ln ln--hair" x1={62} y1={372} x2={389} y2={240} />
      <line className="ln ln--hair" x1={498} y1={372} x2={171} y2={240} />
      <line className="ln ln--hair" x1={280} y1={108} x2={280} y2={372} />
      {labels.map(({ p, f, ny, ry }) => (
        <g key={f.name}>
          <circle className="redfill" cx={p[0]} cy={p[1]} r={6.5} />
          <circle className="ln ln--hair" cx={p[0]} cy={p[1]} r={15} />
          <text x={p[0]} y={p[1] + ny} fontSize={15} textAnchor="middle" className="t-ink">{f.name.split(" ")[0]}</text>
          <text x={p[0]} y={p[1] + ry} fontSize={11} textAnchor="middle">{f.vertex.toUpperCase()}</text>
        </g>
      ))}
      <line className="ln ln--hair" x1={120} y1={482} x2={440} y2={482} />
      <text x={280} y={510} fontSize={11} textAnchor="middle">REMOVE ANY ONE AND THE FRAME RACKS</text>
    </svg>
  );
}
