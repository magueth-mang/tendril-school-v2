"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Ticker from "./Ticker";
import Nav from "./Nav";
import Footer from "./Footer";
import Faq from "./Faq";
import { useScrollFx } from "@/lib/useScrollFx";
import { ticker, subjects, directLines, faqs } from "@/data/contact";
import styles from "./ContactView.module.css";

export default function ContactView() {
  const rootRef = useRef(null);
  useScrollFx(rootRef);
  const [subject, setSubject] = useState("Admissions");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sendError, setSendError] = useState(false);

  function handleField(key) {
    return (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setSendError(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, subject }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <div ref={rootRef} className={styles.page}>
      <Ticker items={ticker} theme="dark" />
      <Nav theme="light" active="contact" />

      <header className={styles.hero}>
        <div className={styles.container}>
          <div data-hero className={styles.kickerRow}>
            <span className={styles.kicker}>(00) — CONTACT</span>
            <span className={styles.kickerRight}>PARIS · RÉPONSE SOUS 24H</span>
          </div>
          <h1 data-hero className={styles.title}>
            Écrivez-
            <br />
            nous.
          </h1>
          <p data-hero className={styles.intro}>
            Une question sur les bootcamps, le financement, une candidature ou
            un partenariat studio ? On lit tout, on répond vite.
          </p>
        </div>
      </header>

      <section className={styles.formSection}>
        <div className={styles.formGrid}>
          <div data-reveal className={styles.formCol}>
            <span className={styles.kickerSm}>(01) — FORMULAIRE</span>
            {submitted ? (
              <p className={styles.successMsg}>
                Message envoyé. On vous répond sous 24h.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formRow2}>
                  <input
                    type="text"
                    placeholder="Prénom"
                    required
                    value={form.firstName}
                    onChange={handleField("firstName")}
                    className={styles.field}
                  />
                  <input
                    type="text"
                    placeholder="Nom"
                    required
                    value={form.lastName}
                    onChange={handleField("lastName")}
                    className={styles.field}
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={form.email}
                  onChange={handleField("email")}
                  className={styles.field}
                />
                <div className={styles.subjectBlock}>
                  <span className={styles.subjectLabel}>SUJET</span>
                  <div className={styles.subjectRow}>
                    {subjects.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSubject(s)}
                        className={`${styles.subjectBtn} ${
                          subject === s ? styles.subjectActive : ""
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  placeholder="Votre message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={handleField("message")}
                  className={styles.field}
                />
                {sendError && (
                  <p className={styles.errorMsg}>
                    Une erreur est survenue. Merci de réessayer.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={sending}
                  className={styles.submit}
                >
                  {sending ? "Envoi..." : "→ Envoyer le message"}
                </button>
              </form>
            )}
          </div>

          <div data-reveal className={styles.infoCol}>
            <div className={styles.infoInner}>
              <span className={styles.kickerSm}>(02) — COORDONNÉES</span>
              <div className={styles.coords}>
                <a
                  href="mailto:contact@tendril-school.com"
                  className={styles.coordRow}
                >
                  <span className={styles.coordLabel}>EMAIL</span>
                  <span className={styles.coordValue}>
                    contact@tendril-school.com
                  </span>
                </a>
                <a href="tel:+33664546616" className={styles.coordRow}>
                  <span className={styles.coordLabel}>TÉLÉPHONE</span>
                  <span className={styles.coordValue}>+33 6 64 54 66 16</span>
                </a>
                <div className={styles.coordRowStatic}>
                  <span className={styles.coordLabel}>ADRESSE</span>
                  <span className={styles.coordValueRight}>
                    25 rue de Ponthieu
                    <br />
                    75008 Paris
                  </span>
                </div>
              </div>
              <div className={styles.socials}>
                <a href="#" className={styles.socialLink}>
                  INSTAGRAM
                </a>
                <a href="#" className={styles.socialLink}>
                  BEHANCE
                </a>
                <a href="#" className={styles.socialLink}>
                  LINKEDIN
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.linesSection}>
        <div data-stagger className={styles.linesGrid}>
          {directLines.map((line) => (
            <div key={line.label} className={styles.lineCell}>
              <span className={styles.lineLabel}>{line.label}</span>
              <h3 className={styles.lineTitle}>{line.title}</h3>
              <p className={styles.lineDesc}>{line.desc}</p>
              {line.isRoute ? (
                <Link href={line.href} className={styles.lineLink}>
                  {line.linkLabel}
                </Link>
              ) : (
                <a href={line.href} className={styles.lineLink}>
                  {line.linkLabel}
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.container}>
          <div data-reveal className={styles.sectionHead}>
            <span className={styles.kickerSm}>(03) — QUESTIONS FRÉQUENTES</span>
            <h2 className={styles.h2}>Avant d&apos;écrire.</h2>
          </div>
        </div>
        <div data-reveal>
          <Faq items={faqs} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
