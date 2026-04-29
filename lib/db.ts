// ─── lib/db.ts ────────────────────────────────────────────────────────────────
// Single source of truth for portfolio data.
// Reads / writes data/portfolio.json on the local filesystem.
//
// DEPLOYMENT NOTE (Option A — recommended):
//   Edit data via /admin → the JSON file changes locally →
//   git commit + push → Vercel rebuilds with updated data.
//   This is intentional: Vercel's ephemeral filesystem means writes
//   are not persisted across deploys in production.
//
// Concurrent-write safety: a Promise queue serialises writes inside
// a single Node.js process (dev server / local build).
// ─────────────────────────────────────────────────────────────────────────────

import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const DB_PATH = join(process.cwd(), "data", "portfolio.json");

// ── Types ─────────────────────────────────────────────────────────────────────

export interface PortfolioCategory {
  id: string;
  name: string;
  order: number;
}

export interface Work {
  id: string;
  /** Same as id — used in URL slugs and component lookups. */
  slug: string;
  title: string;
  categoryId: string;
  /** Display name joined from categories at read time. */
  category: string;
  thumbnail?: string;
  images: string[];
  description: string;
  role: string;
  year: string;
  tools: string[];
  link?: string;
  /** For ProjectDetailClient backward compat. */
  client?: string;
  createdAt: string;
  order: number;
  accentColor: string;
  videoUrl?: string;
  posterUrl?: string;
}

interface PortfolioData {
  categories: PortfolioCategory[];
  works: WorkRaw[];
}

/** Raw shape stored in JSON (no derived fields). */
interface WorkRaw {
  id: string;
  title: string;
  categoryId: string;
  thumbnail?: string;
  images: string[];
  description: string;
  role: string;
  year: string;
  tools: string[];
  link?: string;
  client?: string;
  createdAt: string;
  order: number;
  accentColor: string;
  videoUrl?: string;
  posterUrl?: string;
}

// ── Write queue — prevents concurrent overwrites ──────────────────────────────
let writeQueue: Promise<void> = Promise.resolve();

// ── Read ──────────────────────────────────────────────────────────────────────

export async function readPortfolio(): Promise<PortfolioData> {
  const raw = await readFile(DB_PATH, "utf-8");
  return JSON.parse(raw) as PortfolioData;
}

/** Returns works with the `slug` alias and joined `category` name. */
export async function getWorks(): Promise<Work[]> {
  const { categories, works } = await readPortfolio();
  return works
    .sort((a, b) => a.order - b.order)
    .map((w) => ({
      ...w,
      slug: w.id,
      category: categories.find((c) => c.id === w.categoryId)?.name ?? "Uncategorized",
    }));
}

export async function getWorkById(id: string): Promise<Work | null> {
  const works = await getWorks();
  return works.find((w) => w.id === id) ?? null;
}

export async function getCategories(): Promise<PortfolioCategory[]> {
  const { categories } = await readPortfolio();
  return categories.sort((a, b) => a.order - b.order);
}

// ── Write helpers ─────────────────────────────────────────────────────────────

function enqueue(fn: () => Promise<void>): Promise<void> {
  writeQueue = writeQueue.then(fn).catch(fn);
  return writeQueue;
}

async function persist(data: PortfolioData): Promise<void> {
  await writeFile(DB_PATH, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

// ── Works CRUD ────────────────────────────────────────────────────────────────

export async function createWork(input: Omit<WorkRaw, "id" | "createdAt" | "order">): Promise<Work> {
  let created!: Work;
  await enqueue(async () => {
    const data = await readPortfolio();
    const maxOrder = data.works.reduce((m, w) => Math.max(m, w.order), 0);
    const raw: WorkRaw = {
      ...input,
      id: `${Date.now()}`,
      createdAt: new Date().toISOString(),
      order: maxOrder + 1,
    };
    data.works.push(raw);
    await persist(data);
    created = { ...raw, slug: raw.id, category: data.categories.find((c) => c.id === raw.categoryId)?.name ?? "" };
  });
  return created;
}

export async function updateWork(id: string, patch: Partial<Omit<WorkRaw, "id" | "createdAt">>): Promise<Work | null> {
  let updated: Work | null = null;
  await enqueue(async () => {
    const data = await readPortfolio();
    const idx = data.works.findIndex((w) => w.id === id);
    if (idx === -1) return;
    data.works[idx] = { ...data.works[idx], ...patch };
    await persist(data);
    const raw = data.works[idx];
    updated = { ...raw, slug: raw.id, category: data.categories.find((c) => c.id === raw.categoryId)?.name ?? "" };
  });
  return updated;
}

export async function deleteWork(id: string): Promise<boolean> {
  let deleted = false;
  await enqueue(async () => {
    const data = await readPortfolio();
    const before = data.works.length;
    data.works = data.works.filter((w) => w.id !== id);
    deleted = data.works.length < before;
    if (deleted) await persist(data);
  });
  return deleted;
}

export async function reorderWorks(orderedIds: string[]): Promise<void> {
  await enqueue(async () => {
    const data = await readPortfolio();
    orderedIds.forEach((id, i) => {
      const w = data.works.find((x) => x.id === id);
      if (w) w.order = i + 1;
    });
    await persist(data);
  });
}

// ── Categories CRUD ───────────────────────────────────────────────────────────

export async function createCategory(name: string): Promise<PortfolioCategory> {
  let created!: PortfolioCategory;
  await enqueue(async () => {
    const data = await readPortfolio();
    const maxOrder = data.categories.reduce((m, c) => Math.max(m, c.order), 0);
    const cat: PortfolioCategory = {
      id: name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      name,
      order: maxOrder + 1,
    };
    data.categories.push(cat);
    await persist(data);
    created = cat;
  });
  return created;
}

export async function updateCategory(id: string, patch: Partial<Omit<PortfolioCategory, "id">>): Promise<PortfolioCategory | null> {
  let updated: PortfolioCategory | null = null;
  await enqueue(async () => {
    const data = await readPortfolio();
    const idx = data.categories.findIndex((c) => c.id === id);
    if (idx === -1) return;
    data.categories[idx] = { ...data.categories[idx], ...patch };
    await persist(data);
    updated = data.categories[idx];
  });
  return updated;
}

export async function deleteCategory(id: string): Promise<{ deleted: boolean; affectedWorks: number }> {
  let result = { deleted: false, affectedWorks: 0 };
  await enqueue(async () => {
    const data = await readPortfolio();
    const idx = data.categories.findIndex((c) => c.id === id);
    if (idx === -1) return;
    const affected = data.works.filter((w) => w.categoryId === id);
    affected.forEach((w) => { w.categoryId = "uncategorized"; });
    data.categories.splice(idx, 1);
    await persist(data);
    result = { deleted: true, affectedWorks: affected.length };
  });
  return result;
}

export async function reorderCategories(orderedIds: string[]): Promise<void> {
  await enqueue(async () => {
    const data = await readPortfolio();
    orderedIds.forEach((id, i) => {
      const c = data.categories.find((x) => x.id === id);
      if (c) c.order = i + 1;
    });
    await persist(data);
  });
}
