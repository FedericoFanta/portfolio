import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const root = fileURLToPath(new URL("..", import.meta.url));
const contentDir = `${root}src/content`;
const outputDir = `${root}public/cv`;

const readJson = async (file) =>
  JSON.parse(await readFile(`${contentDir}/${file}`, "utf8"));

const profile = await readJson("profile.json");
const locales = ["es", "en"];

// Display form of the LinkedIn URL, derived so there is a single source of truth.
const linkedinHandle = profile.linkedinUrl
  .replace(/^https?:\/\//, "")
  .replace(/^www\./, "")
  .replace(/\/+$/, "");

const PAGE = { width: 595.28, height: 841.89 };
const MARGIN = 54;
const CONTENT_WIDTH = PAGE.width - MARGIN * 2;

const INK = rgb(0.08, 0.08, 0.08);
const BODY = rgb(0.23, 0.23, 0.23);
const MUTED = rgb(0.42, 0.42, 0.42);
const FAINT = rgb(0.56, 0.56, 0.56);
const LINE = rgb(0.86, 0.86, 0.86);

function wrapText(text, font, size, maxWidth) {
  const words = text.split(/\s+/);
  const lines = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (current && font.widthOfTextAtSize(next, size) > maxWidth) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) lines.push(current);
  return lines;
}

function createWriter(page, fonts) {
  const { regular, bold } = fonts;

  return {
    line(y) {
      page.drawLine({
        start: { x: MARGIN, y },
        end: { x: PAGE.width - MARGIN, y },
        thickness: 0.7,
        color: LINE,
      });
    },

    section(title, y) {
      page.drawText(title.toUpperCase(), {
        x: MARGIN,
        y,
        size: 7.5,
        font: bold,
        color: FAINT,
      });
      page.drawLine({
        start: { x: MARGIN, y: y - 7 },
        end: { x: PAGE.width - MARGIN, y: y - 7 },
        thickness: 0.7,
        color: LINE,
      });
      return y - 22;
    },

    paragraph(text, x, y, options = {}) {
      const {
        font = regular,
        size = 8.8,
        color = BODY,
        maxWidth = CONTENT_WIDTH,
        lineHeight = 11.6,
      } = options;

      const lines = wrapText(text, font, size, maxWidth);
      lines.forEach((line, index) => {
        page.drawText(line, {
          x,
          y: y - index * lineHeight,
          size,
          font,
          color,
        });
      });

      return y - lines.length * lineHeight;
    },
  };
}

