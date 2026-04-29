import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "식목일 80주년 포스터 — LATENCY",
  description:
    "광복 80주년과 식목일 80주년이 겹치는 역사적 의미를 담은 포스터. 안중근 의사의 손에서 자라나는 나무를 통해 희생을 바탕으로 한 나라의 번영을 시각적으로 표현했다.",
};

export default function ArborDay80thPage() {
  return (
    <>
      <div className="min-h-screen case-study" style={{ background: "var(--bg)", color: "var(--fg)" }}>

        {/* ── NAV ─────────────────────────────────────────────────────── */}
        <nav className="relative z-10 flex items-center justify-between px-6 sm:px-10 pt-7 sm:pt-9">
          <Link href="/" data-interactive="true" className="cs-logo flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[11px] sm:text-[12px] tracking-[0.18em] uppercase cursor-none">
            LATENCY
            <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent)", animation: "glowPulse 2s ease-in-out infinite" }} />
          </Link>
          <div className="flex items-center gap-5 sm:gap-7 font-[family-name:var(--font-mono)] text-[11px] sm:text-[12px] tracking-[0.12em] uppercase">
            {[
              { label: "work",    href: "/work" },
              { label: "about",   href: "/#about" },
              { label: "contact", href: "/#contact" },
            ].map(({ label, href }) => (
              <Link key={label} href={href} data-interactive="true" className="cs-nav-link cursor-none">
                {label}
              </Link>
            ))}
          </div>
        </nav>

        {/* ── CONTENT ─────────────────────────────────────────────────── */}
        <div className="px-6 sm:px-10" style={{ maxWidth: 880 }}>

          {/* Back */}
          <div className="pt-8 pb-0">
            <Link href="/work" data-interactive="true" className="cs-back inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[12px] tracking-[0.06em] cursor-none">
              ← Back to Work
            </Link>
          </div>

          {/* Header */}
          <header className="pt-10 pb-14">
            <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.16em] uppercase mb-4" style={{ color: "var(--accent)" }}>
              Graphic Design · 2025
            </p>
            <h1 className="font-[family-name:var(--font-sans)] text-[30px] sm:text-[42px] leading-[1.1] tracking-tight mb-3" style={{ fontWeight: 500 }}>
              식목일 80주년 포스터
            </h1>
            <p className="font-[family-name:var(--font-mono)] text-[13px] tracking-[0.04em]" style={{ color: "var(--fg-muted)" }}>
              Arbor Day 80th Anniversary Poster
            </p>
          </header>

          {/* Poster */}
          <div className="mb-6" style={{ maxWidth: 600 }}>
            <Image
              src="/images/works/arbor-day-80th.png"
              alt="식목일 80주년 포스터 — 안중근 의사의 손에서 자라는 나무"
              width={1980}
              height={2799}
              className="w-full h-auto"
              priority
            />
          </div>
          <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.08em] mb-20" style={{ color: "var(--fg-muted)", opacity: 0.45 }}>
            산림청 · 2025년 4월 5일 · 제80회 식목일
          </p>

          {/* Body */}
          <div className="pb-28 flex flex-col gap-14" style={{ maxWidth: 640 }}>

            <Section title="Concept">
              <p>
                광복 80주년과 식목일 80주년이 겹치는 역사적 의미를 담은 포스터.
                안중근 의사의 손에서 자라나는 나무를 통해{" "}
                <em style={{ fontStyle: "italic", color: "var(--fg)" }}>
                  '희생을 바탕으로 한 나라의 번영'
                </em>
                을 시각적으로 표현했다.
              </p>
            </Section>

            <Section title="Design Decisions">
              <ul className="flex flex-col gap-3">
                {[
                  "80이라는 숫자를 단순한 타이포그래피가 아니라 손가락의 형상으로 치환.",
                  "손 안에 나무를 중첩시켜 사람과 자연, 역사와 현재의 연결을 표현.",
                  "지역별 나무심기 적기(난대 / 온대 남부·중부·북부)를 손가락 위에 배치하여 정보 전달과 상징을 동시에 수행.",
                  "위에서 아래로 이어지는 따뜻한 초록 → 차가운 청록의 그라데이션: 잎(생명, 봄) → 줄기(역사, 시간의 흐름).",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span style={{ color: "var(--accent)", opacity: 0.7, flexShrink: 0 }}>—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Information Design">
              <p className="mb-6">포스터 한 장 안에 다음 정보를 위계 있게 담음:</p>
              <div style={{ borderTop: "1px solid var(--border)" }}>
                {[
                  ["메인 메시지", "80주년의 의미"],
                  ["부 정보",     "지역별 식목 적기"],
                  ["발행처",      "산림청"],
                  ["날짜",        "2025년 4월 5일, 제80회 식목일"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-baseline gap-6 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
                    <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.14em] uppercase shrink-0 w-24" style={{ color: "var(--fg-muted)", opacity: 0.4 }}>
                      {label}
                    </span>
                    <span className="font-[family-name:var(--font-mono)] text-[13px]">{value}</span>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Role">
              <p style={{ color: "var(--fg-muted)" }}>Concept · Visual Design · Information Hierarchy</p>
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
          0%, 100% { opacity: 0.6; box-shadow: 0 0 4px rgba(0,81,255,0.35); }
          50%       { opacity: 1;   box-shadow: 0 0 10px rgba(0,81,255,0.6); }
        }
        .cs-logo { color: var(--fg); }
        .cs-nav-link { color: var(--fg-muted); transition: color 150ms; }
        .cs-nav-link:hover { color: var(--fg); }
        .cs-back { color: var(--fg-muted); transition: opacity 150ms; }
        .cs-back:hover { opacity: 0.8; }
      `}</style>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.18em] uppercase mb-4" style={{ color: "var(--fg-muted)", opacity: 0.4 }}>
        {title}
      </h2>
      <div className="font-[family-name:var(--font-mono)] text-[14px] leading-[1.85]" style={{ color: "var(--fg-muted)" }}>
        {children}
      </div>
    </section>
  );
}
