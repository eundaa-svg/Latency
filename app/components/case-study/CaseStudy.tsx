"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Logo } from "@/app/components/Logo";

gsap.registerPlugin(ScrollTrigger);

// ── Types ─────────────────────────────────────────────────────────────────────

export interface MetaRow {
  label: string;
  value: string;
}

export interface CaseStudyProps {
  slug:          string;        // work id — used for shared-element layoutId
  categoryLabel: string;
  year:          string;
  title:         string;
  subtitle?:     string;
  image?:        { src: string; alt: string; width: number; height: number };
  video?:        string;
  /** Optional logo / brand motion video — stacked above `video` in the hero. */
  logoVideo?:    string;
  youtubeId?:    string;
  description:   string;
  meta:          MetaRow[];
  additionalImages?: Array<{ src: string; alt: string }>;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function CaseStudy(props: CaseStudyProps) {
  const {
    slug,
    categoryLabel,
    year,
    title,
    subtitle,
    image,
    video,
    logoVideo,
    youtubeId,
    description,
    meta,
    additionalImages,
  } = props;

  const shouldReduceMotion = useReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);

  // Desktop = horizontal scroll. Mobile / reduced-motion = native vertical.
  // Resolved after mount to avoid SSR mismatch; null until then.
  const [horizontal, setHorizontal] = useState<boolean | null>(null);

  // Number of horizontal panels — drives snap math + the close panel.
  // logoVideo+video splits the hero into 2 solo panels instead of 1 intro.
  const heroPanels = logoVideo && video ? 2 : 1;
  const sectionCount = heroPanels + 1 + (additionalImages?.length ?? 0) + 1;

