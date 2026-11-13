import { content } from "@/content";
import type { Locale } from "@/content/types";
import Section from "@/components/ui/Section";

export default function Education({ locale }: { locale: Locale }) {
  const t = content[locale];

  return (
    <Section id="education" index="05" label={t.education.label}>
      <ul className="border-t border-line">
        {t.education.items.map((item) => (
          <li
            key={`${item.institution}-${item.degree}`}
            className="grid gap-2 border-b border-line py-6 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8"
          >
            <div>
              <h3 className="text-[15.5px] font-medium tracking-[-0.01em] text-fg">
                {item.institution}
              </h3>
              <p className="mt-1.5 text-[13.5px] text-dim">{item.degree}</p>
            </div>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-faint">
              {item.period}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
