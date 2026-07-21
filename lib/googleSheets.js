import { google } from "googleapis";

export const CANDIDATURE_HEADERS = [
  "Date d'envoi",
  "Programme",
  "Session souhaitée",
  "Format",
  "Prénom",
  "Nom",
  "Email",
  "Téléphone",
  "Date de naissance",
  "Nationalité",
  "Ville de résidence",
  "Situation actuelle",
  "Dernier diplôme",
  "Domaine d'études / métier",
  "Niveau en 3D",
  "Logiciels pratiqués",
  "Lien portfolio",
  "LinkedIn / site perso",
  "Pourquoi le luxe et la 3D ?",
  "Objectif professionnel",
  "Mode de financement",
  "Comment nous avez-vous connus",
  "Disponible à plein temps",
  "RGPD accepté",
];

// Pixel widths per column — short identifiers stay compact, long-form
// answers (motivation, objectif) get the room they need to be legible.
const COLUMN_WIDTHS = [
  140, 150, 130, 100, 110, 110, 200, 130, 130, 120, 140, 150, 150, 220, 110,
  200, 220, 220, 320, 280, 160, 180, 150, 110,
];

const INK = { red: 0.039, green: 0.039, blue: 0.039 };
const ACCENT = { red: 1, green: 0.823, blue: 0 };
const CREAM = { red: 0.965, green: 0.953, blue: 0.918 };
const WHITE = { red: 1, green: 1, blue: 1 };

const DATE_COL = 0; // "Date d'envoi"
const MOTIVATION_COL = CANDIDATURE_HEADERS.indexOf("Pourquoi le luxe et la 3D ?");
const NUM_COLS = CANDIDATURE_HEADERS.length;

function getSheetsClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n");
  const auth = new google.auth.JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth });
}

// With valueInputOption "USER_ENTERED", Sheets parses cell text the same way
// a human typing it would: "+33 6…" reads as a formula (-> #ERROR!) and
// "Janvier 2027" reads as a date (-> a raw serial number). A leading
// apostrophe forces plain text, same trick as typing it manually in the UI —
// applied to every column except the submission timestamp, which is the one
// value we actually want Sheets to treat as a real, sortable date.
function sheetSafeValue(value, columnIndex) {
  const s = String(value ?? "");
  if (columnIndex === DATE_COL) return s;
  return s.startsWith("'") ? s : `'${s}`;
}

async function getSheetMeta(sheets, spreadsheetId) {
  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  const sheet = meta.data.sheets[0];
  return {
    sheetId: sheet.properties.sheetId,
    bandedRangeIds: (sheet.bandedRanges || []).map((b) => b.bandedRangeId),
  };
}

const dateTimeFormatRequest = (sheetId, startRowIndex, endRowIndex) => ({
  repeatCell: {
    range: {
      sheetId,
      startRowIndex,
      ...(endRowIndex != null ? { endRowIndex } : {}),
      startColumnIndex: DATE_COL,
      endColumnIndex: DATE_COL + 1,
    },
    cell: {
      userEnteredFormat: { numberFormat: { type: "DATE_TIME", pattern: "dd/mm/yyyy hh:mm" } },
    },
    fields: "userEnteredFormat.numberFormat",
  },
});

/**
 * Applies the Tendril look to the sheet: dark/accent header, frozen header
 * row, sized columns, zebra striping on data rows, a header filter, and
 * wrapped top-aligned text on the two long-form answer columns. Safe to call
 * more than once — any previous banding is removed before re-adding it, since
 * the Sheets API errors on overlapping banded ranges.
 */
