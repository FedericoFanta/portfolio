import { ArrowUp } from "lucide-react";

import { content } from "@/content";
import type { Locale } from "@/content/types";

export default function Footer({ locale }: { locale: Locale }) {
  const t = content[locale];

  return (
    <footer className="relative z-10 border-t border-line">
      <div className="mx-auto flex w-full max-w-[760px] flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="font-mono text-[10.5px] tracking-[0.06em] text-faint">
          {t.footer.rights}
        </p>
        <div className="flex items-center justify-between gap-6 font-mono text-[10.5px] tracking-[0.06em] text-faint sm:justify-end">
          <span>{t.footer.location}</span>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-fg"
          >
            {t.ui.backToTop}
            <ArrowUp className="size-3" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
