"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { WorkForm, type WorkFormData } from "../../_components/WorkForm";
import type { Work, PortfolioCategory } from "@/lib/db";

export default function EditWorkPage() {
  const { id } = useParams<{ id: string }>();
  const [work,       setWork]       = useState<Work | null>(null);
  const [categories, setCategories] = useState<PortfolioCategory[]>([]);

  useEffect(() => {
    Promise.all([
      fetch(`/api/admin/works/${id}`).then((r) => r.json()),
      fetch("/api/categories").then((r) => r.json()),
    ]).then(([w, cats]) => {
      setWork(w);
      setCategories(cats);
    });
  }, [id]);

  async function handleSave(data: WorkFormData) {
    const res = await fetch(`/api/admin/works/${id}`, {
      method:  "PUT",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({
        ...data,
        tools:  data.tools.split(",").map((t) => t.trim()).filter(Boolean),
        images: data.images.split("\n").map((s) => s.trim()).filter(Boolean),
      }),
    });
    if (!res.ok) throw new Error((await res.json()).error ?? "Save failed");
  }

  if (!work) {
    return (
      <p className="font-[family-name:var(--font-mono)] text-[13px]" style={{ color: "var(--fg-muted)", opacity: 0.4 }}>
        Loading...
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <h1
        className="font-[family-name:var(--font-mono)] text-[18px] tracking-tight"
        style={{ color: "var(--fg)" }}
      >
        Edit: {work.title}
      </h1>
      <WorkForm work={work} categories={categories} onSave={handleSave} />
    </div>
  );
}
