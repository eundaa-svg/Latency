"use client";

import { useEffect, useState } from "react";
import { WorkForm, type WorkFormData } from "../_components/WorkForm";
import type { PortfolioCategory } from "@/lib/db";

export default function NewWorkPage() {
  const [categories, setCategories] = useState<PortfolioCategory[]>([]);

  useEffect(() => {
    fetch("/api/categories").then((r) => r.json()).then(setCategories);
  }, []);

  async function handleSave(data: WorkFormData) {
    const res = await fetch("/api/admin/works", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({
        ...data,
        tools:  data.tools.split(",").map((t) => t.trim()).filter(Boolean),
        images: data.images.split("\n").map((s) => s.trim()).filter(Boolean),
      }),
    });
    if (!res.ok) throw new Error((await res.json()).error ?? "Save failed");
  }

  return (
    <div className="flex flex-col gap-8">
      <h1
        className="font-[family-name:var(--font-mono)] text-[18px] tracking-tight"
        style={{ color: "var(--fg)" }}
      >
        New Work
      </h1>
      <WorkForm categories={categories} onSave={handleSave} />
    </div>
  );
}
