import fs from "node:fs/promises";
import path from "node:path";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const INK = rgb(0.039, 0.039, 0.039);
const ACCENT = rgb(1, 0.823, 0);
const GRAY = rgb(0.45, 0.45, 0.45);
const CREAM_TEXT = rgb(0.96, 0.95, 0.92);

const PAGE_W = 595.28; // A4 portrait, points
const PAGE_H = 841.89;
const MARGIN = 54;
const HEADER_H = 96;
const CONTENT_W = PAGE_W - MARGIN * 2;
const COL_GAP = 28;
const COL_W = (CONTENT_W - COL_GAP) / 2;

const LABEL_SIZE = 8.5;
const VALUE_SIZE = 11.5;
const LINE_GAP = 14;

function wrapText(text, font, size, maxWidth) {
  const words = String(text).split(/\s+/).filter(Boolean);
  if (!words.length) return ["—"];
  const lines = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(test, size) > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/**
 * Builds a branded, section-based PDF recap of a candidature submission —
 * fields laid out two-per-row so the dossier reads like a page, not a form.
 * Returns a Buffer ready to attach to an email.
 */
export async function buildCandidaturePdf(sections, { name, programme } = {}) {
  const pdfDoc = await PDFDocument.create();
  const regular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const italic = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  let logo = null;
  try {
    const bytes = await fs.readFile(
      path.join(process.cwd(), "public", "tendril-mark.png")
    );
    logo = await pdfDoc.embedPng(bytes);
  } catch {
    logo = null;
  }

  let page;
  let y;

  function drawHeader() {
    page.drawRectangle({
      x: 0,
      y: PAGE_H - HEADER_H,
      width: PAGE_W,
      height: HEADER_H,
      color: INK,
    });

    let textX = MARGIN;
    if (logo) {
      const dims = logo.scale(34 / logo.width);
      page.drawImage(logo, {
        x: MARGIN,
        y: PAGE_H - HEADER_H / 2 - dims.height / 2,
        width: dims.width,
        height: dims.height,
      });
      textX = MARGIN + dims.width + 13;
    }
    page.drawText("TENDRIL SCHOOL", {
      x: textX,
      y: PAGE_H - HEADER_H / 2 - 6,
      size: 17,
      font: bold,
      color: ACCENT,
    });

    const subtitle = "DOSSIER DE CANDIDATURE";
    const subtitleSize = 9;
    const subtitleWidth = bold.widthOfTextAtSize(subtitle, subtitleSize);
    page.drawText(subtitle, {
      x: PAGE_W - MARGIN - subtitleWidth,
      y: PAGE_H - HEADER_H / 2 - 3,
      size: subtitleSize,
      font: bold,
      color: CREAM_TEXT,
    });

    page.drawRectangle({
      x: 0,
      y: PAGE_H - HEADER_H - 4,
      width: PAGE_W,
      height: 4,
      color: ACCENT,
    });
  }

  function newPage() {
    page = pdfDoc.addPage([PAGE_W, PAGE_H]);
    drawHeader();
    y = PAGE_H - HEADER_H - 46;
  }

  function ensureSpace(needed) {
    if (y - needed < MARGIN + 30) newPage();
  }

  function drawSectionTitle(num, title) {
    ensureSpace(46);
    page.drawRectangle({ x: MARGIN, y: y - 8, width: 7, height: 7, color: ACCENT });
    page.drawText(`(${num}) — ${title.toUpperCase()}`, {
      x: MARGIN + 15,
      y: y - 9,
      size: 11.5,
      font: bold,
      color: INK,
    });
    y -= 20;
    page.drawLine({
      start: { x: MARGIN, y },
      end: { x: PAGE_W - MARGIN, y },
      thickness: 1,
      color: ACCENT,
    });
    y -= 28;
  }

  function drawFieldPair(a, b) {
    const linesA = wrapText(a.value, regular, VALUE_SIZE, COL_W);
    const linesB = b ? wrapText(b.value, regular, VALUE_SIZE, COL_W) : [];
    const rowLines = Math.max(linesA.length, linesB.length || 0);
    const rowHeight = 13 + rowLines * LINE_GAP + 16;

    ensureSpace(rowHeight);

    const topY = y;
    page.drawText(a.label.toUpperCase(), {
      x: MARGIN,
      y: topY,
      size: LABEL_SIZE,
      font: bold,
      color: GRAY,
    });
    let ay = topY - 14;
    for (const line of linesA) {
      page.drawText(line, { x: MARGIN, y: ay, size: VALUE_SIZE, font: regular, color: INK });
      ay -= LINE_GAP;
    }

    if (b) {
      const x2 = MARGIN + COL_W + COL_GAP;
      page.drawText(b.label.toUpperCase(), {
        x: x2,
        y: topY,
        size: LABEL_SIZE,
        font: bold,
        color: GRAY,
      });
      let by = topY - 14;
      for (const line of linesB) {
        page.drawText(line, { x: x2, y: by, size: VALUE_SIZE, font: regular, color: INK });
        by -= LINE_GAP;
      }
    }

    y = topY - (13 + rowLines * LINE_GAP) - 16;
  }

  function drawQuote(label, value) {
    const barW = 3;
    const textPad = 20;
    const textWidth = CONTENT_W - barW - textPad;
    const lines = wrapText(value, italic, 11, textWidth);
    const boxHeight = 29 + lines.length * 14;

    ensureSpace(boxHeight + 20);

    const topY = y;
    page.drawRectangle({ x: MARGIN, y: topY - boxHeight, width: barW, height: boxHeight, color: ACCENT });

    let ty = topY - 10;
    page.drawText(label.toUpperCase(), {
      x: MARGIN + barW + textPad,
      y: ty,
      size: LABEL_SIZE,
      font: bold,
      color: GRAY,
    });
    ty -= 18;
    for (const line of lines) {
      page.drawText(line, { x: MARGIN + barW + textPad, y: ty, size: 11, font: italic, color: INK });
      ty -= 14;
    }

    y = topY - boxHeight - 22;
  }

  newPage();

  page.drawText(name || "Candidat", { x: MARGIN, y, size: 25, font: bold, color: INK });
  y -= 22;
  if (programme) {
    page.drawText(programme, { x: MARGIN, y, size: 12, font: regular, color: GRAY });
  }
  y -= 38;

  for (const section of sections) {
    drawSectionTitle(section.num, section.title);
    for (let i = 0; i < section.fields.length; i += 2) {
      drawFieldPair(section.fields[i], section.fields[i + 1]);
    }
    if (section.quotes) {
      for (const q of section.quotes) drawQuote(q.label, q.value);
    }
    y -= 10;
  }

  const footerText = `Généré automatiquement le ${new Date().toLocaleDateString(
    "fr-FR"
  )} — tendril.com`;
  page.drawText(footerText, { x: MARGIN, y: 24, size: 8, font: regular, color: GRAY });

  const bytes = await pdfDoc.save();
  return Buffer.from(bytes);
}
