"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;
const DURATION = 2200; // count-up 0→100 (ms)

interface LoadingScreenProps {
  onDone: () => void;
}

// huyml.co-style intro: the LATENCY wordmark fills in as a "Loading — XX%"
// counter climbs to 100, with the site's menu pre-exposed along the bottom.
// AppShell mounts this on first visit only (sessionStorage), so timing/replay
// is owned there — this component just runs the count and calls onDone.
export function LoadingScreen({ onDone }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      // easeOutCubic — fast then settling, so the last percent feels deliberate
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased * 100);

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        // Hold at 100% briefly, then fade out and hand off.
        const hold = setTimeout(() => setExiting(true), 260);
        const done = setTimeout(() => doneRef.current(), 260 + 460);
        cleanup = () => { clearTimeout(hold); clearTimeout(done); };
      }
    };

    let cleanup = () => {};
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); cleanup(); };
  }, []);

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
          {/* Top — wordmark fills left→right with progress */}
          <div className="ls-top">
            <div className="ls-wordmark" aria-label="LATENCY">
              <span className="ls-word ls-word-ghost" aria-hidden>LATENCY</span>
              <span
                className="ls-word ls-word-fill"
                aria-hidden
                style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
              >
                LATENCY
              </span>
            </div>
          </div>

          {/* Center — Loading — XX% */}
          <div className="ls-center">
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

          <LoadingStyles />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function LoadingStyles() {
  return (
    <style>{`
      .ls-root {
        position: fixed; inset: 0; z-index: 9998;
        display: flex; flex-direction: column;
        pointer-events: none;
      }
      .ls-top { flex: 0 0 auto; display: flex; justify-content: center; padding-top: clamp(72px, 14vh, 160px); }
      .ls-wordmark { position: relative; display: inline-block; }
      .ls-word {
        display: block;
        font-family: var(--font-sans);
        font-weight: 700;
        font-size: clamp(40px, 9vw, 120px);
        line-height: 1;
        letter-spacing: -0.03em;
        white-space: nowrap;
      }
      .ls-word-ghost { color: var(--fg-subtle); }
      .ls-word-fill {
        position: absolute; inset: 0;
        color: var(--fg);
        will-change: clip-path;
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
