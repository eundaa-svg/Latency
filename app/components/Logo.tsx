import Image from "next/image";
import Link from "next/link";

// Logo: 1920×1080 px (ratio 16:9)
const SIZES = {
  sm: { w:  57, h: 32 },
  md: { w: 107, h: 60 },
  lg: { w: 142, h: 80 },
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
