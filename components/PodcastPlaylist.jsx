"use client";

import { usePodcast } from "./PodcastProvider";
import { episodes } from "@/data/ecole";
import styles from "./PodcastPlaylist.module.css";

function IconPlay() {
  return (
    <svg width="13" height="15" viewBox="0 0 13 15" fill="none" aria-hidden="true">
      <path d="M1 1 L12 7.5 L1 14 Z" fill="currentColor" />
    </svg>
  );
}

/**
 * Audio-only podcast playlist (Spotify-style). No video embeds here — clicking
 * a row calls the global podcast context, which plays the episode's audio
 * through the fixed bottom bar and keeps it running across navigation.
 */
export default function PodcastPlaylist() {
  const { index, play } = usePodcast();

  return (
    <section id="podcast" className={styles.wrap}>
      <div className={styles.inner}>
        <div data-reveal className={styles.header}>
          <div className={styles.cover} aria-hidden="true">
            <div className={styles.coverTop}>
              <span>TENDRIL · FM</span>
              <span>S01</span>
            </div>
            <span className={styles.coverMark}>TS</span>
            <span className={styles.coverWave}>
              <i />
              <i />
              <i />
              <i />
              <i />
            </span>
          </div>
          <div className={styles.headMeta}>
            <span className={styles.kicker}>★ PODCAST ORIGINAL · AUDIO</span>
            <h2 className={styles.title}>Le bon choix.</h2>
            <p className={styles.sub}>
              12 épisodes avec <strong>Nicolas Anguelov</strong>, fondateur de
              Mang Production &amp; Tendril School. Le métier, la méthode et le
              marché de la 3D de luxe, sans filtre.
            </p>
            <div className={styles.headActions}>
              <button
                type="button"
                className={styles.playAll}
                onClick={() => play(0)}
              >
                ▶ Tout écouter
              </button>
              <span className={styles.headHint}>
                La lecture continue pendant votre navigation.
              </span>
            </div>
          </div>
        </div>

        <ol data-stagger className={styles.list}>
          {episodes.map((ep, i) => {
            const active = index === i;
            return (
              <li
                key={ep.num}
                className={`${styles.row} ${active ? styles.rowActive : ""}`}
              >
                <button
                  type="button"
                  className={styles.rowBtn}
                  onClick={() => play(i)}
                  aria-label={`Écouter l'épisode ${ep.num} : ${ep.title}`}
                >
                  <span className={styles.numCell}>
                    <span className={styles.numText}>{ep.num}</span>
                    <span className={styles.numPlay}>
                      <IconPlay />
                    </span>
                    <span className={styles.numEq}>
                      <i />
                      <i />
                      <i />
                    </span>
                  </span>
                  <span className={styles.rowMain}>
                    <span className={styles.rowTitle}>{ep.title}</span>
                    <span className={styles.rowQuote}>« {ep.quote} »</span>
                  </span>
                  <span className={styles.rowGuest}>Nicolas Anguelov</span>
                  <span className={styles.rowStatus}>
                    {active ? "En lecture" : "Écouter"}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
