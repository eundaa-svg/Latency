import { WorkCanvas } from "@/app/components/work/WorkCanvas";
import { getWorks, getCategories } from "@/lib/db";

// Force dynamic rendering so portfolio.json changes are always picked up.
// Without this, Next.js statically pre-renders the page at build time and
// serves the cached HTML even when portfolio.json has been updated.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Work — LATENCY",
  description: "Selected works by DAN.",
};

export default function WorkPage() {
  const works      = getWorks();
  const categories = getCategories();
  return <WorkCanvas works={works} categories={categories} />;
}
