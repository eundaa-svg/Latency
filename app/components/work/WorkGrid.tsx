"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Work } from "@/lib/db";

const EASE = [0.22, 1, 0.36, 1] as const;

interface Props {
  works: Work[];
}

export function WorkGrid({ works }: Props) {
  if (works.length === 0) {
    return (
      <div className="flex items-start pt-4">
        <p
          className="font-[family-name:var(--font-mono)] text-[13px] tracking-[0.06em]"
          style={{ color: "var(--fg-muted)", opacity: 0.35 }}
        >
          No works yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {works.map((work, i) => (
        <WorkCard key={work.id} work={work} index={i} />
      ))}
    </div>
  );
}

function WorkCard({ work, index }: { work: Work; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: EASE }}
    >
      <Link
        href={`/work/${work.id}`}
        data-interactive="true"
        className="group block cursor-none focus:outline-none"
      >
        {/* Thumbnail */}
        <div
          className="relative overflow-hidden w-full"
          style={{
            aspectRatio: "4 / 5",
            background: work.accentColor || "#111",
          }}
        >
          {work.thumbnail && (
            <Image
              src={work.thumbnail}
              alt={work.title}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}
          {/* Subtle dark overlay on hover */}
          <div
            className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            style={{ background: "rgba(0,0,0,0.12)" }}
          />
        </div>

        {/* Meta */}
        <div className="mt-3">
          <p
            className="font-[family-name:var(--font-mono)] text-[13px] tracking-[-0.01em] transition-opacity duration-200 group-hover:opacity-80"
            style={{ color: "var(--fg)" }}
          >
            {work.title}
          </p>
          <p
            className="font-[family-name:var(--font-mono)] text-[11px] mt-0.5 tracking-[0.04em]"
            style={{ color: "var(--fg-muted)", opacity: 0.4 }}
          >
            {work.year}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
