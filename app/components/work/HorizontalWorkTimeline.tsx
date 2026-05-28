"use client";

/*
 * HorizontalWorkTimeline — huyml.co/works-style drag timeline.
 * Works are grouped by year (descending). Drag (mouse/touch) or vertical wheel
 * moves the track horizontally. Cards keep the `work-thumb-${id}` layoutId so
 * the card→detail shared-element transition (CaseStudy) stays intact.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, animate, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Work } from "@/lib/db";

interface Props {
  works: Work[];
}

const SPRING = { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const };

export function HorizontalWorkTimeline({ works }: Props) {
  const router = useRouter();
  const reduce = useReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const [bounds, setBounds]   = useState({ left: 0, right: 0 });
  const [dragging, setDragging] = useState(false);
  // distinguishes a drag-release from an intentional click
  const movedRef = useRef(false);

  // Group by year, newest first
  const years = useMemo(() => {
    const byYear: Record<string, Work[]> = {};
    for (const w of works) (byYear[w.year] ??= []).push(w);
    return Object.keys(byYear)
      .sort((a, b) => Number(b) - Number(a))
      .map((year) => ({ year, items: byYear[year] }));
  }, [works]);

  // Measure scrollable distance whenever the set changes or the window resizes
  useEffect(() => {
    const measure = () => {
      const c = containerRef.current;
      const t = trackRef.current;
      if (!c || !t) return;
      const left = Math.min(0, c.offsetWidth - t.scrollWidth);
      setBounds({ left, right: 0 });
      // keep x within new bounds after a filter change
      if (x.get() < left) animate(x, left, SPRING);
      else animate(x, 0, SPRING);
    };
    measure();
    window.addEventListener("resize", measure);
    const t = window.setTimeout(measure, 200); // after images settle
    return () => { window.removeEventListener("resize", measure); window.clearTimeout(t); };
  }, [works, x]);

  // Vertical wheel / trackpad → horizontal travel
  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    const onWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (delta === 0) return;
      e.preventDefault();
      const next = Math.max(bounds.left, Math.min(0, x.get() - delta));
      if (reduce) x.set(next);
      else animate(x, next, { duration: 0.4, ease: [0.4, 0, 0.2, 1] });
    };
    c.addEventListener("wheel", onWheel, { passive: false });
    return () => c.removeEventListener("wheel", onWheel);
  }, [bounds.left, x, reduce]);

  const open = (slug: string) => {
    if (movedRef.current) return; // suppress click that ended a drag
    router.push(`/work/${slug}`);
  };

  return (
    <div
      ref={containerRef}
      className="hwt-container relative w-full h-full overflow-hidden"
    >
      <motion.div
        ref={trackRef}
        className="hwt-track flex items-end gap-10 h-full px-8 sm:px-12"
        style={{ x }}
        drag="x"
        dragConstraints={bounds}
        dragElastic={0.06}
        dragMomentum
        dragTransition={{ bounceStiffness: 220, bounceDamping: 32, power: 0.25 }}
        onDragStart={() => { setDragging(true); movedRef.current = true; }}
        onDragEnd={() => {
          setDragging(false);
          // hold the "moved" flag briefly so the trailing click is ignored
          window.setTimeout(() => { movedRef.current = false; }, 60);
        }}
      >
        {years.map(({ year, items }) => (
          <div key={year} className="flex items-end gap-10">
            {/* Year label */}
            <div className="flex flex-col justify-end pr-2 select-none shrink-0">
              <p className="hwt-year font-[family-name:var(--font-sans)]" style={{ color: "var(--fg)" }}>
                {year}
              </p>
              <p
                className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.14em] mt-3"
                style={{ color: "var(--fg-muted)", opacity: 0.5 }}
              >
                {items.length} PROJECT{items.length > 1 ? "S" : ""}
              </p>
            </div>

            {/* That year's works */}
            {items.map((work, i) => (
              <TimelineCard
                key={work.id}
                work={work}
                index={i}
                dragging={dragging}
                onOpen={open}
              />
            ))}
          </div>
        ))}
      </motion.div>

      <style>{`
        .hwt-container { cursor: grab; }
        .hwt-container:active { cursor: grabbing; }
        .hwt-track { width: max-content; }
        .hwt-year { font-size: clamp(44px, 7vw, 92px); line-height: 0.9; font-weight: 300; letter-spacing: -0.03em; }

        .hwt-thumb { width: clamp(190px, 34vh, 300px); }
        .hwt-thumb-img { transition: transform 280ms ease; will-change: transform; }
        .hwt-card:hover .hwt-thumb-img { transform: scale(1.025); }
        .hwt-card video { transition: opacity 300ms ease, transform 280ms ease; }
        .hwt-card:hover video { opacity: 1 !important; transform: scale(1.025); }
        .hwt-overlay { background: rgba(0,0,0,0.14); opacity: 0; transition: opacity 220ms ease; }
        .hwt-card:hover .hwt-overlay { opacity: 1; }
        .hwt-title { transition: opacity 180ms ease; }
        .hwt-card:hover .hwt-title { opacity: 0.65; }
        .hwt-badge {
          position: absolute; top: 10px; right: 11px;
          background: rgba(0,0,0,0.55); border-radius: 3px; padding: 3px 6px;
          font-size: 11px; color: rgba(255,255,255,0.85); letter-spacing: 0.06em;
          pointer-events: none;
        }
        .hwt-index {
          position: absolute; top: 10px; left: 12px;
          font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.08em;
          color: rgba(255,255,255,0.7);
          opacity: 0; transform: translateY(-3px);
          transition: opacity 220ms ease, transform 220ms ease, color 220ms ease;
          pointer-events: none;
        }
        .hwt-card:hover .hwt-index { opacity: 1; transform: translateY(0); color: var(--accent); }
        .hwt-arrow {
          position: absolute; top: 9px; right: 11px;
          font-size: 13px; line-height: 1; color: rgba(255,255,255,0.85);
          opacity: 0; transform: translate(-3px, 3px);
          transition: opacity 220ms ease, transform 220ms ease;
          pointer-events: none;
        }
        .hwt-card:hover .hwt-arrow { opacity: 1; transform: translate(0,0); }
      `}</style>
    </div>
  );
}

