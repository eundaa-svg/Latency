"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;
const DURATION = 2200;          // count-up 0→100 (ms)
const FULL = "LATENCY";
const TYPE_START = 500;         // wait before first char
const TYPE_STEP = 120;          // ms per character
const TYPE_END = TYPE_START + FULL.length * TYPE_STEP; // ≈1340ms
const COUNT_START = 1500;       // progress begins after typing settles

interface LoadingScreenProps {
  onDone: () => void;
}

// First-visit intro (AppShell-mounted, sessionStorage-gated): LATENCY types in
// one character at a time with a blinking cursor, then "Loading — XX%" counts
// to 100 and hands off via onDone. Reduced motion shows the wordmark at once.
export function LoadingScreen({ onDone }: LoadingScreenProps) {
  const reduce = useReducedMotion();

  const [typed, setTyped] = useState(0);
  const [typingDone, setTypingDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  // ── Typewriter ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (reduce) { setTyped(FULL.length); setTypingDone(true); return; }
    let i = 0;
    let typeInt = 0;
    const startTimer = window.setTimeout(() => {
      typeInt = window.setInterval(() => {
        i += 1;
        setTyped(i);
        if (i >= FULL.length) { clearInterval(typeInt); setTypingDone(true); }
      }, TYPE_STEP);
    }, TYPE_START);
    return () => { clearTimeout(startTimer); clearInterval(typeInt); };
  }, [reduce]);

  // ── Progress count-up (starts after typing settles) ───────────────────────
  useEffect(() => {
    const startDelay = reduce ? 300 : COUNT_START;
    let raf = 0;
    let holdTimer = 0;
    let doneTimer = 0;

    const startTimer = window.setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / DURATION, 1);
        const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
        setProgress(eased * 100);
        if (t < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          holdTimer = window.setTimeout(() => setExiting(true), 260);
          doneTimer = window.setTimeout(() => doneRef.current(), 720);
        }
      };
      raf = requestAnimationFrame(tick);
    }, startDelay);

    return () => {
      clearTimeout(startTimer);
      cancelAnimationFrame(raf);
      clearTimeout(holdTimer);
      clearTimeout(doneTimer);
    };
  }, [reduce]);

  const pct = Math.min(Math.round(progress), 100);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loader"
          className="ls-root"
          style={{ background: "var(--bg)", color: "var(--fg)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.46, ease: EASE }}
        >
          {/* Top — LATENCY types in with a blinking cursor */}
          <div className="ls-top">
            <h1 className="ls-word" aria-label={FULL}>
              <span aria-hidden>{FULL.slice(0, typed)}</span>
              <span className="ls-cursor" aria-hidden>▮</span>
            </h1>
          </div>

          {/* Center — Loading — XX% (appears once typing is done) */}
          <div className="ls-center" style={{ opacity: typingDone ? 1 : 0, transition: "opacity 400ms ease" }}>
            <p className="ls-loading">
              Loading <span className="ls-dash">—</span>{" "}
              <span className="ls-pct">{pct}%</span>
            </p>
          </div>

          {/* Bottom — menu pre-exposed */}
          <motion.div
            className="ls-menu"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } }}
          >
            {[
              { n: "01", label: "Work" },
              { n: "02", label: "About" },
              { n: "03", label: "Contact" },
            ].map((item) => (
              <motion.div
                key={item.n}
                className="ls-menu-item"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                }}
              >
                <p className="ls-menu-n">{item.n}</p>
                <p className="ls-menu-label">{item.label}</p>
              </motion.div>
            ))}
            <motion.div
              className="ls-menu-item ls-menu-item--right"
              variants={{
                hidden: { opacity: 0, y: 10 },
                show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
              }}
            >
              <p className="ls-menu-n">©2026</p>
              <p className="ls-menu-label">LATENCY</p>
            </motion.div>
          </motion.div>

          <LoadingStyles reduce={!!reduce} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function LoadingStyles({ reduce }: { reduce: boolean }) {
  return (
    <style>{`
      .ls-root {
        position: fixed; inset: 0; z-index: 9998;
        display: flex; flex-direction: column;
        pointer-events: none;
      }
      .ls-top { flex: 0 0 auto; display: flex; justify-content: center; padding-top: clamp(72px, 14vh, 160px); }
      .ls-word {
        display: inline-flex; align-items: baseline;
        font-family: var(--font-pixel);
        font-weight: 400;
        font-size: clamp(40px, 9vw, 120px);
        line-height: 1;
        letter-spacing: 0.02em;
        white-space: nowrap;
        color: var(--fg);
        min-height: 1em;
      }
      .ls-cursor {
        color: var(--accent);
        margin-left: 0.06em;
        ${reduce ? "" : "animation: lsBlink 1s step-end infinite;"}
      }
      @keyframes lsBlink {
        0%, 50%      { opacity: 1; }
        50.01%, 100% { opacity: 0; }
      }

      .ls-center { flex: 1 1 auto; display: flex; align-items: center; justify-content: center; }
      .ls-loading {
        font-family: var(--font-mono);
        font-size: clamp(14px, 1.6vw, 20px);
        letter-spacing: 0.04em;
        color: var(--fg-muted);
        font-weight: 300;
      }
      .ls-dash { color: var(--fg-subtle); }
      .ls-pct {
        font-style: italic;
        color: var(--accent);
        font-variant-numeric: tabular-nums;
        display: inline-block;
        min-width: 3.2ch;
      }

      .ls-menu {
        flex: 0 0 auto;
        display: grid; grid-template-columns: repeat(4, 1fr);
        gap: 32px;
        padding: 0 clamp(24px, 6vw, 80px) clamp(28px, 6vh, 64px);
      }
      .ls-menu-item--right { text-align: right; }
      .ls-menu-n {
        font-family: var(--font-mono);
        font-size: 11px; letter-spacing: 0.12em;
        color: var(--fg-muted); opacity: 0.6; margin-bottom: 6px;
      }
      .ls-menu-label {
        font-family: var(--font-sans);
        font-size: clamp(13px, 1.2vw, 16px);
        color: var(--fg);
      }

      @media (max-width: 640px) {
        .ls-menu { grid-template-columns: repeat(2, 1fr); gap: 20px; }
      }
    `}</style>
  );
}
