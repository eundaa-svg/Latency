"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import type { Work, PortfolioCategory } from "@/lib/db";

interface Props {
  work?:       Partial<Work>;
  categories:  PortfolioCategory[];
  onSave:      (data: WorkFormData) => Promise<void>;
}

export interface WorkFormData {
  title:       string;
  categoryId:  string;
  description: string;
  role:        string;
  year:        string;
  tools:       string;   // comma-separated, split on server
  link:        string;
  client:      string;
  accentColor: string;
  thumbnail:   string;
  images:      string;   // newline-separated paths
}

const Input = ({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
  <label className="flex flex-col gap-1.5">
    <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.14em] uppercase" style={{ color: "var(--fg-muted)", opacity: 0.6 }}>
      {label}
    </span>
    <input
      {...props}
      className="bg-transparent border-b outline-none font-[family-name:var(--font-mono)] text-[13px] py-1.5 transition-colors duration-150"
      style={{ borderColor: "var(--border)", color: "var(--fg)" }}
    />
  </label>
);

const Textarea = ({ label, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) => (
  <label className="flex flex-col gap-1.5">
    <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.14em] uppercase" style={{ color: "var(--fg-muted)", opacity: 0.6 }}>
      {label}
    </span>
    <textarea
      {...props}
      rows={4}
      className="bg-transparent border-b outline-none font-[family-name:var(--font-mono)] text-[13px] py-1.5 resize-none"
      style={{ borderColor: "var(--border)", color: "var(--fg)" }}
    />
  </label>
);

export function WorkForm({ work, categories, onSave }: Props) {
  const router  = useRouter();
  const [saving, setSaving] = useState(false);
  const [error,  setError]  = useState("");

  const [form, setForm] = useState<WorkFormData>({
    title:       work?.title       ?? "",
    categoryId:  work?.categoryId  ?? (categories[0]?.id ?? ""),
    description: work?.description ?? "",
    role:        work?.role        ?? "",
    year:        work?.year        ?? new Date().getFullYear().toString(),
    tools:       (work?.tools ?? []).join(", "),
    link:        work?.link        ?? "",
    client:      work?.client      ?? "",
    accentColor: work?.accentColor ?? "#0051FF",
    thumbnail:   work?.thumbnail   ?? "",
    images:      (work?.images ?? []).join("\n"),
  });

  function set(field: keyof WorkFormData) {
    return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function uploadFile(file: File): Promise<string> {
    const fd = new FormData();
    fd.append("file", file);
    const res  = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error ?? "Upload failed");
    return json.path as string;
  }

  async function handleThumbnailChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const path = await uploadFile(file);
      setForm((prev) => ({ ...prev, thumbnail: path }));
    } catch (err) {
      setError(String(err));
    }
  }

  async function handleImagesChange(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    try {
      const paths = await Promise.all(files.map(uploadFile));
      setForm((prev) => ({
        ...prev,
        images: [prev.images, ...paths].filter(Boolean).join("\n"),
      }));
    } catch (err) {
      setError(String(err));
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await onSave(form);
      router.push("/admin/works");
      router.refresh();
    } catch (err) {
      setError(String(err));
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-[640px]">
      <Input label="Title *"       value={form.title}       onChange={set("title")}       required />

      {/* Category select */}
      <label className="flex flex-col gap-1.5">
        <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.14em] uppercase" style={{ color: "var(--fg-muted)", opacity: 0.6 }}>
          Category
        </span>
        <select
          value={form.categoryId}
          onChange={set("categoryId")}
          className="bg-transparent border-b outline-none font-[family-name:var(--font-mono)] text-[13px] py-1.5"
          style={{ borderColor: "var(--border)", color: "var(--fg)" }}
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id} style={{ background: "var(--bg)" }}>
              {c.name}
            </option>
          ))}
        </select>
      </label>

      <Textarea label="Description" value={form.description} onChange={set("description")} />
      <Input label="Role"          value={form.role}        onChange={set("role")} />
      <Input label="Year"          value={form.year}        onChange={set("year")} />
      <Input label="Client"        value={form.client}      onChange={set("client")} />
      <Input label="Tools (comma-separated)" value={form.tools} onChange={set("tools")} placeholder="Figma, After Effects" />
      <Input label="Link (optional)"         value={form.link}  onChange={set("link")}  type="url" />
      <Input label="Accent Color"            value={form.accentColor} onChange={set("accentColor")} type="color" />

      {/* Thumbnail upload */}
      <label className="flex flex-col gap-2">
        <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.14em] uppercase" style={{ color: "var(--fg-muted)", opacity: 0.6 }}>
          Thumbnail
        </span>
        {form.thumbnail && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={form.thumbnail} alt="" className="w-32 h-20 object-cover rounded-sm" />
        )}
        <input type="file" accept="image/*" onChange={handleThumbnailChange} className="font-[family-name:var(--font-mono)] text-[12px]" style={{ color: "var(--fg-muted)" }} />
        {form.thumbnail && (
          <Input label="Path" value={form.thumbnail} onChange={set("thumbnail")} />
        )}
      </label>

      {/* Images upload */}
      <label className="flex flex-col gap-2">
        <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.14em] uppercase" style={{ color: "var(--fg-muted)", opacity: 0.6 }}>
          Images (multiple)
        </span>
        <input type="file" accept="image/*" multiple onChange={handleImagesChange} className="font-[family-name:var(--font-mono)] text-[12px]" style={{ color: "var(--fg-muted)" }} />
        <Textarea label="Image paths (one per line)" value={form.images} onChange={set("images")} />
      </label>

      {error && (
        <span className="font-[family-name:var(--font-mono)] text-[12px]" style={{ color: "var(--accent)" }}>
          {error}
        </span>
      )}

      <div className="flex items-center gap-6 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="font-[family-name:var(--font-mono)] text-[12px] tracking-[0.1em] uppercase transition-opacity duration-150"
          style={{ color: "var(--fg)", opacity: saving ? 0.4 : 1 }}
        >
          {saving ? "Saving..." : "Save →"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="font-[family-name:var(--font-mono)] text-[12px] tracking-[0.1em] uppercase transition-opacity duration-150"
          style={{ color: "var(--fg-muted)", opacity: 0.4 }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
