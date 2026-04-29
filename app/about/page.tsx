import Link from "next/link";
import { AboutGraphic } from "@/app/components/AboutGraphic";

export const metadata = {
  title: "About — LATENCY",
  description: "I design the time between action and response.",
};

// ── Two-column section ────────────────────────────────────────────────────────

function AboutSection({
  label,
  children,
  first = false,
}: {
  label: string;
  children: React.ReactNode;
  first?: boolean;
}) {
  return (
    <div
      className="flex flex-col md:flex-row gap-8 md:gap-16 py-16 md:py-24"
      style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="md:w-48 shrink-0">
        <span
          className="text-[11px] tracking-[0.1em] uppercase"
          style={{ color: "var(--fg-muted)" }}
        >
          {label}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        {children}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

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
            I design the time between action and response.
          </p>
        </section>

        {/* ── SECTIONS 2–5 ────────────────────────────────────────────── */}
        <div className="px-6 sm:px-10 md:px-16" style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* WHO I AM */}
          <AboutSection label="Who I Am">
            <div
              className="flex flex-col gap-6 text-[17px] sm:text-[19px] leading-[1.65]"
              style={{ color: "var(--fg-muted)" }}
            >
              <p>
                버튼을 누른 순간과 화면이 응답하는 순간,<br />
                그 사이에 존재하는 시간을 설계합니다.
              </p>
              <p>
                대부분의 디자이너가 스크린을 본다면,<br />
                저는 스크린과 스크린 사이를 봅니다.<br />
                이 순간에서 다음 순간으로 넘어갈 때,<br />
                무엇이 흐르고 무엇이 끊기는지.
              </p>
            </div>
          </AboutSection>

          {/* WHAT I DESIGN */}
          <AboutSection label="What I Design">
            <div className="flex flex-col gap-12">
              {[
                {
                  title: "INTERACTION",
                  desc:  "움직임의 타이밍 — 애니메이션이 언제 시작하고, 얼마나 머물고, 어떻게 끝나는지.",
                },
                {
                  title: "UX",
                  desc:  "정보를 주는 타이밍 — 사용자가 필요로 하기 직전에, 딱 그 순간에 나타나는 것.",
                },
                {
                  title: "FLOW",
                  desc:  "다음 단계로 넘어가는 타이밍 — 흐름이 끊기지 않고 자연스럽게 이어지는 것.",
                },
              ].map(({ title, desc }) => (
                <div key={title}>
                  <h3
                    className="text-[26px] sm:text-[32px] mb-3 tracking-tight"
                    style={{ fontWeight: 500, color: "var(--fg)" }}
                  >
                    {title}
                  </h3>
                  <p
                    className="text-[16px] sm:text-[17px] leading-[1.65]"
                    style={{ color: "var(--fg-muted)" }}
                  >
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </AboutSection>

          {/* LATENCY */}
          <AboutSection label="Latency">
            <p
              className="text-[40px] sm:text-[56px] leading-[1.1] tracking-tight"
              style={{ fontWeight: 600, color: "var(--fg)" }}
            >
              반응까지 걸리는 시간.
            </p>
          </AboutSection>

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
          <span
            className="text-[11px] tracking-[0.06em]"
            style={{ color: "var(--fg-muted)", opacity: 0.4 }}
          >
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
