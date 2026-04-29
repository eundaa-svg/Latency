// Fallback for /work/[slug] routes that don't have an individual page file.
//
// Code-first workflow:
//   1. Add work to data/portfolio.json
//   2. Create app/work/[your-slug]/page.tsx for the case study
//      (Next.js static routes take precedence over this dynamic catch-all)
//
// If a slug exists in portfolio.json but has no dedicated page file,
// this catch-all returns 404 — intentional.

import { notFound } from "next/navigation";

export default function WorkDetailFallback() {
  notFound();
}
