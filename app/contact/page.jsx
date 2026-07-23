import ContactView from "@/components/ContactView";
import { buildMetadata, jsonLd } from "@/lib/seo";
import { faqs } from "@/data/contact";

export const metadata = buildMetadata({
  title: "Contact · École 3D à Paris",
  description:
    "Une question sur nos bootcamps 3D, le financement ou une candidature ? Écrivez à l'équipe de Tendril School, école 3D spécialisée dans le luxe et la cosmétique à Paris.",
  path: "/contact",
  ogTitle: "Écrivez-nous",
  ogHighlight: "NOUS",
  keywords: ["contact école 3D", "contact bootcamp CGI Paris"],
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

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(faqSchema)}
      />
      <ContactView />
    </>
  );
}
