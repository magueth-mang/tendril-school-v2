import HomeView from "@/components/HomeView";
import { buildMetadata, jsonLd } from "@/lib/seo";
import { faqs } from "@/data/home";

export const metadata = buildMetadata({
  title: "Tendril School · École 3D du Luxe & de la Cosmétique | Bootcamp CGI Paris",
  description:
    "Formez-vous à la 3D publicitaire pour le luxe et la cosmétique. Bootcamps intensifs en ligne à Paris, campagnes inspirées de Lancôme, Kérastase et Vichy, fondés par les artistes de Mang Production. Candidatures ouvertes.",
  path: "/",
  ogTitle: "École 3D du Luxe & de la Cosmétique",
  ogHighlight: "LUXE",
  keywords: [
    "école 3D Paris",
    "bootcamp CGI en ligne",
    "formation modélisation 3D",
    "3D beauté",
    "3D parfumerie",
    "école 3D beauté",
    "formation artiste 3D",
    "3D publicité luxe",
    "portfolio 3D luxe",
    "Lancôme",
    "Kérastase",
    "Vichy",
  ],
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(faqSchema)}
      />
      <HomeView />
    </>
  );
}
