"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ArborDay80thPage() {
  const [lightbox, setLightbox] = useState(false);

  return (
    <>
      <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>

        {/* ── NAV ─────────────────────────────────────────────────────── */}
        <nav className="relative z-10 flex items-center justify-between px-6 sm:px-10 pt-7 sm:pt-9 shrink-0 pointer-events-auto">
          <Link
            href="/"
            data-interactive="true"
            className="flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[11px] sm:text-[12px] tracking-[0.18em] uppercase cursor-none"
            style={{ color: "var(--fg)" }}
          >
            LATENCY
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--accent)", animation: "glowPulse 2s ease-in-out infinite" }}
            />
          </Link>
          <div className="flex items-center gap-5 sm:gap-7 font-[family-name:var(--font-mono)] text-[11px] sm:text-[12px] tracking-[0.12em] uppercase">
            {[
              { label: "work",    href: "/work" },
              { label: "about",   href: "/#about" },
              { label: "contact", href: "/#contact" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                data-interactive="true"
                className="cursor-none transition-opacity duration-150"
                style={{ color: "var(--fg-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-muted)")}
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>

        {/* ── BACK ────────────────────────────────────────────────────── */}
        <div className="relative z-10 px-6 sm:px-10 pt-8">
          <Link
            href="/work"
            data-interactive="true"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[12px] tracking-[0.06em] cursor-none transition-opacity duration-150"
            style={{ color: "var(--fg-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "")}
          >
            ← all works
          </Link>
        </div>

        {/* ── HEADER ──────────────────────────────────────────────────── */}
        <motion.header
          className="px-6 sm:px-10 pt-12 pb-10 sm:pb-14"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.16em] uppercase mb-3"
            style={{ color: "var(--accent)" }}
          >
            Graphic Design · 2025
          </p>
          <h1
            className="font-[family-name:var(--font-sans)] text-[32px] sm:text-[44px] leading-[1.1] tracking-tight mb-2"
            style={{ color: "var(--fg)", fontWeight: 500 }}
          >
            식목일 80주년 포스터
          </h1>
          <p
            className="font-[family-name:var(--font-mono)] text-[13px] tracking-[0.04em]"
            style={{ color: "var(--fg-muted)", opacity: 0.5 }}
          >
            Arbor Day 80th Anniversary Poster
          </p>
        </motion.header>

        {/* ── POSTER IMAGE ─────────────────────────────────────────────── */}
        <motion.div
          className="px-6 sm:px-10 mb-16 sm:mb-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            onClick={() => setLightbox(true)}
            data-interactive="true"
            className="cursor-none group relative block w-full max-w-[640px]"
            aria-label="포스터 이미지 확대 보기"
          >
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: "3 / 4", background: "#1a2e1f" }}
            >
              <Image
                src="/images/works/arbor-day-80th.png"
                alt="식목일 80주년 포스터 - 안중근 의사의 손에서 자라는 나무"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 640px"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              {/* Hover hint */}
              <div
                className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)" }}
              >
                <span
                  className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.1em] uppercase"
                  style={{ color: "var(--fg-muted)" }}
                >
                  click to enlarge
                </span>
              </div>
            </div>
          </button>
        </motion.div>

        {/* ── BODY ─────────────────────────────────────────────────────── */}
        <motion.div
          className="px-6 sm:px-10 pb-28 max-w-[680px]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Section label="Concept">
            <p>
              광복 80주년과 식목일 80주년이 겹치는 역사적 의미를 담은 포스터.
              안중근 의사의 손에서 자라나는 나무를 통해{" "}
              <em style={{ fontStyle: "italic", color: "var(--fg)" }}>
                '희생을 바탕으로 한 나라의 번영'
              </em>
              을 시각적으로 표현했다.
            </p>
          </Section>

          <Section label="Design Decisions">
            <ul className="flex flex-col gap-3">
              {[
                "80이라는 숫자를 단순한 타이포그래피가 아니라 손가락의 형상으로 치환.",
                "손 안에 나무를 중첩시켜 사람과 자연, 역사와 현재의 연결을 표현.",
                "지역별 나무심기 적기(난대 / 온대 남부 / 온대 중부 / 온대 북부)를 손가락 위에 배치하여 정보 전달과 상징을 동시에 수행.",
                "위에서 아래로 따뜻한 초록 → 차가운 청록의 그라데이션: 잎(생명, 봄) → 줄기(역사, 시간의 흐름).",
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span style={{ color: "var(--accent)", opacity: 0.6, flexShrink: 0, marginTop: "1px" }}>—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section label="Information Design">
            <p className="mb-5">
              포스터 한 장 안에 다음 정보를 위계 있게 담았다.
            </p>
            <div className="flex flex-col gap-0" style={{ borderTop: "1px solid var(--border)" }}>
              {[
                ["메인 메시지", "80주년의 의미"],
                ["부 정보",     "지역별 식목 적기"],
                ["발행처",      "산림청"],
                ["날짜",        "2025년 4월 5일, 제80회 식목일"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-baseline gap-6 py-3"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <span
                    className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.14em] uppercase shrink-0 w-20"
                    style={{ color: "var(--fg-muted)", opacity: 0.45 }}
                  >
                    {label}
                  </span>
                  <span
                    className="font-[family-name:var(--font-mono)] text-[13px]"
                    style={{ color: "var(--fg)" }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </Section>

          <Section label="Role">
            <p style={{ color: "var(--fg-muted)" }}>
              Concept · Visual Design · Information Hierarchy
            </p>
          </Section>
        </motion.div>

        {/* ── FOOTER ──────────────────────────────────────────────────── */}
        <footer
          className="px-6 sm:px-10 pb-10 pt-8 mt-auto"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <Link
            href="/work"
            data-interactive="true"
            className="inline-flex items-center gap-3 cursor-none group"
            style={{ color: "var(--fg-muted)" }}
          >
            <span
              className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.12em] uppercase transition-opacity duration-150"
            >
              ← Back to all works
            </span>
          </Link>
        </footer>
      </div>

      {/* ── LIGHTBOX ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[9000] flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.92)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightbox(false)}
          >
            <motion.div
              className="relative w-full max-w-[90vw] max-h-[90vh]"
              style={{ aspectRatio: "3/4" }}
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src="/images/works/arbor-day-80th.png"
                alt="식목일 80주년 포스터 - 안중근 의사의 손에서 자라는 나무"
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </motion.div>
            <button
              onClick={() => setLightbox(false)}
              className="fixed top-6 right-8 font-[family-name:var(--font-mono)] text-[12px] tracking-[0.1em] uppercase cursor-none"
              style={{ color: "var(--fg-muted)" }}
              aria-label="닫기"
            >
              × close
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; box-shadow: 0 0 4px rgba(0,81,255,0.35); }
          50%       { opacity: 1;   box-shadow: 0 0 10px rgba(0,81,255,0.6); }
        }
      `}</style>
    </>
  );
}

// ── Section component ─────────────────────────────────────────────────────────
function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mb-12 sm:mb-14">
      <p
        className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.18em] uppercase mb-4"
        style={{ color: "var(--fg-muted)", opacity: 0.4 }}
      >
        {label}
      </p>
      <div
        className="font-[family-name:var(--font-mono)] text-[14px] leading-[1.85]"
        style={{ color: "var(--fg-muted)" }}
      >
        {children}
      </div>
    </section>
  );
}
