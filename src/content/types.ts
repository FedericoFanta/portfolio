export type Locale = "es" | "en";

export interface NavItem {
  id: string;
  label: string;
}

export interface Profile {
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  phoneHref: string;
  linkedinLabel: string;
  linkedinUrl: string;
  company: string;
  companyUrl: string;
  cv: Record<Locale, string>;
}

export interface LocaleContent {
  meta: {
    title: string;
    description: string;
    keywords: string[];
    ogLocale: string;
    ogLocaleAlternate: string;
  };
  ui: {
    skipToContent: string;
    languageLabel: string;
    menuOpen: string;
    menuClose: string;
    menuLabel: string;
    externalLink: string;
    current: string;
    downloadCv: string;
    downloadCvAria: string;
    backToTop: string;
    placeholder: string;
    nav: NavItem[];
  };
  hero: {
    eyebrow: string;
    greeting: string;
    subtitle: string;
    description: string;
    meta: {
      location: string;
      current: string;
    };
  };
  about: {
    label: string;
    paragraphs: string[];
    focus: string[];
  };
  experience: {
    label: string;
    items: Array<{
      company: string;
      role: string;
      period: string;
      current: boolean;
      bullets: string[];
    }>;
  };
  stack: {
    label: string;
    groups: Array<{ label: string; items: string[] }>;
  };
  projects: {
    label: string;
    note: string;
    items: Array<{
      title: string;
      description: string;
      tags: string[];
      placeholder: boolean;
    }>;
  };
  education: {
    label: string;
    items: Array<{
      institution: string;
      degree: string;
      period: string;
    }>;
  };
  extras: {
    label: string;
    certificationsLabel: string;
    languagesLabel: string;
    certifications: string[];
    languages: Array<{ name: string; level: string }>;
  };
  contact: {
    label: string;
    title: string;
    description: string;
    cta: string;
    fields: {
      email: string;
      linkedin: string;
      location: string;
      phone: string;
    };
  };
  footer: {
    rights: string;
    location: string;
  };
  cv: {
    title: string;
    subtitle: string;
    profileLabel: string;
    profile: string;
    experienceLabel: string;
    stackLabel: string;
    educationLabel: string;
    certificationsLabel: string;
    languagesLabel: string;
    footer: string;
  };
}
