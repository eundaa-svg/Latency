import Link from "next/link";
import { LottieLogoMark } from "./LottieLogoMark";

// Lottie mark + LATENCY wordmark (pixel font). `px` governs the wordmark text
// scale (kept identical to the previous look). The mark box is intentionally
// smaller than the text-basis so the Lottie reads as a compact header glyph
// rather than dominating the wordmark.
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
  const markSize = px; // sm 34 · md 46 · lg 60 — bumped for the transparent Lottie

  const mark = (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LottieLogoMark size={markSize} />
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
