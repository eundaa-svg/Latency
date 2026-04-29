import Link from "next/link";
import { getWorks, getCategories, deleteWork } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { WorkOrderControls } from "./_components/WorkOrderControls";

async function handleDelete(id: string) {
  "use server";
  await deleteWork(id);
  revalidatePath("/admin/works");
  revalidatePath("/work");
}

export default async function AdminWorksPage() {
  const [works, categories] = await Promise.all([getWorks(), getCategories()]);
  const catMap = Object.fromEntries(categories.map((c) => [c.id, c.name]));

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1
          className="font-[family-name:var(--font-mono)] text-[18px] tracking-tight"
          style={{ color: "var(--fg)" }}
        >
          Works
          <span
            className="ml-3 text-[12px]"
            style={{ color: "var(--fg-muted)", opacity: 0.4 }}
          >
            {works.length}
          </span>
        </h1>
        <Link
          href="/admin/works/new"
          className="font-[family-name:var(--font-mono)] text-[12px] tracking-[0.08em] uppercase transition-opacity duration-150"
          style={{ color: "var(--fg)" }}
        >
          + New Work
        </Link>
      </div>

      {/* Table */}
      {works.length === 0 ? (
        <p
          className="font-[family-name:var(--font-mono)] text-[13px]"
          style={{ color: "var(--fg-muted)", opacity: 0.4 }}
        >
          No works yet. Add one above.
        </p>
      ) : (
        <div className="flex flex-col gap-0" style={{ borderTop: "1px solid var(--border)" }}>
          {works.map((work, i) => (
            <div
              key={work.id}
              className="flex items-center gap-6 py-4"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              {/* Thumbnail */}
              <div
                className="w-12 h-8 shrink-0 rounded-sm overflow-hidden"
                style={{ background: work.accentColor || "var(--bg-elevated)" }}
              >
                {work.thumbnail && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={work.thumbnail} alt="" className="w-full h-full object-cover" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p
                  className="font-[family-name:var(--font-mono)] text-[13px] truncate"
                  style={{ color: "var(--fg)" }}
                >
                  {work.title}
                </p>
                <p
                  className="font-[family-name:var(--font-mono)] text-[11px] mt-0.5"
                  style={{ color: "var(--fg-muted)", opacity: 0.5 }}
                >
                  {catMap[work.categoryId] ?? work.categoryId} · {work.year}
                </p>
              </div>

              {/* Order controls */}
              <WorkOrderControls workId={work.id} index={i} total={works.length} allIds={works.map((w) => w.id)} />

              {/* Actions */}
              <div className="flex items-center gap-4 shrink-0">
                <Link
                  href={`/admin/works/${work.id}/edit`}
                  className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.06em] uppercase transition-opacity duration-150"
                  style={{ color: "var(--fg-muted)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "")}
                >
                  Edit
                </Link>
                <form
                  action={async () => {
                    "use server";
                    await handleDelete(work.id);
                  }}
                >
                  <button
                    type="submit"
                    className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.06em] uppercase transition-opacity duration-150"
                    style={{ color: "var(--fg-muted)", opacity: 0.4 }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.4")}
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
