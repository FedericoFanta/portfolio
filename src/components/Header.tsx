"use client";

import { Download, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import LanguageToggle from "@/components/LanguageToggle";
import { content, cvPath, localePath, profile } from "@/content";
import type { Locale } from "@/content/types";
import { cn } from "@/lib/cn";

interface HeaderProps {
  locale: Locale;
}

export default function Header({ locale }: HeaderProps) {
  const t = content[locale];
  const nav = t.ui.nav;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = nav
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!("IntersectionObserver" in window) || sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-42% 0px -52% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [nav]);

  useEffect(() => {
    if (!open) return;

    const firstLink = panelRef.current?.querySelector<HTMLAnchorElement>("a");
    firstLink?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButtonRef.current?.focus();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (query.matches) setOpen(false);
    };

    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "border-b transition-colors duration-300",
          scrolled || open
            ? "border-line bg-canvas/80 backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-[760px] items-center justify-between gap-4 px-6 sm:px-8">
          <a
            href="#top"
            className="group shrink-0 text-[13px] font-medium tracking-[-0.01em] text-fg"
            aria-label={`${profile.name} — ${locale === "es" ? "inicio" : "home"}`}
          >
            {profile.name}
            <span className="text-faint transition-colors duration-300 group-hover:text-dim">
              .
            </span>
          </a>

          <nav
            aria-label={t.ui.menuLabel}
            className="hidden items-center gap-6 md:flex"
          >
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={active === item.id ? "location" : undefined}
                className={cn(
                  "font-mono text-[10.5px] uppercase tracking-[0.12em] transition-colors duration-300 hover:text-fg",
                  active === item.id ? "text-fg" : "text-faint",
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageToggle locale={locale} label={t.ui.languageLabel} />
            <button
              ref={menuButtonRef}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? t.ui.menuClose : t.ui.menuOpen}
              onClick={() => setOpen((value) => !value)}
              className="flex size-8 items-center justify-center rounded-full border border-line text-dim transition-colors duration-300 hover:border-line-strong hover:text-fg md:hidden"
            >
              {open ? (
                <X className="size-[15px]" aria-hidden="true" />
              ) : (
                <Menu className="size-[15px]" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {open ? (
          <div
            ref={panelRef}
            id="mobile-nav"
            className="border-t border-line bg-canvas/95 px-6 pb-5 pt-2 backdrop-blur-xl sm:px-8 md:hidden max-h-[calc(100dvh-4rem)] overflow-y-auto"
          >
            <nav aria-label={t.ui.menuLabel}>
              {nav.map((item, index) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between border-b border-line/70 py-3.5 transition-colors duration-300 last:border-b-0"
                >
                  <span className="text-[14.5px] text-dim">{item.label}</span>
                  <span
                    aria-hidden="true"
                    className="font-mono text-[10px] tracking-[0.1em] text-faint"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </a>
              ))}
            </nav>
            <div className="mt-4 flex items-center justify-between border-t border-line pt-4 font-mono text-[10.5px] uppercase tracking-[0.08em] text-faint">
              <a
                href={`mailto:${profile.email}`}
                className="transition-colors duration-300 hover:text-fg"
              >
                Email
              </a>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 hover:text-fg"
              >
                LinkedIn
              </a>
              <a
                href={cvPath(locale)}
                download
                className="inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-fg"
              >
                <Download className="size-3" aria-hidden="true" />
                {t.ui.downloadCv}
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
