import Link from "next/link";
import { Logo } from "@/app/components/Logo";
import { AnimatedLogo } from "@/app/components/AnimatedLogo";
import { AboutSection } from "@/components/about/AboutSection";
import { SlideInText } from "@/components/about/SlideInText";
import { KeywordCapsule } from "@/components/about/KeywordCapsule";
import { LatencyDiagram } from "@/components/about/LatencyDiagram";

export const metadata = {
  title: "About — LATENCY",
  description: "행동과 반응 사이의 시간을 디자인합니다.",
};

const KEYWORDS = ["XR Design", "UI/UX", "Character Design", "Graphic Design"];

const PROCESS = [
  { keyword: "관찰", desc: "사용자가 무의식적으로 멈추는 순간을 찾습니다." },
  { keyword: "정의", desc: "그 순간을 디자인의 언어로 번역합니다." },
  { keyword: "시연", desc: "프로토타입으로 보여드립니다. 말로 설명하지 않습니다." },
];

const LINKS = [
  { label: "Email",     href: "mailto:hello@latency.kr" },
  { label: "Instagram", href: "https://instagram.com/" },     // TODO: real handle
  { label: "Portfolio", href: "https://notion.so/" },          // TODO: real URL
];

export default function AboutPage() {
  return (
    <main className="relative" style={{ background: "var(--bg)", color: "var(--fg)" }}>

      {/* Fixed nav — stays available through the scroll */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 sm:px-10 pt-7 sm:pt-9 pointer-events-none">
        <div className="pointer-events-auto"><Logo size="md" href="/" /></div>
        <div className="pointer-events-auto flex items-center gap-5 sm:gap-7 text-[11px] sm:text-[12px] tracking-[0.04em] uppercase">
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

      {/* ── Section 1 — Hello ─────────────────────────────────────────── */}
      <AboutSection className="relative overflow-hidden">
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: 0.1 }}
        >
          <AnimatedLogo size={400} />
        </div>
        <div className="relative z-10 text-center flex flex-col gap-5">
          <SlideInText from="left">
            <h1 className="text-[40px] sm:text-[64px] leading-[1.05]">안녕하세요,</h1>
          </SlideInText>
          <SlideInText from="right" delay={0.3}>
            <h1 className="text-[40px] sm:text-[64px] leading-[1.05]">다은입니다.</h1>
          </SlideInText>
          <SlideInText from="bottom" delay={0.8}>
            <p className="mt-6 text-[16px] sm:text-[20px]" style={{ color: "var(--fg-muted)" }}>
              행동과 반응 사이의 시간을 디자인합니다.
            </p>
          </SlideInText>
        </div>
      </AboutSection>

      {/* ── Section 2 — Background ────────────────────────────────────── */}
      <AboutSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <SlideInText from="left">
            <p className="text-[26px] sm:text-[34px] leading-[1.4]">
              VTuber 플랫폼부터<br />
              캐릭터 IP까지,<br />
              사용자가 만지는<br />
              순간들을 설계해왔습니다.
            </p>
          </SlideInText>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            {KEYWORDS.map((k, i) => (
              <KeywordCapsule key={k} text={k} delay={0.15 + i * 0.15} />
            ))}
          </div>
        </div>
      </AboutSection>

      {/* ── Section 3 — Philosophy ────────────────────────────────────── */}
      <AboutSection>
        <div className="flex flex-col items-center text-center gap-10 sm:gap-12">
          <SlideInText from="bottom">
            <p className="text-[28px] sm:text-[40px] leading-[1.2]">빠른 것이 좋은 것이 아닙니다.</p>
          </SlideInText>
          <SlideInText from="bottom" delay={0.5}>
            <p className="text-[28px] sm:text-[40px] leading-[1.2]">정확한 타이밍이 좋은 것입니다.</p>
          </SlideInText>
          <SlideInText from="bottom" delay={1.0}>
            <p className="text-[18px] sm:text-[24px]" style={{ color: "#B8D4F1" }}>
              0.3초의 지연이 사용자에게 신뢰를 줍니다.
            </p>
          </SlideInText>
          <div className="mt-4">
            <LatencyDiagram />
          </div>
        </div>
      </AboutSection>

      {/* ── Section 4 — Process ───────────────────────────────────────── */}
      <AboutSection>
        <div className="flex flex-col gap-14 sm:gap-16">
          {PROCESS.map((item, i) => (
            <div
              key={item.keyword}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-16 items-baseline"
              style={{ borderTop: "1px solid rgba(184,212,241,0.15)", paddingTop: "2rem" }}
            >
              <SlideInText from="left" delay={i * 0.1}>
                <h3 className="text-[36px] sm:text-[52px]" style={{ color: "#B8D4F1" }}>{item.keyword}</h3>
              </SlideInText>
              <SlideInText from="right" delay={i * 0.1 + 0.2}>
                <p className="text-[16px] sm:text-[20px] leading-[1.6]" style={{ color: "var(--fg-muted)" }}>
                  {item.desc}
                </p>
              </SlideInText>
            </div>
          ))}
        </div>
      </AboutSection>

      {/* ── Section 5 — Contact ───────────────────────────────────────── */}
      <AboutSection>
        <div className="text-center flex flex-col items-center gap-10 sm:gap-12">
          <SlideInText from="bottom">
            <h2 className="text-[32px] sm:text-[48px] leading-[1.1]">함께 일하고 싶으신가요?</h2>
          </SlideInText>
          <div className="flex flex-col items-center gap-4 text-[18px] sm:text-[22px]">
            {LINKS.map((link, i) => (
              <SlideInText key={link.label} from="bottom" delay={0.2 + i * 0.15}>
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  data-interactive="true"
                  className="about-link cursor-none inline-block"
                  style={{ color: "var(--fg)" }}
                >
                  {link.label} →
                </a>
              </SlideInText>
            ))}
          </div>
        </div>
      </AboutSection>

      {/* FOOTER */}
      <footer
        className="px-6 sm:px-10 py-7 flex items-center justify-between"
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

      <style>{`
        .about-nav { transition: color 150ms, opacity 150ms; }
        .about-nav:hover { color: var(--fg) !important; opacity: 1 !important; }
        .about-link { transition: color 200ms ease, transform 200ms ease; }
        .about-link:hover { color: #B8D4F1; transform: translateX(4px); }
      `}</style>
    </main>
  );
}
