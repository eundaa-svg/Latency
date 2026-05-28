"use client";

// Horizontal numbered category filter — replaces the old left sidebar
// (CategoryStack). Active = white + underline; inactive = muted.

import { useWorkCanvas } from "./WorkCanvasContext";

export function CategoryBar() {
  const { categories, filterCategory, setFilter } = useWorkCanvas();

  const items = [
    { label: "All Works", value: "ALL" },
    ...categories.map((c) => ({ label: c.name, value: c.id })),
  ];

  return (
    <nav
      className="flex items-center flex-wrap gap-x-7 gap-y-2"
      aria-label="Filter works by category"
    >
      {items.map(({ label, value }, i) => {
        const active = filterCategory === value;
        return (
          <button
            key={value}
            onClick={() => setFilter(value)}
            data-interactive="true"
            aria-pressed={active}
            className="cb-item group cursor-none focus:outline-none flex items-baseline gap-1.5 font-[family-name:var(--font-mono)]"
          >
            <span
              className="text-[10px] tracking-[0.1em] tabular-nums"
              style={{ color: "var(--fg-muted)", opacity: active ? 0.9 : 0.4 }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className="cb-label text-[12px] tracking-[0.04em]"
              style={{
                color: "var(--fg)",
                opacity: active ? 1 : 0.4,
                borderBottom: active ? "1px solid var(--fg)" : "1px solid transparent",
                paddingBottom: 1,
                transition: "opacity 150ms ease",
              }}
            >
              {label}
            </span>
          </button>
        );
      })}

      <span
        className="ml-auto font-[family-name:var(--font-mono)] text-[10px] tracking-[0.12em]"
        style={{ color: "var(--fg-muted)", opacity: 0.5 }}
      >
        ©2026
      </span>

      <style>{`
        .cb-item:hover .cb-label { opacity: 0.8 !important; }
      `}</style>
    </nav>
  );
}
