import { ArrowUpRight, Download, Mail, MapPin } from "lucide-react";

import { content, cvPath, profile } from "@/content";
import type { Locale } from "@/content/types";

export default function Hero({ locale }: { locale: Locale }) {
  const t = content[locale];
  const hero = t.hero;

  return (
    <section id="top" aria-labelledby="hero-title">
      <p className="hero-enter flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
        <span aria-hidden="true" className="size-[3px] rounded-full bg-faint" />
        {hero.eyebrow}
      </p>

      <h1
        id="hero-title"
        style={{ animationDelay: "60ms" }}
        className="hero-enter mt-7 flex flex-col gap-2.5 font-medium tracking-[-0.045em]"
      >
        <span className="text-[clamp(1rem,2.6vw,1.6rem)] font-normal leading-none tracking-[-0.01em] text-dim">
          {hero.greeting}
        </span>{" "}
        <span className="text-balance text-[clamp(2.4rem,7.2vw,3.75rem)] leading-[1.02] text-fg">
          {profile.name}
          <span className="text-faint">.</span>
        </span>
      </h1>

      <p
        style={{ animationDelay: "120ms" }}
        className="hero-enter mt-7 max-w-[44ch] text-[17px] leading-[1.6] tracking-[-0.01em] text-fg/85 sm:text-[18px]"
      >
        {hero.subtitle}
      </p>

      <p
        style={{ animationDelay: "180ms" }}
        className="hero-enter mt-5 max-w-[62ch] text-[14.5px] leading-[1.85] text-faint sm:text-[15px]"
      >
        {hero.description}
      </p>

      <div
        style={{ animationDelay: "240ms" }}
        className="hero-enter mt-9 flex flex-wrap items-center gap-x-7 gap-y-4"
      >
        <a
          href={profile.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 border-b border-line pb-1.5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-dim transition-colors duration-300 hover:border-fg/30 hover:text-fg"
        >
          <ArrowUpRight
            className="size-3.5 text-faint transition-colors duration-300 group-hover:text-dim"
            aria-hidden="true"
          />
          LinkedIn
        </a>
        <a
          href={`mailto:${profile.email}`}
          className="group inline-flex items-center gap-2 border-b border-line pb-1.5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-dim transition-colors duration-300 hover:border-fg/30 hover:text-fg"
        >
          <Mail
            className="size-3.5 text-faint transition-colors duration-300 group-hover:text-dim"
            aria-hidden="true"
          />
          Email
        </a>
        <a
          href={cvPath(locale)}
          download
          aria-label={t.ui.downloadCvAria}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.02] px-4 py-2 font-mono text-[10.5px] uppercase tracking-[0.1em] text-fg transition-colors duration-300 hover:border-line-strong hover:bg-white/[0.05]"
        >
          <Download className="size-3.5 text-dim" aria-hidden="true" />
          {t.ui.downloadCv}
        </a>
      </div>

      <div
        style={{ animationDelay: "300ms" }}
        className="hero-enter mt-14 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-line pt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-faint"
      >
        <span className="inline-flex items-center gap-2">
          <MapPin className="size-3" aria-hidden="true" />
          {hero.meta.location}
        </span>
        <span className="inline-flex items-center gap-2">
          <span aria-hidden="true" className="size-1 rounded-full bg-dim/80" />
          {hero.meta.current}
        </span>
      </div>
    </section>
  );
}
