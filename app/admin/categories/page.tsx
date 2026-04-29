"use client";

import { useEffect, useState } from "react";
import type { PortfolioCategory } from "@/lib/db";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<PortfolioCategory[]>([]);
  const [newName,    setNewName]    = useState("");
  const [editId,     setEditId]     = useState<string | null>(null);
  const [editName,   setEditName]   = useState("");
  const [error,      setError]      = useState("");

  async function load() {
    const res = await fetch("/api/admin/categories");
    setCategories(await res.json());
  }

  useEffect(() => { load(); }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    setError("");
    const res = await fetch("/api/admin/categories", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ name: newName.trim() }),
    });
    if (!res.ok) { setError((await res.json()).error); return; }
    setNewName("");
    load();
  }

  async function handleSaveEdit(id: string) {
    if (!editName.trim()) return;
    await fetch(`/api/admin/categories/${id}`, {
      method:  "PUT",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ name: editName.trim() }),
    });
    setEditId(null);
    load();
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete category "${name}"? Works in this category will become uncategorized.`)) return;
    await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    load();
  }

  async function move(index: number, direction: "up" | "down") {
    const ids = categories.map((c) => c.id);
    const newIdx = direction === "up" ? index - 1 : index + 1;
    ids.splice(index, 1);
    ids.splice(newIdx, 0, categories[index].id);
    // Optimistic UI
    const reordered = ids.map((id, i) => ({ ...categories.find((c) => c.id === id)!, order: i + 1 }));
    setCategories(reordered);
    await fetch("/api/admin/categories/reorder", {
      method:  "PUT",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ ids }),
    }).catch(() => load());
  }

  return (
    <div className="flex flex-col gap-8">
      <h1
        className="font-[family-name:var(--font-mono)] text-[18px] tracking-tight"
        style={{ color: "var(--fg)" }}
      >
        Categories
      </h1>

      {/* Add form */}
      <form onSubmit={handleAdd} className="flex items-end gap-4">
        <label className="flex flex-col gap-1.5 flex-1 max-w-[280px]">
          <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.14em] uppercase" style={{ color: "var(--fg-muted)", opacity: 0.6 }}>
            New category
          </span>
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="e.g. Motion Design"
            className="bg-transparent border-b outline-none font-[family-name:var(--font-mono)] text-[13px] py-1.5"
            style={{ borderColor: "var(--border)", color: "var(--fg)" }}
          />
        </label>
        <button
          type="submit"
          className="font-[family-name:var(--font-mono)] text-[12px] tracking-[0.08em] uppercase pb-1.5"
          style={{ color: "var(--fg)" }}
        >
          + Add
        </button>
      </form>

      {error && (
        <span className="font-[family-name:var(--font-mono)] text-[12px]" style={{ color: "var(--accent)" }}>
          {error}
        </span>
      )}

      {/* System category note */}
      <div className="flex items-center gap-4 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
        <span className="font-[family-name:var(--font-mono)] text-[13px]" style={{ color: "var(--fg)", opacity: 0.35 }}>
          All Works
        </span>
        <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] uppercase" style={{ color: "var(--fg-muted)", opacity: 0.3 }}>
          system · cannot be modified
        </span>
      </div>

      {/* Category list */}
      <div className="flex flex-col gap-0" style={{ borderTop: "1px solid var(--border)" }}>
        {categories.map((cat, i) => (
          <div
            key={cat.id}
            className="flex items-center gap-4 py-4"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            {/* Order controls */}
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => move(i, "up")} disabled={i === 0} className="font-[family-name:var(--font-mono)] text-[12px] px-1" style={{ color: "var(--fg-muted)", opacity: i === 0 ? 0.15 : 0.5 }}>↑</button>
              <button onClick={() => move(i, "down")} disabled={i === categories.length - 1} className="font-[family-name:var(--font-mono)] text-[12px] px-1" style={{ color: "var(--fg-muted)", opacity: i === categories.length - 1 ? 0.15 : 0.5 }}>↓</button>
            </div>

            {/* Name / edit */}
            {editId === cat.id ? (
              <input
                autoFocus
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSaveEdit(cat.id); if (e.key === "Escape") setEditId(null); }}
                className="flex-1 bg-transparent border-b outline-none font-[family-name:var(--font-mono)] text-[13px] py-0.5"
                style={{ borderColor: "var(--accent)", color: "var(--fg)" }}
              />
            ) : (
              <span className="flex-1 font-[family-name:var(--font-mono)] text-[13px]" style={{ color: "var(--fg)" }}>
                {cat.name}
              </span>
            )}

            {/* Actions */}
            <div className="flex items-center gap-4 shrink-0">
              {editId === cat.id ? (
                <>
                  <button onClick={() => handleSaveEdit(cat.id)} className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.06em] uppercase" style={{ color: "var(--fg)" }}>Save</button>
                  <button onClick={() => setEditId(null)} className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.06em] uppercase" style={{ color: "var(--fg-muted)", opacity: 0.4 }}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => { setEditId(cat.id); setEditName(cat.name); }} className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.06em] uppercase transition-opacity duration-150" style={{ color: "var(--fg-muted)", opacity: 0.5 }}>Edit</button>
                  <button onClick={() => handleDelete(cat.id, cat.name)} className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.06em] uppercase transition-opacity duration-150" style={{ color: "var(--fg-muted)", opacity: 0.3 }}>Delete</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
