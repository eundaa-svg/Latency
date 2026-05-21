"use client";

import { memo, useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Work } from "@/lib/db";

interface Props {
  works: Work[];
}

export function WorkGrid({ works }: Props) {
  const router = useRouter();

  if (works.length === 0) {
    return (
      <div className="pt-4">
        <p
          className="font-[family-name:var(--font-mono)] text-[13px] tracking-[0.06em]"
          style={{ color: "var(--fg-muted)", opacity: 0.35 }}
        >
          No works yet.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="wg-grid">
        {works.map((work, i) => (
          <WorkCard
            key={work.id}
            work={work}
            index={i}
            eager={i === 0}
            onSelect={(id) => router.push(`/work/${id}`)}
          />
        ))}
      </div>

      <style>{`
        .wg-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 1024px) {
          .wg-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .wg-grid { grid-template-columns: 1fr; }
        }

        @keyframes cardEnter {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        .wg-card {
          opacity: 0;
          animation: cardEnter 320ms ease forwards;
        }
        .wg-card video {
          opacity: 0;
          transition: opacity 300ms ease, transform 280ms ease;
          will-change: transform, opacity;
        }
        .wg-card:hover video { opacity: 1; transform: scale(1.025); }
        .wg-thumb-img {
          transition: transform 280ms ease;
          will-change: transform;
        }
        .wg-card:hover .wg-thumb-img { transform: scale(1.025); }
        .wg-thumb-overlay {
          opacity: 0;
          transition: opacity 220ms ease;
        }
        .wg-card:hover .wg-thumb-overlay { opacity: 1; }
        .wg-title { transition: opacity 180ms ease; }
        .wg-card:hover .wg-title { opacity: 0.65; }
      `}</style>
    </>
  );
}

interface CardProps {
  work:     Work;
  index:    number;
  eager:    boolean;
  onSelect: (id: string) => void;
}

const WorkCard = memo(function WorkCard({ work, index, eager, onSelect }: CardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.currentTime = 0.01;
  }, []);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {});
  };

  const stop = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  const hasVideo  = !!work.video;
  const showBadge = work.type === "video" || hasVideo;

  return (
    <div
      className="wg-card"
      style={{ animationDelay: `${index * 55}ms` }}
      onMouseEnter={hasVideo ? play  : undefined}
      onMouseLeave={hasVideo ? stop  : undefined}
      onTouchStart={hasVideo ? play  : undefined}
      onTouchEnd={hasVideo   ? stop  : undefined}
    >
      <button
        onClick={() => onSelect(work.id)}
        data-interactive="true"
        className="block w-full text-left cursor-none focus:outline-none"
      >
        {/* Shared element: layoutId ties this to the detail page hero */}
        <motion.div
          layoutId={`work-thumb-${work.id}`}
          className="relative w-full overflow-hidden"
          style={{
            aspectRatio: "1/1",
            background: work.accentColor || "#111",
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.5,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          {work.thumbnail && (
            <Image
              src={work.thumbnail}
              alt={work.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover wg-thumb-img"
              priority={eager}
              loading={eager ? undefined : "lazy"}
            />
          )}
          {/* Hover video — inside shared element container, not part of layoutId animation */}
          {hasVideo && (
            <video
              ref={videoRef}
              src={work.video}
              muted
              playsInline
              loop
              preload="none"
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300"
              style={{ pointerEvents: "none" }}
            />
          )}
          {showBadge && <VideoBadge />}
          <div
            className="wg-thumb-overlay absolute inset-0 pointer-events-none"
            style={{ background: "rgba(0,0,0,0.14)" }}
          />
        </motion.div>

        {/* Meta */}
        <div className="mt-3 min-h-[3em]">
          <p
            className="wg-title font-[family-name:var(--font-mono)] text-[13px] tracking-[-0.01em]"
            style={{ color: "var(--fg)" }}
          >
            {work.title}
          </p>
          <p
            className="font-[family-name:var(--font-mono)] text-[11px] mt-0.5"
            style={{ color: "var(--fg-muted)", opacity: 0.4 }}
          >
            {work.year}
          </p>
        </div>
      </button>
    </div>
  );
});

function VideoBadge() {
  return (
    <div
      className="absolute top-2.5 right-2.5 pointer-events-none"
      style={{
        background: "rgba(0,0,0,0.55)",
        borderRadius: 3,
        padding: "3px 6px",
        fontSize: 11,
        fontFamily: "var(--font-mono)",
        color: "rgba(255,255,255,0.85)",
        letterSpacing: "0.06em",
      }}
    >
      ▶
    </div>
  );
}
