"use client";

/*
 * WorkGallery
 * ─────────────────────────────────────────────────────────────
 * WHERE TO ADD REAL THUMBNAILS:
 *   Place images in public/placeholders/ then update the
 *   `images` array and `accentColor` in data/projects.ts.
 *   With next/image, also add a `blurDataURL` and set
 *   placeholder="blur" in GalleryCard.tsx.
 *
 * HOW TO ADD A NEW PROJECT:
 *   Edit data/projects.ts — push a new entry to PROJECTS.
 *   The gallery, filter counts, and /work pages auto-update.
 *
 * MODAL → ROUTE REFACTOR:
 *   In WorkGallery, swap the `onOpen` handler on <GalleryCard>
 *   for `router.push(\`/work/\${project.slug}\`)` and remove the
 *   <ProjectModal> render. Then delete ProjectModal.tsx.
 * ─────────────────────────────────────────────────────────────
 */

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS, type Category } from "@/data/projects";
import { GalleryCard } from "./GalleryCard";
import { ProjectModal } from "./ProjectModal";
import type { Project } from "@/data/projects";

const EASE = [0.22, 1, 0.36, 1] as const;
const COLS_DESKTOP = 7;

// Short display labels for the left column
const FILTERS: { display: string; value: Category | null }[] = [
  { display: "ALL",     value: null },
  { display: "UI/UX",   value: "UI/UX" },
  { display: "GRAPHIC", value: "Graphic Design" },
  { display: "XR",      value: "XR Design" },
  { display: "AD",      value: "Advertising" },
  { display: "INT",     value: "Interaction" },
];

interface CategoryLabelProps {
  display: string;
  active: boolean;
  count: number;
  onClick: () => void;
}

function CategoryLabel({ display, active, count, onClick }: CategoryLabelProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-interactive="true"
      className="relative block text-left leading-[0.92] select-none cursor-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0051FF]"
      style={{
        fontSize: "clamp(44px, 5.5vw, 88px)",
        fontWeight: 800,
        color: active ? "#111111" : "transparent",
        WebkitTextStroke: active ? "0px" : "1.5px #111111",
        fontFamily: "var(--font-sans), Inter, sans-serif",
        opacity: active ? 1 : hovered ? 0.7 : 0.38,
        transition: "opacity 200ms, color 200ms, -webkit-text-stroke 200ms",
      }}
      animate={{ x: hovered && !active ? 4 : 0 }}
      transition={{ duration: 0.18, ease: EASE }}
      aria-pressed={active}
    >
      {display}
      {/* Count badge */}
      <span
        className="absolute top-[0.15em] -right-[0.6em] font-[family-name:var(--font-mono)] text-[10px] tabular-nums"
        style={{
          color: "#111",
          WebkitTextStroke: "0px",
          fontWeight: 400,
          opacity: active ? 0.5 : 0.28,
        }}
      >
        {count}
      </span>
    </motion.button>
  );
}

export function WorkGallery() {
  const [selected, setSelected] = useState<Category | null>(null);
  const [openProject, setOpenProject] = useState<Project | null>(null);

  // Count per category
  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const p of PROJECTS) {
      map[p.category] = (map[p.category] ?? 0) + 1;
    }
    map["__all__"] = PROJECTS.length;
    return map;
  }, []);

  // Filtered list
  const filtered = useMemo(
    () => (selected ? PROJECTS.filter((p) => p.category === selected) : PROJECTS),
    [selected]
  );

  function handleSelect(value: Category | null) {
    setSelected((prev) => (prev === value ? null : value));
  }

  return (
    <section id="work" className="bg-[#FAFAFA] w-full overflow-hidden">
      {/* ── SECTION TOP BAR ──────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-6 sm:px-10 py-5 border-t border-[#E5E5E5]">
        {/* +× mark */}
        <span className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.2em] text-[#111] opacity-40 select-none">
          +×
        </span>
        {/* Section title */}
        <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[#111] opacity-30">
          // selected work
        </span>
        {/* Hamburger (decorative) */}
        <button
          data-interactive="true"
          className="flex flex-col gap-[4px] opacity-30 hover:opacity-60 transition-opacity duration-150 cursor-none focus:outline-none"
          aria-label="Menu (decorative)"
          tabIndex={-1}
        >
          <span className="block w-[18px] h-[1.5px] bg-[#111]" />
          <span className="block w-[12px] h-[1.5px] bg-[#111]" />
        </button>
      </div>

      {/* ── BODY: left labels + grid + right rail ────────────────────── */}
      <div className="flex">
        {/* Left sticky column — category labels */}
        <aside className="hidden lg:flex flex-col justify-start gap-0 pl-6 sm:pl-10 pt-6 pb-10 sticky top-0 self-start w-[18%] xl:w-[16%] shrink-0">
          {FILTERS.map(({ display, value }) => (
            <CategoryLabel
              key={display}
              display={display}
              active={selected === value}
              count={value === null ? counts["__all__"] ?? 0 : counts[value] ?? 0}
              onClick={() => handleSelect(value)}
            />
          ))}
        </aside>

        {/* Mobile filter bar */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto px-6 sm:px-10 pb-4 scrollbar-none w-full">
          {FILTERS.map(({ display, value }) => (
            <button
              key={display}
              onClick={() => handleSelect(value)}
              data-interactive="true"
              className="shrink-0 font-[family-name:var(--font-mono)] text-[11px] tracking-wide px-3 py-1 rounded-[4px] border cursor-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0051FF]"
              style={{
                background: selected === value ? "#111111" : "#F0F0F0",
                borderColor: selected === value ? "#111111" : "#E5E5E5",
                color: selected === value ? "#FAFAFA" : "#111111",
                transition: "background 150ms, border-color 150ms, color 150ms",
              }}
            >
              {display}
              <span className="ml-1.5 tabular-nums opacity-50">
                {value === null ? counts["__all__"] ?? 0 : counts[value] ?? 0}
              </span>
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div className="flex-1 min-w-0 lg:pr-10">
          <AnimatePresence mode="popLayout">
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-[4px]"
              style={{ background: "#FAFAFA" }}
            >
              {filtered.map((project, i) => {
                const col = i % COLS_DESKTOP;
                const row = Math.floor(i / COLS_DESKTOP);
                const diagonalDelay = (col + row) * 0.028;
                return (
                  <GalleryCard
                    key={project.slug}
                    project={project}
                    delay={diagonalDelay}
                    onOpen={setOpenProject}
                  />
                );
              })}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <p className="font-[family-name:var(--font-mono)] text-[12px] opacity-25 p-8">
              no projects in this category.
            </p>
          )}
        </div>

        {/* Right decorative rail */}
        <div className="hidden xl:flex flex-col justify-between items-center w-10 shrink-0 py-6 sticky top-0 self-start h-screen border-l border-[#E5E5E5] ml-2">
          {/* "w." rotated at top */}
          <span
            className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] text-[#111] opacity-25 select-none"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            w.
          </span>
          {/* "Honors" rotated at bottom */}
          <span
            className="font-[family-name:var(--font-mono)] text-[9px] tracking-[0.18em] uppercase text-[#111] opacity-20 select-none"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Honors
          </span>
        </div>
      </div>

      {/* Copyright */}
      <p className="font-[family-name:var(--font-mono)] text-[10px] opacity-20 text-center tracking-[0.15em] py-10">
        LATENCY &copy; {new Date().getFullYear()}
      </p>

      {/* Modal */}
      <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
    </section>
  );
}
