import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** The mark: a rigid triangle with its three vertices pinned. */
export default function Icon() {
  return new ImageResponse(
    (
      <div style={{
        width: "100%", height: "100%", display: "flex",
        alignItems: "center", justifyContent: "center", background: "#0D141A",
      }}>
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
          <path d="M12 3.2 21.8 20.4H2.2L12 3.2Z" stroke="#E8674A" strokeWidth="2.1" strokeLinejoin="round" />
          <circle cx="12" cy="3.2" r="2.2" fill="#E8674A" />
          <circle cx="2.2" cy="20.4" r="2.2" fill="#E8674A" />
          <circle cx="21.8" cy="20.4" r="2.2" fill="#E8674A" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
