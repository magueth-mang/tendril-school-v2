import CandidatureView from "@/components/CandidatureView";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Candidature · Bootcamp 3D Janvier 2027",
  description:
    "Déposez votre dossier de candidature pour le Bootcamp Novice ou Avancé de Tendril School, école 3D spécialisée dans le luxe et la cosmétique. Sélection sur entretien, réponse sous 7 jours.",
  path: "/candidature",
  ogTitle: "Candidature · Session Janvier 2027",
  ogHighlight: "JANVIER 2027",
  keywords: ["candidater école 3D", "inscription bootcamp CGI"],
});

export default function CandidaturePage() {
  return <CandidatureView />;
}
