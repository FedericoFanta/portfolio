import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import Document from "@/components/Document";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("es");

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

export default function SpanishLayout({ children }: { children: ReactNode }) {
  return <Document locale="es">{children}</Document>;
}
