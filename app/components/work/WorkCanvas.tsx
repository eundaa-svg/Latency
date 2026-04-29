"use client";

/*
 * WorkCanvas — two-column portfolio layout
 * ══════════════════════════════════════════
 * Left sidebar: LATENCY logo + category filter + live clock
 * Right content: responsive card grid (click → case study page)
 *
 * No ambient background. Content first.
 * ══════════════════════════════════════════
 */

import { useMemo } from "react";
import Link from "next/link";
import { WorkCanvasProvider, useWorkCanvas } from "./WorkCanvasContext";
import { CategoryStack } from "./CategoryStack";
import { WorkGrid } from "./WorkGrid";
import { LiveClock } from "@/app/components/LiveClock";
import type { Work, PortfolioCategory } from "@/lib/db";

interface WorkCanvasProps {
  works:      Work[];
  categories: PortfolioCategory[];
}

export function WorkCanvas({ works, categories }: WorkCanvasProps) {
  return (
    <WorkCanvasProvider works={works} categories={categories}>
      <WorkCanvasInner />
    </WorkCanvasProvider>
  );
}

function WorkCanvasInner() {
  const { works, filterCategory } = useWorkCanvas();

  const filteredWorks = useMemo<Work[]>(() => {
    if (filterCategory === "ALL") return works;
    return works.filter((w) => w.categoryId === filterCategory);
  }, [works, filterCategory]);

  return (
    <div
      className="fixed inset-0 flex flex-col"
      style={{ background: "var(--bg)" }}
      role="main"
    >
      {/* ── HEADER ───────────────────────────────────────────────────── */}
      <header className="shrink-0 flex items-center justify-between px-8 sm:px-10 pt-7 sm:pt-9 pb-6">
        <Link
          href="/"
          data-interactive="true"
          className="flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.18em] uppercase cursor-none focus:outline-none"
          style={{ color: "var(--fg)" }}
        >
          LATENCY
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--accent)", animation: "glowPulse 2s ease-in-out infinite" }}
          />
        </Link>

        <nav className="flex items-center gap-5 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.12em] uppercase">
          {[
            { label: "work",    href: "/work" },
            { label: "about",   href: "/#about" },
            { label: "contact", href: "/#contact" },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              data-interactive="true"
              className="cs-nav cursor-none focus:outline-none"
              style={{ color: "var(--fg-muted)" }}
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>

      {/* ── BODY ─────────────────────────────────────────────────────── */}
      <div className="flex-1 flex min-h-0">

        {/* LEFT: sidebar */}
        <aside
          className="shrink-0 flex flex-col px-8 sm:px-10 pb-8"
          style={{
            width: "clamp(160px, 18vw, 220px)",
            borderRight: "1px solid var(--border)",
          }}
        >
          <CategoryStack />
          <div className="flex-1" />
          <LiveClock />
        </aside>

        {/* RIGHT: card grid */}
        <main className="flex-1 min-w-0 overflow-y-auto px-8 sm:px-10 pt-2 pb-10">
          <WorkGrid works={filteredWorks} />

          {/* Works count */}
          {filteredWorks.length > 0 && (
            <p
              className="mt-12 font-[family-name:var(--font-mono)] text-[10px] tabular-nums"
              style={{ color: "var(--fg-muted)", opacity: 0.3 }}
            >
              {filteredWorks.length} {filteredWorks.length === 1 ? "work" : "works"}
            </p>
          )}
        </main>
      </div>

      <style>{`
        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; box-shadow: 0 0 4px rgba(0,81,255,0.35); }
          50%       { opacity: 1;   box-shadow: 0 0 10px rgba(0,81,255,0.6); }
        }
        .cs-nav { transition: color 150ms; }
        .cs-nav:hover { color: var(--fg) !important; }
      `}</style>
    </div>
  );
}
