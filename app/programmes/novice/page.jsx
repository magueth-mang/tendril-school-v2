import BootcampTemplate from "@/components/BootcampTemplate";
import { novice } from "@/data/novice";

export const metadata = {
  title: "Bootcamp Novice — Tendril School",
  description:
    "12 semaines pour passer de débutant complet à un premier portfolio crédible dans la beauté et le luxe.",
};

export default function NovicePage() {
  return <BootcampTemplate data={novice} />;
}
