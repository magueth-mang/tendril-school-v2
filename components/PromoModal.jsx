"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./PromoModal.module.css";

const STORAGE_KEY = "promoModalSeen";

export default function PromoModal() {
  const [open, setOpen] = useState(false);

  // Show once per browser session. Read in an effect (client-only) to avoid
  // an SSR/hydration mismatch.
  useEffect(() => {
    try {
      if (!sessionStorage.getItem(STORAGE_KEY)) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  // Lock body scroll while the modal is open.
  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  function close() {
    setOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  // Close on Escape.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={close}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="promo-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.close}
          onClick={close}
          aria-label="Fermer"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M1 1 L13 13 M13 1 L1 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Slot image 9:16 — remplacez le fond par votre visuel */}
        <div className={styles.media} aria-hidden="true">
          <span className={styles.mediaTag}>SESSION · JANVIER 2027</span>
        </div>

        <div className={styles.body}>
          <span className={styles.kicker}>★ INSCRIPTIONS OUVERTES · 30 PLACES</span>
          <h2 id="promo-title" className={styles.title}>
            Ne ratez pas la promo{" "}
            <mark className={styles.highlight}>Janvier 2027</mark>.
          </h2>
          <p className={styles.text}>
            La prochaine promotion se remplit — et il n&apos;y a que 30 places.
            Formez-vous en 12 semaines auprès d&apos;artistes qui produisent pour
            les plus grandes maisons, et repartez avec un portfolio de niveau
            agence.
          </p>
          <p className={styles.urgency}>
            🔥 Sélection en cours · Réservez votre place aujourd&apos;hui
          </p>

          <div className={styles.actions}>
            <Link href="/candidature" className={styles.cta} onClick={close}>
              → Je candidate maintenant
            </Link>
            <button type="button" className={styles.dismiss} onClick={close}>
              Plus tard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
