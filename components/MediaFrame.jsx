import styles from "./MediaFrame.module.css";

function PlayIcon({ w, h }) {
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <path d={`M2 2 L${w - 2} ${h / 2} L2 ${h - 2} Z`} fill="#0A0A0A" />
    </svg>
  );
}

/**
 * Bordered black media placeholder used throughout the site for the video /
 * render "slots". `caption` renders the FIG./duration bar; `play` renders a
 * centered play button (square or circle).
 */
export default function MediaFrame({
  caption,
  captionVariant = "onBlack",
  aspect,
  play,
  border = "ink",
  hoverLift = false,
  className = "",
}) {
  return (
    <div
      className={`${styles.frame} ${border === "accent" ? styles.borderAccent : ""} ${
        hoverLift ? styles.hoverLift : ""
      } ${className}`}
    >
      {caption && (
        <div
          className={`${styles.caption} ${
            captionVariant === "plain" ? styles.captionPlain : styles.captionOnBlack
          }`}
        >
          <span>{caption.left}</span>
          <span>{caption.right}</span>
        </div>
      )}
      <div className={styles.media} style={aspect ? { aspectRatio: aspect } : undefined}>
        <div className={styles.fill} />
        {play && (
          <div className={`${styles.overlay} ${play.dim ? styles.overlayDim : ""}`}>
            <span
              data-media-play
              className={`${styles.play} ${play.shape === "circle" ? styles.playCircle : ""} ${
                play.shadow ? styles.playShadow : ""
              }`}
              style={{ width: play.size, height: play.size }}
            >
              <PlayIcon w={play.iconW || Math.round(play.size * 0.3)} h={play.iconH || Math.round(play.size * 0.34)} />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
