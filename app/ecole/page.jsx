import EcoleView from "@/components/EcoleView";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "L'École · Formation 3D Luxe & Cosmétique par Mang Production",
  description:
    "Tendril School, l'école de modélisation 3D dédiée au luxe et à la cosmétique. Fondée à Paris par les artistes 3D de Mang Production. Méthode, mentors et podcast.",
  path: "/ecole",
  ogTitle: "L'École 3D du Luxe & de la Cosmétique",
  ogHighlight: "COSMÉTIQUE",
  keywords: [
    "école 3D luxe",
    "école CGI cosmétique",
    "Mang Production",
    "formation artiste 3D",
    "podcast 3D",
    "école 3D Paris",
    "3D parfumerie",
    "devenir artiste 3D",
  ],
});

export default function EcolePage() {
  return <EcoleView />;
}
