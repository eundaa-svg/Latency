"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type From = "left" | "right" | "bottom";

interface Props {
  children: ReactNode;
  from?: From;
  delay?: number;
  className?: string;
}

const OFFSET: Record<From, { x?: number; y?: number }> = {
  left:   { x: -90 },
  right:  { x: 90 },
  bottom: { y: 48 },
};

// Slides content in from a direction as it scrolls into view (once).
// Under reduced motion it simply fades — no translation, near-instant.
export function SlideInText({ children, from = "left", delay = 0, className = "" }: Props) {
  const reduce = useReducedMotion();

  const initial = reduce ? { opacity: 0 } : { ...OFFSET[from], opacity: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{
        duration: reduce ? 0.2 : 0.8,
        ease: [0.4, 0, 0.2, 1],
        delay: reduce ? 0 : delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
