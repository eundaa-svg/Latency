"use client";

import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { Work } from "@/lib/db";
import { useWorkCanvas } from "./WorkCanvasContext";

const FADE_ENTER = 0.4;
const FADE_EXIT  = 0.3;
const STAGGER    = 0.065;
const EASE = [0.22, 1, 0.36, 1] as const;

interface Props {
  works:   Work[];
  reduced: boolean;
}

export function ProjectList({ works, reduced }: Props) {
  const { hoveredId, setHovered } = useWorkCanvas();
  const router  = useRouter();
  const listRef = useRef<HTMLDivElement>(null);

  // Keyboard: arrows move hover, Enter navigates
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const idx  = works.findIndex((w) => w.id === hoveredId);
        const next = e.key === "ArrowDown"
          ? Math.min(idx + 1, works.length - 1)
          : Math.max(idx - 1, 0);
        const target = works[next > -1 ? next : 0];
        if (target) setHovered(target.id);
      }
      if (e.key === "Enter" && hoveredId) {
        router.push(`/work/${hoveredId}`);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [works, hoveredId, setHovered, router]);

  const handleListLeave = useCallback(() => setHovered(null), [setHovered]);

  const hoveredIndex = hoveredId ? works.findIndex((w) => w.id === hoveredId) : -1;

  if (works.length === 0) {
    return (
      <p
        className="font-[family-name:var(--font-mono)] text-[13px] tracking-[0.06em]"
        style={{ color: "var(--fg-muted)", opacity: 0.4 }}
      >
        No works yet.
      </p>
    );
  }

  return (
    <>
      {hoveredId && (() => {
        const w = works.find((x) => x.id === hoveredId);
        return (
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            {w ? `Now previewing: ${w.title}, ${w.category}` : ""}
          </div>
        );
      })()}

      <div
        ref={listRef}
        role="list"
        className="flex flex-col"
        style={{ gap: "0.08em" }}
        onMouseLeave={handleListLeave}
      >
        {works.map((work, i) => {
          const isHovered = work.id === hoveredId;
          const opacity   = hoveredId === null ? 1 : isHovered ? 1 : 0.15;

          const distance   = hoveredIndex >= 0 ? Math.abs(i - hoveredIndex) : 0;
          const closeness  = 1 - distance / Math.max(works.length - 1, 1);
          const enterDelay = reduced ? 0 : closeness * STAGGER;
          const exitDelay  = reduced ? 0 : (1 - closeness) * STAGGER * 0.5;
          const duration   = reduced ? 0.1 : hoveredId !== null ? FADE_ENTER : FADE_EXIT;
          const delay      = hoveredId !== null ? enterDelay : exitDelay;

          return (
            <motion.button
              key={work.id}
              role="listitem"
              data-interactive="true"
              className="text-left block cursor-none w-full focus:outline-none"
              style={{ WebkitTapHighlightColor: "transparent" }}
              animate={{ opacity }}
              transition={{ duration, delay, ease: EASE }}
              onMouseEnter={() => setHovered(work.id)}
              onFocus={()    => setHovered(work.id)}
              onBlur={()     => setHovered(null)}
              onClick={()    => router.push(`/work/${work.id}`)}
              aria-label={`${work.title} — ${work.category}, ${work.year}`}
            >
              <span
                className="font-[family-name:var(--font-sans)] leading-[1.32] tracking-[-0.01em] block"
                style={{
                  fontSize:   "clamp(20px, 2.6vw, 32px)",
                  fontWeight: 500,
                  color:      "var(--fg)",
                }}
              >
                {work.title}.
              </span>
            </motion.button>
          );
        })}
      </div>
    </>
  );
}
