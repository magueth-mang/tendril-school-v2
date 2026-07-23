const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts";

/**
 * Best-effort normalisation to E.164, the only format Brevo's SMS field
 * accepts. Handles the common French cases (0X… national, 00 prefix, already
 * international). Returns null when the number can't be confidently converted,
 * so the caller can skip it rather than have Brevo reject the whole contact.
 */
function normalizePhone(raw) {
  if (!raw) return null;
  let s = String(raw).trim().replace(/[\s().-]/g, "");
  if (s.startsWith("00")) s = `+${s.slice(2)}`;

  if (s.startsWith("+")) {
    const digits = s.slice(1).replace(/\D/g, "");
    return digits.length >= 8 && digits.length <= 15 ? `+${digits}` : null;
  }

  // French national format: 0X XX XX XX XX -> +33 X XX XX XX XX
  const digits = s.replace(/\D/g, "");
  if (digits.length === 10 && digits.startsWith("0")) {
    return `+33${digits.slice(1)}`;
  }
  return null;
}

/**
 * Creates (or updates, if the email already exists) a Brevo contact and adds
 * it to the candidature list. Attribute names match this Brevo account's
 * setup (PRENOM/NOM, not the English FIRSTNAME/LASTNAME defaults) — custom
 * fields like "Programme" or "Session" would need matching custom attributes
 * created in Brevo first.
 */
export async function addCandidatureContact({ email, firstName, lastName, phone }) {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_LIST_ID;

  if (!apiKey || !listId) {
    throw new Error("Brevo is not configured (missing BREVO_API_KEY or BREVO_LIST_ID)");
  }

  const sms = normalizePhone(phone);

  const post = (includeSms) =>
    fetch(BREVO_CONTACTS_URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email,
        attributes: {
          PRENOM: firstName,
          NOM: lastName,
          ...(includeSms && sms ? { SMS: sms } : {}),
        },
        listIds: [Number(listId)],
        updateEnabled: true,
      }),
    });

  let res = await post(true);

  // Brevo rejects the entire contact when the phone is invalid — retry once
  // without it so the candidate still lands in the list (email + name are
  // what matter for follow-up).
  if (res.status === 400 && sms) {
    const body = await res.text().catch(() => "");
    if (/phone/i.test(body)) {
      res = await post(false);
    } else {
      throw new Error(`Brevo API error ${res.status}: ${body}`);
    }
  }

  // Brevo returns 201 on create and 204 (no body) on update.
  if (!res.ok && res.status !== 204) {
    const body = await res.text().catch(() => "");
    throw new Error(`Brevo API error ${res.status}: ${body}`);
  }
}
