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

function IconVolume() {
  return (
    <svg width="17" height="15" viewBox="0 0 18 16" fill="none">
      <path d="M1 5.5H4L8 2V14L4 10.5H1Z" fill="currentColor" />
      <path d="M11 5.2Q12.8 8 11 10.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M13.4 3.2Q16.6 8 13.4 12.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function IconMute() {
  return (
    <svg width="17" height="15" viewBox="0 0 18 16" fill="none">
      <path d="M1 5.5H4L8 2V14L4 10.5H1Z" fill="currentColor" />
      <path d="M11.5 5.5L16.5 10.5M16.5 5.5L11.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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
  background = false,
  fill = false,
  className = "",
}) {
  const iframeRef = useRef(null);
  const playerRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [ended, setEnded] = useState(false);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);

  const wantPlayRef = useRef(false);
  const volumeRef = useRef(1);
  const mutedRef = useRef(false);

  // Create the player on mount so `playerRef` is available immediately. The
  // SDK queues method calls (play/pause/seek) until the embed is ready, so no
  // click is ever lost — and `ready()` handles the handshake regardless of the
  // iframe's load state (fresh load or client-side navigation from cache).
  useEffect(() => {
    // Background mode is a silent autoplay loop — no SDK / controls needed.
    if (background) return undefined;
    const iframe = iframeRef.current;
    if (!iframe) return undefined;

    const player = new Player(iframe);
    playerRef.current = player;

    player
      .ready()
      .then(() => {
        player.getDuration().then((d) => setDuration(d)).catch(() => {});
        player.setVolume(volumeRef.current).catch(() => {});
        player.setMuted(mutedRef.current).catch(() => {});
        if (wantPlayRef.current) {
          wantPlayRef.current = false;
          player.play().catch(() => {});
        }
      })
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

    return () => {
      playerRef.current = null;
      player.destroy().catch(() => {});
    };
  }, [background]);

  function play() {
    setEnded(false);
    const p = playerRef.current;
    if (p) p.play().catch(() => {});
    else wantPlayRef.current = true;
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
    const nextMuted = !muted;
    let nextVolume = volume;
    if (!nextMuted && volume === 0) nextVolume = 1;
    setMuted(nextMuted);
    setVolume(nextVolume);
    mutedRef.current = nextMuted;
    volumeRef.current = nextVolume;
    const p = playerRef.current;
    if (p) {
      p.setMuted(nextMuted).catch(() => {});
      if (nextVolume !== volume) p.setVolume(nextVolume).catch(() => {});
    }
  }

  const progress = duration ? (currentTime / duration) * 100 : 0;
  const volLevel = muted ? 0 : volume;

  return (
    <div
      className={`${styles.frame} ${hoverLift ? styles.hoverLift : ""} ${
        fill ? styles.fillFrame : ""
      } ${className}`}
    >
      {caption && (
        <div className={styles.caption}>
          <span>{caption.left}</span>
          <span>{caption.right}</span>
        </div>
      )}
      <div
        className={`${styles.wrap} ${cover ? styles.coverWrap : ""} ${
          fill ? styles.fillWrap : ""
        }`}
        style={fill ? undefined : { aspectRatio: aspect }}
      >
        <iframe
          ref={iframeRef}
          src={
            background
              ? `https://player.vimeo.com/video/${videoId}?h=${hash}&background=1&autoplay=1&loop=1&muted=1&dnt=1`
              : `https://player.vimeo.com/video/${videoId}?h=${hash}&title=0&byline=0&portrait=0&badge=0&autopause=0&controls=0&dnt=1&player_id=0&app_id=58479`
          }
          className={styles.iframe}
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
          allowFullScreen
        />

        {!background && overlay && <div className={styles.decor}>{overlay}</div>}

        {!background && !playing && (
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

        {!background && started && (
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

            <div className={styles.volGroup}>
              <button
                type="button"
                className={styles.ctrlBtn}
                onClick={toggleMute}
                aria-label={volLevel === 0 ? "Activer le son" : "Couper le son"}
              >
                {volLevel === 0 ? <IconMute /> : <IconVolume />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volLevel}
                onChange={handleVolume}
                className={styles.volInput}
                style={{ "--vpct": `${volLevel * 100}%` }}
                aria-label="Volume"
              />
            </div>

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