async function applySheetFormatting(sheets, spreadsheetId) {
  const { sheetId, bandedRangeIds } = await getSheetMeta(sheets, spreadsheetId);

  const requests = [
    ...bandedRangeIds.map((bandedRangeId) => ({ deleteBanding: { bandedRangeId } })),
    {
      updateSheetProperties: {
        properties: { sheetId, gridProperties: { frozenRowCount: 1 } },
        fields: "gridProperties.frozenRowCount",
      },
    },
    {
      updateDimensionProperties: {
        range: { sheetId, dimension: "ROWS", startIndex: 0, endIndex: 1 },
        properties: { pixelSize: 34 },
        fields: "pixelSize",
      },
    },
    {
      repeatCell: {
        range: { sheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: NUM_COLS },
        cell: {
          userEnteredFormat: {
            backgroundColor: INK,
            textFormat: { foregroundColor: ACCENT, bold: true, fontSize: 10 },
            horizontalAlignment: "CENTER",
            verticalAlignment: "MIDDLE",
            wrapStrategy: "WRAP",
          },
        },
        fields:
          "userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment,wrapStrategy)",
      },
    },
    {
      updateBorders: {
        range: { sheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: NUM_COLS },
        bottom: { style: "SOLID_THICK", color: ACCENT },
      },
    },
    {
      addBanding: {
        bandedRange: {
          range: { sheetId, startRowIndex: 1, startColumnIndex: 0, endColumnIndex: NUM_COLS },
          rowProperties: { firstBandColor: WHITE, secondBandColor: CREAM },
        },
      },
    },
    {
      setBasicFilter: {
        filter: {
          range: { sheetId, startRowIndex: 0, startColumnIndex: 0, endColumnIndex: NUM_COLS },
        },
      },
    },
    {
      repeatCell: {
        range: { sheetId, startRowIndex: 1, startColumnIndex: 0, endColumnIndex: NUM_COLS },
        cell: {
          userEnteredFormat: { verticalAlignment: "MIDDLE", textFormat: { fontSize: 10 } },
        },
        fields: "userEnteredFormat(verticalAlignment,textFormat.fontSize)",
      },
    },
    {
      repeatCell: {
        range: {
          sheetId,
          startRowIndex: 1,
          startColumnIndex: MOTIVATION_COL,
          endColumnIndex: MOTIVATION_COL + 2,
        },
        cell: {
          userEnteredFormat: { wrapStrategy: "WRAP", verticalAlignment: "TOP" },
        },
        fields: "userEnteredFormat(wrapStrategy,verticalAlignment)",
      },
    },
    dateTimeFormatRequest(sheetId, 1, null),
    ...COLUMN_WIDTHS.map((width, i) => ({
      updateDimensionProperties: {
        range: { sheetId, dimension: "COLUMNS", startIndex: i, endIndex: i + 1 },
        properties: { pixelSize: width },
        fields: "pixelSize",
      },
    })),
  ];

  await sheets.spreadsheets.batchUpdate({ spreadsheetId, requestBody: { requests } });
}

/**
 * Rows inserted right after a styled header can visually inherit that
 * header's formatting (bold, dark background...) — Sheets carries over the
 * format of the row above on insert. This strips whatever the new row picked
 * up and re-applies the plain data-row look, so banding shows through and
 * only the header stands out.
 */
async function formatNewDataRow(sheets, spreadsheetId, updatedRange) {
  const match = /![A-Z]+(\d+)/.exec(updatedRange || "");
  if (!match) return;
  const rowIndex = parseInt(match[1], 10) - 1;
  if (rowIndex < 1) return; // never touch the header row

  const { sheetId } = await getSheetMeta(sheets, spreadsheetId);

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [
        {
          repeatCell: {
            range: {
              sheetId,
              startRowIndex: rowIndex,
              endRowIndex: rowIndex + 1,
              startColumnIndex: 0,
              endColumnIndex: NUM_COLS,
            },
            cell: { userEnteredFormat: {} },
            fields: "userEnteredFormat",
          },
        },
        {
          repeatCell: {
            range: {
              sheetId,
              startRowIndex: rowIndex,
              endRowIndex: rowIndex + 1,
              startColumnIndex: 0,
              endColumnIndex: NUM_COLS,
            },
            cell: {
              userEnteredFormat: { verticalAlignment: "MIDDLE", textFormat: { fontSize: 10 } },
            },
            fields: "userEnteredFormat(verticalAlignment,textFormat.fontSize)",
          },
        },
        {
          repeatCell: {
            range: {
              sheetId,
              startRowIndex: rowIndex,
              endRowIndex: rowIndex + 1,
              startColumnIndex: MOTIVATION_COL,
              endColumnIndex: MOTIVATION_COL + 2,
            },
            cell: {
              userEnteredFormat: { wrapStrategy: "WRAP", verticalAlignment: "TOP" },
            },
            fields: "userEnteredFormat(wrapStrategy,verticalAlignment)",
          },
        },
        dateTimeFormatRequest(sheetId, rowIndex, rowIndex + 1),
      ],
    },
  });
}

/**
 * Appends one row to the sheet's first tab, creating (and styling) the
 * header on first use. Range omits a sheet name so it targets the
 * spreadsheet's first tab regardless of its actual title (default locale
 * name varies).
 */
export async function appendCandidatureRow(rowValues) {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) {
    throw new Error("GOOGLE_SHEET_ID is not configured");
  }

  const sheets = getSheetsClient();

  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "A1:A1",
  });

  if (!existing.data.values || existing.data.values.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: "A1",
      valueInputOption: "RAW",
      requestBody: { values: [CANDIDATURE_HEADERS] },
    });
    await applySheetFormatting(sheets, spreadsheetId);
  }

  const appendRes = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "A1",
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [rowValues.map((v, i) => sheetSafeValue(v, i))] },
  });

  await formatNewDataRow(sheets, spreadsheetId, appendRes.data.updates?.updatedRange);
}

/** One-off helper to (re)apply the styling to an already-populated sheet. */
export async function restyleCandidatureSheet() {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) {
    throw new Error("GOOGLE_SHEET_ID is not configured");
  }
  const sheets = getSheetsClient();
  await applySheetFormatting(sheets, spreadsheetId);
}
