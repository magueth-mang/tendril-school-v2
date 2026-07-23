import BootcampTemplate from "@/components/BootcampTemplate";
import { avance } from "@/data/avance";
import { buildMetadata, jsonLd, SITE_URL, SITE_NAME } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Bootcamp Avancé · Formation 3D Production Publicitaire | Niveau Agence",
  description:
    "12 semaines pour devenir un artiste 3D spécialisé dans la publicité de luxe, niveau agence. Simulation FX, compositing, direction artistique, briefs clients réels.",
  path: "/programmes/bootcamp-avance",
  ogTitle: "Bootcamp Avancé · Formation 3D Niveau Agence",
  ogHighlight: "AGENCE",
  keywords: [
    "formation 3D avancée",
    "bootcamp simulation FX",
    "formation compositing 3D",
    "3D publicité luxe niveau agence",
    "formation lighting 3D avancé",
    "artiste 3D freelance luxe",
    "portfolio 3D niveau agence",
  ],
});

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Bootcamp Avancé · Tendril School",
  description:
    "Formation intensive de 12 semaines en modélisation avancée, shading, simulation FX, compositing et direction artistique pour la publicité de luxe, niveau agence.",
  provider: { "@type": "Organization", name: SITE_NAME, sameAs: SITE_URL },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "online",
    courseWorkload: "P12W",
  },
  offers: {
    "@type": "Offer",
    price: "7900",
    priceCurrency: "EUR",
    category: "Formation professionnelle",
    availability: "https://schema.org/InStock",
  },
};

export default function AvancePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(courseSchema)}
      />
      <BootcampTemplate data={avance} />
    </>
  );
}
