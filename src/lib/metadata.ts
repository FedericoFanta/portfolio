import type { Metadata } from "next";

import { content, profile } from "@/content";
import type { Locale } from "@/content/types";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export function buildMetadata(locale: Locale): Metadata {
  const t = content[locale];
  const path = locale === "es" ? "/" : "/en/";
  const title = t.meta.title;
  const description = t.meta.description;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords: t.meta.keywords,
    authors: [{ name: profile.name, url: SITE_URL }],
    creator: profile.name,
    publisher: profile.name,
    alternates: {
      canonical: path,
      languages: {
        "es-AR": "/",
        en: "/en/",
        "x-default": "/",
      },
    },
    openGraph: {
      type: "profile",
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: t.meta.ogLocale,
      alternateLocale: t.meta.ogLocaleAlternate,
      firstName: "Federico",
      lastName: "Fantacone",
      username: "federicofantacone",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: `${profile.name} — Semi-Senior Full Stack Developer`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
    category: "technology",
  };
}
