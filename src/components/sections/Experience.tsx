import { content } from "@/content";
import type { Locale } from "@/content/types";
import Section from "@/components/ui/Section";

export default function Experience({ locale }: { locale: Locale }) {
  const t = content[locale];

  return (
    <Section id="experience" index="02" label={t.experience.label}>
      <div className="space-y-5">
        {t.experience.items.map((item) => (
          <article
            key={`${item.company}-${item.role}`}
            className="relative overflow-hidden rounded-lg border border-line bg-gradient-to-b from-white/[0.028] to-white/[0.008] p-6 sm:p-8"
          >
            <span
              aria-hidden="true"
              className="absolute inset-y-6 left-0 w-px bg-fg/25"
            />

            <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
              <div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <h3 className="text-[19px] font-medium tracking-[-0.02em] text-fg">
                    {item.company}
                  </h3>
                  {item.current ? (
                    <span className="chip">
                      <span
                        aria-hidden="true"
                        className="size-1 rounded-full bg-fg/60"
                      />
                      {t.ui.current}
                    </span>
                  ) : null}
                </div>
                <p className="mt-1.5 text-[14px] text-dim">{item.role}</p>
              </div>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-faint">
                {item.period}
              </p>
            </div>

            <ul className="mt-7 grid gap-x-10 gap-y-3 border-t border-line pt-6 sm:grid-cols-2">
              {item.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex gap-3 text-[13px] leading-[1.7] text-faint sm:text-[13.5px]"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.72em] h-px w-2.5 shrink-0 bg-faint/50"
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
