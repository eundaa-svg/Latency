import Link from "next/link";
import { Section, BulletList } from "@/app/components/case-study/CaseStudyLayout";

export const metadata = {
  title: "The Red Line — LATENCY",
  description:
    "폭스바겐 골프 GTI의 레드 스트립 50년의 여정을 담은 시네마틱 광고. 베스트 시네마틱 모먼트 상 수상.",
};

const YOUTUBE_ID = "SE9fLMtllAg";

export default function TheRedLinePage() {
  return (
    <>
      <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--fg)" }}>

        {/* NAV */}
        <nav className="relative z-10 flex items-center justify-between px-6 sm:px-10 pt-7 sm:pt-9">
          <Link
            href="/"
            data-interactive="true"
            className="cs-logo flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[11px] sm:text-[12px] tracking-[0.18em] uppercase cursor-none"
          >
            LATENCY
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--accent)", animation: "glowPulse 2s ease-in-out infinite" }}
            />
          </Link>
          <div className="flex items-center gap-5 sm:gap-7 font-[family-name:var(--font-mono)] text-[11px] sm:text-[12px] tracking-[0.12em] uppercase">
            {(["work", "about", "contact"] as const).map((label) => (
              <Link
                key={label}
                href={label === "work" ? "/work" : `/#${label}`}
                data-interactive="true"
                className="cs-nav-link cursor-none"
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>

        {/* CONTENT */}
        <div className="px-6 sm:px-10" style={{ maxWidth: 880 }}>

          {/* Back */}
          <div className="pt-8">
            <Link href="/work" data-interactive="true" className="cs-back inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[12px] tracking-[0.06em] cursor-none">
              ← Back to Work
            </Link>
          </div>

          {/* Header */}
          <header className="pt-10 pb-14">
            <p
              className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.16em] uppercase mb-4"
              style={{ color: "var(--accent)" }}
            >
              Advertising Design · 2025
            </p>
            <h1
              className="font-[family-name:var(--font-sans)] text-[30px] sm:text-[42px] leading-[1.1] tracking-tight mb-3"
              style={{ fontWeight: 500 }}
            >
              The Red Line
            </h1>
            <p
              className="font-[family-name:var(--font-mono)] text-[13px] tracking-[0.04em]"
              style={{ color: "var(--fg-muted)" }}
            >
              폭스바겐 골프 GTI 시네마틱 광고
            </p>
          </header>

          {/* YouTube embed */}
          <div className="mb-4" style={{ maxWidth: 800 }}>
            <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
              <iframe
                src={`https://www.youtube.com/embed/${YOUTUBE_ID}`}
                title="The Red Line - Volkswagen Golf GTI"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 w-full h-full"
                style={{ border: "none" }}
              />
            </div>
          </div>
          <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.08em] mb-20" style={{ color: "var(--fg-muted)", opacity: 0.45 }}>
            <a
              href={`https://youtu.be/${YOUTUBE_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              data-interactive="true"
              className="cs-back cursor-none"
            >
              Watch on YouTube ↗
            </a>
          </p>

          {/* Body */}
          <div className="pb-28 flex flex-col gap-14" style={{ maxWidth: 640 }}>

            <Section title="Concept">
              <p>
                〈The Red Line〉은 폭스바겐 골프 GTI의 상징인 '레드 스트립'의 50년간의 변화를 따라가며,
                8세대에 이르러 하나의 선으로 완성되는 과정을 강렬한 빨강의 비주얼로 풀어낸 시네마틱 광고.
                '폭스바겐 골프 GTI 대학생 AI 영상 광고 공모전'에서{" "}
                <em style={{ fontStyle: "italic", color: "var(--fg)" }}>
                  베스트 시네마틱 모먼트 상
                </em>
                을 수상했다.
              </p>
            </Section>

            <Section title="Insight">
              <p>
                레드 스트립은 50년간 매 세대마다 빠짐없이 존재해온 GTI의 디자인 요소다.
                이 작은 선 하나에 브랜드의 헤리티지와 퍼포먼스, 아이덴티티가 모두 담겨 있다고 보았고,
                영상은 그 선의 여정을 따라가며 마침내 하나로 합쳐진 8세대 모델에 도달한다.
              </p>
            </Section>

            <Section title="Direction">
              <p>
                세대를 넘나드는 시간성을 단일 색상(레드)의 선으로 압축하여,
                브랜드가 50년 동안 지켜온 '일관성'과 '진화'를 동시에 표현.
              </p>
            </Section>

            <Section title="Award">
              <p style={{ color: "var(--fg)" }}>
                🏆 폭스바겐 골프 GTI 대학생 AI 영상 광고 공모전
              </p>
              <p className="mt-1" style={{ color: "var(--fg-muted)" }}>
                베스트 시네마틱 모먼트 상
              </p>
            </Section>

            <Section title="Role">
              <p style={{ color: "var(--fg-muted)" }}>
                Concept · Direction · AI Visual Generation · Editing
              </p>
            </Section>

          </div>

          {/* Footer */}
          <div className="pb-16" style={{ borderTop: "1px solid var(--border)", paddingTop: "2.5rem" }}>
            <Link href="/work" data-interactive="true" className="cs-back font-[family-name:var(--font-mono)] text-[12px] tracking-[0.06em] cursor-none">
              ← Back to Work
            </Link>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes glowPulse {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1;   }
        }
        .cs-logo       { color: var(--fg); }
        .cs-nav-link   { color: var(--fg-muted); transition: color 150ms; }
        .cs-nav-link:hover { color: var(--fg); }
        .cs-back       { color: var(--fg-muted); transition: opacity 150ms; }
        .cs-back:hover { opacity: 0.8; }
      `}</style>
    </>
  );
}
