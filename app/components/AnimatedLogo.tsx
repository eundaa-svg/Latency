"use client";

/*
 * AnimatedLogo — LATENCY brand mark.
 * Six dots in a hexagon that breathe: contract to the center, then expand back
 * (4s cycle). Visualizes "the moment between action and reaction".
 * SMIL animation (GPU-cheap); freezes to a static hexagon under reduced motion.
 */

import { useReducedMotion } from "framer-motion";

interface Props {
  size?: number;
  className?: string;
  color?: string;
}

const EASE = "0.4 0 0.2 1"; // Material standard, per breathe segment

export function AnimatedLogo({ size = 44, className = "", color = "#B8D4F1" }: Props) {
  const reduce = useReducedMotion();

  const center = size / 2;
  const radius = size * 0.35;
  const dotRadius = size * 0.08;

  // 6 points, clockwise from 12 o'clock
  const dots = Array.from({ length: 6 }, (_, i) => {
    const angle = (i * Math.PI) / 3 - Math.PI / 2;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
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
      style={{ display: "block", overflow: "visible" }}
    >
      {dots.map((dot, i) => (
        <circle key={i} cx={dot.x} cy={dot.y} r={dotRadius} fill={color}>
          {!reduce && (
            <>
              <animate
                attributeName="cx"
                values={`${dot.x};${center};${dot.x}`}
                dur="4s"
                repeatCount="indefinite"
                calcMode="spline"
                keyTimes="0;0.5;1"
                keySplines={`${EASE}; ${EASE}`}
              />
              <animate
                attributeName="cy"
                values={`${dot.y};${center};${dot.y}`}
                dur="4s"
                repeatCount="indefinite"
                calcMode="spline"
                keyTimes="0;0.5;1"
                keySplines={`${EASE}; ${EASE}`}
              />
              <animate
                attributeName="r"
                values={`${dotRadius};${dotRadius * 0.6};${dotRadius}`}
                dur="4s"
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
