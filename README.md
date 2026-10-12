# Tanvir & Tansia — Wedding Invitation

A mobile-first digital wedding invitation card (static site). No backend.

## Develop

```bash
npm install
npm run dev
```

## Edit content

Names, date, venue, map links, family lines, and the Google Form URL live in [`src/content.ts`](src/content.ts). Photos used by the card live in `public/images/`.

## GitHub Pages

Live site: https://zabulanakakil.github.io/wedding_invitation/dist/

The published card is the `dist/` folder. After changing the invitation:

```bash
npm run build
git add -f dist
git commit
git push
```

### Preview the production build locally

```bash
npm run build
npm run preview
```
