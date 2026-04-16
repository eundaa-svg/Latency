"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

const EASE = [0.22, 1, 0.36, 1] as const;

interface ProjectCardProps {
  project: Project;
  /** Stagger index for entrance animation */
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: EASE }}
      data-interactive="true"
    >
      <Link
        href={`/work/${project.slug}`}
        className="group block"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* ── Image container ──────────────────────────────────────────── */}
        <div className="relative w-full overflow-hidden bg-[#EFEFEF]"
             style={{ aspectRatio: "4 / 3" }}>
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            style={{
              transform: hovered ? "scale(1.04)" : "scale(1)",
              transition: "transform 500ms cubic-bezier(0.22,1,0.36,1)",
            }}
          />

          {/* Category badge — top-right */}
          <div className="absolute top-3 right-3">
            <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-widest uppercase px-2 py-1 bg-[#FAFAFA]/80 backdrop-blur-sm border border-[#E5E5E5] rounded-[3px]">
              {project.category}
            </span>
          </div>

          {/* Arrow — appears on hover */}
          <motion.div
            className="absolute bottom-3 right-3 w-7 h-7 rounded-full bg-[#111] flex items-center justify-center"
            animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
            transition={{ duration: 0.2, ease: EASE }}
          >
            <span className="text-[#FAFAFA] text-[11px] leading-none">↗</span>
          </motion.div>
        </div>

        {/* ── Meta row ─────────────────────────────────────────────────── */}
        <div className="mt-3 flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <motion.p
              className="font-[family-name:var(--font-mono)] text-[13px] text-[#111] leading-snug truncate"
              animate={{ x: hovered ? 3 : 0 }}
              transition={{ duration: 0.2, ease: EASE }}
            >
              {project.title}
            </motion.p>
            <p className="font-[family-name:var(--font-mono)] text-[11px] text-[#111] opacity-35 mt-0.5">
              {project.client}
            </p>
          </div>
          <span className="font-[family-name:var(--font-mono)] text-[11px] text-[#111] opacity-35 tabular-nums shrink-0 pt-[1px]">
            {project.year}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
