"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Work } from "@/lib/db";

const EASE = [0.22, 1, 0.36, 1] as const;

interface Props {
  hoveredId: string | null;
  works:     Work[];
  reduced:   boolean;
}

export function HoverBreadcrumb({ hoveredId, works, reduced }: Props) {
  const idx  = hoveredId ? works.findIndex((w) => w.id === hoveredId) : -1;
  const work = idx >= 0 ? works[idx] : null;
  const prev = idx > 0 ? works[idx - 1] : null;
  const next = idx < works.length - 1 ? works[idx + 1] : null;

  return (
    <AnimatePresence>
      {work && (
        <motion.div
          key={work.id}
          className="flex flex-col gap-[3px]"
          initial={{ opacity: 0, y: reduced ? 0 : 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{   opacity: 0, y: reduced ? 0 : -4 }}
          transition={{ duration: reduced ? 0.1 : 0.4, ease: EASE }}
        >
          <span
            className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.14em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            {work.category}
          </span>
          <span
            className="font-[family-name:var(--font-mono)] text-[12px] tracking-[0.04em]"
            style={{ color: "var(--fg)", borderBottom: "1px solid var(--fg-muted)", paddingBottom: "2px" }}
          >
            {work.title}.
          </span>
          {prev && (
            <span className="font-[family-name:var(--font-mono)] text-[11px]" style={{ color: "var(--fg-muted)", opacity: 0.45 }}>
              ↑ {prev.title}.
            </span>
          )}
          {next && (
            <span className="font-[family-name:var(--font-mono)] text-[11px]" style={{ color: "var(--fg-muted)", opacity: 0.45 }}>
              ↓ {next.title}.
            </span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
