import Link from "next/link";

import { localePath } from "@/content";
import type { Locale } from "@/content/types";
import { cn } from "@/lib/cn";

interface LanguageToggleProps {
  locale: Locale;
  label: string;
}

export default function LanguageToggle({ locale, label }: LanguageToggleProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className="relative flex shrink-0 items-center rounded-full border border-line bg-canvas/70 p-[3px] backdrop-blur-md"
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-[3px] top-[3px] bottom-[3px] w-9 rounded-full bg-fg/[0.08] transition-transform duration-300 ease-out",
          locale === "en" && "translate-x-9",
        )}
      />
      <Link
        href={localePath("es")}
        hrefLang="es-AR"
        aria-current={locale === "es" ? "page" : undefined}
        className={cn(
          "relative z-10 w-9 py-1 text-center font-mono text-[10.5px] tracking-[0.08em] transition-colors duration-300",
          locale === "es" ? "text-fg" : "text-faint hover:text-dim",
        )}
      >
        ES
      </Link>
      <Link
        href={localePath("en")}
        hrefLang="en"
        aria-current={locale === "en" ? "page" : undefined}
        className={cn(
          "relative z-10 w-9 py-1 text-center font-mono text-[10.5px] tracking-[0.08em] transition-colors duration-300",
          locale === "en" ? "text-fg" : "text-faint hover:text-dim",
        )}
      >
        EN
      </Link>
    </div>
  );
}
