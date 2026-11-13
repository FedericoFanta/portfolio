import type { Locale } from "@/content/types";
import { content, profile } from "@/content";
import { SITE_URL } from "@/lib/site";

export function buildPersonJsonLd(locale: Locale) {
  const t = content[locale];
  const technologies = Array.from(
    new Set([
      ...t.stack.groups.flatMap((group) => group.items),
      "Agentic AI",
    ]),
  );

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: t.cv.title,
    description: t.meta.description,
    url: SITE_URL,
    image: `${SITE_URL}/og.png`,
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mar del Plata",
      addressRegion: "Buenos Aires",
      addressCountry: "AR",
    },
    worksFor: {
      "@type": "Organization",
      name: profile.company,
      url: profile.companyUrl,
    },
    alumniOf: t.education.items.map((item) => ({
      "@type": "EducationalOrganization",
      name: item.institution,
    })),
    knowsAbout: technologies,
    knowsLanguage: [
      { "@type": "Language", name: "Spanish", alternateName: "es" },
      { "@type": "Language", name: "English", alternateName: "en" },
    ],
    sameAs: [profile.linkedinUrl],
  };
}
