import { BRAND, escapeHtml } from "./email";

const {
  ink: INK,
  cream: CREAM,
  accent: ACCENT,
  font: FONT,
  headingFont: HEADING_FONT,
} = BRAND;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://tendril-school.com";
const CONTACT_EMAIL = "contact@tendril-school.com";
const CONTACT_PHONE = "+33 6 64 54 66 16";

const STEPS = [
  {
    n: "01",
    title: "Étude de votre dossier",
    desc: "Notre équipe pédagogique examine chaque candidature avec attention, dossier et portfolio compris.",
  },
  {
    n: "02",
    title: "Réponse sous 7 jours",
    desc: "Vous recevez notre retour par email, généralement une invitation à un entretien d'admission.",
  },
  {
    n: "03",
    title: "Entretien & admission",
    desc: "Un échange d'environ 30 minutes pour valider votre projet, votre niveau et confirmer votre place.",
  },
];

function recapRow(label, value) {
  return `
    <tr>
      <td width="42%" style="padding:15px 20px;border-top:1px solid rgba(10,10,10,0.12);font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:0.06em;color:rgba(10,10,10,0.5);text-transform:uppercase;vertical-align:middle;">
        ${escapeHtml(label)}
      </td>
      <td style="padding:15px 20px;border-top:1px solid rgba(10,10,10,0.12);border-left:1px solid rgba(10,10,10,0.12);font-family:${FONT};font-size:15px;font-weight:700;color:${INK};vertical-align:middle;">
        ${escapeHtml(value)}
      </td>
    </tr>`;
}

function stepRow(step, first) {
  return `
    <tr>
      <td width="64" style="padding:${first ? "0" : "22px"} 0 0;vertical-align:top;">
        <div style="font-family:${HEADING_FONT};font-size:26px;font-weight:900;color:${ACCENT};line-height:1;letter-spacing:-0.02em;">
          <span style="display:inline-block;background:${INK};padding:8px 11px;">${step.n}</span>
        </div>
      </td>
      <td style="padding:${first ? "2px" : "24px"} 0 0 18px;vertical-align:top;">
        <div style="font-family:${FONT};font-size:16px;font-weight:800;color:${INK};margin-bottom:5px;">
          ${escapeHtml(step.title)}
        </div>
        <div style="font-family:${FONT};font-size:14px;line-height:1.55;color:rgba(10,10,10,0.66);">
          ${escapeHtml(step.desc)}
        </div>
      </td>
    </tr>`;
}

/**
 * Confirmation email sent to the candidate after they apply. Deliberately more
 * built-out than the internal notification: a clear "received" moment, a recap
 * card, a numbered next-steps timeline, and reassurance — the serious, trust-
 * building tone a real school sends. Table + inline styles for mail-client
 * compatibility; logo travels as an inline attachment (cid:tendrillogo).
 */
