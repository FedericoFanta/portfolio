import { content } from "@/content";
import type { Locale } from "@/content/types";
import Section from "@/components/ui/Section";

export default function Projects({ locale }: { locale: Locale }) {
  const t = content[locale];

  if (t.projects.items.length === 0) return null;

  return (
    <Section id="projects" index="04" label={t.projects.label}>
      <div className="space-y-3">
        {t.projects.items.map((project) => (
          <article
            key={project.title}
            className="project-card group relative overflow-hidden rounded-lg border border-dashed border-line"
          >
            <div
              className={
                project.image ? "sm:grid sm:grid-cols-[236px_1fr]" : undefined
              }
            >
              {project.image ? (
                <div className="project-media relative h-44 overflow-hidden border-b border-line sm:h-auto sm:min-h-[168px] sm:border-b-0 sm:border-r">
                  <img
                    src={project.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    style={{
                      objectPosition: project.imagePosition ?? "center",
                    }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-canvas via-canvas/25 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-25 sm:bg-gradient-to-r sm:from-transparent sm:via-canvas/5 sm:to-canvas/70"
                  />
                </div>
              ) : null}

              <div className="px-5 py-5 sm:px-6">
                <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                  <h3 className="text-[15.5px] font-medium text-dim transition-colors duration-300 group-hover:text-fg">
                    {project.title}
                  </h3>
                  {project.placeholder ? (
                    <span className="inline-flex items-center rounded-full border border-line px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.12em] text-faint">
                      {t.ui.placeholder}
                    </span>
                  ) : null}
                </div>
                <p className="mt-2 max-w-[58ch] text-[13.5px] leading-[1.7] text-faint">
                  {project.description}
                </p>
                <p className="mt-3 font-mono text-[10.5px] tracking-[0.04em] text-faint">
                  {project.tags.join(" · ")}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-4 max-w-[62ch] text-[11.5px] leading-[1.7] text-faint">
        {t.projects.note}
      </p>
    </Section>
  );
}
