import Image from "next/image";
import Link from "next/link";

// Original logo: 1205×352 px (ratio ≈ 3.42:1)
const SIZES = {
  sm: { w: 55,  h: 16 },
  md: { w: 68,  h: 20 },
  lg: { w: 96,  h: 28 },
} as const;

interface LogoProps {
  size?: keyof typeof SIZES;
  href?: string;
  className?: string;
}

export function Logo({ size = "md", href = "/", className = "" }: LogoProps) {
  const { w, h } = SIZES[size];

  const img = (
    <Image
      src="/brand/logo.png"
      alt="LATENCY"
      width={w}
      height={h}
      priority
      className={`h-auto w-auto opacity-100 hover:opacity-75 transition-opacity duration-200 ${className}`}
      style={{ maxWidth: w, maxHeight: h }}
    />
  );

  if (!href) return img;

  return (
    <Link href={href} aria-label="LATENCY — Home" data-interactive="true" className="cursor-none focus:outline-none inline-flex">
      {img}
    </Link>
  );
}
