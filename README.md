# ANRA Collective — A Pop-Up Portfolio

A scroll-driven pop-up book. The cover opens, pages flip, and each spread raises a
paper-engineered pop-up for one project. Built with Next.js 16, Tailwind v4,
Motion, and a little Three.js dust.

## The paper engineering

Real pop-ups never animate on their own — every piece is mechanically driven by
the page angle (the Sabuda/Reinhart principle). Here that translates to:

- every leaf's rotation and every pop-up's rise is a pure function of scroll
  position (`lib/chapters.ts` defines the timeline; `components/Book.tsx` maps it)
- v-fold wings hinge at the gutter (`rotateY`), the backdrop platform lifts away
  from the page (`translateZ`), the caption flap folds up from its bottom crease
  (`rotateX`) — see `components/PopUp.tsx`
- a pop-up collapses when the next page turns over it, like paper

Scroll is fully reversible. Arrow keys page between chapters. The nav dots jump
to any chapter.

## Accessibility & mobile

`prefers-reduced-motion` and small screens (< 900px) get the **flat edition**
(`components/FlatBook.tsx`): same story, same artwork, laid page by page with
gentle reveals only.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Deploy (GitHub → Vercel)

1. Create repo `ANRACollective/anra-collective`, push this folder as the repo root.
2. Import the repo in Vercel — framework auto-detects as Next.js, root directory
   is the repo root (no subfolder this time).

## Editing the book

- **Chapters / copy / links:** `lib/chapters.ts` — one object per spread.
- **Pop-up artwork:** `components/scenes.tsx` — each scene is flat-color SVG
  "card stock": a backdrop, left + right v-fold wings, optional centerpiece and
  caption flap. Add a scene, reference its id in a chapter, done.
- **Brand tokens:** `app/globals.css` (`@theme` block).
- **Timeline pacing:** `COVER_DWELL`, `FLIP_LEN`, `DWELL_LEN` in `lib/chapters.ts`.

## Before go-live

- ManaMana + AtlasCerita spreads use placeholder story copy — correct when ready.
- MyHutan / AtlasCerita / ManaMana have no live URLs yet — add `url` fields when live.
- Contact CTA points to anton.ranil@gmail.com — swap for a domain address if wanted.
- Consider a real favicon / OG image with the cover art.
