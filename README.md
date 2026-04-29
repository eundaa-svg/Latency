# LATENCY — Portfolio

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding a Work

### 1. Register in portfolio.json

Add an entry to `data/portfolio.json` → `works` array:

```json
{
  "id": "my-project",
  "title": "My Project.",
  "categoryId": "uiux",
  "thumbnail": "/images/my-project/thumb.jpg",
  "year": "2025",
  "order": 1,
  "accentColor": "#0051FF"
}
```

`id` is also used as the URL slug (`/work/my-project`).

### 2. Create the case study page

Create `app/work/my-project/page.tsx` and write the case study directly in code.
Next.js static routes take precedence over the dynamic `[slug]` catch-all,
so the file at the exact slug path will always be used.

### 3. Add images

Put images in `public/images/my-project/` and reference them as `/images/my-project/thumb.jpg`.

### 4. Deploy

```bash
git add .
git commit -m "feat: add my-project case study"
git push
```

Vercel detects the push and rebuilds in ~1 minute.

## Adding a Category

Edit `data/portfolio.json` → `categories` array:

```json
{ "id": "motion", "name": "Motion Design", "order": 5 }
```

The `id` is used for filtering in `WorkCanvas`. The `name` is displayed in the sidebar.

## Current Categories

| ID | Name |
|---|---|
| `uiux` | UI/UX |
| `xr` | XR Design |
| `graphic` | Graphic Design |
| `advertising-design` | Advertising design |

## Project Structure

```
app/
  work/
    page.tsx              — Work list (reads portfolio.json)
    [slug]/page.tsx       — 404 fallback for slugs without a page file
    my-project/page.tsx   — Individual case study (create one per work)
data/
  portfolio.json          — Work metadata + categories
public/
  images/                 — Static assets for case studies
lib/
  db.ts                   — Read-only helpers for portfolio.json
```
