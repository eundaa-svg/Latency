import { notFound } from "next/navigation";
import { getWorks, getWorkById } from "@/lib/db";
import { ProjectDetailClient } from "./ProjectDetailClient";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const works = await getWorks();
  return works.map((w) => ({ slug: w.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const work = await getWorkById(params.slug);
  if (!work) return {};
  return {
    title: `${work.title} — LATENCY`,
    description: work.description.slice(0, 155),
  };
}

export default async function WorkDetailPage({ params }: PageProps) {
  const works = await getWorks();
  const work  = works.find((w) => w.id === params.slug);
  if (!work) notFound();

  const currentIndex = works.indexOf(work);
  const nextWork     = works[(currentIndex + 1) % works.length] ?? work;

  return <ProjectDetailClient work={work} nextWork={nextWork} />;
}
