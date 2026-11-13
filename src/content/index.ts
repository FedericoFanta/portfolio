import en from "./en.json";
import es from "./es.json";
import profileData from "./profile.json";
import type { Locale, LocaleContent, Profile } from "./types";

export const profile = profileData as Profile;

export const content: Record<Locale, LocaleContent> = {
  es: es as LocaleContent,
  en: en as LocaleContent,
};

export const locales = ["es", "en"] as const;

/** Root keeps Spanish at "/" and English under "/en". */
export const localePath = (locale: Locale) => (locale === "es" ? "/" : "/en/");

export const cvPath = (locale: Locale) => profile.cv[locale];

export const otherLocale = (locale: Locale): Locale => (locale === "es" ? "en" : "es");
