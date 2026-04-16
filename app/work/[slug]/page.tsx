// Server Component — exports generateStaticParams for static pre-rendering.
// All animated/interactive content is delegated to ProjectDetailClient.

import { notFound } from "next/navigation";
import { PROJECTS } from "@/data/projects";
import { ProjectDetailClient } from "./ProjectDetailClient";

interface PageProps {
  params: { slug: string };
}

// Pre-render every project page at build time.
export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

// Per-page metadata
export function generateMetadata({ params }: PageProps) {
  const project = PROJECTS.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — LATENCY`,
    description: project.description.slice(0, 155),
  };
}

export default function WorkDetailPage({ params }: PageProps) {
  const project = PROJECTS.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const currentIndex = PROJECTS.indexOf(project);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  return <ProjectDetailClient project={project} nextProject={nextProject} />;
}
