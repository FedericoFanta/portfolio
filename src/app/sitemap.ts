import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

// Necesario para que la ruta se genere como archivo estático en `output: "export"`.
export const dynamic = "force-static";

const lastModified = new Date("2026-11-13");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          es: SITE_URL,
          en: `${SITE_URL}/en/`,
        },
      },
    },
    {
      url: `${SITE_URL}/en/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          es: SITE_URL,
          en: `${SITE_URL}/en/`,
        },
      },
    },
  ];
}
