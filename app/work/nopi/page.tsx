import { CaseStudy } from "@/app/components/case-study/CaseStudy";

export const metadata = {
  title: "NOPI — LATENCY",
  description: "목표 기반 재무관리 AI 서비스 NOPI UX/UI 디자인.",
};

export default function NopiPage() {
  return (
    <CaseStudy
      categoryLabel="UI/UX"
      year="2025"
      title="NOPI"
      image={{ src: "/images/works/nopi.png", alt: "NOPI — 목표 기반 재무관리 AI 서비스 UI/UX 디자인", width: 1928, height: 1088 }}
      description="목표는 많아지지만, 복잡한 소비·저축 구조와 파편화된 금융 정보로 인해 사용자는 무엇을 관리해야 하는지 판단하기 어려운 상황에 놓여 있다. NOPI는 이를 해결하기 위해 사용자의 소비·저축 패턴과 재무 목표를 통합 분석해, 현실적인 목표 달성 경로와 실행 가능한 행동 가이드를 제공하는 목표 기반 재무관리 AI 서비스로 기획되었다."
      meta={[
        { label: "ROLE",   value: "Service Planning · UX Strategy · UI Design" },
        { label: "CLIENT", value: "Personal Work" },
        { label: "YEAR",   value: "2025" },
      ]}
    />
  );
}
