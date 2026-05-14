import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "NOPI — LATENCY",
  description: "목표 기반 재무관리 AI 서비스 NOPI UX/UI 디자인.",
};

export default function NopiPage() {
  return (
    <article className="min-h-screen bg-black text-white">
      {/* 헤더 영역 */}
      <header className="mx-auto max-w-[880px] px-6 pt-32 pb-16">
        <Link
          href="/work"
          className="inline-block text-sm text-neutral-500 hover:text-white transition-colors mb-12"
        >
          ← Back to Work
        </Link>

        <div className="text-xs tracking-[0.1em] text-neutral-500 mb-4">
          UI/UX · 2025
        </div>

        <h1 className="text-4xl md:text-5xl font-medium mb-3 tracking-tight">
          NOPI
        </h1>

        <p className="text-lg md:text-xl text-neutral-400 mb-12">
          더 높은 목표를 향해 — 목표 기반 재무관리 AI 서비스
        </p>

        <p className="text-base md:text-lg leading-relaxed text-neutral-200 max-w-[720px]">
          목표는 많아지지만, 복잡한 소비·저축 구조와 파편화된 금융 정보로 인해
          사용자는 무엇을 관리해야 하는지 판단하기 어려운 상황에 놓여 있다.
          NOPI는 이를 해결하기 위해 사용자의 소비·저축 패턴과 재무 목표를
          통합 분석해, 현실적인 목표 달성 경로와 실행 가능한 행동 가이드를
          제공하는 목표 기반 재무관리 AI 서비스로 기획되었다.
        </p>

        <dl className="mt-12 grid grid-cols-[120px_1fr] gap-y-3 text-sm max-w-[720px]">
          <dt className="text-neutral-500 tracking-[0.1em]">ROLE</dt>
          <dd>Service Planning · UX Strategy · UI Design</dd>
          <dt className="text-neutral-500 tracking-[0.1em]">CLIENT</dt>
          <dd>Personal Work</dd>
          <dt className="text-neutral-500 tracking-[0.1em]">YEAR</dt>
          <dd>2025</dd>
        </dl>
      </header>

      {/* 메인 대표 이미지 (nopi.png) */}
      <div className="mx-auto max-w-[880px] px-6 pb-16">
        <Image
          src="/images/works/nopi.png"
          alt="NOPI — 목표 기반 재무관리 AI 서비스"
          width={1600}
          height={1200}
          sizes="(max-width: 880px) 100vw, 880px"
          className="block w-full h-auto"
          priority
          quality={90}
        />
      </div>

      {/* 케이스 스터디 이미지 흐름 — 14장 간격 0 연속, 풀 너비 */}
      <section className="w-full bg-black" style={{ lineHeight: 0 }}>
        {Array.from({ length: 14 }, (_, i) => i + 1).map((n) => {
          const num = n.toString().padStart(2, "0");
          return (
            <Image
              key={n}
              src={`/images/works/nopi_${num}.png`}
              alt={`NOPI 케이스 스터디 ${n}/14`}
              width={1920}
              height={1080}
              sizes="100vw"
              className="block w-full h-auto"
              style={{ margin: 0, padding: 0, display: "block" }}
              quality={90}
            />
          );
        })}
      </section>

      {/* 하단 푸터 */}
      <footer className="mx-auto max-w-[880px] px-6 py-24">
        <Link
          href="/work"
          className="inline-block text-sm text-neutral-500 hover:text-white transition-colors"
        >
          ← Back to Work
        </Link>
      </footer>
    </article>
  );
}
