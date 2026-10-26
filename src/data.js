// Everything on the page lives here. Add a project by adding an entry.
// Optional per project: embed (a live URL to run inside the page) and
// gallery: [{ src: '/shots/anitrack-schedule.png', caption: 'Weekly airing schedule' }]
const gh = 'https://github.com/muthokaricky-alt';

export const projects = [
  {
    id: 'anitrack',
    name: 'AniTrack',
    kind: 'Web app · Anime & manga · In active development',
    tagline: 'Every anime and manga you watch, in one place.',
    story:
      'A personal tracker in the spirit of MyAnimeList. Anime metadata comes live from the AniList GraphQL API, so my own database only stores accounts and each person\'s list: status, score, progress and reviews. The Express server also serves the built React app, so one free Render service runs the whole thing.',
    highlights: [
      'A weekly airing schedule with a live countdown to the next episode',
      'Manga as its own section, with a separate list',
      'Ratings in half-point steps, plus optional scores for story, characters, visuals, music and enjoyment',
      'Import from Excel, Word, CSV or JSON, with a review step before anything is saved',
      'Export a list as JSON or CSV, or both lists as one Excel workbook',
      'Profiles with favourites, and a stats panel with status split, score spread and favourite genres',
    ],
    stack: ['React 18', 'Vite', 'Express', 'PostgreSQL (Neon)', 'JWT', 'AniList GraphQL', 'Lenis', 'GSAP', 'Vanta.js'],
    image: `${gh}/AniTrack/raw/main/homepage.png`,
    links: [
      { label: 'Live site', href: 'https://anitrack-0pyj.onrender.com/' },
      { label: 'Source', href: `${gh}/AniTrack` },
    ],
  },
  {
    id: 'nexus',
    name: 'Nexus',
    kind: 'Full-stack · Learning platform',
    tagline: 'A learning platform with three roles and no separate API.',
    story:
      'Built as a single Next.js app with SQLite behind Prisma. Pages are server components that query the database directly, and every change goes through a server action. Auth is hand-rolled and kept small: a signed JWT in an HttpOnly cookie, bcrypt passwords, and middleware that guards routes at the edge while the server re-checks on every protected page.',
    highlights: [
      'Course lifecycle: instructors draft, admins approve or reject with a note, and only published courses accept enrolments',
      'Quizzes are graded on the server, and the correct answers are never sent to the browser',
      'Certificates are issued when the last lesson is done, and download as PDFs generated on request',
      'Instructors see quiz analytics: average score and pass rate per quiz',
      'One review per student per course, enforced by a database constraint',
      'Runs in Docker, and moves to Postgres by changing one line in the Prisma schema',
    ],
    stack: ['Next.js App Router', 'Prisma', 'SQLite', 'jose JWT', 'pdf-lib', 'Docker'],
    image: `${gh}/NexusLS/raw/main/docs/screenshots/homepage.png`,
    links: [{ label: 'Source', href: `${gh}/NexusLS` }],
  },
  {
    id: 'qr-studio',
    embed: 'https://muthokaricky-alt.github.io/QR-Studio/',
    name: 'QR Studio',
    kind: 'Browser tool · Zero dependencies',
    tagline: 'A QR generator that never uploads anything.',
    story:
      'Everything runs in the browser, and the QR encoder itself is mine: byte mode, versions 1 to 40, levels L, M, Q and H, no dependencies. Because it returns the raw module grid, the same data drives the rounded and dotted styles, the cut-out for a logo and the SVG export. I checked its tables against an independent implementation for all 160 version and level combinations, and decoded a maximum-size code for each one with an independent decoder.',
    highlights: [
      'Content types: text or link, Wi-Fi, contact card, calendar event and image',
      'Three dot styles and three corner styles, with custom colours and a logo in the middle',
      'Export as PNG, SVG, A4 PDF, or copy to the clipboard',
      'Bulk generate from a list or CSV into a ZIP of PNGs',
      'A camera scanner, light and dark themes, and a local history of recent codes',
      'Images are shrunk to a thumbnail to fit the roughly 3 KB a QR code can hold',
    ],
    stack: ['JavaScript', 'Custom QR encoder', 'Canvas', 'SVG'],
    image: `${gh}/QR-Studio/raw/main/screenshot.png`,
    links: [
      { label: 'Live site', href: 'https://muthokaricky-alt.github.io/QR-Studio/' },
      { label: 'Source', href: `${gh}/QR-Studio` },
    ],
  },
  {
    id: 'budget-tracker',
    name: 'Budget Tracker',
    kind: 'Web app · Personal finance',
    tagline: 'A shared budget, kept simple.',
    story:
      'Built for me and my roommate. Transactions are stored in the browser through Zustand\'s persistence, and an automatic migration keeps data from the earlier version when the app updates. The filtering, sorting and CSV logic are pure functions with unit tests.',
    highlights: [
      'Income and expenses with colour-coded categories, filterable by type',
      'Search, filter and sort by description, category, date or amount',
      'A spending-by-category breakdown and a monthly income-versus-expense trend',
      'CSV export and import for backups',
      'Keyboard-navigable forms, labelled inputs and live-region error messages',
      'Typed end to end, linted with oxlint and tested with Vitest',
    ],
    stack: ['React 19', 'TypeScript', 'Vite', 'Zustand', 'Recharts', 'date-fns', 'Vitest'],
    image: `${gh}/budget-tracker/raw/main/screenshots/dashboard.png`,
    links: [{ label: 'Source', href: `${gh}/budget-tracker` }],
  },
  {
    id: 'myblock',
    name: 'MyBlock',
    kind: 'Extension · Manifest V3',
    tagline: 'An ad blocker, built to understand how ad blockers work.',
    story:
      'A learning project modelled on uBlock Origin\'s architecture. Filters written in Adblock Plus syntax are compiled into network rules that the browser enforces itself, which is also the privacy benefit of Manifest V3: the extension never sees your browsing.',
    highlights: [
      'Reads real EasyList-style syntax: resource types, third-party and domain options, important and exception rules',
      'Cosmetic filtering hides leftover ad boxes, and a MutationObserver restores the style if a page removes it',
      'An element picker: click anything on a page to hide it permanently',
      'A global switch, per-site pause, and a badge counting blocked requests',
      'A settings page for custom filters',
      'Parser tests and GitHub Actions validation on every push',
    ],
    stack: ['JavaScript', 'declarativeNetRequest', 'Chromium & Firefox', 'MIT'],
    image: `${gh}/MyBlock/raw/main/docs/screenshot.png`,
    links: [{ label: 'Source', href: `${gh}/MyBlock` }],
  },
];

