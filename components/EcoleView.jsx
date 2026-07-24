"use client";

import { useRef } from "react";
import Link from "next/link";
import Ticker from "./Ticker";
import Nav from "./Nav";
import Footer from "./Footer";
import VimeoHeroPlayer from "./VimeoHeroPlayer";
import { usePodcast } from "./PodcastProvider";
import { useScrollFx } from "@/lib/useScrollFx";
import { ticker, stats, featured, episodes } from "@/data/ecole";
import styles from "./EcoleView.module.css";

const PLACEHOLDER_VIDEO = { videoId: "1181961439", hash: "fd5a3feded" };

export default function EcoleView() {
  const rootRef = useRef(null);
  useScrollFx(rootRef);
  const { play, index: playingIndex } = usePodcast();

  return (
    <div ref={rootRef} className={styles.page}>
      <Ticker items={ticker} theme="dark" />
      <Nav theme="light" active="ecole" />

      <header className={styles.hero}>
        <div className={styles.container}>
          <div data-hero className={styles.kickerRow}>
            <span className={styles.kicker}>(00) — L&apos;ÉCOLE</span>
            <span className={styles.kickerRight}>PARIS · EST. 2026</span>
          </div>
          <h1 data-hero className={styles.title}>
            Les futurs 3D designers{" "}
            <mark className={styles.highlight}>du luxe</mark> commencent ici.
          </h1>
          <div data-hero className={styles.introRow}>
            <p className={styles.intro}>
              Tendril School est l&apos;école de modélisation 3D dédiée à la
              beauté et au luxe. Formez-vous en 12 semaines auprès des artistes
              3D de Mang Production et devenez capable de créer les images des
              plus grandes maisons, du flacon de parfum au packshot de campagne.
            </p>
            <div className={styles.ctaCol}>
              <Link href="/programmes" className={styles.ctaPrimary}>
                → Découvrir les programmes
              </Link>
              <Link href="/contact" className={styles.ctaSecondary}>
                Nous écrire
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className={styles.intro2}>
        <div className={styles.intro2Grid}>
          <div data-reveal>
            <span className={styles.kickerSm}>(01) — QUI SOMMES-NOUS</span>
            <h2 className={styles.h2Small}>
              Une école née chez Mang Production.
            </h2>
          </div>
          <div data-reveal>
            <p className={styles.paragraphPunch}>
              Le marché de la 3D a évolué.
              <br />
              Les écoles, beaucoup moins.
            </p>
            <p className={styles.paragraphLead}>
              Fondée en 2026 par Nicolas Anguelov, Fondateur de Mang Production,
              Tendril School est née d&apos;un constat simple.
            </p>
            <p className={styles.paragraphLead}>
              Avec Mang Production, nous avons créé un programme entièrement
              dédié aux secteurs qui utilisent réellement la 3D au
              quotidien&nbsp;: le luxe, la cosmétique, la beauté, la mode et
              le hardware.
            </p>
            <p className={styles.paragraph}>
              <strong className={styles.paragraphStrong}>
                Notre objectif est simple&nbsp;:
              </strong>{" "}
              former des artistes 3D prêts à intégrer les agences créatives
              et les plus grandes marques dès la fin de leur formation.
            </p>
            <div className={styles.statsRow}>
              {stats.map((s) => (
                <div key={s.label} className={styles.statCell}>
                  <div className={styles.statLabel}>{s.label}</div>
                  <div className={styles.statValue}>{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.featuredSection}>
        <div className={styles.container}>
          <span data-reveal className={styles.featuredKicker}>
            ★ DERNIER ÉPISODE
          </span>
          <div data-reveal className={styles.featuredCard}>
            <div className={styles.featuredMedia}>
              <VimeoHeroPlayer
                videoId="1209820898"
                hash="105c111140"
                aspect="9 / 16"
                playShape="circle"
                bareControls
              />
            </div>
            <div className={styles.featuredBody}>
              <div className={styles.featuredMeta}>
                <span>{featured.epLabel}</span>
                <span>{featured.duration}</span>
              </div>
              <h2 className={styles.featuredTitle}>{featured.title}</h2>
              <p className={styles.featuredDesc}>{featured.desc}</p>
              <div className={styles.featuredFooter}>
                <button
                  type="button"
                  className={styles.playBtn}
                  onClick={() => play(episodes.length - 1)}
                >
                  ▶ Écouter maintenant
                </button>
                <span className={styles.featuredGuest}>{featured.guest}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="episodes" className={styles.episodesSection}>
        <div className={styles.container}>
          <div data-reveal className={styles.episodesHead}>
            <div>
              <span className={styles.kickerSm}>(02) — LE PODCAST</span>
              <h2 className={styles.h2}>La série.</h2>
            </div>
            <span className={styles.seasonLabel}>SAISON 01 · 12 ÉPISODES</span>
          </div>

          <div data-stagger className={styles.epGrid}>
            {episodes.map((ep, i) => (
              <article key={ep.num} className={styles.epCard}>
                <div className={styles.epCardMedia}>
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
                <div className={styles.epCardBody}>
                  <h3 className={styles.epCardTitle}>
                    <span className={styles.epCardTitleMark}>{ep.title}</span>
                  </h3>
                  <p className={styles.epCardQuote}>« {ep.quote} »</p>
                  <div className={styles.epCardFoot}>
                    <button
                      type="button"
                      className={`${styles.epCardListen} ${
                        playingIndex === i ? styles.epCardListenActive : ""
                      }`}
                      onClick={() => play(i)}
                    >
                      {playingIndex === i ? "▶ En lecture" : "→ Écouter"}
                    </button>
                    <span className={styles.epCardGuest}>
                      {ep.guest}, Fondateur de Tendril School
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.episodesClose}>
          <span>{"// SAISON 02 EN PRÉPARATION — RESTEZ À L'ÉCOUTE"}</span>
        </div>
      </section>

      <section className={styles.micSection}>
        <div className={styles.micGrid}>
          <div data-reveal>
            <span className={styles.kickerSm}>(03) — DERRIÈRE LE MICRO</span>
            <h2 className={styles.h2Small}>
              Animé par l&apos;équipe pédagogique.
            </h2>
            <p className={styles.paragraphLead}>
              Pas d&apos;interview promo : des conversations de praticiens. Les
              mentors de Tendril reçoivent celles et ceux qui font réellement
              l&apos;image du luxe aujourd&apos;hui.
            </p>
            <p className={styles.paragraph}>
              Un format pensé pour les étudiants comme pour les curieux : on y
              parle technique, direction artistique, parcours et réalité du
              marché.
            </p>
          </div>
          <div data-reveal>
            <VimeoHeroPlayer
              videoId={PLACEHOLDER_VIDEO.videoId}
              hash={PLACEHOLDER_VIDEO.hash}
              aspect="16 / 10"
              playShape="circle"
              cover
              caption={{ left: "STUDIO — 25 RUE DE PONTHIEU", right: "ON AIR" }}
              className={styles.micFrame}
            />
          </div>
        </div>
      </section>

      <section className={styles.subscribeSection}>
        <div data-reveal className={styles.subscribeGrid}>
          <div>
            <span className={styles.kickerSm}>(04) — S&apos;ABONNER</span>
            <h2 className={styles.h2Wide}>Ne ratez aucun épisode.</h2>
          </div>
          <div className={styles.platformCol}>
            <a
              href="#"
              className={`${styles.platformBtn} ${styles.platformBtnDark}`}
            >
              ▶ Spotify
            </a>
            <a href="#" className={styles.platformBtn}>
              ▶ Instagram
            </a>
            <a href="#" className={styles.platformBtn}>
              ▶ YouTube
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