async function buildCv(locale, data) {
  const doc = await PDFDocument.create();
  doc.setTitle(`${profile.name} — CV`);
  doc.setAuthor(profile.name);
  doc.setSubject(data.cv.title);
  doc.setKeywords([
    "Full Stack Developer",
    ".NET",
    "C#",
    "Azure",
    "Agentic AI",
  ]);
  doc.setLanguage(locale === "es" ? "es-AR" : "en");
  doc.setCreationDate(new Date());

  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const page = doc.addPage([PAGE.width, PAGE.height]);
  const write = createWriter(page, { regular, bold });

  let y = 796;

  page.drawRectangle({
    x: MARGIN,
    y,
    width: 30,
    height: 2,
    color: INK,
  });

  y -= 24;
  page.drawText(profile.name, {
    x: MARGIN,
    y,
    size: 24,
    font: bold,
    color: INK,
  });

  y -= 17;
  page.drawText(data.cv.title, {
    x: MARGIN,
    y,
    size: 9.5,
    font: regular,
    color: MUTED,
  });

  y -= 19;
  page.drawText(`${data.cv.subtitle}`, {
    x: MARGIN,
    y,
    size: 8.4,
    font: bold,
    color: FAINT,
  });

  y -= 18;
  page.drawText(`${profile.email}  ·  ${profile.phone}`, {
    x: MARGIN,
    y,
    size: 8.4,
    font: regular,
    color: MUTED,
  });

  y -= 12;
  page.drawText(
    `${linkedinHandle}  ·  ${profile.location}`,
    {
      x: MARGIN,
      y,
      size: 8.4,
      font: regular,
      color: MUTED,
    },
  );

  y -= 20;
  write.line(y);
  y -= 26;

  y = write.section(data.cv.profileLabel, y);
  y = write.paragraph(data.cv.profile, MARGIN, y, { maxWidth: CONTENT_WIDTH });
  y -= 20;

  y = write.section(data.cv.experienceLabel, y);

  for (const item of data.experience.items) {
    page.drawText(item.company, {
      x: MARGIN,
      y,
      size: 10.5,
      font: bold,
      color: INK,
    });

    const periodWidth = regular.widthOfTextAtSize(item.period, 7.8);
    page.drawText(item.period, {
      x: PAGE.width - MARGIN - periodWidth,
      y: y + 1,
      size: 7.8,
      font: regular,
      color: FAINT,
    });

    y -= 13;
    page.drawText(item.role, {
      x: MARGIN,
      y,
      size: 8.8,
      font: regular,
      color: MUTED,
    });

    y -= 17;

    for (const bullet of item.bullets) {
      const lines = wrapText(bullet, regular, 8.6, CONTENT_WIDTH - 13);
      page.drawText("—", {
        x: MARGIN,
        y,
        size: 8.6,
        font: regular,
        color: FAINT,
      });
      lines.forEach((line, index) => {
        page.drawText(line, {
          x: MARGIN + 13,
          y: y - index * 11.2,
          size: 8.6,
          font: regular,
          color: BODY,
        });
      });
      y -= lines.length * 11.2 + 1.3;
    }
  }

  y -= 16;
  y = write.section(data.cv.stackLabel, y);

  for (const group of data.stack.groups) {
    page.drawText(group.label, {
      x: MARGIN,
      y,
      size: 8,
      font: bold,
      color: MUTED,
    });

    const items = group.items.join(", ");
    const lines = wrapText(items, regular, 8.5, CONTENT_WIDTH - 92);
    lines.forEach((line, index) => {
      page.drawText(line, {
        x: MARGIN + 92,
        y: y - index * 11.2,
        size: 8.5,
        font: regular,
        color: BODY,
      });
    });
    y -= Math.max(12, lines.length * 11.2) + 4;
  }

  y -= 12;
  y = write.section(data.cv.educationLabel, y);

  for (const item of data.education.items) {
    page.drawText(item.institution, {
      x: MARGIN,
      y,
      size: 9,
      font: bold,
      color: INK,
    });

    const periodWidth = regular.widthOfTextAtSize(item.period, 7.8);
    page.drawText(item.period, {
      x: PAGE.width - MARGIN - periodWidth,
      y: y + 1,
      size: 7.8,
      font: regular,
      color: FAINT,
    });

    y -= 11.5;
    page.drawText(item.degree, {
      x: MARGIN,
      y,
      size: 8.5,
      font: regular,
      color: MUTED,
    });
    y -= 19;
  }

  y -= 9;
  y = write.section(data.extras.label, y);

  const columnWidth = (CONTENT_WIDTH - 26) / 2;
  const rightColumn = MARGIN + columnWidth + 26;

  page.drawText(data.extras.certificationsLabel, {
    x: MARGIN,
    y,
    size: 8,
    font: bold,
    color: MUTED,
  });
  page.drawText(data.extras.languagesLabel, {
    x: rightColumn,
    y,
    size: 8,
    font: bold,
    color: MUTED,
  });

  let leftY = y - 13;
  for (const certification of data.extras.certifications) {
    page.drawText(certification, {
      x: MARGIN,
      y: leftY,
      size: 8.4,
      font: regular,
      color: BODY,
    });
    leftY -= 11.5;
  }

  let rightY = y - 13;
  for (const language of data.extras.languages) {
    page.drawText(`${language.name} — ${language.level}`, {
      x: rightColumn,
      y: rightY,
      size: 8.4,
      font: regular,
      color: BODY,
      maxWidth: columnWidth,
    });
    rightY -= 11.5;
  }

  page.drawLine({
    start: { x: MARGIN, y: 62 },
    end: { x: PAGE.width - MARGIN, y: 62 },
    thickness: 0.7,
    color: LINE,
  });

  page.drawText(data.cv.footer, {
    x: MARGIN,
    y: 48,
    size: 7.2,
    font: regular,
    color: FAINT,
  });

  const pageCount = doc.getPageCount();
  for (let index = 0; index < pageCount; index += 1) {
    const current = doc.getPage(index);
    const label = `${index + 1} / ${pageCount}`;
    const width = regular.widthOfTextAtSize(label, 7.2);
    current.drawText(label, {
      x: PAGE.width - MARGIN - width,
      y: 48,
      size: 7.2,
      font: regular,
      color: FAINT,
    });
  }

  return doc.save();
}

await mkdir(outputDir, { recursive: true });

for (const locale of locales) {
  const data = await readJson(`${locale}.json`);
  const bytes = await buildCv(locale, data);
  const file = `${outputDir}/federico-fantacone-cv-${locale}.pdf`;
  await writeFile(file, bytes);
  console.log(`Generated ${file} (${Math.round(bytes.length / 1024)} KB)`);
}
