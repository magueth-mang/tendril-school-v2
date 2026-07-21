import path from "node:path";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { emailShell, emailSection, emailQuote } from "@/lib/email";
import { buildCandidaturePdf } from "@/lib/candidaturePdf";
import { appendCandidatureRow } from "@/lib/googleSheets";

export async function POST(req) {
  const data = await req.json();
  const { prenom, nom, email, programme } = data;

  if (!prenom || !nom || !email || !programme) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const name = `${prenom} ${nom}`.trim();
  const dash = "—";
  const clean = (v) => (v && String(v).trim() ? String(v).trim() : dash);
  const nationalite =
    data.nationalite === "Autre" ? data.nationalitePrecision : data.nationalite;

  const sections = [
    {
      num: "01",
      title: "Le programme",
      fields: [
        { label: "Programme", value: clean(data.programme) },
        { label: "Session souhaitée", value: clean(data.session) },
        { label: "Format", value: "Distanciel" },
      ],
    },
    {
      num: "02",
      title: "Identité",
      fields: [
        { label: "Email", value: clean(data.email) },
        { label: "Téléphone", value: clean(data.telephone) },
        { label: "Date de naissance", value: clean(data.naissance) },
        { label: "Nationalité", value: clean(nationalite) },
        { label: "Ville de résidence", value: clean(data.ville) },
      ],
    },
    {
      num: "03",
      title: "Parcours",
      fields: [
        { label: "Situation actuelle", value: clean(data.situation) },
        { label: "Dernier diplôme", value: clean(data.diplome) },
        { label: "Domaine d'études / métier", value: clean(data.domaine) },
        { label: "Niveau en 3D", value: clean(data.niveau) },
        { label: "Logiciels pratiqués", value: clean(data.logiciels) },
      ],
    },
    {
      num: "04",
      title: "Portfolio & motivation",
      fields: [
        { label: "Lien portfolio", value: clean(data.portfolio) },
        { label: "LinkedIn / site perso", value: clean(data.lien2) },
      ],
      quotes: [
        { label: "Pourquoi le luxe et la 3D ?", value: clean(data.motivation) },
        { label: "Objectif professionnel", value: clean(data.objectif) },
      ],
    },
    {
      num: "05",
      title: "Financement & pratique",
      fields: [
        { label: "Mode de financement", value: clean(data.financement) },
        { label: "Comment nous avez-vous connus", value: clean(data.source) },
        { label: "Disponible à plein temps", value: clean(data.dispo) },
        { label: "RGPD accepté", value: data.rgpd ? "Oui" : "Non" },
      ],
    },
  ];

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  let pdfBuffer = null;
  try {
    pdfBuffer = await buildCandidaturePdf(sections, {
      name,
      programme: data.programme,
    });
  } catch (err) {
    console.error("PDF generation error:", err);
  }

  const bodyHtml = sections
    .map(
      (s) =>
        emailSection(s.num, s.title, s.fields) +
        (s.quotes ? s.quotes.map((q) => emailQuote(q.label, q.value)).join("") : "")
    )
    .join("");

  const html = emailShell({
    badgeText: `★ Nouvelle candidature · ${data.programme}`,
    name,
    introText: "Le récapitulatif complet est joint en PDF à cet email.",
    bodyHtml,
    ctaHref: `mailto:${email}`,
    ctaLabel: `→ Répondre à ${prenom || name}`,
    footerNote: "Envoyé depuis le formulaire de candidature — tendril.com",
    headerLabel: "Dossier de candidature",
  });

  const attachments = [
    {
      filename: "tendril-mark.png",
      path: path.join(process.cwd(), "public", "tendril-mark.png"),
      cid: "tendrillogo",
    },
  ];
  if (pdfBuffer) {
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    attachments.push({
      filename: `candidature-${slug || "tendril"}.pdf`,
      content: pdfBuffer,
      contentType: "application/pdf",
    });
  }

  const mailOptions = {
    from: `"Tendril School" <${process.env.GMAIL_USER}>`,
    to: process.env.CONTACT_TO,
    replyTo: email,
    subject: `Nouvelle candidature — ${data.programme} — ${name}`,
    encoding: "utf-8",
    html,
    attachments,
  };

  const sheetRow = [
    new Date().toLocaleString("fr-FR"),
    clean(data.programme),
    clean(data.session),
    "Distanciel",
    clean(prenom),
    clean(nom),
    clean(data.email),
    clean(data.telephone),
    clean(data.naissance),
    clean(nationalite),
    clean(data.ville),
    clean(data.situation),
    clean(data.diplome),
    clean(data.domaine),
    clean(data.niveau),
    clean(data.logiciels),
    clean(data.portfolio),
    clean(data.lien2),
    clean(data.motivation),
    clean(data.objectif),
    clean(data.financement),
    clean(data.source),
    clean(data.dispo),
    data.rgpd ? "Oui" : "Non",
  ];

  // Email is the critical path — a Sheets hiccup shouldn't block the
  // candidate's confirmation, so it's logged but never fails the request.
  const [emailResult, sheetResult] = await Promise.allSettled([
    transporter.sendMail(mailOptions),
    appendCandidatureRow(sheetRow),
  ]);

  if (sheetResult.status === "rejected") {
    console.error("Google Sheets sync error:", sheetResult.reason);
  }

  if (emailResult.status === "rejected") {
    console.error("Email send error:", emailResult.reason);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
