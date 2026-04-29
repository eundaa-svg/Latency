"use client";

// Interactive latency indicator — the core visual concept of the About page.
//
// Idle:  an active arc (bright ticks) rotates continuously around a circle.
// Hover: auto-rotation pauses; the arc's tip lerps toward the mouse angle.
//        LERP factor 0.08 is intentionally slow — the visible lag IS the concept.
// Click: one fast full revolution (0.8s ease-in-out) + center dot pulse.
//
// All animation state lives in refs. RAF writes directly to SVG element
// attributes. Zero React state changes during animation.

import { useRef, useEffect } from "react";

// ── Constants ────────────────────────────────────────────────────────────────

const TICKS         = 60;
const RADIUS        = 160;
const TICK_W        = 1.5;
const ARC_IDLE      = 9;    // ticks in active arc (idle)
const ARC_HOVER     = 5;    // ticks in active arc (hover)
const LERP          = 0.08; // DO NOT increase — the lag is the concept
const IDLE_SPEED    = (2 * Math.PI) / (6 * 60); // 1 rev / 6 sec at 60 fps
const ACCENT        = "#4488FF"; // slightly lighter than site --accent for SVG

// ── Noise dots (deterministic) ───────────────────────────────────────────────

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

const NOISE = (() => {
  const r = seeded(7);
  return Array.from({ length: 80 }, () => {
    const a = r() * Math.PI * 2;
    const d = 190 + r() * 70;
    return { x: Math.cos(a) * d, y: Math.sin(a) * d, o: 0.06 + r() * 0.18 };
  });
})();

// ── Helpers ──────────────────────────────────────────────────────────────────

function minAngleDist(a: number, b: number): number {
  const d = Math.abs(a - b) % (Math.PI * 2);
  return d > Math.PI ? Math.PI * 2 - d : d;
}

function lerpAngle(current: number, target: number, t: number): number {
  let diff = target - current;
  diff = ((diff + Math.PI) % (Math.PI * 2)) - Math.PI;
  return current + diff * t;
}

// ── Component ────────────────────────────────────────────────────────────────

