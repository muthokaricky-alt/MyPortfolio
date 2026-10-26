# Rick Muthoka — portfolio

Vite + React 19, GSAP + ScrollTrigger, Lenis, Vanta.js (three r134).

## Run it
```
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs dist/
```
Node 20.19+ or 22 recommended. Commit `package-lock.json` after the first install.

## Edit content
Everything is in `src/data.js`. Each entry in `projects` gets a card on the home rail and
its own page at `/projects/<id>`. When CampusSeat ships, move it from `also` into `projects`
and add a `tagline`, `story` and `highlights`.

## Deploy on Render (free static site)
- **Blueprint:** New > Blueprint > pick the repo (reads `render.yaml`), or
- **Manual:** New > Static Site, build `npm install && npm run build`, publish `dist`,
  then under Redirects/Rewrites add a rewrite: source `/*`, destination `/index.html`.
  Without that rewrite, refreshing on a `/projects/...` URL returns a 404.

## ReactBits
`src/components/rb/` holds the interaction components (Cursor, Magnetic, Scramble, Tilt),
and `RevealText.jsx` is the hero headline. They're written for this site in ReactBits' style,
not copied from it. To use the real ones:
```
npx jsrepo init https://reactbits.dev/default/
npx jsrepo add https://reactbits.dev/default/TextAnimations/SplitText
```
Then import the installed component in `Hero.jsx` in place of `RevealText` (check its props on
reactbits.dev).

## Things you fill in
- **Résumé:** put a PDF at `public/resume.pdf`. A "Résumé" row appears in Contact automatically.
- **Anime / interest images:** put files in `public/anime/` and set `image: '/anime/file.jpg'` on an entry in
  `interests` (`src/data.js`). Hovering that interest on the About section previews it.
- **Project screenshots:** put files in `public/shots/` and add
  `gallery: [{ src: '/shots/x.png', caption: '...' }]` to a project. Galleries render on the project page.
- **Share preview:** set your real URL in `.env` (`VITE_SITE_URL`). `public/og.png` is the 1200x630 preview image.
  Rebuild after changing it, and re-scrape on LinkedIn's Post Inspector if a link is cached.
- **Now building:** reads the latest commit of the repos in `activityRepos` from GitHub's public API.
