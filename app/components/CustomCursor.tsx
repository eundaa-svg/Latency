"use client";

// ─── RAF-based custom cursor ──────────────────────────────────────────────────
// All position and size state lives in refs — never in React state — so
// mousemove never triggers a React render cycle. The RAF loop lerps `current`
// toward `target` every frame and writes directly to the DOM element's style,
// giving the smoothest possible tracking at the display's native framerate.

import { useEffect, useRef } from "react";

const LERP_POS  = 0.18;  // position easing per frame (~60fps feels like ~200ms)
const LERP_SIZE = 0.22;  // size easing per frame (slightly faster than position)
const SIZE_DEFAULT  = 12;
const SIZE_HOVERED  = 22;

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // All mutable cursor state — kept in refs so no re-renders ever fire.
    const target  = { x: -100, y: -100 };
    const current = { x: -100, y: -100 };
    let targetSize  = SIZE_DEFAULT;
    let currentSize = SIZE_DEFAULT;
    let rafId: number;

    // ── RAF tick ──────────────────────────────────────────────────────────
    const tick = () => {
      current.x += (target.x - current.x) * LERP_POS;
      current.y += (target.y - current.y) * LERP_POS;
      currentSize += (targetSize - currentSize) * LERP_SIZE;

      const el = dotRef.current;
      if (el) {
        const s = currentSize;
        // translate3d triggers GPU compositing — no layout recalc.
        el.style.transform = `translate3d(${current.x - s * 0.5}px, ${current.y - s * 0.5}px, 0)`;
        el.style.width  = `${s}px`;
        el.style.height = `${s}px`;
      }

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // ── Mouse position ────────────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    // ── Hover detection (capture phase = no child-crossing flicker) ───────
    const onEnter = (e: MouseEvent) => {
      if ((e.target as Element)?.closest("[data-interactive]")) {
        targetSize = SIZE_HOVERED;
      }
    };
    const onLeave = (e: MouseEvent) => {
      const related = (e as MouseEvent & { relatedTarget: EventTarget | null })
        .relatedTarget;
      if (
        !(related instanceof Element) ||
        !related.closest("[data-interactive]")
      ) {
        targetSize = SIZE_DEFAULT;
      }
    };
    document.addEventListener("mouseenter", onEnter, true);
    document.addEventListener("mouseleave", onLeave, true);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter, true);
      document.removeEventListener("mouseleave", onLeave, true);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference"
      style={{ width: SIZE_DEFAULT, height: SIZE_DEFAULT, background: "#111111" }}
    />
  );
}
