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

## Build for GitHub Pages (manual publish)

```bash
npm run build
```

Output is in `dist/`. Upload or push that folder yourself and enable GitHub Pages — this project does not auto-deploy.

`vite.config.ts` uses `base: './'` so asset paths work from a project Pages URL. If needed, change it to `'/your-repo-name/'`.

## Preview production build

```bash
npm run preview
```
