export const ticker = [
  "CANDIDATURES OUVERTES",
  "SESSION — JANVIER 2027",
  "30 PLACES PAR PROMO",
  "BOOTCAMP 3D · BEAUTÉ & LUXE",
];

export const clips = [
  { label: "02. BOOTCAMP NOVICE - CAMPAGNE LANCOME", dur: "00:12" },
  { label: "03. BOOTCAMP AVANCE - SIMULATION MORPHING 3D", dur: "00:08" },
  { label: "04. BOOTCAMP NOVICE - CAMPAGNE VICHY", dur: "00:15" },
];

export const stats = [
  { value: "95%", label: "EN POSTE OU FREELANCE À 6 MOIS" },
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
      { label: "SORTIE", value: "Portfolio orienté agence" },
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
    a: "Parce que nous ne formons pas des étudiants pour obtenir un diplôme. Nous formons des artistes capables de produire des campagnes publicitaires pour les plus grandes marques.\nNotre pédagogie est construite à partir des méthodes utilisées quotidiennement dans un studio créatif travaillant pour des clients internationaux. Chaque semaine, vous développez des compétences directement applicables en agence.",
  },
  {
    q: "Est-ce que la formation est vraiment en direct ?",
    a: "Oui. Contrairement à la majorité des formations en ligne composées uniquement de vidéos préenregistrées, vous êtes accompagné chaque jour par des professionnels.\nVous pouvez poser vos questions en temps réel, partager votre écran, recevoir des corrections immédiates et avancer beaucoup plus rapidement.",
  },
  {
    q: "Combien d'heures de cours y a-t-il ?",
    a: "Les journées sont intensives. Vous êtes accompagné jusqu'à 7 heures par jour avec différents intervenants spécialisés :\n• Simulation FX\n• Lighting\n• Animation\n• Direction Artistique\n• Modélisation\n• Motion Design\n• Gestion de projet\n• Pipeline de production\nVous vivez le rythme d'une véritable agence créative.",
  },
  {
    q: "Est-ce adapté si je débute complètement ?",
    a: "Oui. Nous repartons des fondamentaux avant de vous amener progressivement vers un niveau professionnel.\nNotre objectif n'est pas de vous faire apprendre des raccourcis, mais de vous donner une méthode solide qui vous servira toute votre carrière.",
  },
  {
    q: "Je connais déjà Blender. Est-ce que la formation est faite pour moi ?",
    a: "Oui. La majorité des artistes savent utiliser un logiciel. Très peu savent produire des visuels capables de convaincre une grande marque.\nChez Tendril School, vous apprenez la direction artistique, les workflows professionnels, les simulations avancées et les exigences du marché publicitaire.",
  },
  {
    q: "En quoi votre école est-elle différente des autres ?",
    a: "Parce que nous enseignons ce que nous faisons réellement. Les projets, les contraintes, les retours clients et les méthodes de production proviennent directement de campagnes réalisées pour des marques internationales.\nVous apprenez le métier tel qu'il est aujourd'hui, pas celui d'il y a dix ans.",
  },
  {
    q: "Vais-je apprendre uniquement Blender ?",
    a: "Non. Un bon artiste ne maîtrise pas seulement un logiciel. Vous apprendrez également les pipelines de production, le rendu photoréaliste, les simulations, le compositing, l'optimisation des scènes, la direction artistique, ainsi que les méthodes utilisées en studio.\nLe logiciel n'est qu'un outil. La méthode fait la différence.",
  },
  {
    q: "Est-ce que je vais constituer un portfolio ?",
    a: "Oui. Tout au long de la formation, vous réalisez de véritables projets destinés à enrichir votre portfolio.\nÀ la fin du cursus, vous disposez d'images et de films que vous pourrez présenter à des studios, des agences ou directement à vos futurs clients.",
  },
  {
    q: "Est-ce que je travaillerai sur des projets réalistes ?",
    a: "Oui. Vous travaillerez sur des briefs inspirés de campagnes réelles dans les secteurs du luxe, de la cosmétique, de la beauté, de la mode, du hardware et de la publicité.\nL'objectif est que votre portfolio ressemble à celui d'un professionnel.",
  },
  {
    q: "Vais-je apprendre les simulations ?",
    a: "Oui. Liquides, fumée, particules, tissus, verre, destruction, effets procéduraux…\nLes simulations sont aujourd'hui parmi les compétences les plus recherchées dans les studios créatifs. Nous leur accordons une place centrale.",
  },
  {
    q: "Pourquoi autant d'importance aux simulations ?",
    a: "Parce qu'elles permettent de produire les campagnes publicitaires les plus impressionnantes.\nTrès peu d'écoles les enseignent réellement, alors que ce sont elles qui différencient un bon artiste d'un excellent artiste.",
  },
  {
    q: "Est-ce que je pourrai poser des questions en dehors des cours ?",
    a: "Oui. Vous bénéficiez d'un accompagnement continu. L'objectif est que vous ne restiez jamais bloqué plusieurs jours sur un problème technique.",
  },
  {
    q: "Est-ce que je serai corrigé personnellement ?",
    a: "Oui. Chaque projet reçoit un retour détaillé. Nous analysons aussi bien la technique que le rendu, la composition, la lumière et la direction artistique.",
  },
  {
    q: "J'ai peur de ne pas avoir le niveau…",
    a: "C'est normal. Tous les artistes professionnels ont commencé un jour.\nLa seule différence entre quelqu'un qui réussit et quelqu'un qui abandonne est souvent la qualité de son accompagnement.",
  },
  {
    q: "Est-ce que la formation demande beaucoup de travail ?",
    a: "Oui. Et c'est justement ce qui fait la différence. Vous progresserez en quelques mois comme beaucoup progressent en plusieurs années d'apprentissage en solitaire.",
  },
  {
    q: "Est-ce que je peux suivre la formation en travaillant ?",
    a: "Cela dépend de votre disponibilité. La formation est intensive. Plus vous vous investissez, plus vos résultats seront rapides.",
  },
  {
    q: "Est-ce que je vais apprendre à travailler comme en agence ?",
    a: "Oui. Vous apprendrez :\n• répondre à un brief\n• respecter des délais\n• gérer les retours clients\n• organiser vos fichiers\n• optimiser vos rendus\n• collaborer efficacement\nAutrement dit, tout ce qui fait le quotidien d'un studio professionnel.",
  },
  {
    q: "Qui sont les formateurs ?",
    a: "Des artistes qui travaillent quotidiennement pour de vraies marques. Ils ne sont pas uniquement enseignants. Ils produisent chaque semaine des campagnes commerciales et partagent leurs méthodes de travail.",
  },
  {
    q: "Est-ce que vous montrez des projets réalisés pour de grandes marques ?",
    a: "Oui. De nombreux exemples issus de campagnes internationales servent de support pédagogique afin de comprendre les attentes réelles des clients.",
  },
  {
    q: "Vais-je apprendre à vendre mon travail ?",
    a: "Oui. Créer de belles images ne suffit pas. Vous apprendrez également à présenter un projet, construire un portfolio, répondre à un client et valoriser votre travail.",
  },
  {
    q: "Est-ce que je serai prêt à travailler après la formation ?",
    a: "Notre objectif est simple : que vous puissiez intégrer un studio, une agence, travailler en freelance ou développer votre propre activité avec un portfolio professionnel et une méthode de production solide.",
  },
  {
    q: "Pourquoi choisir une école en ligne plutôt qu'en présentiel ?",
    a: "Parce qu'aujourd'hui, la majorité des studios collaborent déjà à distance. Vous apprenez dans votre propre environnement de travail, tout en bénéficiant d'un accompagnement quotidien, de corrections en direct et d'échanges permanents avec les formateurs et les autres étudiants.\nLes formats d'apprentissage en ligne permettent un suivi flexible tout en conservant une forte interaction lorsqu'ils sont bien structurés.",
  },
  {
    q: "Et si je ne m'inscris pas ?",
    a: "Dans un an, deux scénarios sont possibles.\nLe premier : vous aurez continué à regarder des tutoriels YouTube en espérant progresser seul.\nLe second : vous aurez construit un portfolio professionnel, appris auprès d'artistes expérimentés et développé les compétences recherchées par les studios créatifs.\nLa seule différence entre ces deux scénarios, c'est la décision que vous prenez aujourd'hui.",
  },
  {
    q: "Quels sont les débouchés après la formation ?",
    a: "Les compétences enseignées chez Tendril School répondent aux besoins actuels des studios et des agences créatives. À l'issue du Bootcamp, vous pourrez notamment évoluer en tant que :\n• Artiste 3D Publicitaire\n• Motion Designer 3D\n• FX Artist\n• Lighting Artist\n• Look Development Artist\n• Product Visualisation Artist\n• CGI Artist\n• Freelance spécialisé en publicité et communication\n• Directeur Artistique 3D (avec expérience)\nVous pourrez travailler pour des agences créatives, des studios de production, des marques, ou développer votre propre activité.",
  },
  {
    q: "Est-ce que la formation aide à trouver un emploi ?",
    a: "Oui. Notre objectif ne s'arrête pas à l'apprentissage technique. Nous vous accompagnons également dans la construction d'un portfolio professionnel, la présentation de vos projets, les attentes des recruteurs et la manière de répondre aux exigences des agences créatives.\nNous partageons également notre expérience du terrain afin que vous soyez prêt à intégrer rapidement un environnement professionnel.",
  },
  {
    q: "Est-ce que j'aurai la possibilité de travailler avec Mang Production ?",
    a: "Oui, c'est une possibilité. Les étudiants qui se distinguent par leur niveau, leur implication et leur professionnalisme pourront être amenés à collaborer avec Mang Production sur des projets réels, selon les besoins du studio et les opportunités disponibles.\nNous cherchons avant tout à former des artistes avec lesquels nous aurions nous-mêmes envie de travailler.",
  },
  {
    q: "Est-ce que vous recommandez vos meilleurs élèves ?",
    a: "Absolument. Lorsque nous recevons des demandes de recrutement ou de freelances provenant de nos partenaires, nous privilégions naturellement les étudiants qui ont démontré un excellent niveau tout au long de la formation.\nNotre réussite passe aussi par celle de nos élèves.",
  },
  {
    q: "Vais-je être prêt à intégrer une agence créative ?",
    a: "C'est précisément l'objectif du Bootcamp. Vous apprendrez les méthodes de production, l'organisation, la direction artistique, les contraintes clients et les workflows utilisés quotidiennement dans les studios.\nVous ne sortirez pas simplement avec des connaissances théoriques, mais avec une véritable expérience de production.",
  },
  {
    q: "Pourquoi suivre un Bootcamp plutôt qu'apprendre seul ?",
    a: "Parce qu'apprendre seul demande souvent plusieurs années d'essais, d'erreurs et de recherches. Au sein de Tendril School, vous bénéficiez d'une méthode structurée, de retours quotidiens et de l'accompagnement de professionnels qui produisent chaque semaine des campagnes pour de grandes marques.\nVous progressez plus vite, évitez les erreurs les plus fréquentes et développez directement les compétences recherchées par le marché.",
  },
  {
    q: "Que se passe-t-il après le Bootcamp ?",
    a: "La fin de la formation n'est pas une fin, mais le début de votre carrière. Selon votre profil, plusieurs opportunités pourront s'offrir à vous :\n• intégrer Mang Production si une opportunité correspond à votre profil\n• être recommandé auprès d'agences créatives partenaires\n• travailler en freelance pour des studios ou des marques\n• rejoindre une équipe interne chez un annonceur\n• ou développer votre propre activité\nNotre ambition est de former des artistes capables d'être opérationnels dès leur sortie de formation et de leur ouvrir les portes de l'industrie créative.",
  },
];
