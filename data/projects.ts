// Legacy type file — kept for archive components in components/_archive/.
// Active data is now in data/portfolio.json, read via lib/db.ts.
// WorkCanvas and all /work components use the Work type from lib/db.ts.

export type Category = string;

export interface Project {
  slug: string;
  title: string;
  year: string;
  category: Category;
  client: string;
  role: string;
  description: string;
  accentColor: string;
  images: string[];
  videoUrl?: string;
  posterUrl?: string;
  clientName?: string;
}

/** @deprecated — active data lives in data/portfolio.json */
export const PROJECTS: Project[] = [];

/** @deprecated */
export const ALL_CATEGORIES: Category[] = [
  "UI/UX",
  "XR Design",
  "Graphic Design",
];
