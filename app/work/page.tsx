import { WorkCanvas } from "@/app/components/work/WorkCanvas";
import { getWorks, getCategories } from "@/lib/db";

export const metadata = {
  title: "Work — LATENCY",
  description: "Selected works by DAN.",
};

export default function WorkPage() {
  const works      = getWorks();
  const categories = getCategories();
  return <WorkCanvas works={works} categories={categories} />;
}
