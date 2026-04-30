import { IntroPage } from "@/app/components/IntroPage";
import { getWorks, getCategories } from "@/lib/db";

// dynamic prevents static caching so searchParams are always fresh
export const dynamic = "force-dynamic";

export default function RootPage({
  searchParams,
}: {
  searchParams?: { view?: string };
}) {
  const works      = getWorks();
  const categories = getCategories();
  const initialView = searchParams?.view === "works" ? "works" : "reveal";

  return <IntroPage works={works} categories={categories} initialView={initialView} />;
}
