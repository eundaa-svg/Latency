# LATENCY — Portfolio

## Getting Started

```bash
cp .env.local.example .env.local   # set ADMIN_PASSWORD and ADMIN_ENABLED=true
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Admin Panel

Visit `/admin/login` and enter your `ADMIN_PASSWORD` from `.env.local`.

| Route | Purpose |
|---|---|
| `/admin` | Dashboard + Publish button |
| `/admin/works` | Add / edit / reorder works |
| `/admin/works/new` | Add a new work |
| `/admin/categories` | Manage categories |

## Publishing Changes to Vercel

Content edits (works, categories, uploaded images) are saved to `data/portfolio.json`
and `public/uploads/` on your local machine. Vercel only reflects what's in git.

**Option A — Admin UI (recommended)**
1. Make changes in the admin panel
2. Go to `/admin` and click **"Publish to Vercel →"**
3. Vercel detects the push and rebuilds in ~1 minute

**Option B — Terminal**
```bash
npm run admin:publish
```

Both options run:
```
git add data/portfolio.json public/uploads/
git commit -m "chore: update portfolio content"
git push origin main
```

> The publish API is disabled on production (`NODE_ENV === "production"`).
> On Vercel itself, use the terminal on your local machine.

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `ADMIN_PASSWORD` | Yes | Password for `/admin/login` |
| `ADMIN_ENABLED` | Yes | Set to `"true"` to enable the admin panel locally |

Copy `.env.local.example` → `.env.local` and fill in values. Never commit `.env.local`.

## Data Files

- `data/portfolio.json` — works and categories (committed to git for Vercel builds)
- `public/uploads/` — uploaded images (committed to git, excluded by default in `.gitignore`)

To include uploads in your Vercel build, run `npm run admin:publish` after adding images
or commit them manually.
