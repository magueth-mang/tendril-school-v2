"use client";

import { useRef } from "react";
import Link from "next/link";
import Ticker from "./Ticker";
import Nav from "./Nav";
import Footer from "./Footer";
import MediaFrame from "./MediaFrame";
import { useScrollFx } from "@/lib/useScrollFx";
import styles from "./BootcampTemplate.module.css";

export default function BootcampTemplate({ data }) {
  const rootRef = useRef(null);
  useScrollFx(rootRef);
  const dark = data.theme === "dark";

  return (
    <div ref={rootRef} className={`${styles.page} ${dark ? styles.dark : ""}`}>
      <Ticker items={data.ticker} theme={dark ? "light" : "dark"} />
      <Nav theme={data.theme} active="programmes" />

      <header className={styles.hero}>
        <div className={styles.container}>
          <div data-hero className={styles.breadcrumb}>
            <Link href="/programmes" className={styles.breadcrumbLink}>
              PROGRAMMES
            </Link>
            <span className={styles.breadcrumbSep}>/</span>
            <span className={styles.breadcrumbCurrent}>{data.breadcrumbLabel}</span>
          </div>
          <div data-hero className={styles.kickerRow}>
            <span className={styles.kicker}>{data.kicker}</span>
            <span className={styles.kickerRight}>{data.kickerRight}</span>
          </div>
          <h1 data-hero className={styles.title}>
            {data.titleLine1}
            <br />
            {data.titlePrefix}
            <mark className={styles.highlight}>{data.titleHighlight}</mark>
          </h1>
          <div data-hero className={styles.introRow}>
            <p className={styles.intro}>
              <strong className={styles.introStrong}>{data.introStrong}</strong>
              {data.introRest}
            </p>
            <div className={styles.ctaCol}>
              <Link href={data.ctaPrimary.href} className={styles.ctaPrimary}>
                {data.ctaPrimary.label}
              </Link>
              <Link href={data.ctaSecondary.href} className={styles.ctaSecondary}>
                {data.ctaSecondary.label}
              </Link>
            </div>
          </div>
        </div>
        <div data-hero className={styles.heroMedia}>
          <div className={styles.heroCaption}>
            <span>{data.heroCaption.left}</span>
            <span>{data.heroCaption.right}</span>
          </div>
          <div className={styles.heroFill} />
        </div>
      </header>

      <section className={styles.facts}>
        <div data-stagger className={styles.factsGrid}>
          {data.facts.map((f) => (
            <div key={f.label} className={`${styles.factCell} ${f.highlight ? styles.factHighlight : ""}`}>
              <div className={styles.factLabel}>{f.label}</div>
              <div className={styles.factValue}>{f.value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.pourQui}>
        <div data-reveal className={styles.pourQuiGrid}>
          <div>
            <span className={styles.kickerSm}>(01) — {dark ? "ADMISSION" : "POUR QUI ?"}</span>
            <h2 className={styles.h2Small}>{data.pourQui.title}</h2>
          </div>
          <div>
            <p className={styles.introText}>{data.pourQui.intro}</p>
            <ul className={styles.numberedList}>
              {data.pourQui.list.map((item, i) => (
                <li key={item}>
                  <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.modules}>
        <div className={styles.container}>
          <div data-reveal className={styles.sectionHead}>
            <span className={styles.kickerSm}>(02) — LES MODULES</span>
            <h2 className={styles.h2}>{data.modulesTitle}</h2>
          </div>
          <div data-stagger className={styles.moduleGrid}>
            {data.modules.map((m) => (
              <div key={m.num} className={styles.moduleCard}>
                <div className={styles.moduleHead}>
                  <span className={styles.moduleNum}>{m.num}</span>
                  <h3 className={styles.moduleTitle}>{m.title}</h3>
                </div>
                <div className={styles.tagRow}>
                  {m.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.weeksSection}>
        <div className={styles.container}>
          <div data-reveal className={styles.sectionHeadTop}>
            <span className={styles.kickerSm}>(03) — LE PROGRAMME</span>
            <h2 className={styles.h2}>Semaine par semaine.</h2>
          </div>
        </div>
        <div data-stagger>
          {data.weeks.map((w) => (
            <div key={w.weeks} className={styles.weekRow}>
              <div className={styles.weekInner}>
                <span className={styles.weekLabel}>{w.weeks}</span>
                <h3 className={styles.weekTitle}>{w.title}</h3>
                <p className={styles.weekDesc}>{w.desc}</p>
              </div>
            </div>
          ))}
          <div className={styles.weeksClose} />
        </div>
      </section>

      <section className={styles.tools}>
        <div className={styles.container}>
          <div data-reveal className={styles.toolsHead}>
            <div>
              <span className={styles.kickerSm}>(04) — OUTILS</span>
              <h2 className={styles.h2Small}>{dark ? "Pipeline studio." : "Les logiciels du métier."}</h2>
            </div>
            <p className={styles.toolsIntro}>{data.toolsIntro}</p>
          </div>
          <div data-stagger className={styles.toolsGrid}>
            {data.tools.map((t) => (
              <div key={t.name} className={styles.toolCell}>
                <div className={styles.toolName}>{t.name}</div>
                <div className={styles.toolUse}>{t.use}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.resultat}>
        <div
          data-reveal
          className={`${styles.resultatGrid} ${data.resultatMediaFirst ? styles.mediaFirst : ""}`}
        >
          <div className={styles.resultatMedia}>
            <MediaFrame
              caption={data.resultatCaption}
              aspect="16 / 11"
              border={dark ? "accent" : "ink"}
            />
          </div>
          <div className={styles.resultatText}>
            <span className={styles.kickerSm}>(05) — À LA FIN DU BOOTCAMP</span>
            <h2 className={styles.h2Small}>{data.resultatTitle}</h2>
            <ul className={styles.checklist}>
              {data.checklist.map((item) => (
                <li key={item}>
                  <span className={styles.check}>✔</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.tarif}>
        <div data-reveal className={styles.tarifGrid}>
          <div className={styles.tarifCell}>
            <span className={styles.tarifLabel}>{data.tarif.label}</span>
            <div className={styles.tarifPrice}>{data.tarif.price}</div>
            <p className={styles.tarifDesc}>{data.tarif.desc}</p>
          </div>
          <div className={styles.financementCell}>
            <span className={styles.mutedLabel}>FINANCEMENT</span>
            <ul className={styles.financementList}>
              {data.tarif.financement.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.ctaBand}>
        <div data-reveal className={styles.ctaInner}>
          <div>
            <span className={styles.kickerSm}>(06) — CANDIDATURE</span>
            <h2 className={styles.ctaTitle}>{data.cta.title}</h2>
          </div>
          <Link href="/candidature" className={styles.ctaButton}>
            {data.cta.label}
          </Link>
        </div>
      </section>

      <Footer extraLink={data.footerExtraLink} topAccent={data.footerTopAccent} />
    </div>
  );
}
