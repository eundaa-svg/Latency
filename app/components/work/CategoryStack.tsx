"use client";

import { motion } from "framer-motion";
import { useWorkCanvas } from "./WorkCanvasContext";

const EASE = [0.22, 1, 0.36, 1] as const;

export function CategoryStack() {
  const { categories, filterCategory, setFilter } = useWorkCanvas();

  const items = [
    { label: "All Works", value: "ALL" },
    ...categories.map((c) => ({ label: c.name, value: c.id })),
  ];

  return (
    <nav className="flex flex-col gap-[6px]" aria-label="Filter works by category">
      {items.map(({ label, value }) => {
        const active = filterCategory === value;
        return (
          <motion.button
            key={value}
            onClick={() => setFilter(value)}
            data-interactive="true"
            className="text-left cursor-none font-[family-name:var(--font-mono)] text-[12px] tracking-[0.06em] focus:outline-none"
            style={{
              color:         "var(--fg)",
              borderBottom:  active ? "1px solid var(--fg-muted)" : "1px solid transparent",
              paddingBottom: "1px",
            }}
            animate={{ opacity: active ? 1 : 0.38 }}
            whileHover={{ opacity: active ? 1 : 0.75 }}
            transition={{ duration: 0.2, ease: EASE }}
            aria-pressed={active}
          >
            {label}
          </motion.button>
        );
      })}
    </nav>
  );
}