export const also = [
  {
    label: 'In development · due December',
    name: 'CampusSeat',
    blurb:
      "A software engineering project I'm building at the moment, with a backend, a frontend and design docs in one repo. The finished write-up lands here once it ships.",
    links: [{ label: 'Source', href: `${gh}/CampusSeat` }],
  },
  {
    label: 'Team project · semester',
    name: 'SkillBridge',
    blurb:
      'A platform where students share skills and book learning sessions. Inside a three-team API ring it provides an expert directory, availability and booking API to one partner, and consumes logistics data from another. Documented with OpenAPI and covered by 272 automated tests.',
    stack: ['React 18', 'Express', 'SQLite', 'Jest', 'OpenAPI'],
    links: [{ label: 'Source', href: `${gh}/SkillBridge-webapp` }],
  },
];

export const stack = [
  ['Languages', ['C++', 'C#', 'Java', 'JavaScript', 'TypeScript', 'Python', 'PHP']],
  ['Front end', ['React', 'Next.js', 'Angular', 'Vite', 'HTML', 'CSS']],
  ['Back end & data', ['Node.js', 'Express', 'Django', 'Prisma', 'PostgreSQL', 'MySQL', 'SQLite', 'Supabase']],
  ['Tools', ['Git', 'GitHub', 'Docker', 'AWS', 'Vercel', 'Postman', 'Figma', 'VS Code']],
];

export const contact = [
  { label: 'Email', hint: 'muthokaricky@gmail.com', href: 'mailto:muthokaricky@gmail.com', external: false },
  { label: 'GitHub', hint: 'muthokaricky-alt', href: gh, external: true },
  { label: 'LinkedIn', hint: 'rick-kyalo', href: 'https://www.linkedin.com/in/rick-kyalo-46116a38b/', external: true },
  { label: 'Instagram', hint: '@rickschamploo', href: 'https://instagram.com/rickschamploo', external: true },
  { label: 'TikTok', hint: '@rickschamploo', href: 'https://www.tiktok.com/@rickschamploo', external: true },
];

// Hover an interest on the About section to preview its image. Drop files in public/anime/
// and set image: '/anime/yourfile.jpg'. Entries without an image simply have no preview.
export const interests = [
  { name: 'Movies' },
  { name: 'Series' },
  { name: 'Music' },
  { name: 'Anime & manga', image: '' },
  { name: 'Sports' },
];

// Repos whose latest commit shows in the "Now building" strip.
export const activityRepos = [
  { name: 'CampusSeat', note: 'In development' },
  { name: 'AniTrack', note: 'In active development' },
  { name: 'MyPortfolio', note: 'This site' },
];
