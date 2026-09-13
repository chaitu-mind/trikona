import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — civil engineering and construction in ${site.city}`;

/** What a link to this site looks like when it is shared on WhatsApp.
 *  Drawn in the same blueprint language as the site itself. */
export default function OgImage() {
  const grid: React.ReactElement[] = [];
  for (let x = 0; x <= 1200; x += 40)
    grid.push(<div key={`v${x}`} style={{ position: "absolute", left: x, top: 0, width: 1, height: 630, background: "#1F2E38" }} />);
  for (let y = 0; y <= 630; y += 40)
    grid.push(<div key={`h${y}`} style={{ position: "absolute", left: 0, top: y, width: 1200, height: 1, background: "#1F2E38" }} />);

  return new ImageResponse(
    (
      <div style={{
        width: "100%", height: "100%", display: "flex", flexDirection: "column",
        background: "#0D141A", position: "relative", padding: "64px 72px",
        justifyContent: "space-between", fontFamily: "sans-serif",
      }}>
        {grid}

        <div style={{ display: "flex", alignItems: "center", gap: 18, position: "relative" }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M12 3.2 21.8 20.4H2.2L12 3.2Z" stroke="#E8674A" strokeWidth="2" strokeLinejoin="round" />
            <circle cx="12" cy="3.2" r="2" fill="#E8674A" />
            <circle cx="2.2" cy="20.4" r="2" fill="#E8674A" />
            <circle cx="21.8" cy="20.4" r="2" fill="#E8674A" />
          </svg>
          <div style={{ display: "flex", color: "#8FA0A5", fontSize: 22, letterSpacing: 4, textTransform: "uppercase" }}>
            Civil engineering and construction
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          <div style={{ display: "flex", fontSize: 168, fontWeight: 800, letterSpacing: -8, lineHeight: 1 }}>
            <span style={{ color: "#DEE5DE" }}>TRI</span>
            <span style={{ color: "#E8674A" }}>KONA</span>
          </div>
          <div style={{ display: "flex", color: "#BAC6C4", fontSize: 34, marginTop: 26, maxWidth: 880, lineHeight: 1.35 }}>
            {`The only polygon that cannot deform. Turnkey construction, structural design and interiors across ${site.region}.`}
          </div>
        </div>

        <div style={{
          display: "flex", justifyContent: "space-between", position: "relative",
          borderTop: "1px solid #27383F", paddingTop: 22, color: "#8FA0A5", fontSize: 21, letterSpacing: 2,
        }}>
          <div style={{ display: "flex" }}>{`${site.city.toUpperCase()}, ${site.state.toUpperCase()}`}</div>
          <div style={{ display: "flex" }}>IS 456:2000</div>
          <div style={{ display: "flex" }}>{`EST. ${site.founded}`}</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
