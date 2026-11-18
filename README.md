# Portfolio — Federico Fantacone

Portfolio profesional bilingüe (ES / EN) para **Federico Fantacone**, Semi-Senior Full Stack Developer especializado en .NET, C# y Microsoft Azure.

Diseño minimalista en dark mode, una sola columna de lectura, tipografía Inter + JetBrains Mono y animaciones sutiles de entrada.

## Stack

- **Next.js 16** (App Router, renderizado estático)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Lucide Icons**
- **pdf-lib** (generación del CV en PDF)

## Empezar

```bash
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

Para verificar tipos y compilar:

```bash
npm run typecheck
npm run build
```

El build genera la carpeta `out/` con el sitio estático listo para publicar. Para verla localmente:

```bash
npx serve out
```

## Idiomas y rutas

| Idioma | Ruta |
| --- | --- |
| Español (por defecto) | `/` |
| Inglés | `/en/` |

Cada idioma es una página estática con su propio `lang`, canonical, alternate `hreflang`, metadatos y JSON-LD. El selector ES / EN del header navega entre ambas rutas.

## Estructura

```text
src/
  app/
    (es)/                 Layout y página en español
    (en)/en/              Layout y página en inglés
    globals.css           Paleta, tipografía, reveal y estilos base
    icon.svg              Favicon
    robots.ts             robots.txt
    sitemap.ts            sitemap.xml
  components/
    Document.tsx          Documento raíz, fuentes, header, footer y JSON-LD
    Header.tsx            Navegación, menú mobile y sección activa
    LanguageToggle.tsx    Selector ES / EN
    ScrollReveal.tsx      Animaciones al entrar en viewport
    sections/             Hero, About, Experience, Stack, Projects, Education, Extras, Contact
    ui/Section.tsx        Encabezado de sección y helper de delays
  content/
    es.json               Todo el contenido en español
    en.json               Todo el contenido en inglés
    profile.json          Datos de contacto y rutas del CV
    types.ts              Tipos del contenido
  lib/                    Metadatos, JSON-LD, utilidades y URL del sitio
public/
  cv/                     CV en PDF (ES / EN)
  og.png                  Imagen para redes sociales
scripts/
  generate-cv.mjs         Genera los dos CV a partir de los JSON
```

## Editar contenido

Todo el texto vive en `src/content/`. No hace falta tocar componentes para cambiar copys, experiencia, stack o formación.

- **Español:** `src/content/es.json`
- **Inglés:** `src/content/en.json`
- **Datos personales, LinkedIn, email y CV:** `src/content/profile.json`

Si agregás una sección nueva, actualizá también los tipos en `src/content/types.ts`.

### Proyectos (placeholder)

La sección **Proyectos** está preparada para contenido propio y hoy muestra un ejemplo identificado con la etiqueta `EJEMPLO` / `SAMPLE`.

- Editá `projects.items` en `es.json` y `en.json`.
- Si vaciás la lista (`"items": []`), la sección desaparece por completo.
- El estilo de cada fila está en `src/components/sections/Projects.tsx`.

No se inventaron proyectos, clientes ni métricas: el contenido de ejemplo está marcado explícitamente como tal.

## CV en PDF

Los PDF se generan desde los mismos JSON del sitio, así el CV y la web nunca se desincronizan.

```bash
npm run generate:cv
```

Salidas:

- `public/cv/federico-fantacone-cv-es.pdf`
- `public/cv/federico-fantacone-cv-en.pdf`

Para cambiar el diseño o la estructura del CV, editá `scripts/generate-cv.mjs`. El script usa pdf-lib y fuentes estándar de PDF, por lo que no requiere binarios externos.

## SEO

- Metadatos por idioma, canonical, `hreflang` y `x-default`.
- Open Graph + Twitter Card con `public/og.png` (1200 × 630).
- JSON-LD `Person` con formación, empresa, tecnologías e idiomas.
- `robots.txt` y `sitemap.xml` generados desde Next.js.

Configurá el dominio final en `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://tudominio.com
```

Si no se define, se usa `https://federicofantacone.com.ar` como valor por defecto (`src/lib/site.ts`).

## Accesibilidad y rendimiento

- HTML semántico, landmarks, skip link y foco visible.
- Contraste AA en textos y controles.
- `prefers-reduced-motion` respetado: sin animaciones ni scroll suave forzado.
- Contenido visible sin JavaScript.
- Navegación con teclado, menú mobile con `Escape` y foco administrado.
- Fuentes autohospedadas con `next/font` y `display: swap`.
- Página estática, sin dependencias de cliente pesadas.

## Deploy

El sitio se exporta como HTML estático (`output: "export"`), así que no necesita servidor Node: se publica como archivos en cualquier CDN.

```bash
npm run build   # genera out/
```

### Cloudflare Pages (Git conectado)

1. Entrá a [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages → Create → Pages → Connect to Git**.
2. Elegí el repo `FedericoFantacone/portfolio`.
3. Configuración de build:
   - **Framework preset:** None
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Node.js version:** `22` (variable de entorno `NODE_VERSION = 22`)
4. En **Settings → Environment variables** agregá:
   - `NEXT_PUBLIC_SITE_URL = https://federicofantacone.pages.dev`
5. Guardá y deployá. Cada push a `main` redeploya automáticamente.

Para actualizar manualmente: `npm run build` y subí la carpeta `out/` con `npx wrangler pages deploy out` (opcional).

El archivo `wrangler.toml` deja configurado `pages_build_output_dir = "out"` para deploy local/CLI.

### Dominio propio

En Cloudflare Pages: **Custom domains → Set up a custom domain** y seguí los registros DNS que muestra el panel. Después de definirlo, compilá con la URL final para que canonical, sitemap y Open Graph apunten ahí:

```bash
# .env.production (o variable en el dashboard)
NEXT_PUBLIC_SITE_URL=https://federicofantacone.com.ar
```

```bash
npm run build
```

`NEXT_PUBLIC_SITE_URL` se incrusta en el build: si cambiás el dominio, hay que volver a compilar y redeployar.
