"use client";

import { motion } from "framer-motion";
import type { Category } from "@/data/projects";

const EASE = [0.22, 1, 0.36, 1] as const;

interface CategoryFilterProps {
  categories: Category[];
  /** Count of projects per category */
  counts: Record<string, number>;
  selected: Category | null;
  onSelect: (c: Category | null) => void;
  /** "sidebar" = vertical list (desktop), "bar" = horizontal scrollable row (mobile) */
  layout?: "sidebar" | "bar";
}

interface FilterItemProps {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}

function FilterItem({ label, count, active, onClick }: FilterItemProps) {
  return (
    <motion.button
      onClick={onClick}
      data-interactive="true"
      className="relative flex items-center justify-between gap-3 w-full text-left group"
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.12, ease: EASE }}
    >
      {/* Active indicator bar */}
      <motion.span
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] rounded-full bg-[#111]"
        animate={{ height: active ? "70%" : "0%", opacity: active ? 1 : 0 }}
        transition={{ duration: 0.2, ease: EASE }}
      />

      <motion.span
        className="font-[family-name:var(--font-mono)] text-[12px] tracking-wide pl-4"
        animate={{ opacity: active ? 1 : 0.38, x: active ? 2 : 0 }}
        transition={{ duration: 0.2, ease: EASE }}
      >
        {label}
      </motion.span>

      <motion.span
        className="font-[family-name:var(--font-mono)] text-[10px] tabular-nums"
        animate={{ opacity: active ? 0.6 : 0.25 }}
        transition={{ duration: 0.2 }}
      >
        {count}
      </motion.span>
    </motion.button>
  );
}

// ── Horizontal pill row (mobile / compact) ───────────────────────────────────
function PillItem({
  label,
  count,
  active,
  onClick,
}: FilterItemProps) {
  return (
    <button
      onClick={onClick}
      data-interactive="true"
      className="shrink-0 font-[family-name:var(--font-mono)] text-[11px] tracking-wide px-3 py-1 rounded-[4px] border transition-none"
      style={{
        background: active ? "#111111" : "#F0F0F0",
        borderColor: active ? "#111111" : "#E5E5E5",
        color: active ? "#FAFAFA" : "#111111",
        transition: "background 150ms, border-color 150ms, color 150ms",
      }}
    >
      {label}
      <span
        className="ml-1.5 tabular-nums"
        style={{ opacity: active ? 0.6 : 0.4 }}
      >
        {count}
      </span>
    </button>
  );
}

export function CategoryFilter({
  categories,
  counts,
  selected,
  onSelect,
  layout = "sidebar",
}: CategoryFilterProps) {
  const totalCount = Object.values(counts).reduce((a, b) => a + b, 0);

  if (layout === "bar") {
    return (
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <PillItem
          label="all"
          count={totalCount}
          active={selected === null}
          onClick={() => onSelect(null)}
        />
        {categories.map((cat) => (
          <PillItem
            key={cat}
            label={cat}
            count={counts[cat] ?? 0}
            active={selected === cat}
            onClick={() => onSelect(selected === cat ? null : cat)}
          />
        ))}
      </div>
    );
  }

  // sidebar layout
  return (
    <nav className="flex flex-col gap-0.5">
      <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.18em] uppercase opacity-30 mb-3 pl-4">
        filter
      </p>
      <FilterItem
        label="all work"
        count={totalCount}
        active={selected === null}
        onClick={() => onSelect(null)}
      />
      {categories.map((cat) => (
        <FilterItem
          key={cat}
          label={cat}
          count={counts[cat] ?? 0}
          active={selected === cat}
          onClick={() => onSelect(selected === cat ? null : cat)}
        />
      ))}
    </nav>
  );
}
