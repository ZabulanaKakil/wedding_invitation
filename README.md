# Tanvir & Tansia — Wedding Invitation

A mobile-first digital wedding invitation card (static site). No backend.

## Develop

```bash
npm install
npm run dev
```

## Edit content

All names, date, venue, maps links, dress colors, gallery images, family RSVP text, and the Google Form URL live in:

[`src/content.ts`](src/content.ts)

Replace demo Unsplash photos by putting files in `public/images/` and pointing paths there.

## GitHub Pages

Live site: https://zabulanakakil.github.io/wedding_invitation/

This repo deploys with **GitHub Actions** (see `.github/workflows/deploy-pages.yml`).

### One-time Pages setup
1. Repo **Settings → Pages**
2. Under **Build and deployment → Source**, choose **GitHub Actions**
3. Push to `main` (or re-run the workflow). Wait for the green check on the **Actions** tab.

`vite.config.ts` uses `base: './'` so assets resolve correctly under `/wedding_invitation/`.

A `docs/` folder with a production build is also kept as a fallback. You can instead set Pages to **Deploy from branch → main → /docs**.

### Local production build

```bash
npm run build
npm run preview
```
