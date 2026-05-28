"use client";

/*
 * PixelFrame — tr.af-style 80s pixel-terminal branding overlay for the home
 * landing. Fixed, pointer-events-none corners (except the ↘ indicator).
 * Stage 1: identifier + intro (top-left) and a discover arrow (bottom-right).
 * Social icons (bottom-left) come in a later stage.
 */

interface PixelFrameProps {
  /** Optional handler for the bottom-right ↘ discover indicator. */
  onArrow?: () => void;
}

// ── Editable branding copy ────────────────────────────────────────────────────
// Adjust freely — line 2 uses a strikethrough to show the identity shift.
const IDENTIFIER = "DAEUN";
const INTRO_LINES: Array<Array<{ text: string; strike?: boolean }>> = [
  [{ text: "INTERACTION DESIGNER," }],
  [{ text: "GRAPHIC DESIGNER", strike: true }, { text: " CHARACTER MAKER," }],
  [{ text: "VISUAL THINKER." }],
];

export function PixelFrame({ onArrow }: PixelFrameProps) {
  return (
    <>
      {/* Top-left — identifier + intro (sits below the existing nav) */}
      <div
        className="pf-topleft font-pixel fixed z-50 pointer-events-none select-none"
        style={{ color: "var(--fg)" }}
      >
        <p className="pixel-glitch pf-id">{IDENTIFIER}</p>
        <div className="pf-intro" style={{ color: "var(--fg-muted)" }}>
          {INTRO_LINES.map((line, i) => (
            <p key={i}>
              {line.map((seg, j) =>
                seg.strike ? (
                  <span key={j} style={{ textDecoration: "line-through", opacity: 0.6 }}>
                    {seg.text}
                  </span>
                ) : (
                  <span key={j}>{seg.text}</span>
                ),
              )}
            </p>
          ))}
        </div>
      </div>

      {/* Bottom-right — ↘ discover indicator (clickable) */}
      <div className="fixed bottom-7 right-7 z-50">
        <button
          type="button"
          onClick={onArrow}
          aria-label="Discover works"
          data-interactive="true"
          className="pf-arrow font-pixel cursor-none focus:outline-none"
        >
          ↘
        </button>
      </div>

      <style>{`
        .pf-topleft { top: 84px; left: 24px; }
        .pf-id { font-size: 20px; letter-spacing: 0.12em; line-height: 1; }
        .pf-intro {
          margin-top: 14px;
          font-size: 16px;
          line-height: 1.45;
          letter-spacing: 0.06em;
        }
        .pf-arrow {
          font-size: 22px; line-height: 1; color: var(--fg);
          padding: 8px 12px;
          border: 1px solid rgba(255,255,255,0.22);
          transition: color 150ms ease, border-color 150ms ease;
        }
        .pf-arrow:hover { color: var(--fg-muted); border-color: var(--fg); }

        @media (min-width: 640px) {
          .pf-topleft { top: 92px; left: 40px; }
          .pf-id { font-size: 22px; }
          .pf-intro { font-size: 18px; }
        }
        @media (max-width: 480px) {
          .pf-intro { font-size: 14px; }
        }
      `}</style>
    </>
  );
}
