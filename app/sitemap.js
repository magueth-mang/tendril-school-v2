import { SITE_URL } from "@/lib/seo";

// /landing-page is deliberately excluded — it's a paid-campaign page
// (noindex'd) that would otherwise duplicate the home page's content.
export default function sitemap() {
  const now = new Date();
  const routes = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/ecole", changeFrequency: "monthly", priority: 0.9 },
    { path: "/programmes", changeFrequency: "monthly", priority: 0.9 },
    { path: "/programmes/bootcamp-novice", changeFrequency: "monthly", priority: 0.8 },
    { path: "/programmes/bootcamp-avance", changeFrequency: "monthly", priority: 0.8 },
    { path: "/candidature", changeFrequency: "monthly", priority: 0.8 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
    { path: "/legal", changeFrequency: "yearly", priority: 0.2 },
  ];

  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
