"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Work, PortfolioCategory } from "@/lib/db";

export type FilterCategory = string;

export interface WorkCanvasCtx {
  works:          Work[];
  categories:     PortfolioCategory[];
  filterCategory: FilterCategory;
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
  const [filterCategory, setFilterCategory] = useState<FilterCategory>("ALL");
  const setFilter = useCallback((cat: FilterCategory) => setFilterCategory(cat), []);

  return (
    <Ctx.Provider value={{ works, categories, filterCategory, setFilter }}>
      {children}
    </Ctx.Provider>
  );
}

export function useWorkCanvas(): WorkCanvasCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useWorkCanvas must be inside WorkCanvasProvider");
  return ctx;
}
