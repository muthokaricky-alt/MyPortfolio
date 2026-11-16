# Rick Muthoka: portfolio

My personal site: the projects I've shipped, what I'm building now, and how to reach me.

Built with React 19 and Vite, with GSAP + ScrollTrigger for motion, Lenis for smooth scrolling and a
Vanta.js dot field in the hero. The "Now building" strip pulls the latest commit from each active repo
through GitHub's public API.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static build in dist/
```

Node 20.19+ or 22.

## Content

All content lives in [`src/data.js`](src/data.js): projects, the "building now" list, stack and contact
links. Each entry in `projects` gets a card on the home page and its own page at `/projects/<id>`.

## Deploy

`render.yaml` deploys it as a free Render static site, with a rewrite from `/*` to `/index.html` so
project URLs survive a refresh. Set `VITE_SITE_URL` to the live URL for the share-preview tags.
