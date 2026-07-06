"use client";

import { useRef } from "react";
import Link from "next/link";
import Ticker from "./Ticker";
import Nav from "./Nav";
import Footer from "./Footer";
import { useScrollFx } from "@/lib/useScrollFx";
import { ticker, compareStrip, cards, orientation } from "@/data/programmes";
import styles from "./ProgrammesView.module.css";

export default function ProgrammesView() {
  const rootRef = useRef(null);
  useScrollFx(rootRef);

  return (
    <div ref={rootRef} className={styles.page}>
      <Ticker items={ticker} theme="dark" />
      <Nav theme="light" active="programmes" />

      <header className={styles.hero}>
        <div className={styles.container}>
          <div data-hero className={styles.kickerRow}>
            <span className={styles.kicker}>(00) — LES PROGRAMMES</span>
            <span className={styles.kickerRight}>2 NIVEAUX · 1 EXIGENCE</span>
          </div>
          <h1 data-hero className={styles.title}>
            DEUX FORMATIONS.
            <br />
            UNE MÊME AMBITION.
          </h1>
          <p data-hero className={styles.intro}>
            Découvrez le Bootcamp qui correspond à votre niveau et développez les compétences
            recherchées par les plus grandes agences, studios et marques de luxe.
          </p>
        </div>
      </header>

      <section className={styles.compareSection}>
        <div data-stagger className={styles.compareGrid}>
          {compareStrip.map((c) => (
            <div key={c.label} className={styles.compareCell}>
              <div className={styles.compareLabel}>{c.label}</div>
              <div className={styles.compareValue}>
                {c.value}
                <span className={styles.compareSuffix}> {c.suffix}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.cardsSection}>
        <div className={styles.container}>
          <div data-reveal className={styles.cardsHead}>
            <span className={styles.kickerSm}>(01) — LES DEUX BOOTCAMPS</span>
            <h2 className={styles.h2}>Choisissez votre niveau.</h2>
          </div>
          <div data-stagger className={styles.cardsGrid}>
            <Link href={cards.novice.href} className={`${styles.card} ${styles.cardLight}`}>
              <div className={styles.cardMedia}>
                <div className={styles.cardMediaBar}>
                  <span>{cards.novice.kickerLeft}</span>
                  <span>{cards.novice.kickerRight}</span>
                </div>
                <div className={styles.cardFill} />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>
                  {cards.novice.title[0]}
                  <br />
                  {cards.novice.title[1]}
                </h3>
                <p className={styles.cardDesc}>{cards.novice.desc}</p>
                <div className={styles.cardFacts}>
                  {cards.novice.facts.map((f) => (
                    <div key={f.label} className={styles.cardFact}>
                      <div className={styles.cardFactLabel}>{f.label}</div>
                      <div className={styles.cardFactValue}>{f.value}</div>
                    </div>
                  ))}
                </div>
                <span className={styles.cardCta}>Voir le programme complet →</span>
              </div>
            </Link>

            <Link href={cards.avance.href} className={`${styles.card} ${styles.cardDark}`}>
              <div className={styles.cardMedia}>
                <div className={`${styles.cardMediaBar} ${styles.cardMediaBarAccent}`}>
                  <span>{cards.avance.kickerLeft}</span>
                  <span className={styles.popularBadge}>★ POPULAIRE</span>
                  <span>{cards.avance.kickerRight}</span>
                </div>
                <div className={styles.cardFill} />
              </div>
              <div className={styles.cardBody}>
                <h3 className={`${styles.cardTitle} ${styles.cardTitleAccent}`}>
                  {cards.avance.title[0]}
                  <br />
                  {cards.avance.title[1]}
                </h3>
                <p className={`${styles.cardDesc} ${styles.cardDescDark}`}>{cards.avance.desc}</p>
                <div className={`${styles.cardFacts} ${styles.cardFactsAccent}`}>
                  {cards.avance.facts.map((f) => (
                    <div key={f.label} className={styles.cardFact}>
                      <div className={styles.cardFactLabelDark}>{f.label}</div>
                      <div className={styles.cardFactValueAccent}>{f.value}</div>
                    </div>
                  ))}
                </div>
                <span className={`${styles.cardCta} ${styles.cardCtaAccent}`}>
                  Voir le programme complet →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.orientationSection}>
        <div data-reveal className={styles.container}>
          <span className={styles.kickerSm}>(02) — LEQUEL CHOISIR ?</span>
          <h2 className={styles.h2Narrow}>Pas sûr de votre niveau ? On vous oriente.</h2>
          <div className={styles.orientationGrid}>
            <div className={styles.orientationCell}>
              <span className={styles.orientationLabel}>CHOISISSEZ NOVICE SI…</span>
              <ul className={styles.orientationList}>
                {orientation.novice.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className={`${styles.orientationCell} ${styles.orientationCellAccent}`}>
              <span className={styles.orientationLabel}>CHOISISSEZ AVANCÉ SI…</span>
              <ul className={styles.orientationList}>
                {orientation.avance.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div data-reveal className={styles.ctaInner}>
          <div>
            <span className={styles.kickerSm}>(03) — CANDIDATURE</span>
            <h2 className={styles.ctaTitle}>Une seule candidature pour les deux.</h2>
          </div>
          <Link href="/candidature" className={styles.ctaButton}>
            → Candidater pour septembre
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
