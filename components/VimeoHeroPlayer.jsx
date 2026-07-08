"use client";

import { useRef, useState, useEffect } from "react";
import Player from "@vimeo/player";
import styles from "./VimeoHeroPlayer.module.css";

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

function IconPlay() {
  return (
    <svg width="13" height="15" viewBox="0 0 13 15" fill="none">
      <path d="M1 1 L12 7.5 L1 14 Z" fill="currentColor" />
    </svg>
  );
}

function IconPause() {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
      <rect x="1" y="1" width="4" height="14" rx="0.5" fill="currentColor" />
      <rect x="9" y="1" width="4" height="14" rx="0.5" fill="currentColor" />
    </svg>
  );
}

function IconReplay() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M8 3V0.5L4.5 3.5L8 6.5V4a4 4 0 1 1-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconFullscreen() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M1 1h4M1 1v4M15 1h-4M15 1v4M1 15h4M1 15v-4M15 15h-4M15 15v-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function VimeoHeroPlayer({
  videoId,
  hash,
  aspect = "16 / 9",
  caption,
  compact = false,
  hoverLift = false,
  playShape = "square",
  overlay,
  bareControls = false,
  cover = false,
  className = "",
}) {
  const iframeRef = useRef(null);
  const playerRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [ended, setEnded] = useState(false);

  // Destroy the player when the component unmounts.
  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy().catch(() => {});
        playerRef.current = null;
      }
    };
  }, []);

  // Attach the SDK once the iframe embed has finished loading. Doing it on
  // `load` (rather than in a mount effect) guarantees the postMessage
  // handshake succeeds even on client-side navigation, where the iframe can
  // resolve from cache before an effect would run.
  function handleIframeLoad() {
    if (playerRef.current || !iframeRef.current) return;
    const player = new Player(iframeRef.current);
    playerRef.current = player;

    player
      .ready()
      .then(() => player.getDuration())
      .then((d) => setDuration(d))
      .catch(() => {});

    player.on("timeupdate", ({ seconds, duration: d }) => {
      setCurrentTime(seconds);
      if (d) setDuration(d);
    });
    player.on("play", () => {
      setPlaying(true);
      setEnded(false);
      setStarted(true);
    });
    player.on("pause", () => setPlaying(false));
    player.on("ended", () => {
      setPlaying(false);
      setEnded(true);
    });
  }

  function play() {
    setEnded(false);
    playerRef.current?.play().catch(() => {});
  }

  function togglePlay() {
    if (playing) playerRef.current?.pause().catch(() => {});
    else play();
  }

  function handleReplay() {
    setEnded(false);
    playerRef.current
      ?.setCurrentTime(0)
      .then(() => playerRef.current?.play())
      .catch(() => {});
  }

  function handleCenter() {
    if (ended) handleReplay();
    else play();
  }

  function handleSeek(e) {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    playerRef.current?.setCurrentTime(val).catch(() => {});
  }

  function handleFullscreen() {
    const el = iframeRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen?.();
  }

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={`${styles.frame} ${hoverLift ? styles.hoverLift : ""} ${className}`}
    >
      {caption && (
        <div className={styles.caption}>
          <span>{caption.left}</span>
          <span>{caption.right}</span>
        </div>
      )}
      <div
        className={`${styles.wrap} ${cover ? styles.coverWrap : ""}`}
        style={{ aspectRatio: aspect }}
      >
        <iframe
          ref={iframeRef}
          src={`https://player.vimeo.com/video/${videoId}?h=${hash}&title=0&byline=0&portrait=0&badge=0&autopause=0&controls=0&dnt=1&player_id=0&app_id=58479`}
          className={styles.iframe}
          onLoad={handleIframeLoad}
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
          allowFullScreen
        />

        {overlay && <div className={styles.decor}>{overlay}</div>}

        {!playing && (
          <div className={styles.playOverlay} onClick={handleCenter}>
            <span
              className={`${styles.playBtn} ${compact ? styles.playBtnSm : ""} ${
                playShape === "circle" ? styles.playBtnCircle : ""
              }`}
            >
              {ended ? (
                <svg width="30" height="30" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 3V0.5L4.5 3.5L8 6.5V4a4 4 0 1 1-4 4"
                    stroke="#0A0A0A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width={compact ? "18" : "28"}
                  height={compact ? "20" : "32"}
                  viewBox="0 0 28 32"
                  fill="none"
                >
                  <path d="M2 2 L26 16 L2 30 Z" fill="#0A0A0A" />
                </svg>
              )}
            </span>
          </div>
        )}

        {started && (
          <div
            className={`${styles.controls} ${compact ? styles.controlsCompact : ""} ${
              bareControls ? styles.controlsBare : ""
            }`}
          >
            <button
              type="button"
              className={styles.ctrlBtn}
              onClick={ended ? handleReplay : togglePlay}
              aria-label={ended ? "Rejouer" : playing ? "Pause" : "Lecture"}
            >
              {ended ? <IconReplay /> : playing ? <IconPause /> : <IconPlay />}
            </button>

            {!compact && <span className={styles.time}>{formatTime(currentTime)}</span>}

            <div className={styles.progressWrap}>
              <div className={styles.progressTrack}>
                <div className={styles.progressFill} style={{ width: `${progress}%` }} />
              </div>
              <input
                type="range"
                min="0"
                max={duration || 100}
                step="0.1"
                value={currentTime}
                onChange={handleSeek}
                className={styles.progressInput}
                aria-label="Progression"
              />
            </div>

            {!compact && <span className={styles.time}>{formatTime(duration)}</span>}

            <button
              type="button"
              className={styles.ctrlBtn}
              onClick={handleFullscreen}
              aria-label="Plein écran"
            >
              <IconFullscreen />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
