"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Work, PortfolioCategory } from "@/lib/db";

export type FilterCategory = string;

export interface WorkCanvasCtx {
  works:          Work[];
  categories:     PortfolioCategory[];
  hoveredId:      string | null;
  filterCategory: FilterCategory;
  setHovered:     (id: string | null) => void;
  setFilter:      (cat: FilterCategory) => void;
}

const Ctx = createContext<WorkCanvasCtx | null>(null);

export function WorkCanvasProvider({
  children, works, categories,
}: {
  children: ReactNode;
  works: Work[];
  categories: PortfolioCategory[];
}) {
  const [hoveredId,      setHoveredId]      = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<FilterCategory>("ALL");

  const setHovered = useCallback((id: string | null) => setHoveredId(id), []);

  const setFilter = useCallback((cat: FilterCategory) => {
    setFilterCategory(cat);
    setHoveredId(null);
  }, []);

  return (
    <Ctx.Provider value={{ works, categories, hoveredId, filterCategory, setHovered, setFilter }}>
      {children}
    </Ctx.Provider>
  );
}

export function useWorkCanvas(): WorkCanvasCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useWorkCanvas must be inside WorkCanvasProvider");
  return ctx;
}
