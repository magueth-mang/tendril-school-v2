export const ticker = [
  "DEUX BOOTCAMPS · UN MÉTIER",
  "NOVICE & AVANCÉ",
  "SESSION SEPTEMBRE 2026",
  "30 PLACES PAR PROMO",
];

export const compareStrip = [
  { label: "DURÉE", value: "12 / 10", suffix: "sem." },
  { label: "FORMAT", value: "Présentiel", suffix: "· Paris" },
  { label: "RENTRÉE", value: "Sept.", suffix: "2026" },
  { label: "PLACES", value: "30", suffix: "/ promo" },
];

export const cards = {
  novice: {
    kickerLeft: "NIVEAU 01 · DÉBUTANT",
    kickerRight: "AUCUN PRÉREQUIS",
    title: ["Bootcamp", "Novice"],
    desc: "Construisez des bases solides en 3D et découvrez les techniques utilisées dans la publicité, la beauté et le luxe. En seulement 4 mois, réalisez vos premières créations professionnelles et développez un portfolio qui vous ressemble.",
    facts: [
      { label: "DURÉE", value: "12 sem." },
      { label: "PRÉREQUIS", value: "Aucun" },
      { label: "TARIF", value: "5 900 €" },
    ],
    href: "/programmes/novice",
  },
  avance: {
    kickerLeft: "NIVEAU 02 · CONFIRMÉ",
    kickerRight: "SUR PORTFOLIO",
    title: ["Bootcamp", "Avancé"],
    desc: "Destiné aux artistes possédant déjà des bases en 3D, ce Bootcamp vous prépare aux exigences des agences, studios et marques internationales.",
    facts: [
      { label: "DURÉE", value: "10 sem." },
      { label: "PRÉREQUIS", value: "Portfolio" },
      { label: "TARIF", value: "7 900 €" },
    ],
    href: "/programmes/avance",
  },
};

export const orientation = {
  novice: [
    "Vous débutez ou venez d'un autre domaine",
    "Vous n'avez pas (encore) de portfolio 3D",
    "Vous voulez des bases techniques solides",
  ],
  avance: [
    "Vous maîtrisez déjà un logiciel 3D",
    "Vous avez un portfolio à faire évoluer",
    "Vous visez directement un poste en studio",
  ],
};
