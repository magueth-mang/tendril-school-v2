"use client";

import { useRef } from "react";
import Link from "next/link";
import Ticker from "./Ticker";
import Nav from "./Nav";
import Footer from "./Footer";
import VimeoHeroPlayer from "./VimeoHeroPlayer";
import PromoModal from "./PromoModal";
import { useScrollFx } from "@/lib/useScrollFx";
import { ticker, clips, stats, bootcamps, comparison } from "@/data/home";
import { episodes } from "@/data/ecole";
import styles from "./LandingView.module.css";

export default function LandingView() {
  const rootRef = useRef(null);
  useScrollFx(rootRef);

  // Épisodes mis en avant : création, débouchés, différence écoles.
  const podcastEpisodes = ["01", "04", "03"].map((n) =>
    episodes.find((e) => e.num === n)
  );

  return (
    <div ref={rootRef} className={styles.page}>
      <PromoModal />
      <Ticker items={ticker} theme="dark" />
      <Nav theme="light" />

      {/* HERO */}
      <header className={styles.hero}>
        <div className={styles.container}>
          <div data-hero className={styles.kickerRow}>
            <span className={styles.kicker}>(LP) — CANDIDATURES OUVERTES</span>
            <span className={styles.kickerRight}>SESSION · JANVIER 2027</span>
          </div>
          <h1 data-hero className={styles.title}>
            La 1<sup className={styles.sup}>ère</sup> école 3D spécialisée pour
            le <mark className={styles.highlight}>luxe</mark> et la cosmétique.
          </h1>
          <div data-hero className={styles.introRow}>
            <p className={styles.intro}>
              Le bootcamp intensif pensé par les artistes 3D de Mang Production.
              Repartez avec un portfolio de niveau agence et une méthode
              directement applicable en studio.
            </p>
            <div className={styles.ctaCol}>
              <Link href="/candidature" className={styles.ctaPrimary}>
                → Candidater pour janvier
              </Link>
              <a href="#podcast" className={styles.ctaSecondary}>
                Écouter le podcast
              </a>
            </div>
          </div>
        </div>
        <div data-hero className={styles.heroMedia}>
          <div className={styles.heroCaption}>
            <span>SHOWREEL — MANG PRODUCTION 2026</span>
            <span>1920×1080</span>
          </div>
          <VimeoHeroPlayer videoId="1181961439" hash="fd5a3feded" background />
        </div>
      </header>

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

      {/* SHOWREEL / RENDERS */}
      <section className={styles.showreel}>
        <div className={styles.container}>
          <div data-reveal className={styles.showreelHead}>
            <span className={styles.kickerAccent}>
              ★ CE QUE VOUS ALLEZ PRODUIRE
            </span>
            <h2 className={styles.showreelTitle}>
              Dès la sortie du bootcamp, un portfolio de niveau agence.
            </h2>
          </div>

          <div data-reveal className={styles.mainReel}>
            <VimeoHeroPlayer
              videoId="1181962252"
              hash="e7a6192c91"
              hoverLift
              caption={{ left: "01. CAMPAGNE KÉRASTASE", right: "00:18 · 4K" }}
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

      {/* COMPARATIF */}
      <section className={styles.comparatif}>
        <div className={styles.container}>
          <div data-reveal className={styles.comparatifHead}>
            <span className={styles.kickerSm}>★ POURQUOI TENDRIL</span>
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

      {/* PODCAST — 3 épisodes */}
      <section id="podcast" className={styles.podcast}>
        <div className={styles.container}>
          <div data-reveal className={styles.podcastHead}>
            <div>
              <span className={styles.kickerAccent}>★ LE PODCAST</span>
              <h2 className={styles.podcastTitle}>Le bon choix.</h2>
              <p className={styles.podcastSub}>
                Le métier, la méthode et le marché de la 3D de luxe, avec
                Nicolas Anguelov, fondateur de Mang Production &amp; Tendril
                School.
              </p>
            </div>
            <Link href="/ecole#episodes" className={styles.linkOutLight}>
              Voir tous les épisodes →
            </Link>
          </div>

          <div data-stagger className={styles.epGrid}>
            {podcastEpisodes.map((ep) => (
              <article key={ep.num} className={styles.epCard}>
                <div className={styles.epMedia}>
                  <VimeoHeroPlayer
                    videoId={ep.videoId}
                    hash={ep.hash}
                    aspect="9 / 16"
                    playShape="circle"
                    compact
                    bareControls
                    overlay={
                      <span className={styles.epBadge}>ÉP. {ep.num}</span>
                    }
                  />
                </div>
                <div className={styles.epBody}>
                  <h3 className={styles.epTitle}>{ep.title}</h3>
                  <p className={styles.epQuote}>« {ep.quote} »</p>
                  <span className={styles.epGuest}>
                    Avec Nicolas Anguelov, CEO et fondateur de Mang Production
                    &amp; Tendril School
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BOOTCAMPS */}
      <section className={styles.bootcamps}>
        <div className={styles.container}>
          <div data-reveal className={styles.bootcampsHead}>
            <div>
              <span className={styles.kickerSm}>★ LES DEUX BOOTCAMPS</span>
              <h2 className={styles.h2}>Choisissez votre voie.</h2>
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
      </section>

      {/* FINAL CTA */}
      <section className={styles.finalCta}>
        <div data-reveal className={styles.finalGrid}>
          <div>
            <span className={styles.kickerSm}>★ DERNIÈRE ÉTAPE</span>
            <h2 className={styles.finalTitle}>Prêt à rejoindre la promo ?</h2>
            <p className={styles.finalText}>
              Places limitées. Sélection sur entretien. Les candidatures pour
              janvier 2027 sont ouvertes.
            </p>
          </div>
          <div className={styles.finalActions}>
            <Link href="/candidature" className={styles.finalBtn}>
              → Déposer ma candidature
            </Link>
            <div className={styles.finalContact}>
              <a
                href="mailto:contact@tendril.com"
                className={styles.finalEmail}
              >
                CONTACT@TENDRIL.COM
              </a>
              <span className={styles.finalAddress}>
                12 RUE DU FAUBOURG · 75003 PARIS
              </span>
            </div>
          </div>
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
