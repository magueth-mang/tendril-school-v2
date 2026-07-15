"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import Ticker from "./Ticker";
import Nav from "./Nav";
import Footer from "./Footer";
import styles from "./LegalView.module.css";

const TICKER = [
  "INFORMATIONS LÉGALES",
  "TENDRIL SCHOOL · PARIS",
  "DERNIÈRE MISE À JOUR — JANV. 2026",
  "RGPD",
];

const DOCS = [
  { key: "mentions", label: "Mentions légales", title: "Mentions légales" },
  { key: "cgu", label: "Conditions d'utilisation", title: "Conditions d'utilisation" },
  { key: "confidentialite", label: "Confidentialité", title: "Politique de confidentialité" },
  { key: "cookies", label: "Cookies", title: "Gestion des cookies" },
];

export default function LegalView() {
  const rootRef = useRef(null);
  const contentRef = useRef(null);
  const [active, setActive] = useState("mentions");

  useEffect(() => {
    const applyHash = () => {
      const h = (window.location.hash || "").replace("#", "");
      if (DOCS.some((d) => d.key === h)) setActive(h);
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (root) {
      gsap.from(root.querySelectorAll("[data-head]"), {
        opacity: 0,
        y: 22,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
      });
    }
  }, []);

  function select(key) {
    if (key === active) return;
    setActive(key);
    window.history.replaceState(null, "", `#${key}`);
    const el = contentRef.current ? contentRef.current.querySelector(`[data-doc="${key}"]`) : null;
    if (el) {
      gsap.fromTo(el, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const activeDoc = DOCS.find((d) => d.key === active) || DOCS[0];

  return (
    <div ref={rootRef} className={styles.page}>
      <Ticker items={TICKER} theme="dark" />

      <Nav theme="light" />

      <header className={styles.header}>
        <div className={styles.container}>
          <div data-head className={styles.kickerRow}>
            <span className={styles.kicker}>— INFORMATIONS LÉGALES</span>
            <span className={styles.kickerRight}>MAJ — JANVIER 2026</span>
          </div>
          <h1 data-head className={styles.title}>
            {activeDoc.title}
          </h1>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <div className={styles.sidebarHead}>Documents</div>
            {DOCS.map((d, i) => (
              <button
                key={d.key}
                type="button"
                onClick={() => select(d.key)}
                className={`${styles.docTab} ${active === d.key ? styles.docTabActive : ""}`}
              >
                <span className={styles.docTabNum}>0{i + 1}</span>
                {d.label}
              </button>
            ))}
            <div className={styles.sidebarFoot}>
              <div className={styles.sidebarFootLabel}>Une question ?</div>
              <Link href="/contact" className={styles.sidebarFootLink}>
                Nous écrire →
              </Link>
            </div>
          </aside>

          <section ref={contentRef} className={styles.content}>
            <div data-doc="mentions" style={{ display: active === "mentions" ? "block" : "none" }}>
              <p className={styles.mono}>Éditeur du site</p>
              <h3>1. Éditeur</h3>
              <p>
                Le présent site est édité par <strong>Tendril School SAS</strong>, société par
                actions simplifiée au capital de 50 000 €, immatriculée au RCS de Paris sous le
                numéro <strong>901 234 567</strong>.
              </p>
              <ul>
                <li>
                  <strong>Siège social :</strong> 12 rue du Faubourg, 75003 Paris, France
                </li>
                <li>
                  <strong>N° TVA intracommunautaire :</strong> FR 12 901234567
                </li>
                <li>
                  <strong>Téléphone :</strong> +33 1 00 00 00 00
                </li>
                <li>
                  <strong>Email :</strong> contact@tendril.com
                </li>
                <li>
                  <strong>Directeur de la publication :</strong> la Présidente de Tendril School
                  SAS
                </li>
                <li>
                  <strong>N° de déclaration d&apos;activité (formation) :</strong> 11 75 12345 75,
                  enregistré auprès de la préfecture de la région Île-de-France
                </li>
              </ul>
              <h3>2. Hébergement</h3>
              <p>
                Le site est hébergé par un prestataire d&apos;hébergement professionnel assurant la
                disponibilité et la sécurité des données. Les coordonnées de l&apos;hébergeur sont
                communiquées sur simple demande à{" "}
                <a href="mailto:contact@tendril.com">contact@tendril.com</a>.
              </p>
              <h3>3. Propriété intellectuelle</h3>
              <p>
                L&apos;ensemble des contenus présents sur ce site (textes, identité visuelle,
                logo, typographies, mises en page, ainsi que les rendus et travaux d&apos;étudiants
                reproduits) sont protégés par le droit de la propriété intellectuelle et demeurent
                la propriété exclusive de Tendril School ou de leurs auteurs respectifs.
              </p>
              <p>
                Toute reproduction, représentation, modification ou exploitation, totale ou
                partielle, sans autorisation écrite préalable, est interdite et constitue une
                contrefaçon sanctionnée par le Code de la propriété intellectuelle.
              </p>
              <h3>4. Responsabilité</h3>
              <p>
                Tendril School s&apos;efforce d&apos;assurer l&apos;exactitude des informations
                diffusées sur ce site mais ne saurait être tenue responsable des erreurs, omissions
                ou indisponibilités. Les informations relatives aux programmes, tarifs et sessions
                sont données à titre indicatif et peuvent évoluer.
              </p>
            </div>

            <div data-doc="cgu" style={{ display: active === "cgu" ? "block" : "none" }}>
              <p className={styles.mono}>Conditions générales d&apos;utilisation</p>
              <h3>1. Objet</h3>
              <p>
                Les présentes conditions générales d&apos;utilisation (CGU) encadrent l&apos;accès
                et l&apos;usage du site de Tendril School. En naviguant sur le site,
                l&apos;utilisateur reconnaît en avoir pris connaissance et les accepter sans
                réserve.
              </p>
              <h3>2. Accès au site</h3>
              <p>
                Le site est accessible gratuitement à tout utilisateur disposant d&apos;un accès à
                internet. Les frais d&apos;équipement et de connexion restent à la charge de
                l&apos;utilisateur. Tendril School se réserve le droit de suspendre ou interrompre
                l&apos;accès, notamment pour maintenance, sans que sa responsabilité puisse être
                engagée.
              </p>
              <h3>3. Candidatures &amp; formulaires</h3>
              <p>
                L&apos;utilisateur s&apos;engage à fournir des informations exactes lors du dépôt
                d&apos;une candidature ou de l&apos;envoi d&apos;un message. Toute candidature
                repose sur des éléments sincères ; une information erronée pourra entraîner le
                rejet du dossier.
              </p>
              <ul>
                <li>Le dépôt d&apos;une candidature ne vaut pas admission.</li>
                <li>L&apos;admission est prononcée après étude du dossier et entretien.</li>
                <li>
                  Les pièces transmises sont utilisées uniquement dans le cadre du processus de
                  sélection.
                </li>
              </ul>
              <h3>4. Comportement de l&apos;utilisateur</h3>
              <p>
                L&apos;utilisateur s&apos;interdit tout usage du site contraire à la loi, à
                l&apos;ordre public ou aux présentes CGU, et notamment toute tentative de nuire au
                bon fonctionnement du site ou de porter atteinte aux droits de tiers.
              </p>
              <h3>5. Liens externes</h3>
              <p>
                Le site peut contenir des liens vers des sites tiers (réseaux sociaux, plateformes
                de podcast, partenaires). Tendril School n&apos;exerce aucun contrôle sur ces
                ressources et décline toute responsabilité quant à leur contenu.
              </p>
              <h3>6. Évolution des CGU</h3>
              <p>
                Tendril School se réserve le droit de modifier les présentes CGU à tout moment. La
                version applicable est celle en vigueur à la date de consultation du site.
              </p>
            </div>

            <div
              data-doc="confidentialite"
              style={{ display: active === "confidentialite" ? "block" : "none" }}
            >
              <p className={styles.mono}>Politique de confidentialité — RGPD</p>
              <h3>1. Responsable de traitement</h3>
              <p>
                Tendril School SAS est responsable du traitement des données personnelles
                collectées via ce site, conformément au Règlement général sur la protection des
                données (RGPD) et à la loi Informatique et Libertés.
              </p>
              <h3>2. Données collectées</h3>
              <p>Nous collectons les données que vous nous transmettez volontairement via nos formulaires :</p>
              <ul>
                <li>Identité : prénom, nom, date de naissance, nationalité, ville</li>
                <li>Coordonnées : email, téléphone</li>
                <li>Parcours : situation, diplôme, niveau et logiciels 3D, portfolio</li>
                <li>Éléments de candidature : motivation, objectif, mode de financement</li>
              </ul>
              <h3>3. Finalités</h3>
              <p>
                Ces données sont utilisées pour : traiter votre candidature et organiser les
                entretiens, répondre à vos demandes de contact, vous informer sur nos sessions et,
                avec votre accord, vous adresser nos actualités.
              </p>
              <h3>4. Base légale &amp; durée de conservation</h3>
              <p>
                Les traitements reposent sur votre consentement et sur l&apos;intérêt légitime de
                l&apos;école à gérer ses admissions. Les données de candidature sont conservées{" "}
                <strong>24 mois</strong> après le dernier contact, sauf obligation légale contraire.
              </p>
              <h3>5. Vos droits</h3>
              <p>
                Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de
                limitation, d&apos;opposition et de portabilité de vos données. Pour les exercer,
                écrivez à <a href="mailto:contact@tendril.com">contact@tendril.com</a>. Vous pouvez
                également introduire une réclamation auprès de la CNIL.
              </p>
              <h3>6. Sécurité</h3>
              <p>
                Tendril School met en œuvre des mesures techniques et organisationnelles appropriées
                pour protéger vos données contre tout accès, altération ou divulgation non
                autorisés.
              </p>
            </div>

            <div data-doc="cookies" style={{ display: active === "cookies" ? "block" : "none" }}>
              <p className={styles.mono}>Gestion des cookies</p>
              <h3>1. Qu&apos;est-ce qu&apos;un cookie ?</h3>
              <p>
                Un cookie est un petit fichier déposé sur votre terminal lors de la visite
                d&apos;un site. Il permet de reconnaître votre navigateur et de conserver
                certaines informations le temps de votre visite ou lors de visites ultérieures.
              </p>
              <h3>2. Cookies utilisés</h3>
              <ul>
                <li>
                  <strong>Cookies strictement nécessaires :</strong> indispensables au
                  fonctionnement du site (navigation, sécurité). Ils ne requièrent pas votre
                  consentement.
                </li>
                <li>
                  <strong>Cookies de mesure d&apos;audience :</strong> statistiques de
                  fréquentation anonymisées pour améliorer le site.
                </li>
                <li>
                  <strong>Cookies tiers :</strong> liés aux contenus intégrés (lecteur de podcast,
                  réseaux sociaux), soumis aux politiques de ces services.
                </li>
              </ul>
              <h3>3. Votre consentement</h3>
              <p>
                Lors de votre première visite, un bandeau vous permet d&apos;accepter ou de
                refuser les cookies non essentiels. Vous pouvez modifier votre choix à tout moment
                depuis les réglages de votre navigateur.
              </p>
              <h3>4. Paramétrage</h3>
              <p>
                Vous pouvez configurer votre navigateur pour refuser tout ou partie des cookies.
                Le refus des cookies non essentiels n&apos;altère pas l&apos;accès au site, mais
                peut limiter certaines fonctionnalités.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer legalColumn />
    </div>
  );
}
