"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/admin/login", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ password }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/admin/works");
      router.refresh();
    } else {
      setError("Incorrect password.");
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "var(--bg)" }}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-[320px] px-6">
        <span
          className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.18em] uppercase"
          style={{ color: "var(--fg-muted)" }}
        >
          LATENCY / admin
        </span>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          className="bg-transparent border-b outline-none font-[family-name:var(--font-mono)] text-[14px] py-2"
          style={{
            borderColor: "var(--border)",
            color:       "var(--fg)",
          }}
        />

        {error && (
          <span
            className="font-[family-name:var(--font-mono)] text-[12px]"
            style={{ color: "var(--accent)" }}
          >
            {error}
          </span>
        )}

        <button
          type="submit"
          disabled={loading}
          className="text-left font-[family-name:var(--font-mono)] text-[12px] tracking-[0.1em] uppercase transition-opacity duration-150"
          style={{ color: "var(--fg)", opacity: loading ? 0.4 : 1 }}
        >
          {loading ? "..." : "Enter →"}
        </button>
      </form>
    </div>
  );
}
