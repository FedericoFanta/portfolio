import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

// Necesario para que la ruta se genere como archivo estático en `output: "export"`.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
