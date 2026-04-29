"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Work, PortfolioCategory } from "@/lib/db";

export type FilterCategory = string; // category id or "ALL"

export interface WorkCanvasCtx {
  works:          Work[];
  categories:     PortfolioCategory[];
  hoveredId:      string | null;
  activeId:       string | null;
  filterCategory: FilterCategory;
  isSoundOn:      boolean;
  setHovered:     (id: string | null) => void;
  commit:         (id: string) => void;
  close:          () => void;
  setFilter:      (cat: FilterCategory) => void;
  toggleSound:    () => void;
}

const Ctx = createContext<WorkCanvasCtx | null>(null);

interface ProviderProps {
  children:   ReactNode;
  works:      Work[];
  categories: PortfolioCategory[];
}

export function WorkCanvasProvider({ children, works, categories }: ProviderProps) {
  const [hoveredId,      setHoveredId]      = useState<string | null>(null);
  const [activeId,       setActiveId]       = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<FilterCategory>("ALL");
  const [isSoundOn,      setIsSoundOn]      = useState(false);

  const setHovered = useCallback((id: string | null) => {
    setHoveredId(id);
  }, []);

  const commit = useCallback((id: string) => {
    setActiveId(id);
    setHoveredId(id);
    window.history.pushState(null, "", `/work/${id}`);
  }, []);

  const close = useCallback(() => {
    setActiveId(null);
    setHoveredId(null);
    window.history.pushState(null, "", "/work");
  }, []);

  const setFilter = useCallback((cat: FilterCategory) => {
    setFilterCategory(cat);
    setHoveredId(null);
    setActiveId(null);
  }, []);

  const toggleSound = useCallback(() => setIsSoundOn((s) => !s), []);

  return (
    <Ctx.Provider value={{
      works, categories,
      hoveredId, activeId, filterCategory, isSoundOn,
      setHovered, commit, close, setFilter, toggleSound,
    }}>
      {children}
    </Ctx.Provider>
  );
}

export function useWorkCanvas(): WorkCanvasCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useWorkCanvas must be inside WorkCanvasProvider");
  return ctx;
}
