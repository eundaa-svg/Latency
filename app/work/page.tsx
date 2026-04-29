import { WorkCanvas } from "@/app/components/work/WorkCanvas";
import { getWorks, getCategories } from "@/lib/db";

export const metadata = {
  title: "Work — LATENCY",
  description: "Selected works by DAN.",
};

export default async function WorkPage() {
  const [works, categories] = await Promise.all([getWorks(), getCategories()]);
  return <WorkCanvas works={works} categories={categories} />;
}
