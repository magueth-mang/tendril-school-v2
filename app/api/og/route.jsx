import { ImageResponse } from "next/og";

export const runtime = "edge";

// Glyphs the dynamic titles may use — passed to Google Fonts so it serves a
// subsetted TrueType file (satori can't parse woff2). Covers the alphabet,
// French accents, digits and the punctuation used across the pages.
const SAFETY_GLYPHS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzÀÂÄÇÉÈÊËÎÏÑÔÖÙÛÜàâäçéèêëîïñôöùûü0123456789&·,.'()/:!?%€→ ";

async function loadArchivo(weight, text) {
  const url = `https://fonts.googleapis.com/css2?family=Archivo:wght@${weight}&text=${encodeURIComponent(
    text
  )}`;
  const css = await (await fetch(url)).text();
  const match = css.match(/src: url\((.+?)\) format\('(truetype|opentype)'\)/);
  if (!match) throw new Error("Archivo font not found");
  return fetch(match[1]).then((r) => r.arrayBuffer());
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("title") || "École 3D du luxe & de la cosmétique")
    .replace(/[—–]/g, "·")
    .toUpperCase();
  const highlight = (searchParams.get("highlight") || "").toUpperCase();
  const kicker = searchParams.get("kicker") || "BOOTCAMP 3D · EN LIGNE";

  const footerLeft = "PLACES LIMITÉES · SESSION JANVIER 2027";
  const wordmark = "TENDRIL SCHOOL";
  const cta = "→ TENDRIL-SCHOOL.COM";
  const subset =
    title + kicker + footerLeft + wordmark + cta + SAFETY_GLYPHS;

  const [markBuffer, archivoBlack, archivoBold] = await Promise.all([
    fetch(new URL("/tendril-mark.png", request.url)).then((r) => r.arrayBuffer()),
    loadArchivo(900, subset),
    loadArchivo(700, subset),
  ]);
  const markBase64 = `data:image/png;base64,${Buffer.from(markBuffer).toString(
    "base64"
  )}`;

  const idx = highlight ? title.indexOf(highlight) : -1;
  const parts =
    idx >= 0
      ? [title.slice(0, idx), title.slice(idx, idx + highlight.length), title.slice(idx + highlight.length)]
      : [title, "", ""];

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f4f1ea",
          fontFamily: "Archivo",
          padding: "58px 70px",
        }}
      >
        {/* HEADER — brand lockup + kicker over a heavy rule, like the hero. */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 22,
            borderBottom: "3px solid #0a0a0a",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 52,
                height: 52,
                background: "#0a0a0a",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={markBase64} width={27} height={25} alt="" style={{ objectFit: "contain" }} />
            </div>
            <div style={{ fontSize: 27, fontWeight: 900, letterSpacing: -0.5, color: "#0a0a0a" }}>
              {wordmark}
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 17, fontWeight: 700, letterSpacing: 1.5, color: "rgba(10,10,10,0.5)" }}>
            {kicker}
          </div>
        </div>

        {/* TITLE — big, black, one word highlighted like the hero <mark>. */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-start",
            fontSize: 68,
            fontWeight: 900,
            lineHeight: 1.0,
            letterSpacing: -2.5,
            color: "#0a0a0a",
          }}
        >
          <span style={{ display: "flex" }}>{parts[0]}</span>
          {parts[1] && (
            <span style={{ display: "flex", background: "#ffd200", padding: "0 8px" }}>{parts[1]}</span>
          )}
          {parts[2] && <span style={{ display: "flex" }}>{parts[2]}</span>}
        </div>

        {/* FOOTER — urgency line + CTA chip so it reads as clickable. */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", fontSize: 19, fontWeight: 700, letterSpacing: 1, color: "rgba(10,10,10,0.55)" }}>
            {footerLeft}
          </div>
          <div
            style={{
              display: "flex",
              background: "#0a0a0a",
              color: "#ffd200",
              fontSize: 19,
              fontWeight: 700,
              letterSpacing: 0.5,
              padding: "14px 26px",
            }}
          >
            {cta}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Archivo", data: archivoBlack, weight: 900, style: "normal" },
        { name: "Archivo", data: archivoBold, weight: 700, style: "normal" },
      ],
    }
  );
}
