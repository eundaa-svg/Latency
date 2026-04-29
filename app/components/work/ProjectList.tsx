"use client";

import { useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { Work } from "@/lib/db";
import { useWorkCanvas } from "./WorkCanvasContext";

const FADE_DURATION_ENTER = 0.4;
const FADE_DURATION_EXIT  = 0.3;
const STAGGER_MAX_MS      = 0.065;
const EASE = [0.22, 1, 0.36, 1] as const;

interface Props {
  works:   Work[];
  reduced: boolean;
}

export function ProjectList({ works, reduced }: Props) {
  const { hoveredId, activeId, setHovered, commit, close } = useWorkCanvas();
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { close(); return; }

      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const idx  = works.findIndex((w) => w.id === (hoveredId ?? activeId));
        const next = e.key === "ArrowDown"
          ? Math.min(idx + 1, works.length - 1)
          : Math.max(idx - 1, 0);
        const target = works[next > -1 ? next : 0];
        if (target) setHovered(target.id);
      }

      if (e.key === "Enter" && hoveredId) commit(hoveredId);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [works, hoveredId, activeId, setHovered, commit, close]);

  const handleListLeave = useCallback(() => {
    if (!activeId) setHovered(null);
  }, [activeId, setHovered]);

  const effectiveHoveredId = hoveredId ?? activeId;
  const hoveredIndex = effectiveHoveredId
    ? works.findIndex((w) => w.id === effectiveHoveredId)
    : -1;

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
      {effectiveHoveredId && (() => {
        const w = works.find((x) => x.id === effectiveHoveredId);
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
          const isHovered   = work.id === effectiveHoveredId;
          const isCommitted = work.id === activeId;

          const opacity = effectiveHoveredId === null ? 1 : isHovered ? 1 : 0.15;

          const distance    = hoveredIndex >= 0 ? Math.abs(i - hoveredIndex) : 0;
          const maxDistance = Math.max(works.length - 1, 1);
          const closeness   = 1 - distance / maxDistance;
          const enterDelay  = reduced ? 0 : closeness * STAGGER_MAX_MS;
          const exitDelay   = reduced ? 0 : (1 - closeness) * STAGGER_MAX_MS * 0.5;
          const isEntering  = effectiveHoveredId !== null;
          const delay       = isEntering ? enterDelay : exitDelay;
          const duration    = reduced ? 0.1 : isEntering ? FADE_DURATION_ENTER : FADE_DURATION_EXIT;

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
              onBlur={()     => { if (!activeId) setHovered(null); }}
              onClick={()    => commit(work.id)}
              aria-label={`${work.title} — ${work.category}, ${work.year}`}
              aria-pressed={isCommitted}
            >
              <span
                className="font-[family-name:var(--font-sans)] leading-[1.32] tracking-[-0.01em] block"
                style={{
                  fontSize:      "clamp(20px, 2.6vw, 32px)",
                  fontWeight:    500,
                  color:         "var(--fg)",
                  borderBottom:  isCommitted ? "1px solid var(--accent)" : "none",
                  paddingBottom: isCommitted ? "2px" : "0",
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
