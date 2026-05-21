import { CaseStudy } from "@/app/components/case-study/CaseStudy";

export const metadata = {
  title: "가드니 — LATENCY",
  description: "2028 울산국제정원박람회 공식 캐릭터 가드니 디자인.",
};

export default function GardniPage() {
  return (
    <CaseStudy
      slug="gardni"
      categoryLabel="Character Design"
      year="2025"
      title="가드니"
      image={{ src: "/images/works/character.png", alt: "가드니 — 2028 울산국제정원박람회 공식 캐릭터, 꽃잎 모자를 쓴 분홍 요정", width: 4096, height: 2731 }}
      description="가드니(Gardni)는 2028 울산국제정원박람회의 공식 캐릭터로 디자인된 꽃의 정령이다. 박람회의 핵심 주제인 자연·생태·정원을 한 캐릭터에 압축하기 위해, 꽃잎을 모자처럼 얹은 작은 요정의 형상을 택했다. 가드니는 시든 잎에 햇살을 모으고 바람을 따라 걸으며 작은 생명을 다시 피어나게 하는 존재로 설정되었으며, 박람회를 찾는 모든 세대가 친근하게 받아들일 수 있도록 단순하고 둥근 비례, 따뜻한 핑크 톤의 컬러 시스템을 적용하였다. 캐릭터 본형뿐 아니라 턴어라운드, 포즈 가이드, 컬러 시스템을 함께 정리하여 향후 다양한 매체로 확장 가능한 IP로 설계하였다."
      meta={[
        { label: "ROLE",   value: "Concept · Character Design · IP System" },
        { label: "CLIENT", value: "울산광역시 (2028 울산국제정원박람회 공공디자인 공모전)" },
        { label: "AWARD",  value: "특선" },
        { label: "YEAR",   value: "2025" },
      ]}
      additionalImages={[
        { src: "/images/works/character_01.png", alt: "가드니 — 캐릭터 시스템 (턴어라운드 · 포즈 · 컬러 가이드)" },
      ]}
    />
  );
}
