import { Archivo, Space_Mono } from "next/font/google";
import "./globals.css";
import PodcastProvider from "@/components/PodcastProvider";
import { SITE_URL, SITE_NAME, buildMetadata, jsonLd } from "@/lib/seo";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tendril School · École 3D du Luxe & de la Cosmétique | Bootcamp CGI Paris",
    template: "%s · Tendril School",
  },
  ...buildMetadata({
    title: "Tendril School · École 3D du Luxe & de la Cosmétique | Bootcamp CGI Paris",
    description:
      "L'école de modélisation 3D dédiée au luxe et à la cosmétique. Bootcamps intensifs en ligne, campagnes inspirées de Lancôme, Kérastase et Vichy, fondée par les artistes de Mang Production. Candidatures ouvertes.",
    path: "/",
    ogHighlight: "LUXE",
    keywords: [
      "école 3D Paris",
      "bootcamp CGI",
      "formation modélisation 3D",
      "3D beauté",
      "artiste 3D luxe",
      "école 3D beauté",
      "formation artiste 3D",
      "3D publicité luxe",
      "Lancôme",
      "Kérastase",
      "Vichy",
    ],
  }),
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: SITE_NAME,
  alternateName: "TENDRIL CLUB",
  url: SITE_URL,
  logo: `${SITE_URL}/tendril-mark.png`,
  description:
    "École de modélisation 3D spécialisée dans le luxe et la cosmétique. Bootcamps intensifs en ligne fondés par les artistes 3D de Mang Production.",
  email: "contact@tendril-school.com",
  telephone: "+33664546616",
  address: {
    "@type": "PostalAddress",
    streetAddress: "25 rue de Ponthieu",
    postalCode: "75008",
    addressLocality: "Paris",
    addressCountry: "FR",
  },
  areaServed: "FR",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${archivo.variable} ${spaceMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(organizationSchema)}
        />
        <PodcastProvider>{children}</PodcastProvider>
      </body>
    </html>
  );
}
