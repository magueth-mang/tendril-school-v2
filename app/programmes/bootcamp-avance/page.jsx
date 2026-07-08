import BootcampTemplate from "@/components/BootcampTemplate";
import { avance } from "@/data/avance";

export const metadata = {
  title: "Bootcamp Avancé — Tendril School",
  description:
    "12 semaines pour devenir un artiste 3D spécialisé dans la publicité de luxe, niveau agence.",
};

export default function AvancePage() {
  return <BootcampTemplate data={avance} />;
}
