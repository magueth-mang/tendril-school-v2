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

  return (
    <div ref={rootRef} className={styles.page}>
      <Ticker items={ticker} theme="dark" />
      <Nav theme="light" active="contact" />

      <header className={styles.hero}>
        <div className={styles.container}>
          <div data-hero className={styles.kickerRow}>
            <span className={styles.kicker}>(00) — CONTACT</span>
            <span className={styles.kickerRight}>PARIS · RÉPONSE SOUS 48H</span>
          </div>
          <h1 data-hero className={styles.title}>
            Écrivez-
            <br />
            nous.
          </h1>
          <p data-hero className={styles.intro}>
            Une question sur les bootcamps, le financement, une candidature ou un partenariat
            studio ? On lit tout, on répond vite.
          </p>
        </div>
      </header>

      <section className={styles.formSection}>
        <div className={styles.formGrid}>
          <div data-reveal className={styles.formCol}>
            <span className={styles.kickerSm}>(01) — FORMULAIRE</span>
            <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
              <div className={styles.formRow2}>
                <input type="text" placeholder="Prénom" className={styles.field} />
                <input type="text" placeholder="Nom" className={styles.field} />
              </div>
              <input type="email" placeholder="Email" className={styles.field} />
              <div className={styles.subjectBlock}>
                <span className={styles.subjectLabel}>SUJET</span>
                <div className={styles.subjectRow}>
                  {subjects.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSubject(s)}
                      className={`${styles.subjectBtn} ${subject === s ? styles.subjectActive : ""}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <textarea placeholder="Votre message" rows={5} className={styles.field} />
              <button type="submit" className={styles.submit}>
                → Envoyer le message
              </button>
            </form>
          </div>

          <div data-reveal className={styles.infoCol}>
            <div className={styles.infoInner}>
              <span className={styles.kickerSm}>(02) — COORDONNÉES</span>
              <div className={styles.coords}>
                <a href="mailto:contact@tendril.com" className={styles.coordRow}>
                  <span className={styles.coordLabel}>EMAIL</span>
                  <span className={styles.coordValue}>contact@tendril.com</span>
                </a>
                <a href="tel:+33100000000" className={styles.coordRow}>
                  <span className={styles.coordLabel}>TÉLÉPHONE</span>
                  <span className={styles.coordValue}>+33 1 00 00 00 00</span>
                </a>
                <div className={styles.coordRowStatic}>
                  <span className={styles.coordLabel}>ADRESSE</span>
                  <span className={styles.coordValueRight}>
                    12 rue du Faubourg
                    <br />
                    75003 Paris
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
