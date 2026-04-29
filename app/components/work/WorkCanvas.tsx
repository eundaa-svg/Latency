"use client";

/*
 * WorkCanvas — grid-only work listing page
 * Left sidebar: LATENCY logo + category filter + clock
 * Right: card grid — click navigates to /work/[id] case study page
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
    <div className="fixed inset-0 flex flex-col" style={{ background: "var(--bg)" }} role="main">

      {/* Header */}
      <header className="shrink-0 flex items-center justify-between px-8 sm:px-10 pt-7 sm:pt-9 pb-5">
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
              className="wc-nav cursor-none focus:outline-none"
              style={{ color: "var(--fg-muted)" }}
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Body */}
      <div className="flex-1 flex min-h-0" style={{ borderTop: "1px solid var(--border)" }}>

        {/* Sidebar */}
        <aside
          className="shrink-0 flex flex-col px-8 sm:px-10 pt-6 pb-8"
          style={{ width: "clamp(150px, 16vw, 210px)", borderRight: "1px solid var(--border)" }}
        >
          <CategoryStack />
          <div className="flex-1" />
          <LiveClock />
        </aside>

        {/* Grid */}
        <main className="flex-1 min-w-0 overflow-y-auto px-8 sm:px-10 pt-6 pb-10">
          <WorkGrid works={filteredWorks} />
          {filteredWorks.length > 0 && (
            <p
              className="mt-12 font-[family-name:var(--font-mono)] text-[10px] tabular-nums"
              style={{ color: "var(--fg-muted)", opacity: 0.28 }}
            >
              {filteredWorks.length} {filteredWorks.length === 1 ? "work" : "works"}
            </p>
          )}
        </main>
      </div>

      <style>{`
        @keyframes glowPulse {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1;   }
        }
        .wc-nav { transition: color 150ms; }
        .wc-nav:hover { color: var(--fg) !important; }
      `}</style>
    </div>
  );
}
