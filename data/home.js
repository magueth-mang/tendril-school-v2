export const ticker = [
  "CANDIDATURES OUVERTES",
  "SESSION — SEPTEMBRE 2026",
  "30 PLACES",
  "BOOTCAMP 3D · BEAUTÉ & LUXE",
];

export const clips = [
  { label: "FLACON · TURNTABLE", dur: "00:12" },
  { label: "TEXTURE LIQUIDE", dur: "00:08" },
  { label: "CAMPAGNE · SÉRUM", dur: "00:15" },
];

export const stats = [
  { value: "94%", label: "EN POSTE À 6 MOIS" },
  { value: "30", label: "PLACES / PROMO" },
  { value: "12", label: "SEMAINES D'IMMERSION" },
  { value: "04", label: "STUDIOS PARTENAIRES" },
];

export const noviceModules = [
  { num: "01", title: "Modélisation 3D", tags: ["Hard Surface Modeling", "Topologie propre", "Produits premium", "Cosmétique & Packaging", "Optimisation des meshes"] },
  { num: "02", title: "Texturing & Shading", tags: ["PBR Workflow", "UV Mapping", "Shaders réalistes", "Verre, métal, plastique, liquide", "Subsurface Scattering"] },
  { num: "03", title: "Lighting & Rendering", tags: ["Studio Lighting", "HDRI Lighting", "Three-Point Lighting", "Packshot publicitaire", "Photoréalisme"] },
  { num: "04", title: "Animation Produit", tags: ["Product Animation", "Camera Animation", "Hero Shot", "Turntable", "Keyframe Animation"] },
  { num: "05", title: "Motion Design 3D", tags: ["Composition publicitaire", "Loop Animation", "Transition produit", "Storytelling visuel"] },
  { num: "06", title: "Compositing", tags: ["Render Passes", "Color Grading", "Depth of Field", "Bloom", "Export réseaux sociaux"] },
  { num: "07", title: "Direction Artistique", tags: ["Codes visuels du luxe", "Composition d'image", "Théorie des couleurs", "Branding visuel"] },
];

export const avanceModules = [
  { num: "01", title: "Production Publicitaire", tags: ["Hero Film", "CGI Advertising", "Luxury Visual Storytelling", "Campagne publicitaire complète"] },
  { num: "02", title: "Modélisation Avancée", tags: ["Hard Surface Expert", "High Poly Modeling", "Packaging complexe", "Product Design"] },
  { num: "03", title: "Shading Premium", tags: ["Procedural Shading", "Micro Details", "Condensation", "Liquid Shader", "Cosmetic Materials"] },
  { num: "04", title: "Lighting Cinématographique", tags: ["Cinematic Lighting", "Rim Light", "Dramatic Lighting", "Mood Lighting"] },
  { num: "05", title: "Simulations Houdini / Blender", tags: ["FLIP Fluids", "Particles", "Smoke Simulation", "Splash Cosmetics", "Morphing"] },
  { num: "06", title: "Compositing Professionnel", tags: ["Multi Pass Compositing", "Cryptomatte", "Color Pipeline", "ACES Workflow"] },
  { num: "07", title: "Pipeline Agence & Portfolio", tags: ["Gestion d'un brief client", "Direction Artistique", "Portfolio professionnel", "Positionnement Freelance"] },
];

export const bootcamps = {
  novice: {
    kicker: "NIVEAU 01 · DÉBUTANT",
    title: "Bootcamp Novice",
    meta: "12 SEM · AUCUN PRÉREQUIS · SEPT. 2026",
    price: "7 900 €",
    subtitle: "DÉBUTANTS ET RECONVERSIONS",
    items: ["Fondamentaux de la 3D", "Modélisation", "Animation - Simulation 3D", "Lighting", "Publicité produit", "Premier portfolio"],
    href: "/programmes/novice",
  },
  avance: {
    kicker: "NIVEAU 02 · CONFIRMÉ",
    title: "Bootcamp Avancé",
    meta: "10 SEM · SUR PORTFOLIO · SEPT. 2026",
    price: "9 900 €",
    subtitle: "PRODUCTION FILM 3D",
    items: ["Modélisation 3D avancée", "Texturing & Lighting avancée", "Animation & Simulation 3D (fluides, morphing, particules…)", "Compositing, rendering", "Direction artistique avancée", "Portfolio niveau agence"],
    href: "/programmes/avance",
  },
};

export const comparison = {
  tendril: {
    label: "★ NOTRE FORMATION",
    name: "Tendril School",
    rows: [
      { label: "DURÉE DU CURSUS", value: "4 mois" },
      { label: "SPÉCIALISATION", value: "Publicité & luxe uniquement" },
      { label: "FORMATEURS", value: "Artistes en activité en studio" },
      { label: "PROJETS RÉALISÉS", value: "Briefs clients réels" },
      { label: "SORTIE", value: "Portfolio orienté agence" },
      { label: "COÛT DE LA FORMATION", value: "Dès 7 900 €" },
    ],
  },
  autre: {
    label: "AILLEURS",
    name: "École 3D classique",
    rows: [
      { label: "DURÉE DU CURSUS", value: "2 à 3 ans" },
      { label: "SPÉCIALISATION", value: "Généraliste (jeu vidéo, VFX, luxe…)" },
      { label: "FORMATEURS", value: "Enseignants académiques" },
      { label: "PROJETS RÉALISÉS", value: "Exercices académiques" },
      { label: "SORTIE", value: "Portfolio généraliste" },
      { label: "COÛT DE LA FORMATION", value: "Souvent 15 000 €+" },
    ],
  },
};

export const faqs = [
  {
    q: "Faut-il déjà savoir modéliser en 3D ?",
    a: "Non. Le bootcamp est ouvert à tout le monde — débutants motivés comme artistes confirmés. Les premières semaines posent des fondamentaux solides, et le rythme accélère ensuite vers la spécialisation luxe.",
  },
  {
    q: "Quels logiciels vais-je utiliser ?",
    a: "Blender et Modo pour la modélisation, Substance pour le texturing, Cycles et Redshift pour le rendu. Une licence étudiante est fournie pendant toute la formation.",
  },
  {
    q: "Le bootcamp est-il en présentiel ?",
    a: "Le format Temps plein et Intensif sont en présentiel à Paris. Le format Part-time soir est hybride, avec des sessions en visio et des week-ends sur place.",
  },
  {
    q: "Puis-je financer la formation ?",
    a: "Oui. La formation est éligible au CPF, l'échelonnement est possible, et des bourses au mérite sont attribuées chaque promotion sur dossier.",
  },
];
