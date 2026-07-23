import ProgrammesView from "@/components/ProgrammesView";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Programmes · Bootcamp 3D Novice & Avancé | Luxe & Cosmétique",
  description:
    "Deux bootcamps 3D intensifs de 12 semaines : Novice pour débuter, Avancé pour viser l'agence. Modélisation, lighting, simulation FX et compositing appliqués au luxe et à la cosmétique.",
  path: "/programmes",
  ogTitle: "Deux Bootcamps 3D, un Métier",
  ogHighlight: "BOOTCAMPS",
  keywords: [
    "bootcamp 3D novice",
    "bootcamp 3D avancé",
    "formation modélisation 3D",
    "formation lighting 3D",
    "formation simulation FX",
    "formation compositing 3D",
    "formation texturing 3D",
    "formation direction artistique 3D",
  ],
});

export default function ProgrammesPage() {
  return <ProgrammesView />;
}
