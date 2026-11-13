import { BadgeCheck } from "lucide-react";

import { content } from "@/content";
import type { Locale } from "@/content/types";
import Section from "@/components/ui/Section";

export default function Extras({ locale }: { locale: Locale }) {
  const t = content[locale];

  return (
    <Section id="extras" index="06" label={t.extras.label}>
      <div className="grid gap-10 sm:grid-cols-2 sm:gap-12">
        <div>
          <h3 className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
            {t.extras.certificationsLabel}
          </h3>
          <ul className="mt-4 space-y-3 border-t border-line pt-4">
            {t.extras.certifications.map((certification) => (
              <li
                key={certification}
                className="flex items-start gap-3 text-[13.5px] leading-[1.6] text-dim"
              >
                <BadgeCheck
                  className="mt-0.5 size-4 shrink-0 text-faint"
                  aria-hidden="true"
                />
                {certification}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
            {t.extras.languagesLabel}
          </h3>
          <ul className="mt-4 border-t border-line">
            {t.extras.languages.map((language) => (
              <li
                key={language.name}
                className="flex items-baseline justify-between gap-4 border-b border-line py-3 text-[13.5px]"
              >
                <span className="text-dim">{language.name}</span>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.06em] text-faint">
                  {language.level}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
