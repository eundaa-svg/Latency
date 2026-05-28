"use client";

/*
 * WorkCanvas — huyml.co/works-style works page.
 * Top meta row · center "Selected Work" title · numbered category bar ·
 * full-width horizontal drag timeline. No sidebar.
 * Colors stay black + white per brand.
 */

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/app/components/Logo";
import { WorkCanvasProvider, useWorkCanvas } from "./WorkCanvasContext";
import { CategoryBar } from "./CategoryBar";
import { HorizontalWorkTimeline } from "./HorizontalWorkTimeline";
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

  // "Hold and drag" hint — shown once, fades after 5s
  const [showHint, setShowHint] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden" style={{ background: "var(--bg)" }} role="main">

      {/* ── Top meta row ─────────────────────────────────────────────── */}
      <header className="shrink-0 grid grid-cols-3 items-start px-8 sm:px-12 pt-7 sm:pt-9">
        <p
          className="font-[family-name:var(--font-mono)] text-[10px] sm:text-[11px] leading-[1.6] tracking-[0.04em] max-w-[220px]"
          style={{ color: "var(--fg-muted)" }}
        >
          Open for any collaborations<br />and offers
        </p>
        <div className="flex justify-center">
          <Logo size="md" href="/" />
        </div>
        <nav className="flex flex-col items-end gap-1 font-[family-name:var(--font-mono)] text-[10px] sm:text-[11px] tracking-[0.1em] uppercase">
          <span style={{ color: "var(--fg-muted)" }}>Folio Vol.1 —</span>
          <div className="flex items-center gap-4">
            {[
              { label: "about",   href: "/about" },
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
          </div>
        </nav>
      </header>

      {/* ── Center title ─────────────────────────────────────────────── */}
      <div className="shrink-0 grid grid-cols-3 items-center px-8 sm:px-12 pt-[clamp(24px,6vh,72px)]">
        <p
          className="font-[family-name:var(--font-mono)] text-[10px] sm:text-[11px] leading-[1.6] tracking-[0.06em] uppercase max-w-[180px]"
          style={{ color: "var(--fg-muted)" }}
        >
          Selected works I have<br />done since 2025
        </p>
        <h1 className="wc-title text-center" style={{ color: "var(--fg)" }}>
          Selected Work
        </h1>
        <p
          className="justify-self-end text-right font-[family-name:var(--font-mono)] text-[10px] sm:text-[11px] leading-[1.6] tracking-[0.1em] uppercase"
          style={{ color: "var(--fg-muted)" }}
        >
          Hold and drag<br />to discover →
        </p>
      </div>

      {/* ── Category bar ─────────────────────────────────────────────── */}
      <div
        className="shrink-0 px-8 sm:px-12 pt-[clamp(20px,5vh,56px)] pb-5"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <CategoryBar />
      </div>

      {/* ── Horizontal timeline ──────────────────────────────────────── */}
      <div className="relative flex-1 min-h-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={filterCategory}
            className="w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            {filteredWorks.length > 0 ? (
              <HorizontalWorkTimeline works={filteredWorks} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p
                  className="font-[family-name:var(--font-mono)] text-[13px]"
                  style={{ color: "var(--fg-muted)", opacity: 0.4 }}
                >
                  No works in this category.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* One-time drag hint */}
        <AnimatePresence>
          {showHint && filteredWorks.length > 0 && (
            <motion.div
              className="pointer-events-none absolute bottom-6 right-8 sm:right-12 font-[family-name:var(--font-mono)] text-[10px] tracking-[0.16em] uppercase"
              style={{ color: "var(--fg-muted)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              Hold and drag to discover →
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .wc-nav { transition: color 150ms; }
        .wc-nav:hover { color: var(--fg) !important; }
        .wc-title {
          font-family: var(--font-serif), Georgia, serif;
          font-weight: 500;
          font-style: italic;
          font-size: clamp(34px, 6vw, 84px);
          line-height: 1;
          letter-spacing: -0.02em;
        }
      `}</style>
    </div>
  );
}
