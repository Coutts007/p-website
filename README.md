# Peter Shemaya portfolio

A one-page portfolio built with React and Vite. All content (projects, experience,
skills, certifications, events and socials) lives in `src/data.js`, so updating the
site never means touching the layout.

## Run it

```bash
npm install
npm run dev      # local preview at http://localhost:5173
npm run build    # production build in dist/
```

## Deploy

- **Vercel or Netlify:** import the GitHub repository. Build command `npm run build`, output folder `dist`.
- **GitHub Pages:** run `npm run build` and publish `dist/`. If the site lives at
  `https://coutts007.github.io/<repo>/`, add `base: "/<repo>/"` to `vite.config.js` first.

## Still to fill in (search `TODO` in `src/data.js`)

- Each project's own repository or live demo link (they point to the GitHub profile for now).
- The months for SkillProof and MazaoX, and SkillProof's tech stack.
- Expected graduation month and year.
- The email domain.

`public/Peter_Shemaya_CV.pdf` is served at `/Peter_Shemaya_CV.pdf` for the View CV button.
Replace it whenever the CV changes.

## Colour system

| Name | Hex | Role |
| --- | --- | --- |
| Obsidian lacquer | `#0c0908` | Page ground: the shiny black |
| Espresso | `#24150f` | Deep panels, lacquer card |
| Chocolate | `#4a2c1e` | Supporting colour, light pools and spheres |
| Cocoa | `#7a4e36` | Featured glass, bead bodies |
| Beige | `#d9c4a3` | The one sharp accent: buttons, highlights, links |
| Warm grey | `#aca39b` | Secondary text |
| Ivory | `#f6f0e7` | Main text |

Black carries authority and precision, chocolate brings warmth and reliability, beige
keeps it approachable, grey handles the quiet detail, and ivory keeps everything easy to read.

## Motion

- The name rises in letter by letter, then a sheen runs across it; skill beads drop into
  their wells and a light scans the case.
- Glass panels clear from frosted to sharp as they scroll into view, with a glint across the glass.
- A warm light follows the pointer across the background, and the glossy spheres shift with it.
- Project slabs, social tiles and the contact card tilt toward the pointer; buttons are magnetic.
- Filtering projects animates panels to their new places (View Transitions, where supported).
- Everything above switches off for visitors who prefer reduced motion.
