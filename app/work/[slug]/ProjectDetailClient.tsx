"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { CustomCursor } from "@/app/components/CustomCursor";
import { LiveClock } from "@/app/components/LiveClock";

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── SOCIAL LINKS — SWAP: update href values ──────────────────────────────────
const SOCIAL = [
  { label: "twitter", href: "https://twitter.com/" },
  { label: "email",   href: "mailto:dan@latency.work" },
  { label: "are.na",  href: "https://are.na/" },
] as const;

interface Props {
  project: Project;
  nextProject: Project;
}

// ── Scroll-reveal image ──────────────────────────────────────────────────────
function RevealImage({ src, alt, index }: { src: string; alt: string; index: number }) {
  return (
    <motion.div
      className="w-full overflow-hidden bg-[#EFEFEF]"
      style={{ aspectRatio: index % 3 === 2 ? "3/4" : "16/9" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <Image
        src={src}
        alt={alt}
        fill={false}
        width={1200}
        height={index % 3 === 2 ? 1600 : 800}
        className="w-full h-full object-cover"
        sizes="(max-width: 768px) 100vw, 70vw"
      />
    </motion.div>
  );
}

// ── Meta row ─────────────────────────────────────────────────────────────────
function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 py-3 border-b border-[#EBEBEB]">
      <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.16em] uppercase opacity-30">
        {label}
      </span>
      <span className="font-[family-name:var(--font-mono)] text-[13px] text-[#111]">
        {value}
      </span>
    </div>
  );
}

export function ProjectDetailClient({ project, nextProject }: Props) {
  const [nextHovered, setNextHovered] = useState(false);

  return (
    <>
      <CustomCursor />

      {/* Page entrance */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="min-h-[100dvh] flex flex-col bg-[#FAFAFA]"
      >
        {/* ── NAV ───────────────────────────────────────────────────────── */}
        <nav className="flex items-center justify-between px-6 sm:px-10 pt-7 sm:pt-9 shrink-0">
          <Link
            href="/"
            data-interactive="true"
            className="flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[11px] sm:text-[12px] tracking-[0.18em] uppercase text-[#111]"
          >
            LATENCY
            <span
              className="inline-block w-1.5 h-1.5 rounded-full bg-[#0051FF]"
              style={{ animation: "blink 1s step-end infinite" }}
            />
          </Link>
          <div className="flex items-center gap-5 sm:gap-7 font-[family-name:var(--font-mono)] text-[11px] sm:text-[12px]">
            <Link href="/work"     data-interactive="true" className="text-[#111] opacity-40 hover:opacity-100 transition-opacity duration-150">work</Link>
            <Link href="/#about"   data-interactive="true" className="text-[#111] opacity-40 hover:opacity-100 transition-opacity duration-150">about</Link>
            <Link href="/#contact" data-interactive="true" className="text-[#111] opacity-40 hover:opacity-100 transition-opacity duration-150">contact</Link>
          </div>
        </nav>

        {/* ── BACK LINK ─────────────────────────────────────────────────── */}
        <div className="px-6 sm:px-10 pt-8 pb-0">
          <Link
            href="/work"
            data-interactive="true"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[13px] text-[#111] opacity-40 hover:opacity-100 transition-opacity duration-150"
          >
            <span>←</span>
            <span>all work</span>
          </Link>
        </div>

        {/* ── HERO IMAGE ────────────────────────────────────────────────── */}
        <div className="relative w-full mt-8 overflow-hidden bg-[#E8E8E8]"
             style={{ aspectRatio: "16 / 9", maxHeight: "80vh" }}>
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Bottom-left gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.28) 40%, transparent 70%)",
            }}
          />
          {/* Text overlay — bottom-left */}
          <div className="absolute bottom-0 left-0 px-8 sm:px-12 pb-10 sm:pb-14">
            <motion.h1
              className="text-[#FAFAFA] font-[family-name:var(--font-sans)] leading-none tracking-tight"
              style={{ fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 700 }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
            >
              {project.title}
            </motion.h1>
            <motion.p
              className="font-[family-name:var(--font-mono)] text-[13px] sm:text-[14px] text-[#FAFAFA]/70 mt-3 tracking-wide"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22, ease: EASE }}
            >
              {project.year} · {project.category} · {project.client}
            </motion.p>
          </div>
        </div>

        {/* ── BODY — two-column on desktop ──────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20 px-6 sm:px-10 pt-14 pb-0">

          {/* Left sticky column — 30% */}
          <motion.aside
            className="lg:w-[28%] xl:w-[26%] shrink-0"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          >
            <div className="lg:sticky lg:top-24">
              <MetaRow label="role"     value={project.role} />
              <MetaRow label="year"     value={project.year} />
              <MetaRow label="client"   value={project.client} />
              <MetaRow label="category" value={project.category} />
            </div>
          </motion.aside>

          {/* Right scrolling column — 70% */}
          <motion.div
            className="flex-1 min-w-0 pb-24"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: EASE }}
          >
            {/* Description */}
            <p className="font-[family-name:var(--font-mono)] text-[14px] sm:text-[15px] leading-[1.85] text-[#111] mb-16 max-w-[640px]">
              {project.description}
            </p>

            {/* Images (skip the first — it's the hero) */}
            <div className="flex flex-col" style={{ gap: 80 }}>
              {project.images.slice(1).map((src, i) => (
                <RevealImage
                  key={src}
                  src={src}
                  alt={`${project.title} — image ${i + 2}`}
                  index={i}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── NEXT PROJECT ──────────────────────────────────────────────── */}
        <div className="px-6 sm:px-10 pt-20 pb-14 border-t border-[#EBEBEB] mt-16">
          <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] uppercase opacity-30 mb-4">
            next project
          </p>
          <Link
            href={`/work/${nextProject.slug}`}
            data-interactive="true"
            className="inline-flex items-center gap-4 group"
            onMouseEnter={() => setNextHovered(true)}
            onMouseLeave={() => setNextHovered(false)}
          >
            <motion.span
              className="font-[family-name:var(--font-mono)] text-[18px] sm:text-[22px] text-[#111] tracking-tight"
              animate={{ x: nextHovered ? 4 : 0 }}
              transition={{ duration: 0.2, ease: EASE }}
            >
              {nextProject.title}
            </motion.span>
            <motion.span
              className="font-[family-name:var(--font-mono)] text-[18px] sm:text-[22px] text-[#111]"
              animate={{ x: nextHovered ? 6 : 0, opacity: nextHovered ? 1 : 0.3 }}
              transition={{ duration: 0.2, ease: EASE }}
            >
              →
            </motion.span>
          </Link>
          <p className="font-[family-name:var(--font-mono)] text-[11px] opacity-30 mt-2">
            {nextProject.year} · {nextProject.category}
          </p>
        </div>

        {/* ── FOOTER ────────────────────────────────────────────────────── */}
        <footer className="shrink-0 flex items-center justify-between px-6 sm:px-10 pb-6 sm:pb-8 border-t border-[#EBEBEB] pt-5">
          <LiveClock />
          <div className="flex items-center gap-5 sm:gap-6 font-[family-name:var(--font-mono)] text-[11px] tracking-wider">
            {SOCIAL.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                data-interactive="true"
                className="text-[#111] opacity-40 hover:opacity-100 transition-opacity duration-150"
              >
                {label}
              </a>
            ))}
          </div>
        </footer>
      </motion.div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </>
  );
}
