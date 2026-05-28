import Link from "next/link";
import { AnimatedLogo } from "./AnimatedLogo";

// Animated 6-dot breathing mark + LATENCY wordmark (pixel font).
// Sizes are the dot-mark pixel dimensions; the wordmark scales alongside.
const SIZES = {
  sm: 34,
  md: 46,
  lg: 60,
} as const;

interface LogoProps {
  size?: keyof typeof SIZES;
  href?: string;
  className?: string;
}

export function Logo({ size = "md", href = "/", className = "" }: LogoProps) {
  const px = SIZES[size];

  const mark = (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <AnimatedLogo size={px} />
      <span
        className="font-[family-name:var(--font-pixel)] leading-none"
        style={{ fontSize: Math.round(px * 0.46), letterSpacing: "0.08em", color: "var(--fg)" }}
      >
        LATENCY
      </span>
    </span>
  );

  if (!href) return mark;

  return (
    <Link
      href={href}
      aria-label="LATENCY — Home"
      data-interactive="true"
      className="lg-link cursor-none focus:outline-none inline-flex items-center"
    >
      {mark}
      <style>{`
        .lg-link { transition: opacity 200ms ease; }
        .lg-link:hover { opacity: 0.75; }
      `}</style>
    </Link>
  );
}
