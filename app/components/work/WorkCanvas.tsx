"use client";

/*
 * WorkCanvas — cinematic hover-reveal work list
 * ══════════════════════════════════════════════
 * Hover a title → fullscreen ambient preview fades in behind the list.
 * Click a title → navigates to /work/[id] case study page.
 *
 * States:
 *   A — Idle:  list at 100% opacity, no background
 *   B — Hover: ambient media fades in, other titles fade to 15%
 *   C — Cross: seamless crossfade when moving between titles (A/B layers)
 *
 * Data: server component (app/work/page.tsx) reads portfolio.json and
 * passes {works, categories} as props → held in WorkCanvasContext.
 * ══════════════════════════════════════════════
 */

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { WorkCanvasProvider, useWorkCanvas } from "./WorkCanvasContext";
import { ProjectBackground } from "./ProjectBackground";
import { ProjectList } from "./ProjectList";
import { HoverBreadcrumb } from "./HoverBreadcrumb";
import { CategoryStack } from "./CategoryStack";
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

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

type Layer = { workId: string | null; visible: boolean };

function WorkCanvasInner() {
  const { works, hoveredId, filterCategory } = useWorkCanvas();
  const reduced = useReducedMotion();

  const filteredWorks = useMemo<Work[]>(() => {
    if (filterCategory === "ALL") return works;
    return works.filter((w) => w.categoryId === filterCategory);
  }, [works, filterCategory]);

  // A/B double-buffer for seamless hover crossfade
  const [layerA, setLayerA] = useState<Layer>({ workId: null, visible: false });
  const [layerB, setLayerB] = useState<Layer>({ workId: null, visible: false });
  const activeLayerRef = useRef<"A" | "B">("A");

  useEffect(() => {
    if (!hoveredId) {
      setLayerA({ workId: null, visible: false });
      setLayerB({ workId: null, visible: false });
      return;
    }
    if (activeLayerRef.current === "A") {
      setLayerB({ workId: hoveredId, visible: true });
      setLayerA((p) => ({ ...p, visible: false }));
      activeLayerRef.current = "B";
    } else {
      setLayerA({ workId: hoveredId, visible: true });
      setLayerB((p) => ({ ...p, visible: false }));
      activeLayerRef.current = "A";
    }
  }, [hoveredId]);

  const workA = layerA.workId ? works.find((w) => w.id === layerA.workId) ?? null : null;
  const workB = layerB.workId ? works.find((w) => w.id === layerB.workId) ?? null : null;

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: "var(--bg)" }} role="main">

      {/* Z-1: ambient hover background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <ProjectBackground work={workA} visible={layerA.visible} reduced={reduced} />
        <ProjectBackground work={workB} visible={layerB.visible} reduced={reduced} />
      </div>

      {/* Z-3: UI */}
      <div className="absolute inset-0 z-[3] pointer-events-none">

        {/* Top bar */}
        <div className="absolute top-0 inset-x-0 flex items-start justify-between px-8 sm:px-10 pt-7 sm:pt-9 pointer-events-auto">
          <div className="flex flex-col gap-6">
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
            <CategoryStack />
            <HoverBreadcrumb hoveredId={hoveredId} works={filteredWorks} reduced={reduced} />
          </div>

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
                className="cursor-none focus:outline-none transition-opacity duration-150"
                style={{ color: "var(--fg-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-muted)")}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Center: work list */}
        <div className="absolute inset-0 flex items-center pointer-events-none">
          <div className="pl-[8vw] pr-[8vw] w-full max-w-[820px] overflow-hidden pointer-events-auto">
            <ProjectList works={filteredWorks} reduced={reduced} />
          </div>
        </div>

        {/* Bottom */}
        <div className="absolute bottom-0 inset-x-0 flex items-end justify-between px-8 sm:px-10 pb-6 sm:pb-8 pointer-events-auto">
          <LiveClock />
          <div className="flex-1" />
          <span
            className="font-[family-name:var(--font-mono)] text-[10px] tabular-nums"
            style={{ color: "var(--fg-muted)", opacity: 0.35 }}
          >
            {filteredWorks.length} {filteredWorks.length === 1 ? "work" : "works"}
          </span>
        </div>
      </div>

      <style>{`
        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; box-shadow: 0 0 4px rgba(0,81,255,0.35); }
          50%       { opacity: 1;   box-shadow: 0 0 10px rgba(0,81,255,0.6); }
        }
      `}</style>
    </div>
  );
}
