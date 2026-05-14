import { CaseStudy } from "@/app/components/case-study/CaseStudy";

export const metadata = {
  title: "2026 말 달력 디자인 — LATENCY",
  description: "계절마다 피는 꽃과 말의 이미지를 담은 2026년 12개월 캘린더 디자인.",
};

export default function HorseCalendar2026Page() {
  return (
    <CaseStudy
      categoryLabel="Graphic Design"
      year="2026"
      title="2026 말 달력 디자인"
      image={{ src: "/images/works/horse.png", alt: "2026 말 달력 — 계절마다 피는 꽃과 말의 이미지로 구성", width: 1027, height: 1032 }}
      description="2026년 말(馬)의 해를 맞아, 한 해의 흐름을 따라 계절마다 피는 꽃과 말의 이미지를 조화롭게 구성한 달력 디자인이다. 각 월에는 그 시기에 피는 꽃을 상징적으로 담아, 계절의 분위기와 의미를 시각적으로 표현하였다."
      meta={[
        { label: "ROLE",   value: "Concept · Visual Design · Editorial" },
        { label: "CLIENT", value: "Personal Work" },
        { label: "YEAR",   value: "2026" },
      ]}
    />
  );
}
