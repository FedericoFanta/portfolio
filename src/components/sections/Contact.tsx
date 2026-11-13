import { ArrowUpRight, Mail } from "lucide-react";

import { content, profile } from "@/content";
import type { Locale } from "@/content/types";
import Section from "@/components/ui/Section";
import { cn } from "@/lib/cn";

interface FieldProps {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}

function Field({ label, value, href, external }: FieldProps) {
  return (
    <div className="border-t border-line py-4">
      <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
        {label}
      </dt>
      <dd className="mt-1.5 text-[14px] text-dim">
        {href ? (
          <a
            href={href}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className={cn(
              "inline-flex items-baseline gap-1.5 border-b border-transparent pb-0.5 transition-colors duration-300 hover:border-line-strong hover:text-fg",
            )}
          >
            {value}
            {external ? (
              <ArrowUpRight
                className="size-3 self-center text-faint"
                aria-hidden="true"
              />
            ) : null}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}

export default function Contact({ locale }: { locale: Locale }) {
  const t = content[locale];

  return (
    <Section id="contact" index="07" label={t.contact.label}>
      <div className="max-w-[58ch]">
        <h3 className="text-balance text-[clamp(1.4rem,4.2vw,1.85rem)] font-medium leading-[1.35] tracking-[-0.03em] text-fg">
          {t.contact.title}
        </h3>
        <p className="mt-4 text-[14.5px] leading-[1.8] text-faint">
          {t.contact.description}
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="mt-7 inline-flex items-center gap-2.5 rounded-full bg-fg px-5 py-2.5 text-[13px] font-medium text-canvas transition-colors duration-300 hover:bg-white"
        >
          <Mail className="size-4" aria-hidden="true" />
          {t.contact.cta}
        </a>
      </div>

      <dl className="mt-12 grid gap-x-10 sm:grid-cols-2">
        <Field
          label={t.contact.fields.email}
          value={profile.email}
          href={`mailto:${profile.email}`}
        />
        <Field
          label={t.contact.fields.linkedin}
          value={profile.linkedinLabel}
          href={profile.linkedinUrl}
          external
        />
        <Field
          label={t.contact.fields.location}
          value={profile.location}
        />
        <Field
          label={t.contact.fields.phone}
          value={profile.phone}
          href={`tel:${profile.phoneHref}`}
        />
      </dl>
    </Section>
  );
}
