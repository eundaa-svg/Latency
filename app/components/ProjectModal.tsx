"use client";

// TODO: replace modal with dedicated /work/[slug] route
// When ready: swap onOpen in WorkGallery to router.push(`/work/${project.slug}`)
// and delete this file.

import Image from "next/image";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/data/projects";

const EASE = [0.22, 1, 0.36, 1] as const;

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Close on Escape
  useEffect(() => {
    if (!project) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [project, onClose]);

  // Prevent body scroll while modal open
  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50 bg-[rgba(17,17,17,0.92)] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-10 pointer-events-none"
          >
            <motion.div
              className="relative w-full max-w-[860px] bg-[#FAFAFA] overflow-hidden pointer-events-auto"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.35, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: "16 / 9", background: project.accentColor }}
              >
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 860px) 100vw, 860px"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)",
                  }}
                />
                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 px-7 pb-7">
                  <h2
                    className="text-[#FAFAFA] font-[family-name:var(--font-sans)] leading-none tracking-tight"
                    style={{ fontSize: "clamp(22px, 3.5vw, 40px)", fontWeight: 700 }}
                  >
                    {project.title}
                  </h2>
                  <p className="font-[family-name:var(--font-mono)] text-[12px] text-[#FAFAFA]/65 mt-2">
                    {project.year} · {project.category} · {project.client}
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="px-7 py-6 flex flex-col sm:flex-row gap-6">
                <div className="sm:w-[30%] shrink-0 flex flex-col gap-3 font-[family-name:var(--font-mono)] text-[11px]">
                  <div>
                    <span className="opacity-30 uppercase tracking-[0.14em] block mb-0.5">role</span>
                    <span className="text-[#111]">{project.role}</span>
                  </div>
                  <div>
                    <span className="opacity-30 uppercase tracking-[0.14em] block mb-0.5">client</span>
                    <span className="text-[#111]">{project.client}</span>
                  </div>
                  <div>
                    <span className="opacity-30 uppercase tracking-[0.14em] block mb-0.5">year</span>
                    <span className="text-[#111]">{project.year}</span>
                  </div>
                </div>
                <p className="font-[family-name:var(--font-mono)] text-[13px] leading-[1.8] text-[#111] sm:flex-1">
                  {project.description}
                </p>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center font-[family-name:var(--font-mono)] text-[14px] text-[#FAFAFA] opacity-70 hover:opacity-100 transition-opacity duration-150"
                data-interactive="true"
                aria-label="Close"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
