"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

const EASE = [0.22, 1, 0.36, 1] as const;

interface GalleryCardProps {
  project: Project;
  /** Diagonal stagger delay (col + row) * 0.03 */
  delay?: number;
  onOpen: (project: Project) => void;
}

export function GalleryCard({ project, delay = 0, onOpen }: GalleryCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      layoutId={undefined}
      layout
      className="relative block w-full text-left overflow-hidden cursor-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0051FF]"
      style={{ aspectRatio: "3 / 4", background: project.accentColor }}
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(project)}
      data-interactive="true"
      aria-label={`Open ${project.title}`}
    >
      {/* Thumbnail image */}
      <Image
        src={project.images[0]}
        alt={project.title}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 14vw"
        className="object-cover"
        style={{
          transform: hovered ? "scale(1.03)" : "scale(1)",
          transition: "transform 400ms cubic-bezier(0.22,1,0.36,1)",
        }}
      />

      {/* Dark hover overlay */}
      <motion.div
        className="absolute inset-0 bg-black pointer-events-none"
        animate={{ opacity: hovered ? 0.42 : 0 }}
        transition={{ duration: 0.3, ease: EASE }}
      />

      {/* Info — slides up from bottom on hover */}
      <motion.div
        className="absolute inset-x-0 bottom-0 px-3 pb-3 pt-8 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
        }}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
        transition={{ duration: 0.3, ease: EASE }}
      >
        <p className="font-[family-name:var(--font-mono)] text-[12px] text-white leading-snug truncate">
          {project.title}
        </p>
        <p className="font-[family-name:var(--font-mono)] text-[10px] text-white/60 mt-0.5">
          {project.year} · {project.category}
        </p>
      </motion.div>
    </motion.button>
  );
}
