"use client";

import { useRef } from "react";
import Link from "next/link";
import Ticker from "./Ticker";
import Nav from "./Nav";
import Footer from "./Footer";
import VimeoHeroPlayer from "./VimeoHeroPlayer";
import { useScrollFx } from "@/lib/useScrollFx";
import { ticker, stats, featured, episodes } from "@/data/ecole";
import styles from "./EcoleView.module.css";

const PLACEHOLDER_VIDEO = { videoId: "1181961439", hash: "fd5a3feded" };

export default function EcoleView() {
  const rootRef = useRef(null);
  useScrollFx(rootRef);

  return (
    <div ref={rootRef} className={styles.page}>
      <Ticker items={ticker} theme="dark" />
      <Nav theme="light" active="ecole" />

      <header className={styles.hero}>
        <div className={styles.container}>
          <div data-hero className={styles.kickerRow}>
            <span className={styles.kicker}>(00) — L&apos;ÉCOLE</span>
            <span className={styles.kickerRight}>PARIS · EST. 2021</span>
          </div>
          <h1 data-hero className={styles.title}>
            Former
            <br />
            l&apos;œil du <mark className={styles.highlight}>luxe.</mark>
          </h1>
          <div data-hero className={styles.introRow}>
            <p className={styles.intro}>
              Tendril School est l&apos;école de modélisation 3D dédiée à la beauté et au luxe. On
              y forme des artistes capables de fabriquer l&apos;image des plus grandes maisons — du
              flacon de parfum au packshot de campagne.
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
            <h2 className={styles.h2Small}>Une école née dans l&apos;atelier.</h2>
          </div>
          <div data-reveal>
            <p className={styles.paragraphLead}>
              Fondée à Paris en 2021 par des artistes en exercice, Tendril School est née
              d&apos;un constat simple&nbsp;: le CGI de luxe ne s&apos;apprend pas dans un manuel,
              mais en regardant la lumière tomber sur un flacon, encore et encore, jusqu&apos;à ce
              que ce soit juste.
            </p>
            <p className={styles.paragraph}>
              Nos bootcamps sont courts, intenses et exigeants. On y travaille comme en studio :
              un brief, les mains dans la matière, une critique collective chaque soir. Pas de
              cours magistral — du métier, transmis par celles et ceux qui le pratiquent pour les
              plus grandes maisons.
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
                videoId={PLACEHOLDER_VIDEO.videoId}
                hash={PLACEHOLDER_VIDEO.hash}
                aspect="1 / 1"
                playShape="circle"
                bareControls
                cover
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
                <a href="#" className={styles.playBtn}>
                  ▶ Écouter maintenant
                </a>
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
              <span className={styles.kickerSm}>(02) — TOUS LES ÉPISODES</span>
              <h2 className={styles.h2}>La série.</h2>
            </div>
            <span className={styles.seasonLabel}>SAISON 01 · 08 ÉPISODES</span>
          </div>
        </div>
        <div data-stagger>
          {episodes.map((ep) => (
            <div key={ep.num} className={styles.epBand}>
              <div className={styles.epBandInner}>
                <VimeoHeroPlayer
                  videoId={PLACEHOLDER_VIDEO.videoId}
                  hash={PLACEHOLDER_VIDEO.hash}
                  aspect="16 / 9"
                  playShape="circle"
                  compact
                  bareControls
                  className={styles.epMediaFrame}
                  overlay={
                    <>
                      <span className={styles.epBadge}>ÉP. {ep.num}</span>
                      <span className={styles.epDuration}>{ep.dur}</span>
                    </>
                  }
                />
                <div className={styles.epText}>
                  <span className={styles.epTag}>{ep.tag}</span>
                  <div className={styles.epNumRow}>
                    <span className={styles.epBigNum}>{ep.num}</span>
                  </div>
                  <h3 className={styles.epTitle}>{ep.title}</h3>
                  <p className={styles.epDesc}>{ep.desc}</p>
                  <div className={styles.epFooter}>
                    <span className={styles.epListen}>→ Écouter</span>
                    <span className={styles.epGuest}>AVEC {ep.guest}</span>
                    <span className={styles.epDate}>{ep.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className={styles.episodesClose}>
            <span>{"// SAISON 02 EN PRÉPARATION — RESTEZ À L'ÉCOUTE"}</span>
          </div>
        </div>
      </section>

      <section className={styles.micSection}>
        <div className={styles.micGrid}>
          <div data-reveal>
            <span className={styles.kickerSm}>(03) — DERRIÈRE LE MICRO</span>
            <h2 className={styles.h2Small}>Animé par l&apos;équipe pédagogique.</h2>
            <p className={styles.paragraphLead}>
              Pas d&apos;interview promo : des conversations de praticiens. Les mentors de Tendril
              reçoivent celles et ceux qui font réellement l&apos;image du luxe aujourd&apos;hui.
            </p>
            <p className={styles.paragraph}>
              Un format pensé pour les étudiants comme pour les curieux : on y parle technique,
              direction artistique, parcours et réalité du marché.
            </p>
          </div>
          <div data-reveal>
            <VimeoHeroPlayer
              videoId={PLACEHOLDER_VIDEO.videoId}
              hash={PLACEHOLDER_VIDEO.hash}
              aspect="16 / 10"
              playShape="circle"
              caption={{ left: "STUDIO — 12 RUE DU FAUBOURG", right: "ON AIR" }}
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
            <a href="#" className={`${styles.platformBtn} ${styles.platformBtnDark}`}>
              ▶ Spotify
            </a>
            <a href="#" className={styles.platformBtn}>
              ▶ Apple Podcasts
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
