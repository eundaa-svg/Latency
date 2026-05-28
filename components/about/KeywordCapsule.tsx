"use client";

import { motion, useReducedMotion } from "framer-motion";

interface Props {
  text: string;
  delay?: number;
}

// Pastel-outlined pixel capsule that scales/fades in on scroll (Section 2).
export function KeywordCapsule({ text, delay = 0 }: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.span
      initial={reduce ? { opacity: 0 } : { scale: 0.85, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ delay: reduce ? 0 : delay, duration: reduce ? 0.2 : 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="inline-block rounded-full px-5 py-2.5 text-[15px] sm:text-[17px]"
      style={{ border: "1px solid #B8D4F1", color: "#B8D4F1" }}
    >
      {text}
    </motion.span>
  );
}
