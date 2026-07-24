"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import Ticker from "./Ticker";
import Nav from "./Nav";
import {
  SOFTWARE_CHIPS,
  SESSION_OPTIONS,
  SITUATION_OPTIONS,
  DIPLOME_OPTIONS,
  FINANCEMENT_OPTIONS,
  SOURCE_OPTIONS,
  STEP_LABELS,
} from "@/data/candidature";
import styles from "./CandidatureView.module.css";

const TOTAL = 6;

const TICKER = [
  "CANDIDATURE — SESSION JANVIER 2027",
  "PLACES LIMITÉES",
  "SÉLECTION SUR ENTRETIEN",
  "RÉPONSE SOUS 7 JOURS",
];

function Field({
  label,
  name,
  required,
  type = "text",
  placeholder,
  className,
  pattern,
  title,
  inputMode,
}) {
  return (
    <div className={className}>
      <label className={styles.label}>
        {label}
        {required ? " *" : ""}
      </label>
      <input
        className={styles.field}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        pattern={pattern}
        title={title}
        inputMode={inputMode}
      />
    </div>
  );
}

function SelectField({ label, name, required, options, className, onChange }) {
  return (
    <div className={className}>
      <label className={styles.label}>
        {label}
        {required ? " *" : ""}
      </label>
      <select
        className={styles.field}
        name={name}
        required={required}
        defaultValue=""
        onChange={onChange}
      >
        <option value="">Sélectionnez…</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function RadioCard({ name, value, required, kicker, title, meta, big }) {
  return (
    <label
      className={`${styles.optCard} ${
        big ? styles.optCardBig : styles.optCardRow
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        required={required}
        className={styles.hiddenInput}
      />
      {big ? (
        <>
          <div className={styles.optCardHead}>
            <span className={styles.optCardKicker}>{kicker}</span>
            <span className={styles.optDot} />
          </div>
          <div className={styles.optCardTitle}>{title}</div>
          <div className={styles.optCardMeta}>{meta}</div>
        </>
      ) : (
        <>
          <span className={styles.optDotSm} />
          <span className={styles.optCardLabel}>{title}</span>
        </>
      )}
    </label>
  );
}

function Chip({ name, value }) {
  return (
    <label className={styles.chip}>
      <input
        type="checkbox"
        name={name}
        value={value}
        className={styles.hiddenInput}
      />
      {value}
    </label>
  );
}

export default function CandidatureView() {
  const rootRef = useRef(null);
  const formRef = useRef(null);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [summary, setSummary] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [chosenProgramme, setChosenProgramme] = useState("bootcamp");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [nationaliteAutre, setNationaliteAutre] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (root) {
      gsap.from(root.querySelectorAll("[data-head]"), {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: "power3.out",
      });
    }
  }, []);

  useEffect(() => {
    const el = currentStepEl();
    if (el) {
      gsap.fromTo(
        el,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  function currentStepEl() {
    const form = formRef.current;
    return form ? form.querySelector(`[data-step="${step}"]`) : null;
  }

  function validStep() {
    const el = currentStepEl();
    if (!el) return true;
    const fields = Array.from(el.querySelectorAll("input, select, textarea"));
    for (const f of fields) {
      if (!f.checkValidity()) {
        f.reportValidity();
        return false;
      }
    }
    return true;
  }

  function collect() {
    const form = formRef.current;
    const out = {};
    if (!form) return out;
    const fd = new FormData(form);
    for (const [k, v] of fd.entries()) {
      out[k] = out[k] ? `${out[k]}, ${v}` : v;
    }
    return out;
  }

  function buildSummary() {
    const d = collect();
    const dash = "—";
    const rows = [
      ["Programme", d.programme],
      ["Session", d.session],
      ["Nom", [d.prenom, d.nom].filter(Boolean).join(" ")],
      ["Email", d.email],
      ["Téléphone", d.telephone],
      ["Date de naissance", d.naissance],
      [
        "Nationalité",
        d.nationalite === "Autre" ? d.nationalitePrecision : d.nationalite,
      ],
      ["Ville", d.ville],
      ["Situation", d.situation],
      ["Niveau 3D", d.niveau],
      ["Logiciels", d.logiciels],
      ["Portfolio", d.portfolio],
      ["Financement", d.financement],
      ["Disponible", d.dispo],
    ];
    setSummary(
      rows.map(([label, value]) => ({
        label,
        value: value && String(value).trim() ? value : dash,
      }))
    );
  }

  function handleNext() {
    if (!validStep()) return;
    const next = Math.min(step + 1, TOTAL);
    if (next === TOTAL) buildSummary();
    setStep(next);
  }

  function handleBack() {
    setStep(Math.max(step - 1, 1));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validStep()) return;
    const data = collect();
    setSending(true);
    setSendError(false);
    try {
      const res = await fetch("/api/candidature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setFirstName(data.prenom || "");
      setChosenProgramme(data.programme || "bootcamp");
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
  }

  function handleSelectChange(e) {
    const el = e.target;
    if (el.tagName === "SELECT") {
      if (el.value) el.setAttribute("data-filled", "");
      else el.removeAttribute("data-filled");
    }
  }

  return (
    <div ref={rootRef} className={styles.page}>
      <Ticker items={TICKER} theme="dark" />
      <Nav theme="light" />

      <main
        className={`${styles.main} ${submitted ? styles.mainCentered : ""}`}
      >
        {!submitted && (
          <div data-head className={styles.head}>
            <span className={styles.kickerSm}>DOSSIER DE CANDIDATURE</span>
            <h1 className={styles.title}>
              Rejoignez
              <br />
              la promo.
            </h1>
          </div>
        )}

        {!submitted && (
          <div className={styles.formShell}>
            <div className={styles.progressHead}>
              <div className={styles.stepLabel}>{STEP_LABELS[step - 1]}</div>
              <div className={styles.stepCount}>
                ÉTAPE {step} / {TOTAL}
              </div>
            </div>
            <div className={styles.progressBar}>
              {Array.from({ length: TOTAL }, (_, i) => (
                <div
                  key={i}
                  className={`${styles.segment} ${
                    i + 1 <= step ? styles.segmentActive : ""
                  }`}
                />
              ))}
            </div>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              onChange={handleSelectChange}
              className={styles.form}
            >
              {/* STEP 1 */}
              <div
                data-step="1"
                className={`${styles.step} ${
                  step === 1 ? "" : styles.stepHidden
                }`}
              >
                <h2 className={styles.stepTitle}>Quel bootcamp visez-vous ?</h2>
                <p className={styles.stepSub}>
                  Choisissez le niveau qui correspond à votre profil. En cas de
                  doute, sélectionnez Novice, l&apos;entretien affinera
                  l&apos;orientation.
                </p>
                <div className={styles.radioGrid2}>
                  <RadioCard
                    name="programme"
                    value="Bootcamp Novice"
                    required
                    big
                    kicker="NIVEAU 01 · DÉBUTANT"
                    title="Bootcamp Novice"
                    meta="12 SEMAINES · AUCUN PRÉREQUIS · 5 900 €"
                  />
                  <RadioCard
                    name="programme"
                    value="Bootcamp Avancé"
                    required
                    big
                    kicker="NIVEAU 02 · CONFIRMÉ"
                    title="Bootcamp Avancé"
                    meta="12 SEMAINES · SUR PORTFOLIO · 7 900 €"
                  />
                </div>
                <div className={styles.row2}>
                  <SelectField
                    label="Session souhaitée"
                    name="session"
                    required
                    options={SESSION_OPTIONS}
                  />
                  <div>
                    <label className={styles.label}>Format</label>
                    <div className={styles.staticField}>Distanciel</div>
                  </div>
                </div>
              </div>

              {/* STEP 2 */}
              <div
                data-step="2"
                className={`${styles.step} ${
                  step === 2 ? "" : styles.stepHidden
                }`}
              >
                <h2 className={styles.stepTitle}>Votre identité</h2>
                <p className={styles.stepSub}>
                  Pour vous recontacter et préparer votre entretien.
                </p>
                <div className={styles.stack}>
                  <div className={styles.row2}>
                    <Field label="Prénom" name="prenom" required />
                    <Field label="Nom" name="nom" required />
                  </div>
                  <div className={styles.row2}>
                    <Field label="Email" name="email" required type="email" />
                    <Field
                      label="Téléphone"
                      name="telephone"
                      required
                      type="tel"
                      inputMode="tel"
                      placeholder="06 12 34 56 78"
                      pattern={String.raw`(\+\d{6,15})|((\+33|0033|0)[ .]?[1-9]([ .]?\d{2}){4})`}
                      title="Entrez un numéro valide, ex : 06 12 34 56 78 ou +33 6 12 34 56 78"
                    />
                  </div>
                  <div className={styles.row3}>
                    <Field
                      label="Date de naissance"
                      name="naissance"
                      required
                      type="date"
                    />
                    <SelectField
                      label="Nationalité"
                      name="nationalite"
                      options={["Française", "Autre"]}
                      onChange={(e) =>
                        setNationaliteAutre(e.target.value === "Autre")
                      }
                    />
                    <Field label="Ville de résidence" name="ville" required />
                  </div>
                  {nationaliteAutre && (
                    <Field
                      label="Précisez votre nationalité"
                      name="nationalitePrecision"
                      required
                      placeholder="Ex : Belge, Suisse, Marocaine…"
                    />
                  )}
                </div>
              </div>

              {/* STEP 3 */}
              <div
                data-step="3"
                className={`${styles.step} ${
                  step === 3 ? "" : styles.stepHidden
                }`}
              >
                <h2 className={styles.stepTitle}>Votre parcours</h2>
                <p className={styles.stepSub}>
                  D&apos;où vous venez et où vous en êtes avec la 3D.
                </p>
                <div className={styles.stack}>
                  <div className={styles.row2}>
                    <SelectField
                      label="Situation actuelle"
                      name="situation"
                      required
                      options={SITUATION_OPTIONS}
                    />
                    <SelectField
                      label="Dernier diplôme"
                      name="diplome"
                      options={DIPLOME_OPTIONS}
                    />
                  </div>
                  <Field
                    label="Domaine d'études ou métier actuel"
                    name="domaine"
                    placeholder="Ex : design produit, photographie, infographie…"
                  />
                  <div>
                    <label className={styles.label}>Votre niveau en 3D *</label>
                    <div className={styles.radioGrid3}>
                      <RadioCard
                        name="niveau"
                        value="Débutant"
                        required
                        title="Débutant"
                      />
                      <RadioCard
                        name="niveau"
                        value="Intermédiaire"
                        title="Intermédiaire"
                      />
                      <RadioCard name="niveau" value="Avancé" title="Avancé" />
                    </div>
                  </div>
                  <div>
                    <label className={styles.label}>
                      Logiciels déjà pratiqués
                    </label>
                    <div className={styles.chipRow}>
                      {SOFTWARE_CHIPS.map((s) => (
                        <Chip key={s} name="logiciels" value={s} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 4 */}
              <div
                data-step="4"
                className={`${styles.step} ${
                  step === 4 ? "" : styles.stepHidden
                }`}
              >
                <h2 className={styles.stepTitle}>Portfolio &amp; motivation</h2>
                <p className={styles.stepSub}>
                  Le portfolio est requis pour les deux formations. Un travail
                  en cours ou des projets personnels suffisent.
                </p>
                <div className={styles.stack}>
                  <div className={styles.row2}>
                    <Field
                      label="Lien portfolio"
                      name="portfolio"
                      type="url"
                      placeholder="https://"
                      required
                    />
                    <Field
                      label="LinkedIn / site perso"
                      name="lien2"
                      type="url"
                      placeholder="https://"
                    />
                  </div>
                  <div>
                    <label className={styles.label}>
                      Pourquoi le luxe et la 3D ? *
                    </label>
                    <textarea
                      className={styles.field}
                      name="motivation"
                      required
                      rows={4}
                      placeholder="Parlez-nous de ce qui vous attire dans la fabrication de l'image du luxe…"
                    />
                  </div>
                  <div>
                    <label className={styles.label}>
                      Votre objectif professionnel
                    </label>
                    <textarea
                      className={styles.field}
                      name="objectif"
                      rows={3}
                      placeholder="Où vous voyez-vous à la sortie du bootcamp ?"
                    />
                  </div>
                </div>
              </div>

              {/* STEP 5 */}
              <div
                data-step="5"
                className={`${styles.step} ${
                  step === 5 ? "" : styles.stepHidden
                }`}
              >
                <h2 className={styles.stepTitle}>
                  Financement &amp; infos pratiques
                </h2>
                <p className={styles.stepSub}>
                  Dernière étape avant le récapitulatif.
                </p>
                <div className={styles.stack}>
                  <div className={styles.row2}>
                    <SelectField
                      label="Mode de financement envisagé"
                      name="financement"
                      required
                      options={FINANCEMENT_OPTIONS}
                    />
                    <SelectField
                      label="Comment nous avez-vous connus ?"
                      name="source"
                      options={SOURCE_OPTIONS}
                    />
                  </div>
                  <div>
                    <label className={styles.label}>
                      Êtes-vous disponible à plein temps à la date de rentrée ?
                      *
                    </label>
                    <div className={styles.dispoRow}>
                      <RadioCard
                        name="dispo"
                        value="Oui"
                        required
                        title="Oui"
                      />
                      <RadioCard
                        name="dispo"
                        value="Non / à confirmer"
                        title="Non / à confirmer"
                      />
                    </div>
                  </div>
                  <label className={styles.rgpd}>
                    <input
                      type="checkbox"
                      name="rgpd"
                      required
                      className={styles.rgpdCheckbox}
                    />
                    <span>
                      J&apos;accepte que Tendril School traite mes données dans
                      le cadre de ma candidature et me recontacte. *
                    </span>
                  </label>
                </div>
              </div>

              {/* STEP 6 */}
              <div
                data-step="6"
                className={`${styles.step} ${
                  step === 6 ? "" : styles.stepHidden
                }`}
              >
                <h2 className={styles.stepTitle}>Récapitulatif</h2>
                <p className={styles.stepSub}>
                  Vérifiez vos informations avant d&apos;envoyer. Vous pouvez
                  revenir en arrière pour corriger.
                </p>
                <div className={styles.summaryBox}>
                  {summary.map((row) => (
                    <div key={row.label} className={styles.summaryRow}>
                      <span className={styles.summaryLabel}>{row.label}</span>
                      <span className={styles.summaryValue}>{row.value}</span>
                    </div>
                  ))}
                </div>
                {sendError && (
                  <p className={styles.errorMsg}>
                    Une erreur est survenue lors de l&apos;envoi. Merci de
                    réessayer.
                  </p>
                )}
              </div>

              {/* FOOTER NAV */}
              <div className={styles.footerNav}>
                <button
                  type="button"
                  onClick={handleBack}
                  className={styles.navBtn}
                  style={{ visibility: step === 1 ? "hidden" : "visible" }}
                >
                  ← Précédent
                </button>
                <div className={styles.stepHint}>
                  {step === TOTAL
                    ? "Prêt à envoyer"
                    : `Étape ${step} sur ${TOTAL}`}
                </div>
                {step === TOTAL ? (
                  <button
                    type="submit"
                    disabled={sending}
                    className={`${styles.navBtn} ${styles.navBtnDark}`}
                  >
                    {sending ? "Envoi..." : "✓ Envoyer ma candidature"}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNext}
                    className={`${styles.navBtn} ${styles.navBtnDark}`}
                  >
                    Continuer →
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {submitted && (
          <div className={styles.success}>
            <div className={styles.successKicker}>CANDIDATURE ENVOYÉE</div>
            <h2 className={styles.successTitle}>
              Merci, {firstName || "à vous"}.
            </h2>
            <p className={styles.successText}>
              Nous avons bien reçu votre dossier pour le{" "}
              <strong>{chosenProgramme}</strong>. Notre équipe revient vers vous
              sous 7 jours pour la suite, généralement un entretien.
            </p>
            <div className={styles.successActions}>
              <Link
                href="/programmes"
                className={`${styles.navBtn} ${styles.navBtnDark}`}
              >
                Revoir les programmes
              </Link>
              <Link href="/" className={styles.navBtn}>
                Retour à l&apos;accueil
              </Link>
            </div>
          </div>
        )}

        {!submitted && (
          <div className={styles.reassurance}>
            <div className={styles.reassuranceCell}>
              <div className={styles.reassuranceLabel}>DÉLAI DE RÉPONSE</div>
              <div className={styles.reassuranceValue}>Sous 7 jours</div>
            </div>
            <div className={styles.reassuranceCell}>
              <div className={styles.reassuranceLabel}>SÉLECTION</div>
              <div className={styles.reassuranceValue}>Sur entretien</div>
            </div>
            <div className={styles.reassuranceCell}>
              <div className={styles.reassuranceLabel}>UNE QUESTION ?</div>
              <Link href="/contact" className={styles.reassuranceLink}>
                Nous écrire →
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
