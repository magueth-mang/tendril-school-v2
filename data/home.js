export const ticker = [
  "CANDIDATURES OUVERTES",
  "SESSION — JANVIER 2027",
  "PLACES LIMITÉES PAR PROMO",
  "BOOTCAMP 3D · BEAUTÉ & LUXE",
];

export const clips = [
  {
    label: "02. BOOTCAMP NOVICE - CAMPAGNE LANCÔME",
    dur: "00:12",
    videoId: "1181955312",
    hash: "d1a31d5174",
  },
  {
    label: "03. BOOTCAMP AVANCE - SIMULATION MORPHING 3D",
    dur: "00:17",
    videoId: "1181964838",
    hash: "e8a6ed7b41",
  },
  {
    label: "04. BOOTCAMP AVANCE - LANCÔME X AYA NAKAMURA",
    dur: "00:20",
    videoId: "1122894539",
    hash: "44a9c4b883",
  },
];

export const stats = [
  {
    value: "99%",
    label: "DES ÉLÈVES SONT APPROCHÉS PAR DES AGENCES OU ANNONCEURS",
  },
  { value: "30", label: "PLACES PAR PROMO" },
  { value: "12", label: "SEMAINES D'IMMERSION" },
  { value: "04", label: "STUDIOS PARTENAIRES" },
];

export const noviceModules = [
  {
    num: "01",
    title: "Modélisation 3D",
    tags: [
      "Hard Surface Modeling",
      "Topologie propre",
      "Produits premium",
      "Cosmétique & Packaging",
      "Optimisation des meshes",
    ],
  },
  {
    num: "02",
    title: "Texturing & Shading",
    tags: [
      "PBR Workflow",
      "UV Mapping",
      "Shaders réalistes",
      "Verre, métal, plastique, liquide",
      "Subsurface Scattering",
    ],
  },
  {
    num: "03",
    title: "Lighting & Rendering",
    tags: [
      "Studio Lighting",
      "HDRI Lighting",
      "Three-Point Lighting",
      "Packshot publicitaire",
      "Photoréalisme",
    ],
  },
  {
    num: "04",
    title: "Animation Produit",
    tags: [
      "Product Animation",
      "Camera Animation",
      "Hero Shot",
      "Turntable",
      "Keyframe Animation",
    ],
  },
  {
    num: "05",
    title: "Motion Design 3D",
    tags: [
      "Composition publicitaire",
      "Loop Animation",
      "Transition produit",
      "Storytelling visuel",
    ],
  },
  {
    num: "06",
    title: "Compositing",
    tags: [
      "Render Passes",
      "Color Grading",
      "Depth of Field",
      "Bloom",
      "Export réseaux sociaux",
    ],
  },
  {
    num: "07",
    title: "Direction Artistique",
    tags: [
      "Codes visuels du luxe",
      "Composition d'image",
      "Théorie des couleurs",
      "Branding visuel",
    ],
  },
];

export const avanceModules = [
  {
    num: "01",
    title: "Production Publicitaire",
    tags: [
      "Hero Film",
      "CGI Advertising",
      "Luxury Visual Storytelling",
      "Campagne publicitaire complète",
    ],
  },
  {
    num: "02",
    title: "Modélisation Avancée",
    tags: [
      "Hard Surface Expert",
      "High Poly Modeling",
      "Packaging complexe",
      "Product Design",
    ],
  },
  {
    num: "03",
    title: "Shading Premium",
    tags: [
      "Procedural Shading",
      "Micro Details",
      "Condensation",
      "Liquid Shader",
      "Cosmetic Materials",
    ],
  },
  {
    num: "04",
    title: "Éclairage avancé",
    tags: [
      "Cinematic Lighting",
      "Rim Light",
      "Dramatic Lighting",
      "Mood Lighting",
    ],
  },
  {
    num: "05",
    title: "Simulations Houdini / Blender",
    tags: [
      "FLIP Fluids",
      "Particles",
      "Smoke Simulation",
      "Splash Cosmetics",
      "Morphing",
    ],
  },
  {
    num: "06",
    title: "Compositing Professionnel",
    tags: [
      "Multi Pass Compositing",
      "Cryptomatte",
      "Color Pipeline",
      "ACES Workflow",
    ],
  },
  {
    num: "07",
    title: "Pipeline Agence & Portfolio",
    tags: [
      "Gestion d'un brief client",
      "Direction Artistique",
      "Portfolio professionnel",
      "Positionnement Freelance",
    ],
  },
];

