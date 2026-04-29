"use client";

import { useRouter } from "next/navigation";

interface Props {
  workId: string;
  index:  number;
  total:  number;
  allIds: string[];
}

export function WorkOrderControls({ workId, index, total, allIds }: Props) {
  const router = useRouter();

  async function move(direction: "up" | "down") {
    const ids     = [...allIds];
    const newIdx  = direction === "up" ? index - 1 : index + 1;
    ids.splice(index, 1);
    ids.splice(newIdx, 0, workId);
    await fetch("/api/admin/works/reorder", {
      method:  "PUT",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ ids }),
    });
    router.refresh();
  }

  return (
    <div className="flex items-center gap-1 shrink-0">
      <button
        onClick={() => move("up")}
        disabled={index === 0}
        className="font-[family-name:var(--font-mono)] text-[12px] px-1 transition-opacity duration-150"
        style={{ color: "var(--fg-muted)", opacity: index === 0 ? 0.15 : 0.5 }}
        title="Move up"
      >
        ↑
      </button>
      <button
        onClick={() => move("down")}
        disabled={index === total - 1}
        className="font-[family-name:var(--font-mono)] text-[12px] px-1 transition-opacity duration-150"
        style={{ color: "var(--fg-muted)", opacity: index === total - 1 ? 0.15 : 0.5 }}
        title="Move down"
      >
        ↓
      </button>
    </div>
  );
}
