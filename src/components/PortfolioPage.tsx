import type { Locale } from "@/content/types";

import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Education from "@/components/sections/Education";
import Experience from "@/components/sections/Experience";
import Extras from "@/components/sections/Extras";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Stack from "@/components/sections/Stack";

export default function PortfolioPage({ locale }: { locale: Locale }) {
  return (
    <>
      <Hero locale={locale} />
      <About locale={locale} />
      <Experience locale={locale} />
      <Stack locale={locale} />
      <Projects locale={locale} />
      <Education locale={locale} />
      <Extras locale={locale} />
      <Contact locale={locale} />
    </>
  );
}
