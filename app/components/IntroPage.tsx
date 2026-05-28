"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { IntroReveal } from "./IntroReveal";
import { WorkCanvas } from "./work/WorkCanvas";
import { Logo } from "./Logo";
import { PixelFrame } from "./PixelFrame";
import type { Work, PortfolioCategory } from "@/lib/db";

const EASE = [0.22, 1, 0.36, 1] as const;

type View = "reveal" | "works";

interface Props {
  works:       Work[];
  categories:  PortfolioCategory[];
  initialView: View;
}

export function IntroPage({ works, categories, initialView }: Props) {
  const [view, setView] = useState<View>(initialView);

  // Work grid — WorkCanvas owns its own full-screen layout and nav
  if (view === "works") {
    return (
      <motion.div
        key="works"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <WorkCanvas works={works} categories={categories} />
      </motion.div>
    );
  }

  // Reveal screen
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="reveal"
        className="fixed inset-0 flex flex-col"
        style={{ background: "var(--bg)" }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        {/* NAV — always visible so users can skip or navigate away */}
        <header className="shrink-0 flex items-center justify-between px-6 sm:px-10 pt-7 sm:pt-9 pb-4 relative z-10">
          <Logo size="md" href="/" />

          <nav className="flex items-center gap-5 sm:gap-7 text-[11px] sm:text-[12px] tracking-[0.04em] uppercase">
            {/* WORK: skip reveal, go to works grid immediately */}
            <button
              onClick={() => setView("works")}
              data-interactive="true"
              className="cursor-none transition-all duration-150 focus:outline-none"
              style={{ color: "var(--fg-muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-muted)")}
            >
              work
            </button>
            {[
              { label: "about",   href: "/about" },
              { label: "contact", href: "/#contact" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                data-interactive="true"
                className="cursor-none transition-all duration-150 focus:outline-none"
                style={{ color: "var(--fg-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-muted)")}
              >
                {label}
              </Link>
            ))}
          </nav>
        </header>

        {/* tr.af-style pixel branding overlay — home landing only */}
        <PixelFrame onArrow={() => setView("works")} />

        {/* Reveal body — top-aligned, scrollable, no items-center to avoid top clip */}
        <div className="flex-1 overflow-y-auto">
          <IntroReveal onComplete={() => setView("works")} />
        </div>

        {/* Footer removed from intro phase — LiveClock + social links appear in works view only */}
      </motion.div>
    </AnimatePresence>
  );
}