export function buildCandidateConfirmationEmail({
  prenom,
  programme,
  session,
  dateStr,
}) {
  const safePrenom = escapeHtml(prenom || "");
  const firstName = safePrenom || "à vous";

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
              <td style="background:${INK};padding:24px 40px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td width="42" style="vertical-align:middle;">
                      <img src="cid:tendrillogo" width="34" height="32" alt="Tendril School" style="display:block;" />
                    </td>
                    <td style="vertical-align:middle;padding-left:13px;font-family:${HEADING_FONT};font-size:18px;font-weight:900;letter-spacing:-0.02em;color:${ACCENT};text-transform:uppercase;">
                      Tendril School
                    </td>
                    <td align="right" style="vertical-align:middle;font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:0.04em;color:rgba(244,241,234,0.55);text-transform:uppercase;">
                      Confirmation de candidature
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr><td style="height:4px;background:${ACCENT};line-height:4px;font-size:0;">&nbsp;</td></tr>

            <!-- HERO -->
            <tr>
              <td style="padding:44px 40px 0;">
                <span style="display:inline-block;background:${ACCENT};color:${INK};font-family:${FONT};font-size:11px;font-weight:800;letter-spacing:0.06em;text-transform:uppercase;padding:7px 15px;">
                  &#10003;&nbsp; Candidature bien reçue
                </span>
                <h1 style="margin:22px 0 0;font-family:${HEADING_FONT};font-size:30px;font-weight:900;line-height:1.12;letter-spacing:-0.02em;color:${INK};">
                  Merci ${firstName}, votre candidature<br />est entre de bonnes mains.
                </h1>
              </td>
            </tr>

            <!-- INTRO -->
            <tr>
              <td style="padding:20px 40px 0;">
                <p style="margin:0;font-family:${FONT};font-size:15.5px;line-height:1.65;color:rgba(10,10,10,0.75);">
                  Nous avons bien reçu votre dossier pour le
                  <strong style="color:${INK};">${escapeHtml(programme)}</strong>.
                  Chaque candidature est étudiée individuellement par notre équipe
                  pédagogique&nbsp;: vous n'avez plus rien à faire pour le moment,
                  nous revenons vers vous très vite.
                </p>
              </td>
            </tr>

            <!-- RECAP CARD -->
            <tr>
              <td style="padding:32px 40px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:2px solid ${INK};">
                  <tr>
                    <td colspan="2" style="background:${INK};padding:11px 20px;font-family:${FONT};font-size:11px;font-weight:800;letter-spacing:0.08em;color:${ACCENT};text-transform:uppercase;">
                      Récapitulatif de votre demande
                    </td>
                  </tr>
                  ${recapRow("Programme", programme)}
                  ${recapRow("Session souhaitée", session || "À confirmer")}
                  ${recapRow("Format", "Distanciel")}
                  ${recapRow("Date de dépôt", dateStr)}
                </table>
              </td>
            </tr>

            <!-- NEXT STEPS -->
            <tr>
              <td style="padding:40px 40px 0;">
                <div style="border-bottom:2px solid ${ACCENT};padding-bottom:9px;margin-bottom:24px;">
                  <span style="font-family:${FONT};font-size:11.5px;font-weight:800;letter-spacing:0.06em;color:${INK};text-transform:uppercase;">
                    Les prochaines étapes
                  </span>
                </div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${STEPS.map((s, i) => stepRow(s, i === 0)).join("")}
                </table>
              </td>
            </tr>

            <!-- PDF NOTE -->
            <tr>
              <td style="padding:34px 40px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1.5px solid rgba(10,10,10,0.16);">
                  <tr>
                    <td style="padding:16px 20px;font-family:${FONT};">
                      <div style="font-size:10.5px;font-weight:700;letter-spacing:0.06em;color:rgba(10,10,10,0.45);text-transform:uppercase;margin-bottom:4px;">
                        Pièce jointe
                      </div>
                      <div style="font-size:14.5px;font-weight:700;color:${INK};">
                        Récapitulatif complet de votre dossier (PDF)
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- REASSURANCE + CONTACT -->
            <tr>
              <td style="padding:32px 40px 0;">
                <p style="margin:0 0 16px;font-family:${FONT};font-size:14.5px;line-height:1.65;color:rgba(10,10,10,0.72);">
                  Une question d'ici notre réponse&nbsp;? Il vous suffit de
                  répondre à cet email, ou de nous joindre directement&nbsp;:
                </p>
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-family:${FONT};font-size:14px;font-weight:700;color:${INK};padding-bottom:6px;">
                      <a href="mailto:${CONTACT_EMAIL}" style="color:${INK};text-decoration:none;border-bottom:2px solid ${ACCENT};">${CONTACT_EMAIL}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-family:${FONT};font-size:14px;font-weight:700;color:rgba(10,10,10,0.6);">
                      ${CONTACT_PHONE}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- SIGNATURE + CTA -->
            <tr>
              <td style="padding:34px 40px 0;">
                <p style="margin:0 0 22px;font-family:${FONT};font-size:15px;font-weight:700;color:${INK};">
                  À très vite,<br />
                  <span style="font-weight:800;">L'équipe des admissions &middot; Tendril School</span>
                </p>
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="background:${INK};">
                      <a href="${SITE_URL}/programmes" style="display:inline-block;font-family:${FONT};font-size:13px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:${ACCENT};text-decoration:none;padding:16px 28px;">
                        &rarr; Découvrir les programmes
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="padding:38px 40px 26px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:2px solid ${INK};">
                  <tr>
                    <td style="padding-top:18px;font-family:${FONT};font-size:11px;line-height:1.7;color:rgba(10,10,10,0.5);">
                      <strong style="color:rgba(10,10,10,0.7);letter-spacing:0.04em;">TENDRIL SCHOOL</strong><br />
                      École 3D du luxe &amp; de la cosmétique · 25 rue de Ponthieu, 75008 Paris<br />
                      Email automatique de confirmation. Vous pouvez y répondre.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