export function AboutGraphic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRefs     = useRef<(SVGLineElement | null)[]>(Array(TICKS).fill(null));
  const centerRef    = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const reduced  = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;

    const st = {
      hovered:        false,
      currentAngle:   -Math.PI / 2, // start at top
      idleAngle:      -Math.PI / 2,
      targetAngle:    -Math.PI / 2,
      spinning:       false,
      spinStart:      0,
      spinFromAngle:  0,
      pulsing:        false,
      pulseStart:     0,
    };

    // ── Mouse handlers ────────────────────────────────────────────────────
    const onEnter = () => { if (!isCoarse) st.hovered = true; };
    const onLeave = () => {
      if (!isCoarse) {
        st.hovered = false;
        // sync idle to where current stopped so no jump on resume
        st.idleAngle = st.currentAngle;
      }
    };
    const onMove = (e: PointerEvent) => {
      if (!st.hovered || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      st.targetAngle = Math.atan2(e.clientY - cy, e.clientX - cx);
    };
    const onClick = () => {
      if (st.spinning) return;
      st.spinning     = true;
      st.spinStart    = performance.now();
      st.spinFromAngle = st.currentAngle;
      st.pulsing      = true;
      st.pulseStart   = performance.now();
    };

    const el = containerRef.current;
    el?.addEventListener("pointerenter", onEnter);
    el?.addEventListener("pointerleave", onLeave);
    el?.addEventListener("pointermove",  onMove, { passive: true });
    el?.addEventListener("click",        onClick);

    // ── RAF loop ──────────────────────────────────────────────────────────
    let rafId: number;

    const tick = (now: number) => {
      if (!reduced) {
        // ── Angle update ───────────────────────────────────────────────
        if (st.spinning) {
          const elapsed = (now - st.spinStart) / 1000;
          const dur = 0.8;
          if (elapsed >= dur) {
            st.spinning    = false;
            st.currentAngle = st.spinFromAngle + Math.PI * 2;
            st.idleAngle    = st.currentAngle;
          } else {
            const t    = elapsed / dur;
            const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
            st.currentAngle = st.spinFromAngle + ease * Math.PI * 2;
          }
        } else if (st.hovered) {
          st.currentAngle = lerpAngle(st.currentAngle, st.targetAngle, LERP);
        } else {
          st.idleAngle   += IDLE_SPEED;
          st.currentAngle = st.idleAngle;
          st.targetAngle  = st.idleAngle;
        }
      }

      // ── Tick update ────────────────────────────────────────────────────
      const arcTicks  = st.hovered ? ARC_HOVER : ARC_IDLE;
      const halfArcR  = (arcTicks / 2) * (Math.PI * 2 / TICKS);

      for (let i = 0; i < TICKS; i++) {
        const line = lineRefs.current[i];
        if (!line) continue;
        const tickAngle = (i / TICKS) * Math.PI * 2 - Math.PI / 2;
        const dist      = minAngleDist(st.currentAngle, tickAngle);

        let opacity: number;
        let stroke = "white";

        if (dist < halfArcR) {
          const t   = 1 - dist / halfArcR;
          opacity   = 0.15 + 0.85 * t;
          if (st.hovered && t > 0.5) stroke = ACCENT;
          // Slightly elongate active ticks
          const inner = RADIUS - 6 - (reduced ? 0 : 2 * t);
          const outer = RADIUS + 6 + (reduced ? 0 : 2 * t);
          const cos   = Math.cos(tickAngle);
          const sin   = Math.sin(tickAngle);
          line.setAttribute("x1", String(cos * inner));
          line.setAttribute("y1", String(sin * inner));
          line.setAttribute("x2", String(cos * outer));
          line.setAttribute("y2", String(sin * outer));
        } else {
          opacity = 0.12;
          const cos = Math.cos(tickAngle);
          const sin = Math.sin(tickAngle);
          line.setAttribute("x1", String(cos * (RADIUS - 6)));
          line.setAttribute("y1", String(sin * (RADIUS - 6)));
          line.setAttribute("x2", String(cos * (RADIUS + 6)));
          line.setAttribute("y2", String(sin * (RADIUS + 6)));
        }

        line.setAttribute("opacity", String(Math.round(opacity * 100) / 100));
        line.setAttribute("stroke", stroke);
      }

      // ── Center dot pulse ───────────────────────────────────────────────
      const dot = centerRef.current;
      if (dot) {
        if (st.pulsing) {
          const elapsed = (now - st.pulseStart) / 1000;
          if (elapsed >= 0.35) {
            st.pulsing = false;
            dot.setAttribute("r", st.hovered ? "6" : "4");
          } else {
            const t = elapsed / 0.35;
            const scale = 1 + Math.sin(t * Math.PI) * 1.5;
            dot.setAttribute("r", String(4 * scale));
          }
        } else {
          dot.setAttribute("r", st.hovered ? "6" : "4");
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      el?.removeEventListener("pointerenter", onEnter);
      el?.removeEventListener("pointerleave", onLeave);
      el?.removeEventListener("pointermove",  onMove);
      el?.removeEventListener("click",        onClick);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ cursor: "default", display: "inline-block", lineHeight: 0 }}
      aria-hidden
    >
      <svg
        viewBox="-280 -280 560 560"
        style={{
          width:  "clamp(240px, 40vw, 360px)",
          height: "clamp(240px, 40vw, 360px)",
          overflow: "visible",
        }}
      >
        {/* Noise dots */}
        {NOISE.map((d, i) => (
          <circle
            key={i}
            cx={d.x} cy={d.y} r={1}
            fill="white"
            opacity={d.o}
            style={{ pointerEvents: "none" }}
          />
        ))}

        {/* Ticks */}
        {Array.from({ length: TICKS }, (_, i) => {
          const angle = (i / TICKS) * Math.PI * 2 - Math.PI / 2;
          const cos   = Math.cos(angle);
          const sin   = Math.sin(angle);
          return (
            <line
              key={i}
              ref={el => { lineRefs.current[i] = el; }}
              x1={cos * (RADIUS - 6)}
              y1={sin * (RADIUS - 6)}
              x2={cos * (RADIUS + 6)}
              y2={sin * (RADIUS + 6)}
              stroke="white"
              strokeWidth={TICK_W}
              strokeLinecap="round"
              opacity={0.12}
              style={{ pointerEvents: "none" }}
            />
          );
        })}

        {/* Center dot */}
        <circle
          ref={centerRef}
          cx={0} cy={0} r={4}
          fill="white"
          style={{ pointerEvents: "none" }}
        />
      </svg>
    </div>
  );
}