export const bootcamps = {
  novice: {
    kicker: "NIVEAU 01 · DÉBUTANT",
    title: "Bootcamp Novice",
    meta: "12 SEM · SUR PORTFOLIO · JANV. 2027",
    price: "5 900 €",
    subtitle: "DÉBUTANTS ET RECONVERSIONS",
    items: [
      "Fondamentaux de la 3D",
      "Modélisation",
      "Animation - Simulation 3D",
      "Lighting",
      "Publicité produit",
      "Premier portfolio",
    ],
    href: "/programmes/bootcamp-novice",
  },
  avance: {
    kicker: "NIVEAU 02 · CONFIRMÉ",
    title: "Bootcamp Avancé",
    meta: "12 SEM · SUR PORTFOLIO · JANV. 2027",
    price: "7 900 €",
    subtitle: "PRODUCTION FILM 3D",
    items: [
      "Modélisation 3D avancée",
      "Texturing & Lighting avancée",
      "Animation & Simulation 3D (fluides, morphing, particules…)",
      "Compositing, rendering",
      "Direction artistique avancée",
      "Portfolio niveau agence",
    ],
    href: "/programmes/bootcamp-avance",
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
      { label: "SORTIE", value: "Portfolio orienté secteur Luxe / Beauté" },
      { label: "COÛT DE LA FORMATION", value: "Dès 5 900 €" },
    ],
  },
  autre: {
    label: "AILLEURS",
    name: "École 3D classique",
    rows: [
      { label: "DURÉE DU CURSUS", value: "2 à 3 ans" },
      {
        label: "SPÉCIALISATION",
        value: "Généraliste (jeu vidéo, architecture..)",
      },
      { label: "FORMATEURS", value: "Enseignants académiques" },
      { label: "PROJETS RÉALISÉS", value: "Exercices académiques" },
      { label: "SORTIE", value: "Portfolio généraliste" },
      { label: "COÛT DE LA FORMATION", value: "Souvent dès 10 000 €" },
    ],
  },
};

export const faqs = [
  {
    q: "Pourquoi choisir Tendril School plutôt qu'une école traditionnelle ?",
    a: "Tendril School ne forme pas des étudiants à obtenir un diplôme. Nous formons des artistes capables de produire des campagnes publicitaires répondant aux exigences des marques.\nNotre pédagogie vient directement du fonctionnement d'un studio créatif professionnel, avec des méthodes utilisées sur des productions réelles.",
  },
  {
    q: "La formation est-elle réellement en direct ?",
    a: "Oui. Contrairement aux formations basées uniquement sur des vidéos, vous êtes accompagné quotidiennement par des artistes professionnels.\nVous pouvez poser vos questions, partager votre écran, recevoir des corrections et progresser avec un suivi constant.",
  },
  {
    q: "Est-ce adapté si je débute ? Et si je connais déjà Blender ?",
    a: "Oui, dans les deux cas. Nous reprenons les fondamentaux pour construire une méthode solide, puis nous vous accompagnons vers un niveau professionnel.\nSi vous connaissez déjà Blender, vous apprendrez surtout à dépasser l'utilisation technique du logiciel pour créer des images capables de répondre aux attentes du marché.",
  },
  {
    q: "Qu'allez-vous réellement apprendre pendant la formation ?",
    a: "Vous apprendrez bien plus qu'un logiciel. Le programme couvre notamment :\n• Modélisation\n• Lighting\n• Animation\n• Simulation FX\n• Motion Design\n• Compositing\n• Direction artistique\n• Pipeline de production\nL'objectif est de maîtriser une méthode complète utilisée en studio.",
  },
  {
    q: "Vais-je travailler sur des projets professionnels ?",
    a: "Oui. Vous réaliserez des projets inspirés de campagnes dans les secteurs du luxe, de la cosmétique, de la mode et de la publicité.\nChaque projet est pensé pour construire un portfolio proche des attentes du marché.",
  },
  {
    q: "Vais-je créer un portfolio professionnel ?",
    a: "Oui. À la fin du Bootcamp, vous disposerez d'images et de films que vous pourrez présenter à des studios, agences créatives ou futurs clients.",
  },
  {
    q: "Pourquoi les simulations FX sont-elles autant mises en avant ?",
    a: "Parce qu'elles sont devenues une compétence clé dans les productions publicitaires actuelles.\nVous apprendrez à créer des effets avancés comme les liquides, fumées, particules, tissus, verre ou destructions, afin de produire des visuels plus spectaculaires.",
  },
  {
    q: "Est-ce que je serai accompagné et corrigé personnellement ?",
    a: "Oui. Chaque projet reçoit des retours détaillés sur la technique, la lumière, la composition et la direction artistique.\nL'objectif est de reproduire un accompagnement proche de celui d'un studio professionnel.",
  },
  {
    q: "Vais-je apprendre à travailler comme en agence ?",
    a: "Oui. Vous apprendrez à comprendre un brief, respecter des contraintes, gérer des retours, organiser vos fichiers et produire efficacement dans un environnement professionnel.",
  },
  {
    q: "Quels sont les débouchés après la formation ?",
    a: "Vous pourrez évoluer comme :\n• Artiste 3D Publicitaire\n• Motion Designer 3D\n• FX Artist\n• Lighting Artist\n• CGI Artist\n• Freelance spécialisé en publicité\nSelon votre niveau et les opportunités disponibles, certains profils pourront également collaborer avec Mang Production ou être recommandés auprès de partenaires.",
  },
  {
    q: "Pourquoi suivre un Bootcamp plutôt qu'apprendre seul ?",
    a: "Parce qu'apprendre seul demande souvent plusieurs années d'essais et d'erreurs.\nAvec Tendril School, vous bénéficiez d'une méthode structurée, d'un accompagnement professionnel et de projets conçus pour développer rapidement les compétences recherchées par l'industrie.",
  },
];
