"use client";

import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";
import styles from "./PodcastBar.module.css";

function formatTime(s) {
  if (!s || Number.isNaN(s)) return "00:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

const IconPlay = () => (
  <svg width="16" height="18" viewBox="0 0 16 18" fill="none" aria-hidden="true">
    <path d="M2 1.5 L14 9 L2 16.5 Z" fill="currentColor" />
  </svg>
);
const IconPause = () => (
  <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden="true">
    <rect x="1" y="1" width="4" height="14" fill="currentColor" />
    <rect x="9" y="1" width="4" height="14" fill="currentColor" />
  </svg>
);
const IconPrev = () => (
  <svg width="18" height="16" viewBox="0 0 18 16" fill="none" aria-hidden="true">
    <path d="M2 1 V15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M16 1.5 L5 8 L16 14.5 Z" fill="currentColor" />
  </svg>
);
const IconNext = () => (
  <svg width="18" height="16" viewBox="0 0 18 16" fill="none" aria-hidden="true">
    <path d="M16 1 V15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M2 1.5 L13 8 L2 14.5 Z" fill="currentColor" />
  </svg>
);
const IconVolume = () => (
  <svg width="18" height="16" viewBox="0 0 18 16" fill="none" aria-hidden="true">
    <path d="M1 5.5 H4 L8 2 V14 L4 10.5 H1 Z" fill="currentColor" />
    <path d="M11 5 Q13 8 11 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
    <path d="M13.5 3 Q17 8 13.5 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
  </svg>
);
const IconMute = () => (
  <svg width="18" height="16" viewBox="0 0 18 16" fill="none" aria-hidden="true">
    <path d="M1 5.5 H4 L8 2 V14 L4 10.5 H1 Z" fill="currentColor" />
    <path d="M11.5 5.5 L16.5 10.5 M16.5 5.5 L11.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const IconClose = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M1 1 L13 13 M13 1 L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/**
 * Fixed bottom "audio only" podcast bar. It drives a visually-hidden Vimeo
 * player (audio kept, video off-screen) so the same Vimeo embeds can be played
 * as a podcast. `index` is the episode being played (null = closed); the parent
 * owns it so the per-card "Écouter" buttons and next/prev stay in sync.
 */
export default function PodcastBar({
  episodes,
  index,
  hidden = false,
  onIndexChange,
  onClose,
}) {
  const iframeRef = useRef(null);
  const playerRef = useRef(null);
  const volumeRef = useRef(1);
  const volRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [volOpen, setVolOpen] = useState(false);
  const mutedRef = useRef(false);

  const active = index != null ? episodes[index] : null;
  const isFirst = index === 0;
  const isLast = index === episodes.length - 1;

  // (Re)create the player whenever the episode changes. The iframe is keyed by
  // index so React gives us a fresh element; the closures below capture the
  // current index, so "ended" auto-advances to the right next episode.
  useEffect(() => {
    if (index == null) return undefined;
    const iframe = iframeRef.current;
    if (!iframe) return undefined;

    const player = new Player(iframe);
    playerRef.current = player;
    setCurrent(0);
    setDuration(0);
    setPlaying(false);

    player
      .ready()
      .then(() => {
        player.setMuted(mutedRef.current).catch(() => {});
        player.setVolume(volumeRef.current).catch(() => {});
        player.getDuration().then(setDuration).catch(() => {});
        player.play().catch(() => {});
      })
      .catch(() => {});

    // Keep the mute icon in sync with reality — mobile browsers often force
    // muted autoplay, so the player's true state can differ from ours.
    const syncMuted = () => {
      player.getMuted().then((m) => { mutedRef.current = m; setMuted(m); }).catch(() => {});
    };

    player.on("timeupdate", ({ seconds, duration: d }) => {
      setCurrent(seconds);
      if (d) setDuration(d);
    });
    player.on("play", () => {
      setPlaying(true);
      syncMuted();
    });
    player.on("volumechange", syncMuted);
    player.on("pause", () => setPlaying(false));
    player.on("ended", () => {
      if (index < episodes.length - 1) onIndexChange(index + 1);
      else setPlaying(false);
    });

    return () => {
      playerRef.current = null;
      player.destroy().catch(() => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  function toggle() {
    const p = playerRef.current;
    if (!p) return;
    if (playing) p.pause().catch(() => {});
    else p.play().catch(() => {});
  }

  function handleSeek(e) {
    const v = parseFloat(e.target.value);
    setCurrent(v);
    playerRef.current?.setCurrentTime(v).catch(() => {});
  }

  function handleVolume(e) {
    const v = parseFloat(e.target.value);
    const m = v === 0;
    setVolume(v);
    setMuted(m);
    volumeRef.current = v;
    mutedRef.current = m;
    const p = playerRef.current;
    if (p) {
      p.setVolume(v).catch(() => {});
      p.setMuted(m).catch(() => {});
    }
  }

  function toggleMute() {
    const p = playerRef.current;
    const next = !muted;
    let nextVol = volume;
    if (!next && volume === 0) nextVol = 1;
    setMuted(next);
    setVolume(nextVol);
    mutedRef.current = next;
    volumeRef.current = nextVol;
    if (p) {
      p.setMuted(next).catch(() => {});
      if (nextVol !== volume) p.setVolume(nextVol).catch(() => {});
    }
  }

  // On mobile the inline slider is hidden, so tapping the icon opens a slider
  // popover (Spotify/SoundCloud style); on wider screens it just toggles mute.
  function handleVolumeButton() {
    const isMobile =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 760px)").matches;
    if (isMobile) setVolOpen((o) => !o);
    else toggleMute();
  }

  // Close the volume popover when tapping elsewhere.
  useEffect(() => {
    if (!volOpen) return undefined;
    const onDown = (e) => {
      if (volRef.current && !volRef.current.contains(e.target)) {
        setVolOpen(false);
      }
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [volOpen]);

  if (index == null || !active) return null;

  const pct = duration ? (current / duration) * 100 : 0;
  const volLevel = muted ? 0 : volume;
  const volPct = volLevel * 100;

  return (
    <>
      {/* Off-screen audio — stays mounted regardless of `hidden`, so playback
          survives page navigation (and the candidature hide). */}
      <div className={styles.media} aria-hidden="true">
        <iframe
          key={index}
          ref={iframeRef}
          title="Lecteur audio du podcast"
          src={`https://player.vimeo.com/video/${active.videoId}?h=${active.hash}&title=0&byline=0&portrait=0&badge=0&autopause=0&controls=0&dnt=1&autoplay=1`}
          allow="autoplay; encrypted-media"
        />
      </div>

      {!hidden && (
        <div className={styles.bar} role="region" aria-label="Lecteur podcast">
          <div className={styles.info}>
            <span className={styles.cover}>{active.num}</span>
            <div className={styles.titles}>
              <span className={styles.title}>{active.title}</span>
              <span className={styles.host}>
                ÉP. {active.num} · Nicolas Anguelov
              </span>
            </div>
          </div>

          <div className={styles.center}>
            <div className={styles.transport}>
              <button
                type="button"
                className={styles.tBtn}
                onClick={() => !isFirst && onIndexChange(index - 1)}
                disabled={isFirst}
                aria-label="Épisode précédent"
              >
                <IconPrev />
              </button>
              <button
                type="button"
                className={styles.playBtn}
                onClick={toggle}
                aria-label={playing ? "Pause" : "Lecture"}
              >
                {playing ? (
                  <IconPause />
                ) : (
                  <span className={styles.playGlyph}>
                    <IconPlay />
                  </span>
                )}
              </button>
              <button
                type="button"
                className={styles.tBtn}
                onClick={() => !isLast && onIndexChange(index + 1)}
                disabled={isLast}
                aria-label="Épisode suivant"
              >
                <IconNext />
              </button>
            </div>
            <div className={styles.progressRow}>
              <span className={styles.time}>{formatTime(current)}</span>
              <input
                type="range"
                min="0"
                max={duration || 100}
                step="0.1"
                value={current}
                onChange={handleSeek}
                className={styles.range}
                style={{ "--pct": `${pct}%` }}
                aria-label="Progression"
              />
              <span className={styles.time}>{formatTime(duration)}</span>
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.volume} ref={volRef}>
              <button
                type="button"
                className={styles.volBtn}
                onClick={handleVolumeButton}
                aria-label={
                  volLevel === 0 ? "Activer le son" : "Régler le volume"
                }
              >
                {volLevel === 0 ? <IconMute /> : <IconVolume />}
              </button>
              {volOpen && (
                <div className={styles.volPopover}>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volLevel}
                    onChange={handleVolume}
                    className={styles.volPopRange}
                    style={{ "--pct": `${volPct}%` }}
                    aria-label="Volume"
                  />
                </div>
              )}
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volLevel}
                onChange={handleVolume}
                className={`${styles.range} ${styles.volRange}`}
                style={{ "--pct": `${volPct}%` }}
                aria-label="Volume"
              />
            </div>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Fermer le lecteur"
            >
              <IconClose />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
