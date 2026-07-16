import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer({
  extraLink = null,
  topAccent = false,
  legalColumn = false,
}) {
  return (
    <footer className={`${styles.footer} ${topAccent ? styles.topAccent : ""}`}>
      <div className={styles.top}>
        <div>
          <div className={styles.brand}>
            <span className={styles.badge}>
              <Image
                src="/tendril-mark.png"
                alt=""
                width={230}
                height={216}
                className={styles.mark}
              />
            </span>
            <span className={styles.wordmark}>Tendril School 3D</span>
          </div>
          <p className={styles.tagline}>
            L&rsquo;école de modélisation 3D dédiée à la beauté et au luxe.
            Paris.
          </p>
        </div>
        <div className={styles.columns}>
          <div className={styles.column}>
            <span className={styles.columnLabel}>École</span>
            <Link href="/programmes" className={styles.colLink}>
              Programmes
            </Link>
            {extraLink && (
              <Link href={extraLink.href} className={styles.colLink}>
                {extraLink.label}
              </Link>
            )}
            <Link href="/ecole" className={styles.colLink}>
              L&apos;École
            </Link>
            <Link href="/contact" className={styles.colLink}>
              Contact
            </Link>
          </div>
          {legalColumn ? (
            <div className={styles.column}>
              <span className={styles.columnLabel}>Légal</span>
              <Link href="/legal#mentions" className={styles.colLink}>
                Mentions légales
              </Link>
              <Link href="/legal#cgu" className={styles.colLink}>
                CGU
              </Link>
              <Link href="/legal#confidentialite" className={styles.colLink}>
                Confidentialité
              </Link>
              <Link href="/legal#cookies" className={styles.colLink}>
                Cookies
              </Link>
            </div>
          ) : (
            <div className={styles.column}>
              <span className={styles.columnLabel}>Suivre</span>
              <a href="#" className={styles.colLink}>
                Instagram
              </a>
              <a href="#" className={styles.colLink}>
                Behance
              </a>
              <a href="#" className={styles.colLink}>
                LinkedIn
              </a>
            </div>
          )}
        </div>
      </div>
      <div className={styles.bottom}>
        <span>© 2026 Tendril School 3D. Tous droits réservés.</span>
        {legalColumn ? (
          <span>Paris · Est. 2021</span>
        ) : (
          <span className={styles.bottomLinks}>
            <Link href="/legal#mentions" className={styles.bottomLink}>
              Mentions légales
            </Link>
            <Link href="/legal#cgu" className={styles.bottomLink}>
              CGU
            </Link>
            <Link href="/legal#confidentialite" className={styles.bottomLink}>
              Confidentialité
            </Link>
          </span>
        )}
      </div>
    </footer>
  );
}
