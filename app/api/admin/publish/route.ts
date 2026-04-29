import { NextRequest, NextResponse } from "next/server";
import { isValidSession, SESSION_COOKIE } from "@/lib/auth";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

// Only available locally — disabled on Vercel/production.
export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Publish is only available in local development. Use git push directly on the server." },
      { status: 403 }
    );
  }

  if (!await isValidSession(req.cookies.get(SESSION_COOKIE)?.value)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cwd = process.cwd();

  try {
    // Stage portfolio content
    await execAsync("git add data/portfolio.json public/uploads/", { cwd });

    // Check if anything changed
    const { stdout: statusOut } = await execAsync(
      "git status --porcelain data/portfolio.json public/uploads/",
      { cwd }
    );

    if (!statusOut.trim()) {
      return NextResponse.json({ status: "noop", message: "Nothing to publish — already up to date." });
    }

    // Commit
    await execAsync('git commit -m "chore: update portfolio content"', { cwd });

    // Get current branch
    const { stdout: branchOut } = await execAsync("git rev-parse --abbrev-ref HEAD", { cwd });
    const branch = branchOut.trim();

    // Push
    await execAsync(`git push origin ${branch}`, { cwd });

    return NextResponse.json({
      status: "ok",
      message: `Published. Vercel will redeploy in ~1 minute. (branch: ${branch})`,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ status: "error", error: message }, { status: 500 });
  }
}
