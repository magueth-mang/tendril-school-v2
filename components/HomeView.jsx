"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Ticker from "./Ticker";
import Nav from "./Nav";
import Footer from "./Footer";
import Faq from "./Faq";
import VimeoHeroPlayer from "./VimeoHeroPlayer";
import PromoModal from "./PromoModal";
import { useScrollFx } from "@/lib/useScrollFx";
import {
  ticker,
  clips,
  stats,
  noviceModules,
  avanceModules,
  bootcamps,
  comparison,
  faqs,
} from "@/data/home";
import styles from "./HomeView.module.css";

export default function HomeView() {
  const rootRef = useRef(null);
  useScrollFx(rootRef);
  const [track, setTrack] = useState("novice");
  const [emailCopied, setEmailCopied] = useState(false);
  const modules = track === "novice" ? noviceModules : avanceModules;

  function handleCopyEmail(e) {
    e.preventDefault();
    navigator.clipboard
      ?.writeText("contact@tendril.com")
      .then(() => {
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 1800);
      })
      .catch(() => {});
  }

  return (
    <div ref={rootRef} className={styles.page}>
      <PromoModal />
      <Ticker items={ticker} theme="dark" />
      <Nav theme="light" />

      {/* HERO */}
      <header id="top" className={styles.hero}>
        <div className={styles.container}>
          <div data-hero className={styles.kickerRow}>
            <span className={styles.kicker}>(01) — L&apos;ÉCOLE</span>
            <span className={styles.kickerRight}>PARIS · EST. 2021</span>
          </div>
          <h1 data-hero className={styles.title}>
            La 1<sup className={styles.sup}>ère</sup> école 3D spécialisée pour
            le <mark className={styles.highlight}>luxe,</mark> Mode &amp;
            Hardware.
          </h1>
          <div data-hero className={styles.introRow}>
            <p className={styles.intro}>
              Des formations intensives de 4 mois, pensées par des
              professionnels du secteur pour répondre aux besoins réels des
              marques de luxe, cosmétique et mode.
            </p>
            <div className={styles.ctaCol}>
              <Link href="/candidature" className={styles.ctaPrimary}>
                → Candidater pour janvier
              </Link>
              <a href="#programme" className={styles.ctaSecondary}>
                Lire le programme
              </a>
            </div>
          </div>
        </div>
        <div data-hero className={styles.heroMedia}>
          <div className={styles.heroCaption}>
            <span>RENDER. 01 — YSL PURSE, MANG PRODUCTION 2026</span>
            <span>1920×1080</span>
          </div>
          <VimeoHeroPlayer videoId="1181961439" hash="fd5a3feded" background />
        </div>
      </header>

      {/* MANIFESTO */}
      <section className={styles.manifesto}>
        <div data-reveal className={styles.container}>
          <span className={styles.kickerSm}>(02) — MANIFESTE</span>
          <p className={styles.manifestoText}>
            Aujourd&apos;hui,{" "}
            <mark className={styles.manifestoHighlight}>plus de 85%</mark> des
            contenus visuels produits par les marques utilisent la 3D :{" "}
            <span className={styles.manifestoMuted}>
              campagnes, produits, social media, e-commerce et expériences
              immersives.
            </span>
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className={styles.statsSection}>
        <div data-stagger className={styles.statsGrid}>
          {stats.map((s) => (
            <div key={s.label} className={styles.statCell}>
              <div className={styles.statValue}>{s.value}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SHOWREEL */}
      <section id="showreel" className={styles.showreel}>
        <div className={styles.container}>
          <div data-reveal className={styles.showreelHead}>
            <span className={styles.kickerAccent}>
              (03) — VOTRE FUTUR PORTFOLIO
            </span>
            <h2 className={styles.showreelTitle}>
              VOUS RÉALISEREZ PLUSIEURS PROJETS PUBLICITAIRES COMPLETS, DES
              VISUELS PACKSHOT LUXE ET UNE{" "}
              <mark className={styles.highlight}>
                PUBLICITÉ PRODUIT DE NIVEAU AGENCE.
              </mark>
            </h2>
          </div>

          <div data-reveal className={styles.mainReel}>
            <VimeoHeroPlayer
              videoId="1181962252"
              hash="e7a6192c91"
              hoverLift
              caption={{
                left: "01. BOOTCAMP NOVICE — CAMPAGNE KERASTASE",
                right: "00:18 · 4K",
              }}
              className={styles.playerAccentBorder}
            />
          </div>

          <div data-stagger className={styles.clipsGrid}>
            {clips.map((c) => (
              <VimeoHeroPlayer
                key={c.label}
                videoId={c.videoId}
                hash={c.hash}
                aspect="9 / 16"
                compact
                hoverLift
                caption={{ left: c.label, right: c.dur }}
                className={styles.playerAccentBorder}
              />
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMME */}
      <section id="programme" className={styles.programme}>
        <div className={styles.container}>
          <div data-reveal className={styles.programmeHead}>
            <div>
              <span className={styles.kickerSm}>(04) — LE PROGRAMME</span>
              <h2 className={styles.h2}>Les modules.</h2>
            </div>
            <Link href="/programmes" className={styles.linkOut}>
              Voir les programmes détaillés →
            </Link>
          </div>
          <div data-reveal className={styles.tabs}>
            <button
              type="button"
              onClick={() => setTrack("novice")}
              className={`${styles.tab} ${
                track === "novice" ? styles.tabActive : ""
              }`}
            >
              Bootcamp Novice
            </button>
            <button
              type="button"
              onClick={() => setTrack("avance")}
              className={`${styles.tab} ${
                track === "avance" ? styles.tabActive : ""
              }`}
            >
              Bootcamp Avancé
            </button>
          </div>
        </div>

        <div data-stagger key={track}>
          {modules.map((mod) => (
            <div key={mod.num} className={styles.moduleRow}>
              <div className={styles.moduleRowInner}>
                <span className={styles.moduleNum}>{mod.num}</span>
                <h3 className={styles.moduleTitle}>{mod.title}</h3>
                <div className={styles.tagRow}>
                  {mod.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div className={styles.moduleClose} />
        </div>
      </section>

      {/* LA METHODE */}
      <section id="methode" className={styles.methode}>
        <div className={styles.container}>
          <div data-reveal className={styles.methodeGrid}>
            <div className={styles.methodeLeft}>
              <div className={styles.methodeHead}>
                <span className={styles.kickerSm}>(05) — LA MÉTHODE</span>
                <h2 className={styles.h2Wide}>
                  Notre vision en quelques mots...
                </h2>
              </div>
              <p className={styles.methodeQuote}>
                « Lorsque qu&apos;une agence, un studio ou une marque recrute un
                artiste 3D, la première chose qu&apos;elle regarde n&apos;est
                pas votre école.{" "}
                <mark className={styles.highlight}>
                  C&apos;est votre portfolio.
                </mark>{" "}
                »
              </p>
            </div>
            <VimeoHeroPlayer
              videoId="1209820866"
              hash="31da0e36ef"
              aspect="9 / 16"
              hoverLift
              caption={{ left: "PODCAST — ÉP. 07", right: "LE PORTFOLIO" }}
              className={`${styles.playerInkBorder} ${styles.methodePortrait}`}
            />
          </div>
        </div>
      </section>

      {/* POURQUOI TENDRIL */}
      <section id="galerie" className={styles.pourquoi}>
        <div className={styles.container}>
          <div data-reveal className={styles.pourquoiHead}>
            <span className={styles.kickerSm}>(06) — POURQUOI TENDRIL</span>
            <h2 className={styles.h2Narrow}>
              Une autre approche que l&apos;école classique.
            </h2>
          </div>
          <div data-stagger className={styles.compareGrid}>
            <div className={styles.compareTendril}>
              <div className={styles.compareHead}>
                <span className={styles.compareBadge}>
                  {comparison.tendril.label}
                </span>
                <div className={styles.compareName}>
                  {comparison.tendril.name}
                </div>
              </div>
              <ul className={styles.compareList}>
                {comparison.tendril.rows.map((row) => (
                  <li key={row.label}>
                    <div className={styles.compareLabel}>{row.label}</div>
                    <div className={styles.compareValueAccent}>{row.value}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.compareAutre}>
              <div className={styles.compareHeadLight}>
                <span className={styles.compareBadgeMuted}>
                  {comparison.autre.label}
                </span>
                <div className={styles.compareNameMuted}>
                  {comparison.autre.name}
                </div>
              </div>
              <ul className={styles.compareList}>
                {comparison.autre.rows.map((row) => (
                  <li key={row.label}>
                    <div className={styles.compareLabelMuted}>{row.label}</div>
                    <div className={styles.compareValueMuted}>{row.value}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TEMOIGNAGE */}
      <section className={styles.temoignage}>
        <div data-reveal className={styles.container}>
          <span className={styles.kickerAccent}>(07) — TÉMOIGNAGE</span>
          <p className={styles.temoignageQuote}>
            « Notre objectif est de proposer une formation intensive,
            spécialisée et directement inspirée des méthodes utilisées dans les
            studios qui produisent aujourd&apos;hui{" "}
            <span className={styles.temoignageAccent}>
              les campagnes des plus grandes marques de luxe.
            </span>{" "}
            »
          </p>
          <div className={styles.temoignageSign}>
            NICOLAS ANGUELOV — FONDATEUR DE MANG PRODUCTION &amp; TENDRIL SCHOOL
          </div>
        </div>
      </section>

      {/* TARIFS / DEUX BOOTCAMPS */}
      <section id="tarifs" className={styles.tarifs}>
        <div className={styles.container}>
          <div data-reveal className={styles.tarifsHead}>
            <div>
              <span className={styles.kickerSm}>(08) — LES BOOTCAMPS</span>
              <h2 className={styles.h2}>Deux bootcamps.</h2>
            </div>
            <Link href="/programmes" className={styles.linkOut}>
              Voir les programmes →
            </Link>
          </div>
        </div>
        <div data-stagger className={styles.pricingGrid}>
          <PricingCard data={bootcamps.novice} variant="light" />
          <PricingCard data={bootcamps.avance} variant="accent" />
        </div>
        <p data-reveal className={styles.financementNote}>
          {
            "// ÉCHELONNEMENT POSSIBLE · CONTACTEZ NOUS POUR PLUS D'INFORMATIONS"
          }
        </p>
      </section>

      {/* FAQ */}
      <section id="faq" className={styles.faqSection}>
        <div className={styles.container}>
          <div data-reveal className={styles.sectionHead}>
            <span className={styles.kickerSm}>(09) — FAQ</span>
            <h2 className={styles.h2}>Avant de candidater.</h2>
          </div>
        </div>
        <div data-reveal>
          <Faq items={faqs} defaultOpenIndex={0} />
        </div>
      </section>

      {/* CANDIDATURE */}
      <section id="candidature" className={styles.candidature}>
        <div data-reveal className={styles.candidatureGrid}>
          <div>
            <span className={styles.kickerSm}>(10) — CANDIDATURE</span>
            <h2 className={styles.candidatureTitle}>Rejoignez la promo.</h2>
            <p className={styles.candidatureText}>
              30 places. Sélection sur entretien. Candidatures pour jannvier
              ouvertes.
            </p>
            <div className={styles.candidatureContact}>
              <div className={styles.candidatureEmailRow}>
                <a
                  href="mailto:contact@tendril.com"
                  onClick={handleCopyEmail}
                  className={styles.candidatureEmail}
                >
                  CONTACT@TENDRIL.COM
                </a>
                {emailCopied && (
                  <span className={styles.copiedMsg}>Copié ✓</span>
                )}
              </div>
              <span className={styles.candidatureAddress}>
                12 RUE DU FAUBOURG · 75003 PARIS
              </span>
            </div>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
            <input
              type="text"
              placeholder="Nom complet"
              className={styles.field}
            />
            <input type="email" placeholder="Email" className={styles.field} />
            <input
              type="text"
              placeholder="Lien portfolio (optionnel)"
              className={styles.field}
            />
            <textarea
              placeholder="Pourquoi le luxe et la 3D ?"
              rows={3}
              className={styles.field}
            />
            <button type="submit" className={styles.submit}>
              → Envoyer ma candidature
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function PricingCard({ data, variant }) {
  const accent = variant === "accent";
  return (
    <div
      className={`${styles.pricingCard} ${
        accent ? styles.pricingCardAccent : ""
      }`}
    >
      {accent && <span className={styles.popular}>★ POPULAIRE</span>}
      <span className={styles.pricingKicker}>{data.kicker}</span>
      <h3 className={styles.pricingTitle}>{data.title}</h3>
      <p className={styles.pricingMeta}>{data.meta}</p>
      <div className={styles.pricingPrice}>{data.price}</div>
      <div className={styles.pricingSubtitle}>{data.subtitle}</div>
      <ul className={styles.pricingList}>
        {data.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <Link href={data.href} className={styles.pricingCta}>
        Voir le programme →
      </Link>
    </div>
  );
}
