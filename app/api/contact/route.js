import path from "node:path";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { emailShell, emailSection, emailQuote } from "@/lib/email";

export async function POST(req) {
  const { firstName, lastName, email, subject, message } = await req.json();

  if (!firstName || !lastName || !email || !subject || !message) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const name = `${firstName} ${lastName}`.trim();

  const bodyHtml =
    emailSection("01", "Coordonnées", [
      { label: "Email", value: email },
      { label: "Sujet", value: subject },
    ]) + emailQuote("Message", message);

  const html = emailShell({
    badgeText: `★ Nouveau message · ${subject}`,
    name,
    introText: "vient d’écrire depuis le formulaire de contact.",
    bodyHtml,
    ctaHref: `mailto:${email}`,
    ctaLabel: `→ Répondre à ${firstName || name}`,
    footerNote: "Envoyé depuis le formulaire de contact — tendril.com",
    headerLabel: "Formulaire de contact",
  });

  const mailOptions = {
    from: `"Tendril School" <${process.env.GMAIL_USER}>`,
    to: process.env.CONTACT_TO,
    replyTo: email,
    subject: `Nouveau message — ${subject} — ${name}`,
    encoding: "utf-8",
    html,
    attachments: [
      {
        filename: "tendril-mark.png",
        path: path.join(process.cwd(), "public", "tendril-mark.png"),
        cid: "tendrillogo",
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
