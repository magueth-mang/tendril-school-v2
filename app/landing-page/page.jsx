import LandingView from "@/components/LandingView";
import { buildMetadata } from "@/lib/seo";

// Campaign landing page (paid traffic) · kept out of the index so it never
// competes with the home page for the same search queries.
export const metadata = buildMetadata({
  title: "Candidature Janvier 2027 · Tendril School",
  description:
    "Formez-vous à la 3D du luxe en 12 semaines avec les artistes de Mang Production. Bootcamps intensifs, portfolio de niveau agence. Candidatures ouvertes.",
  path: "/landing-page",
  ogTitle: "Candidatures Ouvertes · Session Janvier 2027",
  ogHighlight: "OUVERTES",
  noindex: true,
});

export default function LandingPage() {
  return <LandingView />;
}
