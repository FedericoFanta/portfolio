import { content } from "@/content";
import type { Locale } from "@/content/types";
import Section from "@/components/ui/Section";

export default function Stack({ locale }: { locale: Locale }) {
  const t = content[locale];

  return (
    <Section id="stack" index="03" label={t.stack.label}>
      <div className="border-y border-line">
        {t.stack.groups.map((group) => (
          <div
            key={group.label}
            className="grid gap-4 border-b border-line py-6 last:border-b-0 sm:grid-cols-[150px_1fr] sm:gap-8"
          >
            <h3 className="pt-1 font-mono text-[9px] uppercase tracking-[0.1em] text-faint">
              {group.label}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={`${group.label}-${item}`} className="tag">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
