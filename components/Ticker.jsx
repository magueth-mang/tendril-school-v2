import { Fragment } from "react";
import styles from "./Ticker.module.css";

function Row({ items, hidden }) {
  const seq = [...items, ...items];
  return (
    <div className={styles.row} aria-hidden={hidden ? "true" : undefined}>
      {seq.map((t, i) => (
        <Fragment key={i}>
          <span>{t}</span>
          <span>★</span>
        </Fragment>
      ))}
    </div>
  );
}

export default function Ticker({ items, theme = "dark" }) {
  return (
    <div className={`${styles.ticker} ${theme === "light" ? styles.light : ""}`}>
      <div className={styles.track}>
        <Row items={items} />
        <Row items={items} hidden />
      </div>
    </div>
  );
}
