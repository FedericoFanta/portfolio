import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sitio 100% estático: `npm run build` genera la carpeta `out/` lista para
  // publicar en cualquier hosting de archivos (Netlify, Cloudflare Pages, etc.).
  output: "export",
  // URLs con barra final (/en/) para que el export funcione igual en cualquier
  // hosting de archivos estáticos.
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
