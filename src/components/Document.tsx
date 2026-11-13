import { Inter, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollReveal from "@/components/ScrollReveal";
import { content } from "@/content";
import type { Locale } from "@/content/types";
import { buildPersonJsonLd } from "@/lib/json-ld";

import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

interface DocumentProps {
  locale: Locale;
  children: ReactNode;
}

export default function Document({ locale, children }: DocumentProps) {
  const t = content[locale];
  const jsonLd = JSON.stringify(buildPersonJsonLd(locale)).replace(
    /</g,
    "\\u003c",
  );

  return (
    <html
      lang={locale === "es" ? "es-AR" : "en"}
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-canvas text-fg antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if('IntersectionObserver' in window){document.documentElement.dataset.js='1'}",
          }}
        />
        <a href="#main" className="skip-link">
          {t.ui.skipToContent}
        </a>
        <div className="page-glow" aria-hidden="true" />
        <ScrollReveal />
        <Header locale={locale} />
        <main
          id="main"
          tabIndex={-1}
          className="relative z-10 mx-auto w-full max-w-[760px] px-6 pb-24 pt-36 outline-none sm:px-8 md:pt-40"
        >
          {children}
        </main>
        <Footer locale={locale} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      </body>
    </html>
  );
}
