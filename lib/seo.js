export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://tendril-school.com";
export const SITE_NAME = "Tendril School";

// Reused across pages, extended with page-specific terms via buildMetadata().
export const BASE_KEYWORDS = [
  "école 3D",
  "bootcamp 3D",
  "formation 3D",
  "formation 3D en ligne",
  "formation 3D à distance",
  "formation Blender",
  "école CGI",
  "formation CGI Paris",
  "3D luxe",
  "3D cosmétique",
  "3D beauté",
  "3D parfumerie",
  "modélisation 3D publicitaire",
  "packshot 3D",
  "CGI publicitaire",
  "devenir artiste 3D",
  "reconversion 3D",
  "portfolio 3D",
  "Tendril School",
  "Mang Production",
];

/**
 * Builds a full Next.js metadata object (title, description, keywords,
 * canonical, Open Graph, Twitter) from a small per-page config. `ogTitle`
 * lets the branded OG card show a shorter line than the <title> tag.
 */
export function buildMetadata({
  title,
  description,
  path = "",
  keywords = [],
  ogTitle,
  ogHighlight,
  noindex = false,
}) {
  const url = `${SITE_URL}${path}`;
  const ogImageParams = new URLSearchParams({ title: ogTitle || title });
  if (ogHighlight) ogImageParams.set("highlight", ogHighlight);
  const image = `${SITE_URL}/api/og?${ogImageParams.toString()}`;

  return {
    title,
    description,
    keywords: [...BASE_KEYWORDS, ...keywords],
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "fr_FR",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function jsonLd(data) {
  return {
    __html: JSON.stringify(data),
  };
}
