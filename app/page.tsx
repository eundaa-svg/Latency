"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  DanWord, BetweenWord, TimingWord, LatencyWord, HatsWord,
  UiUxWord, GraphicDesignWord, AdvertisingWord,
  ThingsWord, XrDesignWord, DiscomfortWord,
} from "./components/InlineInteraction";
import { LiveClock } from "./components/LiveClock";

const EASE = [0.22, 1, 0.36, 1] as const;

function HeroParagraph() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      className="text-[14px] sm:text-[15px] leading-[1.85]"
      style={{ color: "var(--fg)" }}
      initial={{ opacity: 0, y: 6 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: EASE }}
    >
      <p className="mb-5">
        안녕하세요,{" "}
        <span data-interactive="true"><DanWord /></span>
        입니다. 저는{" "}
        <span data-interactive="true"><BetweenWord /></span>
        {" "}행동과 반응 사이의 시간을 디자인합니다. 인터랙션 디자인을 기반으로, 무엇이 어떻게 보이는지가 아니라{" "}
        <span data-interactive="true"><TimingWord /></span>
        {" "}— 언제, 어떤 타이밍에 일어나는지에 집중합니다.
      </p>

      <p className="mb-5">
        {" "}
        <span data-interactive="true"><LatencyWord /></span>
        라는 이름으로 작업합니다. 대부분의 디자이너가 화면을 바라본다면, 저는 그{" "}
        <span data-interactive="true"><BetweenWord /></span>
        을 봅니다. 빠름이 목표가 아니라, 적절한 타이밍이 목표입니다.
      </p>

      <p>
        다양한{" "}
        <span data-interactive="true"><HatsWord /></span>
        을 씁니다.{" "}
        <span data-interactive="true"><UiUxWord /></span>
        에서는 정보가 정확히 필요한 순간에 도달하도록 설계합니다.{" "}
        <span data-interactive="true"><GraphicDesignWord /></span>
        에서는 시각적 리듬이 시선을 이끕니다.{" "}
        <span data-interactive="true"><AdvertisingWord /></span>
        에서, 제대로 된 메시지와 어긋난 메시지는 완전히 다른{" "}
        <span data-interactive="true"><ThingsWord /></span>
        입니다.{" "}
        <span data-interactive="true"><XrDesignWord /></span>
        에서, 움직임과 반응 사이의 지연은 몰입과{" "}
        <span data-interactive="true"><DiscomfortWord /></span>
        을 가르는 경계입니다.
      </p>

      <p
        className="mt-8 text-[11px] tracking-[0.06em]"
        style={{ color: "var(--fg-muted)", animation: "gentlePulse 3s ease-in-out infinite" }}
      >
        스크롤하여 둘러보기
      </p>
    </motion.div>
  );
}

export default function Page() {
  return (
    <>
      <section
        className="relative h-[100dvh] flex flex-col overflow-hidden"
        style={{ background: "var(--bg)" }}
      >
        {/* Navigation */}
        <motion.nav
          className="flex items-center justify-between px-6 sm:px-10 pt-7 sm:pt-9 shrink-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <div
            className="flex items-center gap-1.5 text-[11px] sm:text-[12px] tracking-[0.04em] uppercase"
            style={{ color: "var(--fg)" }}
          >
            LATENCY
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--accent)", animation: "glowPulse 2s ease-in-out infinite" }}
            />
          </div>

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
                className="cursor-none transition-opacity duration-150 focus:outline-none"
                style={{ color: "var(--fg-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-muted)")}
              >
                {label}
              </Link>
            ))}
          </div>
        </motion.nav>

        {/* Hero copy */}
        <div className="flex-1 flex items-center justify-center px-6 sm:px-10 overflow-hidden">
          <div className="w-full max-w-[720px]">
            <HeroParagraph />
          </div>
        </div>

        {/* Footer strip */}
        <motion.footer
          className="shrink-0 flex items-center justify-between px-6 sm:px-10 pb-6 sm:pb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.25, ease: EASE }}
        >
          <LiveClock />
          <div className="flex items-center gap-5 sm:gap-6 text-[10px] tracking-[0.06em] uppercase">
            {[
              { label: "twitter", href: "https://twitter.com/" },
              { label: "email",   href: "mailto:dan@latency.work" },
              { label: "are.na",  href: "https://are.na/" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                data-interactive="true"
                className="transition-all duration-150"
                style={{ color: "var(--fg-muted)", opacity: 0.5 }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.color = "var(--fg)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.5"; e.currentTarget.style.color = "var(--fg-muted)"; }}
              >
                {label}
              </a>
            ))}
          </div>
        </motion.footer>
      </section>
    </>
  );
}
