"use client";

import { useState } from "react";
import Link from "next/link";

type PublishState = "idle" | "loading" | "ok" | "noop" | "error";

export default function AdminDashboard() {
  const [publishState, setPublishState] = useState<PublishState>("idle");
  const [publishMsg,   setPublishMsg]   = useState("");

  async function handlePublish() {
    setPublishState("loading");
    setPublishMsg("");
    try {
      const res  = await fetch("/api/admin/publish", { method: "POST" });
      const json = await res.json();
      if (res.ok) {
        setPublishState(json.status === "noop" ? "noop" : "ok");
        setPublishMsg(json.message ?? "");
      } else {
        setPublishState("error");
        setPublishMsg(json.error ?? "Unknown error");
      }
    } catch (e) {
      setPublishState("error");
      setPublishMsg(String(e));
    }
  }

  const stateLabel: Record<PublishState, string> = {
    idle:    "Publish to Vercel →",
    loading: "Publishing...",
    ok:      "✓ Published",
    noop:    "✓ Already up to date",
    error:   "✗ Failed",
  };

  const stateColor: Record<PublishState, string> = {
    idle:    "var(--fg)",
    loading: "var(--fg-muted)",
    ok:      "#22c55e",
    noop:    "var(--fg-muted)",
    error:   "var(--accent)",
  };

  return (
    <div className="flex flex-col gap-10 max-w-[480px]">
      <div>
        <h1
          className="font-[family-name:var(--font-mono)] text-[18px] tracking-tight mb-1"
          style={{ color: "var(--fg)" }}
        >
          Admin
        </h1>
        <p
          className="font-[family-name:var(--font-mono)] text-[12px]"
          style={{ color: "var(--fg-muted)", opacity: 0.5 }}
        >
          Manage portfolio content. Changes are saved locally and pushed to Vercel via git.
        </p>
      </div>

      {/* Quick links */}
      <div className="flex flex-col gap-3">
        {[
          { label: "Works",      href: "/admin/works",      desc: "Add, edit, and reorder projects" },
          { label: "Categories", href: "/admin/categories", desc: "Manage filter categories" },
        ].map(({ label, href, desc }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center justify-between py-4 border-b group"
            style={{ borderColor: "var(--border)" }}
          >
            <div>
              <span
                className="font-[family-name:var(--font-mono)] text-[13px]"
                style={{ color: "var(--fg)" }}
              >
                {label}
              </span>
              <p
                className="font-[family-name:var(--font-mono)] text-[11px] mt-0.5"
                style={{ color: "var(--fg-muted)", opacity: 0.45 }}
              >
                {desc}
              </p>
            </div>
            <span
              className="font-[family-name:var(--font-mono)] text-[12px] opacity-0 group-hover:opacity-60 transition-opacity"
              style={{ color: "var(--fg)" }}
            >
              →
            </span>
          </Link>
        ))}
      </div>

      {/* Publish */}
      <div
        className="flex flex-col gap-4 p-6 border"
        style={{ borderColor: "var(--border)" }}
      >
        <div>
          <p
            className="font-[family-name:var(--font-mono)] text-[12px] tracking-[0.08em] uppercase mb-1"
            style={{ color: "var(--fg-muted)", opacity: 0.5 }}
          >
            Deploy
          </p>
          <p
            className="font-[family-name:var(--font-mono)] text-[12px]"
            style={{ color: "var(--fg-muted)", opacity: 0.4 }}
          >
            Commits portfolio.json + uploads to git and pushes to trigger a Vercel rebuild.
          </p>
        </div>

        <button
          onClick={handlePublish}
          disabled={publishState === "loading"}
          className="text-left font-[family-name:var(--font-mono)] text-[13px] tracking-[0.06em] transition-opacity duration-150"
          style={{
            color:   stateColor[publishState],
            opacity: publishState === "loading" ? 0.6 : 1,
          }}
        >
          {stateLabel[publishState]}
        </button>

        {publishMsg && (
          <p
            className="font-[family-name:var(--font-mono)] text-[11px] leading-relaxed"
            style={{ color: publishState === "error" ? "var(--accent)" : "var(--fg-muted)", opacity: 0.7 }}
          >
            {publishMsg}
          </p>
        )}
      </div>
    </div>
  );
}
