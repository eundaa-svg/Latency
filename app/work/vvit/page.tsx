import { CaseStudy } from "@/app/components/case-study/CaseStudy";

export const metadata = {
  title: "V.VIT — LATENCY",
  description: "XR 기반 버추얼 크리에이터 방송 플랫폼 V.VIT UX/UI 디자인.",
};

const caseImages = Array.from({ length: 11 }, (_, i) => {
  const num = (i + 1).toString().padStart(2, "0");
  return { src: `/images/works/xr_${num}.png`, alt: `V.VIT 케이스 스터디 ${i + 1}/11` };
});

export default function VvitPage() {
  return (
    <CaseStudy
      slug="vvit"
      categoryLabel="XR Design"
      year="2025"
      title="V.VIT"
      subtitle="브이빗 — XR 기반 버추얼 크리에이터 방송 플랫폼"
      image={{ src: "/images/works/xr.png", alt: "V.VIT — XR 기반 버추얼 크리에이터 방송 플랫폼", width: 1600, height: 1200 }}
      description="V.VIT(브이빗)은 버추얼 크리에이터가 자신만의 가상 공간에서 방송하고 시청자와 실시간으로 교감할 수 있도록 설계된 XR 기반 방송 플랫폼이다. 크리에이터의 아바타, 가상 공간, 시청자 인터랙션을 하나의 흐름으로 묶어, 기존 2D 영상 방송이 줄 수 없는 공간감과 몰입을 만들어내는 것을 목표로 기획되었다."
      meta={[
        { label: "ROLE",   value: "Concept · XR UX · Service Design · UI Design" },
        { label: "CLIENT", value: "Personal Work" },
        { label: "YEAR",   value: "2025" },
      ]}
      additionalImages={caseImages}
    />
  );
}
