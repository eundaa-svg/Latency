/*
 * ─────────────────────────────────────────────────────────────────
 *  LATENCY — DAN  |  Personal Portfolio
 * ─────────────────────────────────────────────────────────────────
 *  SWAP GUIDE:
 *    Avatar image  → replace the <span className="w-8 h-8 …">D</span>
 *                    in components/InlineInteraction.tsx (DanWord)
 *                    with <img src="/avatar.jpg" … className="w-8 h-8 rounded-full object-cover" />
 *
 *    Social links  → search "SWAP: links" below and update href values
 *
 *    Selected Work → search "SWAP: projects" below and update the
 *                    PROJECTS array with real titles, years, and tags
 *
 *    Clock city    → open components/LiveClock.tsx and replace
 *                    "SEL" with your city code (e.g. "NYC", "TYO", "LON")
 * ─────────────────────────────────────────────────────────────────
 */

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  DanWord,
  BetweenWord,
  TimingWord,
  LatencyWord,
  HatsWord,
  UiUxWord,
  LateWord,
  GraphicDesignWord,
  AdvertisingWord,
  ThingsWord,
  XrDesignWord,
  DiscomfortWord,
} from "./components/InlineInteraction";
import { CustomCursor } from "./components/CustomCursor";
import { LiveClock } from "./components/LiveClock";
import { WorkGallery } from "./components/WorkGallery";

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── HERO PARAGRAPH ───────────────────────────────────────────────────────────
function HeroParagraph() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      className="text-[14px] sm:text-[15px] leading-[1.85] text-[#111111] font-[family-name:var(--font-mono)]"
      initial={{ opacity: 0, y: 6 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: EASE }}
    >
      {/* Paragraph 1 */}
      <p className="mb-5">
        {"Yo! I\u2019m\u00A0"}
        <span data-interactive="true"><DanWord /></span>
        {". I design the time\u00A0"}
        <span data-interactive="true"><BetweenWord /></span>
        {"\u00A0action and response. My background is in interaction design, but what I really obsess over is\u00A0"}
        <span data-interactive="true"><TimingWord /></span>
        {"\u00A0\u2014 not just how things look, but when they happen."}
      </p>

      {/* Paragraph 2 */}
      <p className="mb-5">
        {"I work under the name\u00A0"}
        <span data-interactive="true"><LatencyWord /></span>
        {". Most designers look at screens. I look at what\u2019s\u00A0"}
        <span data-interactive="true"><BetweenWord /></span>
        {"\u00A0them. Fast isn\u2019t the goal. The right timing is."}
      </p>

      {/* Paragraph 3 */}
      <p>
        {"I wear many different\u00A0"}
        <span data-interactive="true"><HatsWord /></span>
        {". In\u00A0"}
        <span data-interactive="true"><UiUxWord /></span>
        {", I think about when information arrives \u2014 exactly when you need it, not a beat too\u00A0"}
        <span data-interactive="true"><LateWord /></span>
        {". In\u00A0"}
        <span data-interactive="true"><GraphicDesignWord /></span>
        {", visual rhythm guides the eye through silence as much as form. In\u00A0"}
        <span data-interactive="true"><AdvertisingWord /></span>
        {", a perfectly-timed message and a mistimed one are two completely different\u00A0"}
        <span data-interactive="true"><ThingsWord /></span>
        {". In\u00A0"}
        <span data-interactive="true"><XrDesignWord /></span>
        {", latency between movement and response is the difference between immersion and\u00A0"}
        <span data-interactive="true"><DiscomfortWord /></span>
        {"."}
      </p>
    </motion.div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <>
      <CustomCursor />

      {/* ── HERO — full viewport, no scroll ────────────────────────── */}
      <section className="relative h-[100dvh] flex flex-col bg-[#FAFAFA] overflow-hidden">

        {/* Top navigation */}
        <motion.nav
          className="flex items-center justify-between px-6 sm:px-10 pt-7 sm:pt-9 shrink-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          {/* Logo mark */}
          <div className="flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[11px] sm:text-[12px] tracking-[0.18em] uppercase text-[#111]">
            LATENCY
            <span
              className="inline-block w-1.5 h-1.5 rounded-full bg-[#0051FF]"
              style={{ animation: "blink 1s step-end infinite" }}
            />
          </div>

          {/* Nav links — SWAP: links */}
          <div className="flex items-center gap-5 sm:gap-7 font-[family-name:var(--font-mono)] text-[11px] sm:text-[12px]">
            {(["work", "about", "contact"] as const).map((item) => (
              <a
                key={item}
                href={`#${item}`}
                data-interactive="true"
                className="text-[#111] opacity-40 hover:opacity-100 transition-opacity duration-150"
              >
                {item}
              </a>
            ))}
          </div>
        </motion.nav>

        {/* Hero copy — vertically centered in remaining space */}
        <div className="flex-1 flex items-center justify-center px-6 sm:px-10 overflow-hidden">
          <div className="w-full max-w-[720px]">
            <HeroParagraph />
          </div>
        </div>

        {/* Bottom footer strip */}
        <motion.footer
          className="shrink-0 flex items-center justify-between px-6 sm:px-10 pb-6 sm:pb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.25, ease: EASE }}
        >
          <LiveClock />

          {/* SWAP: links — update href values */}
          <div className="flex items-center gap-5 sm:gap-6 font-[family-name:var(--font-mono)] text-[11px] tracking-wider">
            {[
              { label: "twitter", href: "https://twitter.com/" },
              { label: "email",   href: "mailto:dan@latency.work" },
              { label: "are.na",  href: "https://are.na/" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                data-interactive="true"
                className="text-[#111] opacity-40 hover:opacity-100 transition-opacity duration-150"
              >
                {label}
              </a>
            ))}
          </div>
        </motion.footer>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2, ease: EASE }}
        >
          <span
            className="font-[family-name:var(--font-mono)] text-[9px] tracking-[0.22em] uppercase text-[#111] opacity-25"
          >
            scroll
          </span>
          <motion.span
            className="font-[family-name:var(--font-mono)] text-[13px] text-[#111] opacity-25"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
        </motion.div>
      </section>

      {/* ── WORK GALLERY — scrollable below fold ────────────────────── */}
      <WorkGallery />

      {/* Blink keyframe for logo dot */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </>
  );
}
