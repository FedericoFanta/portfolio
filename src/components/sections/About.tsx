import { content } from "@/content";
import type { Locale } from "@/content/types";
import Section from "@/components/ui/Section";

export default function About({ locale }: { locale: Locale }) {
  const t = content[locale];

  return (
    <Section id="about" index="01" label={t.about.label}>
      <div className="space-y-5">
        {t.about.paragraphs.map((paragraph, index) => (
          <p
            key={paragraph}
            className={
              index === 0
                ? "max-w-[58ch] text-[16px] leading-[1.8] text-fg/90 sm:text-[16.5px]"
                : "max-w-[62ch] text-[14.5px] leading-[1.85] text-dim sm:text-[15px]"
            }
          >
            {paragraph}
          </p>
        ))}
      </div>

      <ul className="mt-10 grid gap-3 border-t border-line pt-6 sm:grid-cols-3">
        {t.about.focus.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-faint"
          >
            <span aria-hidden="true" className="size-[3px] bg-faint/70" />
            {item}
          </li>
        ))}
      </ul>
    </Section>
  );
}
