"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// lottie-react pulls in lottie-web, which uses window/document directly.
// Disable SSR for it so we don't hit a hydration mismatch.
const Lottie = dynamic(() => import("lottie-react").then((m) => m.default), {
  ssr: false,
  loading: () => null,
});

const SRC = "/lottie/latency_logo.json";

// Module-level cache so the 657 KB JSON is only fetched once per session,
// no matter how many headers (Logo) mount the mark across page navigations.
let cachedData: unknown = null;
let inFlight: Promise<unknown> | null = null;

function loadAnimation(): Promise<unknown> {
  if (cachedData) return Promise.resolve(cachedData);
  if (inFlight) return inFlight;
  inFlight = fetch(SRC)
    .then((r) => r.json())
    .then((json) => { cachedData = json; inFlight = null; return json; })
    .catch((e) => { inFlight = null; throw e; });
  return inFlight;
}

interface Props {
  /** Pixel size of the square box. Lottie content fits inside preserving aspect. */
  size?: number;
  className?: string;
}

export function LottieLogoMark({ size = 32, className = "" }: Props) {
  const [data, setData] = useState<unknown>(cachedData);

  useEffect(() => {
    if (data) return;
    let alive = true;
    loadAnimation().then((json) => { if (alive) setData(json); }).catch(() => {});
    return () => { alive = false; };
  }, [data]);

  return (
    <span
      className={className}
      style={{
        width: size, height: size,
        display: "inline-flex",
        alignItems: "center", justifyContent: "center",
        flexShrink: 0,
        overflow: "visible",
      }}
      aria-hidden
    >
      {data ? (
        // Inner scaled wrapper — the Lottie canvas (1728×1049) has internal
        // whitespace around the actual mark, so we scale up the rendered svg
        // to fill the box. Bump SCALE if you want the mark larger.
        <span
          style={{
            width: "100%", height: "100%",
            display: "inline-block",
            transform: "scale(2.6)",
            transformOrigin: "center center",
          }}
        >
          <Lottie
            animationData={data}
            loop
            autoplay
            style={{ width: "100%", height: "100%" }}
            rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
          />
        </span>
      ) : null}
    </span>
  );
}
