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

Root `index.html` redirects into `./dist/` (the production build).  
Local `npm run dev` still opens the React app (via `index.dev.html`).

### After you change the site

```bash
npm run build
git add -f dist
git commit -m "Update Pages build"
git push
```

Optional: set **Settings → Pages → Source** to **GitHub Actions** (workflow included) or **Deploy from branch → /docs**.

### Preview production build locally

```bash
npm run build
npm run preview
```
