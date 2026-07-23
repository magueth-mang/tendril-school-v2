import BootcampTemplate from "@/components/BootcampTemplate";
import { novice } from "@/data/novice";
import { buildMetadata, jsonLd, SITE_URL, SITE_NAME } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Bootcamp Novice · Formation 3D Débutant | Publicité Luxe & Beauté",
  description:
    "12 semaines pour passer de débutant complet à un premier portfolio crédible dans la beauté et le luxe. Modélisation, lighting, animation 3D. Aucun prérequis.",
  path: "/programmes/bootcamp-novice",
  ogTitle: "Bootcamp Novice · Formation 3D Débutant",
  ogHighlight: "DÉBUTANT",
  keywords: [
    "formation 3D débutant",
    "apprendre la 3D sans prérequis",
    "bootcamp 3D beauté",
    "reconversion 3D",
    "école 3D sans prérequis",
    "formation 3D beauté débutant",
    "premier portfolio 3D",
    "formation Blender débutant",
  ],
});

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Bootcamp Novice · Tendril School",
  description:
    "Formation intensive de 12 semaines en modélisation, texturing, lighting et animation 3D appliqués à la publicité de luxe et cosmétique. Aucun prérequis.",
  provider: { "@type": "Organization", name: SITE_NAME, sameAs: SITE_URL },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "online",
    courseWorkload: "P12W",
  },
  offers: {
    "@type": "Offer",
    price: "5900",
    priceCurrency: "EUR",
    category: "Formation professionnelle",
    availability: "https://schema.org/InStock",
  },
};

export default function NovicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(courseSchema)}
      />
      <BootcampTemplate data={novice} />
    </>
  );
}
