import LegalView from "@/components/LegalView";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Informations légales",
  description:
    "Mentions légales, conditions d'utilisation, politique de confidentialité et gestion des cookies de Tendril School.",
  path: "/legal",
  ogTitle: "Informations légales",
});

export default function LegalPage() {
  return <LegalView />;
}
