import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/app/components/Logo";

export const metadata = {
  title: "NOPI — LATENCY",
  description: "목표 기반 재무관리 AI 서비스 NOPI UX/UI 디자인.",
};

// 5 connected screens — all 1920×1080
const SCREENS = [
  { src: "/images/works/nopi_01.png", alt: "NOPI 화면 01" },
  { src: "/images/works/nopi_02.png", alt: "NOPI 화면 02" },
  { src: "/images/works/nopi_03.png", alt: "NOPI 화면 03" },
  { src: "/images/works/nopi_04.png", alt: "NOPI 화면 04" },
  { src: "/images/works/nopi_05.png", alt: "NOPI 화면 05" },
];

const META = [
  { label: "ROLE",   value: "Service Planning · UX Strategy · UI Design" },
  { label: "CLIENT", value: "Personal Work" },
  { label: "YEAR",   value: "2025" },
];

export default function NopiPage() {
  return (
    <>
      <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--fg)" }}>

        {/* NAV */}
        <nav className="relative z-10 flex items-center justify-between px-6 sm:px-10 pt-7 sm:pt-9">
          <Logo size="md" href="/" />
          <div className="flex items-center gap-5 sm:gap-7 text-[11px] sm:text-[12px] tracking-[0.04em] uppercase">
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

        {/* HEADER + META — centered column */}
        <div className="px-6 sm:px-10 mx-auto" style={{ maxWidth: 840 }}>

          <div className="pt-8">
            <Link href="/work" data-interactive="true" className="cs-back inline-flex items-center gap-2 text-[12px] cursor-none">
              ← Back to Work
            </Link>
          </div>

          <header className="pt-10 pb-12">
            <p className="text-[11px] tracking-[0.06em] uppercase mb-4" style={{ color: "var(--accent)" }}>
              UI/UX · 2025
            </p>
            <h1 className="text-[28px] sm:text-[38px] leading-[1.15] tracking-tight mb-2" style={{ fontWeight: 600 }}>
              NOPI
            </h1>
            <p className="text-[14px] leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              더 높은 목표를 향해 — 목표 기반 재무관리 AI 서비스
            </p>
          </header>

          <p className="text-[15px] leading-[1.75] mb-12" style={{ maxWidth: 680, color: "var(--fg-muted)" }}>
            목표는 많아지지만, 복잡한 소비·저축 구조와 파편화된 금융 정보로 인해 사용자는
            무엇을 관리해야 하는지 판단하기 어려운 상황에 놓여 있다. NOPI는 이를 해결하기
            위해 사용자의 소비·저축 패턴과 재무 목표를 통합 분석해, 현실적인 목표 달성
            경로와 실행 가능한 행동 가이드를 제공하는 목표 기반 재무관리 AI 서비스로
            기획되었다.
          </p>

          <div className="flex flex-col gap-0 mb-16" style={{ maxWidth: 680, borderTop: "1px solid var(--border)" }}>
            {META.map(({ label, value }) => (
              <div key={label} className="flex gap-6 py-3 text-[13px]" style={{ borderBottom: "1px solid var(--border)" }}>
                <span className="w-16 shrink-0 text-[10px] tracking-[0.08em] uppercase" style={{ color: "var(--fg-muted)", opacity: 0.45, paddingTop: 2 }}>
                  {label}
                </span>
                <span style={{ color: "var(--fg)" }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FULL-WIDTH IMAGE FLOW — zero gap */}
        <section
          className="nopi-image-flow w-full"
          style={{ lineHeight: 0, fontSize: 0 }}
        >
          {SCREENS.map((s, i) => (
            <Image
              key={s.src}
              src={s.src}
              alt={s.alt}
              width={1920}
              height={1080}
              quality={90}
              sizes="100vw"
              priority={i === 0}
              loading={i === 0 ? undefined : "lazy"}
              style={{ display: "block", width: "100%", height: "auto", margin: 0, padding: 0 }}
            />
          ))}
        </section>

        {/* FOOTER */}
        <div className="px-6 sm:px-10 mx-auto" style={{ maxWidth: 840 }}>
          <div className="py-16" style={{ borderTop: "1px solid var(--border)" }}>
            <Link href="/work" data-interactive="true" className="cs-back text-[12px] cursor-none">
              ← Back to Work
            </Link>
          </div>
        </div>

      </div>

      <style>{`
        .cs-nav-link   { color: var(--fg-muted); transition: color 150ms; }
        .cs-nav-link:hover { color: var(--fg); }
        .cs-back       { color: var(--fg-muted); transition: opacity 150ms; }
        .cs-back:hover { opacity: 0.8; }
        /* Belt-and-suspenders: ensure Next.js image wrappers never add gap */
        .nopi-image-flow img,
        .nopi-image-flow > span {
          display: block !important;
          margin: 0 !important;
          padding: 0 !important;
          line-height: 0;
        }
      `}</style>
    </>
  );
}
