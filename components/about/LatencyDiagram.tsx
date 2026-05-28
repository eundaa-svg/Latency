"use client";

import { motion, useReducedMotion } from "framer-motion";

// Action → 0.3s → Reaction. The small dot, the delay, and the larger pastel
// dot draw in sequentially as the Philosophy section scrolls into view.
export function LatencyDiagram() {
  const reduce = useReducedMotion();

  const step = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, margin: "-10%" } as const,
    transition: { delay: reduce ? 0 : delay, duration: reduce ? 0.2 : 0.5, ease: [0.4, 0, 0.2, 1] as const },
  });

  const line = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { scaleX: 0, opacity: 0 },
    whileInView: { scaleX: 1, opacity: 1 },
    viewport: { once: true, margin: "-10%" } as const,
    transition: { delay: reduce ? 0 : delay, duration: reduce ? 0.2 : 0.4, ease: "linear" as const },
  });

  return (
    <div className="flex items-center justify-center gap-4 sm:gap-6" aria-hidden>
      {/* Action — small dot */}
      <motion.span {...step(0)} className="block rounded-full" style={{ width: 10, height: 10, background: "var(--fg-muted)" }} />

      <motion.span {...line(0.2)} className="block origin-left" style={{ width: 40, height: 1, background: "var(--fg-subtle)" }} />

      {/* The intentional latency */}
      <motion.span {...step(0.4)} className="text-[13px] tracking-[0.08em]" style={{ color: "#B8D4F1" }}>
        0.3s
      </motion.span>

      <motion.span {...line(0.6)} className="block origin-left" style={{ width: 40, height: 1, background: "var(--fg-subtle)" }} />

      {/* Reaction — larger pastel dot */}
      <motion.span {...step(0.8)} className="block rounded-full" style={{ width: 22, height: 22, background: "#B8D4F1" }} />
    </div>
  );
}
