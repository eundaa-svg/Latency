import { CaseStudy } from "@/app/components/case-study/CaseStudy";

export const metadata = {
  title: "TOKYO SONATA — LATENCY",
  description: "구로사와 기요시 감독의 영화 〈도쿄 소나타〉 포스터 리디자인.",
};

export default function TokyoSonataPage() {
  return (
    <CaseStudy
      categoryLabel="Graphic Design"
      year="2025"
      title="TOKYO SONATA"
      image={{ src: "/images/works/tokyo-sonata.png", alt: "도쿄 소나타 포스터 — 어둠 속에 떨어지는 물방울과 파동", width: 1200, height: 1600 }}
      description="구로사와 기요시 감독의 영화 〈도쿄 소나타〉(2008)는 평범한 가정의 표면 아래에서 일어나는 미세한 균열과 침묵의 사건들을 다룬다. 영화 속 인물들은 큰 사건 없이도 하나씩 무너지고, 끝내 드뷔시의 〈달빛〉이 가족을 다시 묶는 결말로 향한다. 이 포스터는 어둠 속에 떨어지는 한 방울의 물과 그것이 만드는 파동을 통해, 작은 흔들림이 가족 전체로 번지는 영화의 정서를 시각화하였다. 화려한 설명 대신 한 순간의 정적을 통해 영화의 본질에 닿고자 했다."
      meta={[
        { label: "ROLE",   value: "Concept · Visual Design · Poster Direction" },
        { label: "CLIENT", value: "Personal Work (Film Poster Tribute)" },
        { label: "YEAR",   value: "2025" },
      ]}
    />
  );
}
