export const BRAND = {
  ink: "#0a0a0a",
  cream: "#f4f1ea",
  accent: "#ffd200",
  font: "Arial, Helvetica, sans-serif",
  // Email clients can't load the site's real font (Archivo), so headings
  // fall back to a genuinely heavy system face instead of faking boldness
  // with Arial 700 — "Arial Black" is a distinct, widely-installed family,
  // not a synthetic bold.
  headingFont: "'Arial Black', 'Arial Bold', Arial, Helvetica, sans-serif",
};

const {
  ink: INK,
  cream: CREAM,
  accent: ACCENT,
  font: FONT,
  headingFont: HEADING_FONT,
} = BRAND;

export function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function fieldCell(label, value) {
  return `
    <td width="50%" style="padding:0 20px 26px 0;vertical-align:top;">
      <div style="font-family:${FONT};font-size:10.5px;font-weight:700;letter-spacing:0.06em;color:rgba(10,10,10,0.48);text-transform:uppercase;margin-bottom:5px;">
        ${escapeHtml(label)}
      </div>
      <div style="font-family:${FONT};font-size:15px;font-weight:700;color:${INK};line-height:1.4;">
        ${escapeHtml(value)}
      </div>
    </td>`;
}

function fieldPairRows(fields) {
  let html = "";
  for (let i = 0; i < fields.length; i += 2) {
    const a = fields[i];
    const b = fields[i + 1];
    html += `<tr>${fieldCell(a.label, a.value)}${
      b ? fieldCell(b.label, b.value) : `<td width="50%"></td>`
    }</tr>`;
  }
  return html;
}

/** Numbered section — mirrors the site's own "(0X) — TITLE" kicker pattern. */
export function emailSection(num, title, fields) {
  return `
    <tr>
      <td style="padding:34px 36px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="border-bottom:2px solid ${ACCENT};padding-bottom:9px;">
            <span style="font-family:${FONT};font-size:11.5px;font-weight:800;letter-spacing:0.05em;color:${INK};text-transform:uppercase;">
              (${num}) — ${escapeHtml(title)}
            </span>
          </td></tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:20px 36px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${fieldPairRows(fields)}
        </table>
      </td>
    </tr>`;
}

/** Long-form text block (message, motivation…) — quote-style, left accent bar. */
export function emailQuote(label, value) {
  return `
    <tr>
      <td style="padding:2px 36px 26px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="border-left:3px solid ${ACCENT};padding:2px 0 2px 20px;">
              <div style="font-family:${FONT};font-size:10.5px;font-weight:700;letter-spacing:0.06em;color:rgba(10,10,10,0.48);text-transform:uppercase;margin-bottom:9px;">
                ${escapeHtml(label)}
              </div>
              <div style="font-family:${FONT};font-size:14.5px;font-style:italic;line-height:1.65;color:${INK};">
                ${escapeHtml(value).replace(/\n/g, "<br />")}
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
}

/** Shared card shell (header / badge / footer) around a variable body. */
export function emailShell({
  badgeText,
  name,
  introText,
  bodyHtml,
  ctaHref,
  ctaLabel,
  footerNote,
  headerLabel,
}) {
  return `
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  </head>
  <body style="margin:0;padding:0;background:#e8e4d9;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#e8e4d9;padding:48px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="620" cellpadding="0" cellspacing="0" style="width:620px;max-width:100%;background:${CREAM};border:2px solid ${INK};">

            <!-- HEADER -->
            <tr>
              <td style="background:${INK};padding:24px 36px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td width="42" style="vertical-align:middle;">
                      <img src="cid:tendrillogo" width="34" height="32" alt="Tendril School" style="display:block;" />
                    </td>
                    <td style="vertical-align:middle;padding-left:13px;font-family:${HEADING_FONT};font-size:18px;font-weight:900;letter-spacing:-0.02em;color:${ACCENT};text-transform:uppercase;">
                      Tendril School
                    </td>
                    <td align="right" style="vertical-align:middle;font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:0.04em;color:rgba(244,241,234,0.55);text-transform:uppercase;">
                      ${escapeHtml(headerLabel)}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr><td style="height:4px;background:${ACCENT};line-height:4px;font-size:0;">&nbsp;</td></tr>

            <!-- INTRO -->
            <tr>
              <td style="padding:40px 36px 0;">
                <span style="display:inline-block;background:${ACCENT};color:${INK};font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;padding:6px 14px;">
                  ${escapeHtml(badgeText)}
                </span>
                <h1 style="margin:22px 0 6px;font-family:${HEADING_FONT};font-size:28px;font-weight:900;letter-spacing:-0.02em;color:${INK};">
                  ${escapeHtml(name)}
                </h1>
                <p style="margin:0;font-family:${FONT};font-size:14px;color:rgba(10,10,10,0.6);">
                  ${escapeHtml(introText)}
                </p>
              </td>
            </tr>

            ${bodyHtml}

            <!-- CTA -->
            <tr>
              <td style="padding:40px 36px 44px;">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="background:${INK};">
                      <a href="${ctaHref}" style="display:inline-block;font-family:${FONT};font-size:13px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:${ACCENT};text-decoration:none;padding:16px 28px;">
                        ${escapeHtml(ctaLabel)}
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="border-top:2px solid ${INK};padding:20px 36px;">
                <p style="margin:0;font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:0.04em;color:rgba(10,10,10,0.45);text-transform:uppercase;">
                  ${escapeHtml(footerNote)}
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
