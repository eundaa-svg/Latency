import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "V.VIT — LATENCY",
  description: "XR 기반 버추얼 크리에이터 방송 플랫폼 V.VIT UX/UI 디자인.",
};

export default function VvitPage() {
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
          XR DESIGN · 2025
        </div>

        <h1 className="text-4xl md:text-5xl font-medium mb-3 tracking-tight">
          V.VIT
        </h1>

        <p className="text-lg md:text-xl text-neutral-400 mb-12">
          브이빗 — XR 기반 버추얼 크리에이터 방송 플랫폼
        </p>

        <p className="text-base md:text-lg leading-relaxed text-neutral-200 max-w-[720px]">
          V.VIT(브이빗)은 버추얼 크리에이터가 자신만의 가상 공간에서 방송하고
          시청자와 실시간으로 교감할 수 있도록 설계된 XR 기반 방송 플랫폼이다.
          크리에이터의 아바타, 가상 공간, 시청자 인터랙션을 하나의 흐름으로 묶어,
          기존 2D 영상 방송이 줄 수 없는 공간감과 몰입을 만들어내는 것을 목표로
          기획되었다.
        </p>

        <dl className="mt-12 grid grid-cols-[120px_1fr] gap-y-3 text-sm max-w-[720px]">
          <dt className="text-neutral-500 tracking-[0.1em]">ROLE</dt>
          <dd>Concept · XR UX · Service Design · UI Design</dd>
          <dt className="text-neutral-500 tracking-[0.1em]">CLIENT</dt>
          <dd>Personal Work</dd>
          <dt className="text-neutral-500 tracking-[0.1em]">YEAR</dt>
          <dd>2025</dd>
        </dl>
      </header>

      {/* 이미지 흐름 — 간격 0으로 세로 연속, 풀 너비 */}
      <section className="w-full bg-black" style={{ lineHeight: 0 }}>
        {Array.from({ length: 11 }, (_, i) => i + 1).map((n) => {
          const num = n.toString().padStart(2, "0");
          return (
            <Image
              key={n}
              src={`/images/works/xr_${num}.png`}
              alt={`V.VIT 케이스 스터디 ${n}/11`}
              width={2880}
              height={1620}
              sizes="100vw"
              className="block w-full h-auto"
              style={{ margin: 0, padding: 0, display: "block" }}
              priority={n === 1}
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
