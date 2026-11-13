import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface SectionProps {
  id: string;
  index: string;
  label: string;
  children: ReactNode;
  className?: string;
}

export default function Section({
  id,
  index,
  label,
  children,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      data-reveal
      className={cn("mt-28 md:mt-36", className)}
    >
      <div className="mb-9 flex items-center gap-4 sm:mb-11">
        <span
          aria-hidden="true"
          className="font-mono text-[10px] tracking-[0.12em] text-faint"
        >
          {index}
        </span>
        <h2
          id={`${id}-title`}
          className="font-mono text-[10.5px] font-normal uppercase tracking-[0.18em] text-dim"
        >
          {label}
        </h2>
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
      </div>
      {children}
    </section>
  );
}
