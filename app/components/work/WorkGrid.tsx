"use client";

import { memo, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Work } from "@/lib/db";

// ── Module-level singleton: only one card plays at a time ─────────────────────
// Object wrapper keeps the reference mutable across closures.
const playing = { vid: null as HTMLVideoElement | null };

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        @keyframes cardEnter {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        .wg-card {
          opacity: 0;
          animation: cardEnter 320ms ease forwards;
        }
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
        /* Video fade-in is handled via JS (v.style.opacity) to sync with play() */
        .wg-video {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; opacity: 0;
          transition: opacity 300ms ease;
        }
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
  const cardRef  = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView,   setInView]   = useState(false);
  const [canHover, setCanHover] = useState(false);
  const hoverTimer = useRef<number | null>(null);

  // Detect hover-capable device (desktop pointer, not touch)
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setCanHover(mq.matches);
    const update = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // IntersectionObserver: mount video element only when card enters viewport
  // rootMargin 200px pre-activates 200px before the card is visible
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
      const v = videoRef.current;
      if (v) {
        v.pause();
        if (playing.vid === v) playing.vid = null;
      }
    };
  }, []);

  const handleEnter = () => {
    if (!canHover || !work.video) return;
    // 300ms intentional latency — Latency brand concept
    hoverTimer.current = window.setTimeout(() => {
      const v = videoRef.current;
      if (!v) return;
      // Stop any other currently-playing card
      if (playing.vid && playing.vid !== v) {
        playing.vid.pause();
        playing.vid.currentTime = 0;
        playing.vid.style.opacity = "0";
      }
      v.play()
        .then(() => {
          playing.vid = v;
          v.style.opacity = "1";       // fade in
        })
        .catch(() => {/* autoplay blocked — fail silently */});
    }, 300);
  };

  const handleLeave = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
      v.style.opacity = "0";           // fade out
      if (playing.vid === v) playing.vid = null;
    }
  };

  const hasVideoPreview = !!work.video;
  const hasVideoBadge   = work.type === "video" || hasVideoPreview;

  return (
    <div
      ref={cardRef}
      className="wg-card"
      style={{ animationDelay: `${index * 55}ms` }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        onClick={() => onSelect(work.id)}
        data-interactive="true"
        className="block w-full text-left cursor-none focus:outline-none"
      >
        {/* Thumbnail area */}
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: "4 / 5", background: work.accentColor || "#111" }}
        >
          {/* PNG — always present, acts as poster */}
          {work.thumbnail && (
            <Image
              src={work.thumbnail}
              alt={work.title}
              fill
              className="object-cover wg-thumb-img"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={eager}
              loading={eager ? undefined : "lazy"}
            />
          )}

          {/* Video — lazy-mounted: only when in viewport + hover-capable device + has video */}
          {inView && canHover && work.video && (
            <video
              ref={videoRef}
              src={work.video}
              muted
              loop
              playsInline
              preload="none"
              poster={work.thumbnail}
              aria-hidden
              className="wg-video"
            />
          )}

          {/* ▶ badge for any video work (hover-preview or YouTube) */}
          {hasVideoBadge && (
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
          )}

          {/* Hover overlay */}
          <div
            className="wg-thumb-overlay absolute inset-0 pointer-events-none"
            style={{ background: "rgba(0,0,0,0.14)" }}
          />
        </div>

        {/* Meta */}
        <div className="mt-3">
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
