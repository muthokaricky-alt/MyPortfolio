# Rick Muthoka — portfolio

Vite + React 19, GSAP + ScrollTrigger, Lenis, Vanta.js (three r134).

## Run it
```
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs dist/
```
Node 20.19+ or 22 recommended. After the first `npm install`, commit `package-lock.json`.

## Edit content
Everything on the page is in `src/data.js`. To add a project, add an entry to `projects`
(screenshot URLs point at each repo's README image on GitHub). When CampusSeat ships,
move it from `also` into `projects`.

## Deploy on Render (free static site)
Push this folder to a GitHub repo, then either:
- **Blueprint:** Render dashboard > New > Blueprint > pick the repo (it reads `render.yaml`), or
- **Manual:** New > Static Site, build command `npm install && npm run build`, publish directory `dist`.

Static sites on Render's free plan don't sleep, so unlike AniTrack there's no cold start.

## ReactBits
`src/components/RevealText.jsx` is a small GSAP stand-in for ReactBits' SplitText.
To use the real one:
```
npx jsrepo init https://reactbits.dev/default/
npx jsrepo add https://reactbits.dev/default/TextAnimations/SplitText
```
Then import it in `Hero.jsx` in place of `RevealText` (check its props on reactbits.dev).