// ── Card ──────────────────────────────────────────────────────────────────────

interface CardProps {
  work: Work;
  index: number;
  dragging: boolean;
  onOpen: (slug: string) => void;
}

function TimelineCard({ work, index, dragging, onOpen }: CardProps) {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.currentTime = 0.01;
  }, []);

  const hasVideo  = !!work.video;
  const showBadge = work.type === "video" || hasVideo;

  const play = () => {
    if (dragging) return;
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {});
  };
  const stop = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  return (
    <div
      className="hwt-card shrink-0 select-none"
      onMouseEnter={hasVideo ? play : undefined}
      onMouseLeave={hasVideo ? stop : undefined}
    >
      <button
        onClick={() => onOpen(work.slug)}
        data-interactive="true"
        className="relative block text-left cursor-none focus:outline-none"
      >
        {/* Shared element — matches CaseStudy hero layoutId */}
        <motion.div
          layoutId={`work-thumb-${work.id}`}
          className="relative overflow-hidden hwt-thumb"
          style={{ aspectRatio: "1/1", background: work.accentColor || "#111" }}
          transition={{ duration: reduce ? 0 : 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {work.thumbnail && (
            <Image
              src={work.thumbnail}
              alt={work.title}
              fill
              sizes="320px"
              className="object-cover hwt-thumb-img pointer-events-none"
              draggable={false}
            />
          )}
          {hasVideo && (
            <video
              ref={videoRef}
              src={work.video}
              muted
              playsInline
              loop
              preload="none"
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300"
              style={{ pointerEvents: "none", opacity: dragging ? 0 : undefined }}
            />
          )}
          {showBadge && (
            <span className="hwt-badge" aria-hidden>▶</span>
          )}
          <span className="hwt-index" aria-hidden>{String(index + 1).padStart(2, "0")}</span>
          {!showBadge && <span className="hwt-arrow" aria-hidden>↗</span>}
          <div className="hwt-overlay absolute inset-0 pointer-events-none" />
        </motion.div>

        <div className="mt-3">
          <p
            className="hwt-title font-[family-name:var(--font-mono)] text-[13px] tracking-[-0.01em]"
            style={{ color: "var(--fg)" }}
          >
            {work.title}
          </p>
          <p
            className="font-[family-name:var(--font-mono)] text-[11px] mt-0.5"
            style={{ color: "var(--fg-muted)", opacity: 0.4 }}
          >
            {work.category}
          </p>
        </div>
      </button>
    </div>
  );
}
