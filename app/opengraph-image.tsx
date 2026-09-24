import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Edge runtime: the Node build of @vercel/og fails to resolve its bundled font on Windows paths
export const runtime = "edge";

export const alt = `${site.name} — The smarter way to build and scale`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social share card for every page (pages without their own image inherit it). */
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
          padding: "72px",
          background: "#0A0F1E",
          backgroundImage:
            "radial-gradient(circle at 85% 10%, rgba(42,47,255,0.45), transparent 45%), radial-gradient(circle at 10% 100%, rgba(11,92,47,0.45), transparent 45%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 999,
              background: "#2A2FFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            A
          </div>
          <div style={{ fontSize: 32, fontWeight: 800 }}>Awake</div>
          <div style={{ fontSize: 32, color: "rgba(255,255,255,0.5)" }}>Technologies</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.04em", maxWidth: 900 }}>
            The smarter way to build and scale
          </div>
          <div style={{ marginTop: 28, fontSize: 28, color: "rgba(255,255,255,0.65)" }}>
            Websites · M-Pesa · HR · Data · Support — for businesses, NGOs and government
          </div>
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          {["Nairobi, Kenya", "99.9% uptime SLA", "30-day launch"].map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                padding: "10px 20px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.15)",
                fontSize: 22,
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
