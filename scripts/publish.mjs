#!/usr/bin/env node
// npm run admin:publish
// Commits portfolio.json + uploads, then pushes to trigger a Vercel redeploy.

import { execSync } from "child_process";

const run = (cmd, { ignoreError = false } = {}) => {
  try {
    return execSync(cmd, { stdio: "pipe" }).toString().trim();
  } catch (err) {
    if (ignoreError) return "";
    const msg = err.stderr?.toString().trim() || err.message;
    console.error(`✗ Failed: ${cmd}\n  ${msg}`);
    process.exit(1);
  }
};

console.log("▶ Staging portfolio content...");
run("git add data/portfolio.json public/uploads/");

// Check if there's anything to commit
const status = run("git status --porcelain data/portfolio.json public/uploads/");
if (!status) {
  console.log("✓ Nothing to publish — portfolio.json and uploads/ are already up to date.");
  process.exit(0);
}

console.log("▶ Committing...");
run('git commit -m "chore: update portfolio content"');

console.log("▶ Pushing to origin...");
const branch = run("git rev-parse --abbrev-ref HEAD");
run(`git push origin ${branch}`);

console.log(`\n✓ Published. Vercel will redeploy in ~1 minute.`);
console.log(`  Branch: ${branch}`);
