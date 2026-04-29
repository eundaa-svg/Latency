"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname  = usePathname();
  const isActive  = pathname.startsWith(href);
  return (
    <Link
      href={href}
      className="font-[family-name:var(--font-mono)] text-[12px] tracking-[0.08em] uppercase transition-opacity duration-150"
      style={{ color: "var(--fg)", opacity: isActive ? 1 : 0.4, borderBottom: isActive ? "1px solid var(--fg-muted)" : "1px solid transparent", paddingBottom: "1px" }}
    >
      {children}
    </Link>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex" style={{ background: "var(--bg)" }}>
      {/* Sidebar */}
      <aside
        className="w-[200px] shrink-0 flex flex-col gap-8 px-6 py-8 border-r"
        style={{ borderColor: "var(--border)" }}
      >
        <Link
          href="/"
          className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.18em] uppercase"
          style={{ color: "var(--fg-muted)" }}
        >
          ← LATENCY
        </Link>

        <nav className="flex flex-col gap-4">
          <NavLink href="/admin/works">Works</NavLink>
          <NavLink href="/admin/categories">Categories</NavLink>
        </nav>

        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="font-[family-name:var(--font-mono)] text-[12px] tracking-[0.08em] uppercase transition-opacity duration-150"
            style={{ color: "var(--fg-muted)", opacity: 0.4 }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.4")}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 min-w-0 px-10 py-8">
        {children}
      </main>
    </div>
  );
}
