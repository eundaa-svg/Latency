"use client";

/*
 * AnimatedLogo — LATENCY brand mark.
 * Six dots in a hexagon that breathe: contract toward the center (shrinking)
 * then expand back, each on a slightly offset phase so it feels alive rather
 * than mechanical. The whole mark also rotates once every 30s — barely
 * perceptible. SMIL + a CSS rotation; both freeze under reduced motion.
 */

import { useReducedMotion } from "framer-motion";

interface Props {
  size?: number;
  className?: string;
  color?: string;
}

const EASE = "0.4 0 0.2 1"; // Material standard, per breathe segment

// Per-dot size + phase variation (clockwise from 12 o'clock)
const SIZE_FACTORS  = [1.0, 0.85, 1.1, 0.9, 1.05, 0.95];
const PHASE_OFFSETS = [0, 0.15, 0.3, 0.45, 0.3, 0.15]; // seconds

export function AnimatedLogo({ size = 46, className = "", color = "#B8D4F1" }: Props) {
  const reduce = useReducedMotion();

  const center = size / 2;
  const radius = size * 0.35;
  const baseRadius = size * 0.08;

  // 6 points, clockwise from 12 o'clock, each with its own dot radius
  const dots = Array.from({ length: 6 }, (_, i) => {
    const angle = (i * Math.PI) / 3 - Math.PI / 2;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
      r: baseRadius * SIZE_FACTORS[i],
      begin: `${PHASE_OFFSETS[i]}s`,
    };
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="LATENCY"
      role="img"
      style={{
        display: "block",
        overflow: "visible",
        transformOrigin: "center center",
        animation: reduce ? undefined : "logoRotate 30s linear infinite",
      }}
    >
      {dots.map((dot, i) => (
        <circle key={i} cx={dot.x} cy={dot.y} r={dot.r} fill={color}>
          {!reduce && (
            <>
              <animate
                attributeName="cx"
                values={`${dot.x};${center};${dot.x}`}
                dur="4s"
                begin={dot.begin}
                repeatCount="indefinite"
                calcMode="spline"
                keyTimes="0;0.5;1"
                keySplines={`${EASE}; ${EASE}`}
              />
              <animate
                attributeName="cy"
                values={`${dot.y};${center};${dot.y}`}
                dur="4s"
                begin={dot.begin}
                repeatCount="indefinite"
                calcMode="spline"
                keyTimes="0;0.5;1"
                keySplines={`${EASE}; ${EASE}`}
              />
              <animate
                attributeName="r"
                values={`${dot.r};${dot.r * 0.5};${dot.r}`}
                dur="4s"
                begin={dot.begin}
                repeatCount="indefinite"
                calcMode="spline"
                keyTimes="0;0.5;1"
                keySplines={`${EASE}; ${EASE}`}
              />
            </>
          )}
        </circle>
      ))}
    </svg>
  );
}