  useEffect(() => {
    const enable =
      window.innerWidth >= 768 &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setHorizontal(enable);

    if (!enable) return;
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    // ── Lenis smooth scroll, driven by GSAP's ticker ──────────────────────────
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // ── Map vertical scroll → horizontal translate of the track ───────────────
    const distance = () => track.scrollWidth - window.innerWidth;

    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: "none",
    });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: () => "+=" + distance(),
      pin: true,
      scrub: 1,
      snap: {
        snapTo: 1 / (sectionCount - 1),
        duration: { min: 0.2, max: 0.5 },
        ease: "power1.inOut",
      },
      animation: tween,
      invalidateOnRefresh: true,
      anticipatePin: 1,
    });

    // Recompute once media has loaded and laid out.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const refreshTimer = window.setTimeout(refresh, 300);

    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(refreshTimer);
      gsap.ticker.remove(raf);
      lenis.destroy();
      trigger.kill();
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.set(track, { clearProps: "all" });
    };
  }, [sectionCount]);

  // ── Panels ──────────────────────────────────────────────────────────────────

  const media = <HeroMedia {...{ slug, image, video, youtubeId, title, shouldReduceMotion }} />;

  // Until we know the layout, render the desktop (horizontal) markup so the
  // shared-element hero is in place; GSAP simply no-ops if we end up mobile.
  const isMobile = horizontal === false;

  return (
    <div
      className="cs-root"
      style={{ background: "var(--bg)", color: "var(--fg)" }}
      data-mode={isMobile ? "vertical" : "horizontal"}
    >
      {/* Fixed nav — stays put while the track slides underneath */}
      <nav className="cs-nav">
        <Logo size="md" href="/" />
        <div className="cs-nav-links">
          {(["work", "about", "contact"] as const).map((label) => (
            <Link
              key={label}
              href={label === "work" ? "/work" : label === "about" ? "/about" : `/#${label}`}
              data-interactive="true"
              className="cs-nav-link cursor-none"
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Back — fixed top-left under the logo */}
      <Link
        href="/work"
        data-interactive="true"
        className="cs-back-fixed cursor-none"
      >
        ← Back to Work
      </Link>

      <div ref={containerRef} className="cs-container">
        <div ref={trackRef} className="cs-track">

          {/* ── Hero ────────────────────────────────────────────────────────
              logoVideo+video → two solo panels (logo, then demo).
              Otherwise   → the standard text + media intro panel.            */}
          {logoVideo && video ? (
            <>
              <section className="case-section cs-panel cs-solo">
                <video
                  src={logoVideo}
                  autoPlay loop muted playsInline preload="metadata"
                  aria-label={`${title} — logo motion`}
                  className="cs-solo-video"
                />
              </section>
              <section className="case-section cs-panel cs-solo">
                <video
                  src={video}
                  autoPlay loop muted playsInline preload="metadata"
                  aria-label={title}
                  className="cs-solo-video"
                />
              </section>
            </>
          ) : (
            <section className={`case-section cs-panel cs-intro${video ? " cs-intro--video" : ""}`}>
              <div className={`cs-intro-text${video ? " cs-intro-text--narrow" : ""}`}>
                <p className="cs-eyebrow" style={{ color: "var(--accent)" }}>
                  {categoryLabel} · {year}
                </p>
                <h1 className="cs-title">{title}</h1>
                {subtitle && <p className="cs-subtitle">{subtitle}</p>}
              </div>
              <div className={`cs-intro-media${video ? " cs-intro-media--video" : ""}`}>{media}</div>
            </section>
          )}

          {/* ── Panel 2 — Description + Meta ─────────────────────────────── */}
          <section className="case-section cs-panel cs-desc">
            <div className="cs-desc-inner">
              <p className="cs-section-label" style={{ color: "var(--fg-muted)" }}>
                Overview
              </p>
              <p className="cs-body">{description}</p>
              <div className="cs-meta">
                {meta.map(({ label, value }) => (
                  <div key={label} className="cs-meta-row">
                    <span className="cs-meta-label">{label}</span>
                    <span className="cs-meta-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Panel 3+ — Detail visuals (one image per panel) ─────────── */}
          {additionalImages?.map((img, i) => (
            <section key={i} className="case-section cs-panel cs-visual">
              <div className="cs-visual-inner">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={2400}
                  height={1600}
                  sizes="100vw"
                  quality={90}
                  className="cs-visual-img"
                  onLoad={() => ScrollTrigger.refresh()}
                />
              </div>
              <span className="cs-visual-index">
                {String(i + 1).padStart(2, "0")} / {String(additionalImages.length).padStart(2, "0")}
              </span>
            </section>
          ))}

          {/* ── Last Panel — Close ──────────────────────────────────────── */}
          <section className="case-section cs-panel cs-close">
            <p className="cs-section-label" style={{ color: "var(--fg-muted)" }}>
              End
            </p>
            <Link href="/work" data-interactive="true" className="cs-close-link cursor-none">
              ← Back to Work
            </Link>
            <p className="cs-close-sub" style={{ color: "var(--fg-muted)" }}>
              Thanks for scrolling.
            </p>
          </section>

        </div>
      </div>

      {/* Scroll hint — desktop only */}
      <div className="cs-hint">scroll →</div>

      <CaseStudyStyles />
    </div>
  );
}

// ── Hero media (image keeps shared-element layoutId) ──────────────────────────

function HeroMedia({
  slug,
  image,
  video,
  youtubeId,
  title,
  shouldReduceMotion,
}: {
  slug: string;
  image?: CaseStudyProps["image"];
  video?: string;
  youtubeId?: string;
  title: string;
  shouldReduceMotion: boolean | null;
}) {
  const sharedTransition = {
    duration: shouldReduceMotion ? 0 : 0.5,
    ease: [0.4, 0, 0.2, 1] as const,
  };

  if (video) {
    return (
      <video
        src={video}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label={title}
        className="cs-hero-el"
      />
    );
  }

  if (youtubeId) {
    return (
      <div className="cs-hero-yt">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  if (image) {
    return (
      <motion.div
        layoutId={`work-thumb-${slug}`}
        className="cs-hero-el cs-hero-img"
        transition={sharedTransition}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(max-width: 768px) 90vw, 50vw"
          priority
          className="cs-hero-img-el"
          onLoad={() => ScrollTrigger.refresh()}
        />
      </motion.div>
    );
  }

  return null;
}

// ── Styles ────────────────────────────────────────────────────────────────────
// All layout lives here so the horizontal (desktop) / vertical (mobile) split is
// driven by a single [data-mode] attribute on the root.

function CaseStudyStyles() {
  return (
    <style>{`
      .cs-root { position: relative; min-height: 100vh; }

      /* Fixed chrome */
      .cs-nav {
        position: fixed; top: 0; left: 0; right: 0; z-index: 30;
        display: flex; align-items: center; justify-content: space-between;
        padding: 28px 40px;
        pointer-events: none;
      }
      .cs-nav > * { pointer-events: auto; }
      .cs-nav-links {
        display: flex; align-items: center; gap: 28px;
        font-size: 12px; letter-spacing: 0.04em; text-transform: uppercase;
      }
      .cs-nav-link { color: var(--fg-muted); transition: color 150ms; }
      .cs-nav-link:hover { color: var(--fg); }

      .cs-back-fixed {
        position: fixed; top: 74px; left: 40px; z-index: 30;
        font-size: 12px; color: var(--fg-muted); transition: opacity 150ms;
      }
      .cs-back-fixed:hover { opacity: 0.7; }

      .cs-hint {
        position: fixed; bottom: 28px; right: 40px; z-index: 30;
        font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase;
        color: var(--fg-muted); opacity: 0.5;
        animation: csHintPulse 2.4s ease-in-out infinite;
      }
      @keyframes csHintPulse {
        0%, 100% { opacity: 0.3; transform: translateX(0); }
        50%      { opacity: 0.6; transform: translateX(4px); }
      }

      /* ── Horizontal (desktop) ─────────────────────────────────────────── */
      .cs-container { overflow: hidden; }
      .cs-track { display: flex; flex-direction: row; height: 100vh; width: max-content; }

      .cs-panel {
        position: relative;
        flex: 0 0 100vw;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0 8vw;
      }

      /* Intro */
      .cs-intro { gap: 6vw; justify-content: center; }
      .cs-intro-text { flex: 0 0 32%; max-width: 420px; }
      .cs-eyebrow {
        font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
        margin-bottom: 18px;
      }
      .cs-title {
        font-size: clamp(34px, 4.4vw, 64px); line-height: 1.05;
        letter-spacing: -0.02em; font-weight: 600; margin-bottom: 16px;
      }
      .cs-subtitle { font-size: 15px; line-height: 1.6; color: var(--fg-muted); }
      .cs-intro-media {
        flex: 0 0 52%; display: flex; align-items: center; justify-content: center;
        height: 72vh;
      }

      /* Video hero needs more room than a 1:1 image — bump width/height and
         narrow the text column. Scoped via --video so image/youtube heroes
         keep their existing balance. Vertical (mobile) mode overrides win on
         specificity, so this never affects the stacked layout. */
      .cs-intro--video { gap: 4vw; }
      .cs-intro-text--narrow { flex: 0 0 26%; max-width: 360px; }
      .cs-intro-media--video { flex: 0 0 68%; height: 80vh; }
      .cs-intro-media--video .cs-hero-el { width: 100%; height: auto; max-height: 80vh; }

      /* Solo hero panel — used when a case study has both logoVideo and video.
         Each video lives in its own full-viewport panel (NOPI only). */
      .cs-solo { justify-content: center; }
      .cs-solo-video {
        display: block; max-width: 88%; max-height: 80vh;
        width: auto; height: auto; object-fit: contain;
      }

      .cs-hero-el {
        display: block; max-width: 100%; max-height: 100%;
        width: auto; height: auto; object-fit: contain;
      }
      .cs-hero-img { overflow: hidden; }
      .cs-hero-img-el { display: block; width: auto; height: 100%; max-height: 72vh; max-width: 100%; object-fit: contain; }
      .cs-hero-yt { width: 100%; max-width: 760px; aspect-ratio: 16 / 9; }
      .cs-hero-yt iframe { width: 100%; height: 100%; border: 0; display: block; }

      /* Description */
      .cs-desc { justify-content: center; }
      .cs-desc-inner { max-width: 620px; margin: 0 auto; }
      .cs-section-label {
        font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase;
        opacity: 0.45; margin-bottom: 28px;
      }
      .cs-body {
        font-size: clamp(16px, 1.4vw, 20px); line-height: 1.8;
        color: var(--fg); margin-bottom: 44px;
      }
      .cs-meta { border-top: 1px solid var(--border); }
      .cs-meta-row {
        display: flex; gap: 24px; padding: 12px 0;
        border-bottom: 1px solid var(--border); font-size: 13px;
      }
      .cs-meta-label {
        flex: 0 0 88px; font-size: 10px; letter-spacing: 0.08em;
        text-transform: uppercase; color: var(--fg-muted); opacity: 0.5; padding-top: 2px;
      }
      .cs-meta-value { color: var(--fg); }

      /* Detail visual */
      .cs-visual { justify-content: center; }
      .cs-visual-inner {
        width: 100%; height: 78vh;
        display: flex; align-items: center; justify-content: center;
      }
      .cs-visual-img {
        display: block; max-width: 100%; max-height: 100%;
        width: auto; height: auto; object-fit: contain;
      }
      .cs-visual-index {
        position: absolute; bottom: 6vh; left: 8vw;
        font-size: 11px; letter-spacing: 0.12em; color: var(--fg-muted); opacity: 0.4;
      }

      /* Close */
      .cs-close { flex-direction: column; justify-content: center; align-items: flex-start; }
      .cs-close-link {
        font-size: clamp(30px, 4vw, 56px); line-height: 1; letter-spacing: -0.02em;
        font-weight: 600; color: var(--fg); transition: opacity 200ms;
      }
      .cs-close-link:hover { opacity: 0.6; }
      .cs-close-sub { margin-top: 22px; font-size: 13px; }

      /* ── Vertical (mobile / reduced-motion) ───────────────────────────── */
      .cs-root[data-mode="vertical"] .cs-hint { display: none; }
      .cs-root[data-mode="vertical"] .cs-container { overflow: visible; }
      .cs-root[data-mode="vertical"] .cs-track {
        flex-direction: column; height: auto; width: 100%;
      }
      .cs-root[data-mode="vertical"] .cs-panel {
        flex: none; width: 100%; height: auto; min-height: auto;
        flex-direction: column; align-items: stretch;
        padding: 0 24px; gap: 0;
      }
      .cs-root[data-mode="vertical"] .cs-intro { padding-top: 120px; }
      .cs-root[data-mode="vertical"] .cs-intro-text,
      .cs-root[data-mode="vertical"] .cs-intro-media { flex: none; max-width: 100%; }
      .cs-root[data-mode="vertical"] .cs-intro-media { height: auto; margin-top: 32px; }
      .cs-root[data-mode="vertical"] .cs-hero-img-el { width: 100%; height: auto; max-height: none; }
      .cs-root[data-mode="vertical"] .cs-hero-el { width: 100%; }
      .cs-root[data-mode="vertical"] .cs-solo { padding: 64px 24px; }
      .cs-root[data-mode="vertical"] .cs-solo-video { width: 100%; max-width: 100%; max-height: none; }
      .cs-root[data-mode="vertical"] .cs-desc { padding-top: 64px; padding-bottom: 64px; }
      .cs-root[data-mode="vertical"] .cs-visual { padding: 48px 0; }
      .cs-root[data-mode="vertical"] .cs-visual-inner { height: auto; }
      .cs-root[data-mode="vertical"] .cs-visual-img { width: 100%; }
      .cs-root[data-mode="vertical"] .cs-visual-index { position: static; margin-top: 12px; padding-left: 24px; }
      .cs-root[data-mode="vertical"] .cs-close { padding: 96px 24px; }

      @media (max-width: 767px) {
        .cs-nav { padding: 20px 24px; }
        .cs-back-fixed { top: 60px; left: 24px; }
      }
    `}</style>
  );
}
