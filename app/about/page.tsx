import Link from "next/link";
import { AboutGraphic } from "@/app/components/AboutGraphic";

export const metadata = {
  title: "About — LATENCY",
  description: "행동과 반응 사이의 시간을 디자인합니다.",
};

function AboutSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      className="flex flex-col md:flex-row gap-8 md:gap-16 py-16 md:py-24"
      style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="md:w-48 shrink-0">
        <span className="text-[11px] tracking-[0.1em] uppercase" style={{ color: "var(--fg-muted)" }}>
          {label}
        </span>
      </div>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--fg)" }}>

        {/* NAV */}
        <nav className="flex items-center justify-between px-6 sm:px-10 pt-7 sm:pt-9">
          <Link
            href="/"
            data-interactive="true"
            className="flex items-center gap-1.5 text-[11px] sm:text-[12px] tracking-[0.04em] uppercase cursor-none"
            style={{ color: "var(--fg)" }}
          >
            LATENCY
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--accent)", animation: "glowPulse 2s ease-in-out infinite" }}
            />
          </Link>
          <div className="flex items-center gap-5 sm:gap-7 text-[11px] sm:text-[12px] tracking-[0.04em] uppercase">
            {[
              { label: "work",    href: "/work" },
              { label: "about",   href: "/about" },
              { label: "contact", href: "/#contact" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                data-interactive="true"
                className="about-nav cursor-none"
                style={{ color: label === "about" ? "var(--fg)" : "var(--fg-muted)" }}
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>

        {/* ── SECTION 1: Hero graphic ─────────────────────────────────── */}
        <section
          className="flex flex-col items-center justify-center text-center px-6"
          style={{ minHeight: "calc(100vh - 80px)" }}
        >
          <AboutGraphic />
          <p
            className="mt-10 text-[13px] tracking-[0.04em]"
            style={{ color: "var(--fg-muted)" }}
          >
            행동과 반응 사이의 시간을 디자인합니다.
          </p>
        </section>

        {/* ── SECTIONS ────────────────────────────────────────────────── */}
        <div className="px-6 sm:px-10 md:px-16" style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* INTRO */}
          <AboutSection label="Intro">
            <div className="flex flex-col gap-6 text-[17px] sm:text-[19px] leading-[1.65]" style={{ color: "var(--fg-muted)" }}>
              <p style={{ color: "var(--fg)", fontWeight: 500 }}>안녕하세요, 디자이너 다은입니다.</p>
              <p>
                저는 행동과 반응 사이의 시간을 디자인합니다.<br />
                단순히 어떻게 보이는지가 아니라, 언제 일어나는지에 집중합니다.
              </p>
            </div>
          </AboutSection>

          {/* PERSPECTIVE */}
          <AboutSection label="Perspective">
            <div className="flex flex-col gap-6 text-[17px] sm:text-[19px] leading-[1.65]" style={{ color: "var(--fg-muted)" }}>
              <p>
                저는 'LATENCY'라는 관점으로 작업합니다.<br />
                대부분의 디자이너가 화면을 바라본다면,<br />
                저는 그 사이에 존재하는 순간을 설계합니다.
              </p>
            </div>
          </AboutSection>

          {/* PRACTICE */}
          <AboutSection label="Practice">
            <div className="flex flex-col gap-12">
              {[
                {
                  title: "UI/UX",
                  desc:  "정보가 사용자에게 도달하는 '순간'을 설계합니다.",
                },
                {
                  title: "GRAPHIC DESIGN",
                  desc:  "시각적 리듬과 여백을 통해 시선을 조율합니다.",
                },
                {
                  title: "ADVERTISING",
                  desc:  "메시지가 전달되는 타이밍에 따라 전혀 다른 결과가 만들어집니다.",
                },
                {
                  title: "XR DESIGN",
                  desc:  "반응의 지연이 몰입과 이탈을 결정합니다.",
                },
              ].map(({ title, desc }) => (
                <div key={title}>
                  <h3
                    className="text-[26px] sm:text-[32px] mb-3 tracking-tight"
                    style={{ fontWeight: 500, color: "var(--fg)" }}
                  >
                    {title}
                  </h3>
                  <p className="text-[16px] sm:text-[17px] leading-[1.65]" style={{ color: "var(--fg-muted)" }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </AboutSection>

        </div>

        {/* ── CLOSING ─────────────────────────────────────────────────── */}
        <div
          className="px-6 sm:px-10 md:px-16 py-20 md:py-28"
          style={{ maxWidth: 1200, margin: "0 auto", borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p
            className="text-[32px] sm:text-[48px] leading-[1.2] tracking-tight"
            style={{ fontWeight: 600, color: "var(--fg)" }}
          >
            저는 경험이 완성되는 순간을 설계합니다.
          </p>
        </div>

        {/* ── CONTACT ─────────────────────────────────────────────────── */}
        <section
          className="flex flex-col items-center text-center px-6 py-28 md:py-40"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p
            className="text-[12px] tracking-[0.08em] uppercase mb-6"
            style={{ color: "var(--fg-muted)" }}
          >
            For collaborations and inquiries
          </p>
          <a
            href="mailto:hello@latency.kr"
            data-interactive="true"
            className="about-mail cursor-none text-[22px] sm:text-[28px] tracking-tight"
            style={{ color: "var(--fg)", fontWeight: 500 }}
          >
            hello@latency.kr
          </a>
        </section>

        {/* ── FOOTER ──────────────────────────────────────────────────── */}
        <footer
          className="px-6 sm:px-10 py-8 flex items-center justify-between"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <span className="text-[11px] tracking-[0.06em]" style={{ color: "var(--fg-muted)", opacity: 0.4 }}>
            © 2025 LATENCY
          </span>
          <Link
            href="/work"
            data-interactive="true"
            className="about-nav cursor-none text-[11px] tracking-[0.04em]"
            style={{ color: "var(--fg-muted)", opacity: 0.4 }}
          >
            Work →
          </Link>
        </footer>

      </div>

      <style>{`
        @keyframes glowPulse {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1;   }
        }
        .about-nav  { transition: color 150ms, opacity 150ms; }
        .about-nav:hover { color: var(--fg) !important; opacity: 1 !important; }
        .about-mail { transition: opacity 150ms; }
        .about-mail:hover { opacity: 0.7; }
      `}</style>
    </>
  );
}
