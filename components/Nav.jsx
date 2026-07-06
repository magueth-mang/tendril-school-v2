import Link from "next/link";
import Image from "next/image";
import styles from "./Nav.module.css";

const LINKS = [
  { key: "programmes", href: "/programmes", label: "Programmes" },
  { key: "ecole", href: "/ecole", label: "L'École" },
  { key: "contact", href: "/contact", label: "Contact" },
];

export default function Nav({ theme = "light", active = null }) {
  const dark = theme === "dark";
  return (
    <nav className={`${styles.nav} ${dark ? styles.dark : ""}`}>
      <Link href="/" className={styles.brand}>
        <span className={styles.badge}>
          <Image src="/tendril-mark.png" alt="Tendril School" width={230} height={216} className={styles.mark} />
        </span>
        <span className={styles.wordmark}>Tendril School</span>
      </Link>
      <div className={styles.links}>
        {LINKS.map((link) => (
          <Link
            key={link.key}
            href={link.href}
            className={`${styles.link} ${active === link.key ? styles.active : ""}`}
          >
            {link.label}
          </Link>
        ))}
        <Link href="/candidature" className={styles.cta}>
          Candidater →
        </Link>
      </div>
    </nav>
  );
}
