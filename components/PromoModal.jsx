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
          ×
        </button>

        <span className={styles.kicker}>★ PROCHAINE PROMOTION</span>
        <h2 id="promo-title" className={styles.title}>
          Rentrée <mark className={styles.highlight}>Janvier 2027</mark>
        </h2>
        <p className={styles.text}>
          La prochaine promotion démarre en janvier 2027. Les candidatures sont
          ouvertes — 30 places seulement. Réservez la vôtre dès maintenant.
        </p>

        <div className={styles.actions}>
          <Link href="/candidature" className={styles.cta} onClick={close}>
            → Candidater maintenant
          </Link>
          <button type="button" className={styles.dismiss} onClick={close}>
            Plus tard
          </button>
        </div>
      </div>
    </div>
  );
}
