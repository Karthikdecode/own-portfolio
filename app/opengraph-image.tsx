import { ImageResponse } from "next/og";
import { SITE_CONFIG } from "@/lib/constants";

export const alt = SITE_CONFIG.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Dynamically generated Open Graph / social card (no static asset needed). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0b0c",
          color: "#ecebe4",
          padding: 88,
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 8, color: "#d8a24a" }}>
          KARTHIK.DEV
        </div>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
          <div style={{ fontSize: 120, fontWeight: 700 }}>FULL-STACK</div>
          <div style={{ fontSize: 120, fontWeight: 700, color: "#8a8a92" }}>
            DEVELOPER
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#9b988d" }}>
          Building modern web applications — frontend to backend.
        </div>
      </div>
    ),
    { ...size },
  );
}
