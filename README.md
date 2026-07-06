# Tendril School

Site vitrine de Tendril School — bootcamp de modélisation 3D spécialisé dans le luxe, la mode et le cosmétique. Construit en Next.js (App Router), animé avec GSAP, prêt à déployer sur Vercel.

## Stack

- **Next.js 16** (App Router, React 18)
- **GSAP** (`ScrollTrigger`) pour les animations au scroll et l'accordéon FAQ
- **CSS Modules** — un fichier de style par page/composant, pas de framework CSS
- **next/font** pour Archivo (titres) et Space Mono (labels)

## Structure

```
app/                      routes (App Router) — un page.jsx léger par route, qui rend un composant "*View"
  page.jsx                /
  programmes/page.jsx     /programmes
  programmes/novice/      /programmes/novice
  programmes/avance/      /programmes/avance
  ecole/page.jsx          /ecole
  contact/page.jsx        /contact
  candidature/page.jsx    /candidature (dossier en 6 étapes)
  legal/page.jsx          /legal (mentions, CGU, confidentialité, cookies)

components/               composants React + leur CSS module associé
  Nav, Footer, Ticker, Faq, MediaFrame   composants partagés entre pages
  BootcampTemplate                       template commun aux pages Novice / Avancé
  *View.jsx                              logique + markup de chaque page

data/                      contenu (textes, listes de modules, etc.) séparé des composants
lib/useScrollFx.js         hook GSAP partagé (reveal au scroll, stagger, hero)
```

## Développement

```bash
npm install
npm run dev       # http://localhost:3000
npm run build
npm run start
npm run lint
```

## Déploiement

Le projet n'a besoin d'aucune variable d'environnement. Sur Vercel : importer le repo, framework "Next.js" détecté automatiquement, aucune configuration supplémentaire.

Les formulaires (contact, candidature) sont côté client uniquement — ils valident et affichent un écran de confirmation, mais n'envoient les données à aucun service. Pour un vrai envoi (email, CRM…), brancher une route API dans `app/`.
