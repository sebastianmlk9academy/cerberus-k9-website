import { promises as fs } from "node:fs";
import path from "node:path";
import YAML from "yaml";

const ROOT = process.cwd();
const GALLERY_DIR = path.join(ROOT, "src/content/galeria");
const EDITIONS_DIR = path.join(ROOT, "src/content/gallery_editions");
const LOCATIONS_DIR = path.join(ROOT, "src/content/gallery_locations");
const FILTERS_DIR = path.join(ROOT, "src/content/gallery_filters");

const DEFAULT_EDITIONS = ["2025", "2026"];
const DEFAULT_LOCATIONS = [
  "Terminal LPG",
  "Muzeum Gryf",
  "Stena Line",
  "3MK Arena",
  "Szkoła Mundurowa",
  "Stadion Miejski",
];
const DEFAULT_FILTERS = [
  { key: "all", label_pl: "WSZYSTKO", label_en: "ALL", label_de: "ALLE", category_value: "", order: 1 },
  { key: "HARDEST_HIT", label_pl: "HARDEST HIT", label_en: "HARDEST HIT", label_de: "HARDEST HIT", category_value: "HARDEST_HIT", order: 2 },
  { key: "SZKOLENIA_K9", label_pl: "SZKOLENIA K9", label_en: "K9 TRAINING", label_de: "K9 TRAINING", category_value: "SZKOLENIA_K9", order: 3 },
  { key: "TCCC", label_pl: "TCCC", label_en: "TCCC", label_de: "TCCC", category_value: "TCCC", order: 4 },
  { key: "KONFERENCJA", label_pl: "KONFERENCJA", label_en: "CONFERENCE", label_de: "KONFERENZ", category_value: "KONFERENCJA", order: 5 },
  { key: "DRONY", label_pl: "DRONY", label_en: "DRONES", label_de: "DROHNEN", category_value: "DRONY", order: 6 },
];

function slugify(value) {
  return String(value)
    .replace(/ł/g, "l")
    .replace(/Ł/g, "L")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) return {};
  return YAML.parse(match[1]) ?? {};
}

async function listFilesRecursive(dirPath) {
  const out = [];
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        out.push(...(await listFilesRecursive(fullPath)));
      } else {
        out.push(fullPath);
      }
    }
  } catch {
    return [];
  }
  return out;
}

async function collectGalleryTaxonomies() {
  const files = await listFilesRecursive(GALLERY_DIR);
  const editions = new Set(DEFAULT_EDITIONS);
  const locations = new Set(DEFAULT_LOCATIONS);

  for (const filePath of files) {
    if (!/\.(md|mdx)$/i.test(filePath)) continue;
    const raw = await fs.readFile(filePath, "utf8");
    const data = parseFrontmatter(raw);
    const edition = String(data.edition ?? "").trim();
    const location = String(data.location ?? "").trim();
    if (edition) editions.add(edition);
    if (location) locations.add(location);
  }

  return { editions: [...editions], locations: [...locations] };
}

async function syncEditions(values) {
  await ensureDir(EDITIONS_DIR);
  let created = 0;
  for (const value of values) {
    const safeValue = String(value).trim();
    if (!safeValue) continue;
    const fileName = `${slugify(safeValue) || safeValue}.yml`;
    const target = path.join(EDITIONS_DIR, fileName);
    if (await fileExists(target)) continue;

    const order = Number(safeValue) ? Math.max(1, 2100 - Number(safeValue)) : 99;
    const doc = {
      value: safeValue,
      label_pl: `Edycja ${safeValue}`,
      label_en: `Edition ${safeValue}`,
      order,
      active: true,
    };
    await fs.writeFile(target, YAML.stringify(doc), "utf8");
    created += 1;
  }
  return created;
}

async function syncLocations(values) {
  await ensureDir(LOCATIONS_DIR);
  let created = 0;
  for (const value of values) {
    const safeValue = String(value).trim();
    if (!safeValue) continue;
    const fileName = `${slugify(safeValue)}.yml`;
    const target = path.join(LOCATIONS_DIR, fileName);
    if (await fileExists(target)) continue;

    const doc = {
      value: safeValue,
      label_pl: safeValue,
      label_en: safeValue,
      order: 99,
      active: true,
    };
    await fs.writeFile(target, YAML.stringify(doc), "utf8");
    created += 1;
  }
  return created;
}

async function syncFilters() {
  await ensureDir(FILTERS_DIR);
  let created = 0;
  for (const filter of DEFAULT_FILTERS) {
    const target = path.join(FILTERS_DIR, `${slugify(filter.key)}.yml`);
    if (await fileExists(target)) continue;
    await fs.writeFile(target, YAML.stringify({ ...filter, active: true }), "utf8");
    created += 1;
  }
  return created;
}

async function main() {
  const { editions, locations } = await collectGalleryTaxonomies();
  const createdEditions = await syncEditions(editions);
  const createdLocations = await syncLocations(locations);
  const createdFilters = await syncFilters();

  console.log(`Synced gallery taxonomies.`);
  console.log(`- Editions discovered: ${editions.length}, created: ${createdEditions}`);
  console.log(`- Locations discovered: ${locations.length}, created: ${createdLocations}`);
  console.log(`- Filters created: ${createdFilters}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
