// Everything on the page lives here. Add a project by adding an entry.
// Optional per project: embed (a live URL to run inside the page) and
// gallery: [{ src: '/shots/anitrack-schedule.webp', caption: 'Weekly airing schedule' }]
const gh = 'https://github.com/muthokaricky-alt';

export const projects = [
  {
    id: 'anitrack',
    name: 'AniTrack',
    kind: 'Web app · Anime & manga · Live',
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
    stack: ['React 18', 'Vite', 'Express', 'PostgreSQL (Neon)', 'JWT', 'AniList GraphQL', 'Cloudflare', 'Render'],
    image: "/shots/anitrack.webp",
    links: [
      { label: 'Live site', href: 'https://anitrack.muthokaricky.workers.dev/' },
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
    image: "/shots/nexus.webp",
    links: [{ label: 'Source', href: `${gh}/NexusLS` }],
  },
  {
    id: 'campusseat',
    name: 'CampusSeat',
    kind: 'Full-stack · Team project · Live',
    tagline: 'Book a seat at a campus event without a double booking.',
    story:
      'A Software Engineering group project. Students and staff browse events and book a seat; admins create events, limit them to particular schools and pull reports. Bookings run inside a MySQL transaction with row locks, so two people clicking the last seat at the same moment cannot both get it. One Render service serves both the Express API and the built React app, with the database on Aiven.',
    highlights: [
      'Seat booking inside a transaction with row-level locks, so the last seat can never be sold twice',
      'Events can be restricted to particular schools, and admins see bookings, reports and an audit log',
      'Downloadable PDF booking cards and reports generated on the server with pdfkit',
      'Prepared statements throughout, bcrypt-hashed passwords and JWT sessions',
      'Light and dark themes through CSS custom properties',
      'Design documents, schema and API live in the same repo as the code',
    ],
    stack: ['React', 'Vite', 'Node.js', 'Express', 'MySQL (Aiven)', 'JWT', 'pdfkit', 'Render'],
    image: "/shots/campusseat.webp",
    links: [
      { label: 'Live site', href: 'https://campusseat.onrender.com/' },
      { label: 'Source', href: `${gh}/CampusSeat` },
    ],
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
    image: "/shots/qr-studio.webp",
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
      'Transactions grouped by day, with search, type and category filters',
      'A spending-by-category breakdown and a monthly income-versus-expense trend',
      'CSV export and import for backups, with undo for deletes and imports',
      'Keyboard-navigable forms, labelled inputs and live-region error messages',
      'Typed end to end, linted with oxlint and tested with Vitest',
    ],
    stack: ['React 19', 'TypeScript', 'Vite', 'Zustand', 'Recharts', 'date-fns', 'Vitest'],
    image: "/shots/budget-tracker.webp",
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
    image: '/shots/myblock.webp',
    links: [{ label: 'Source', href: `${gh}/MyBlock` }],
  },
];

export const also = [
  {
    label: 'In development · Milestone 1 done',
    name: 'Touchline',
    blurb:
      'A football management game for Android, iOS and the web. The design system, navigation and manager dashboard are done; the match engine is next. All clubs and players are fictional.',
    stack: ['Expo', 'React Native', 'TypeScript', 'Expo Router', 'Jest'],
    links: [{ label: 'Source', href: `${gh}/Touchline` }],
  },
  {
    label: 'Team project · semester',
    name: 'SkillBridge',
    blurb:
      'A platform where students share skills and book learning sessions. Inside a three-team API ring it provides an expert directory, availability and booking API to one partner, and consumes logistics data from another. Documented with OpenAPI and covered by 272 automated tests.',
    stack: ['React 18', 'Express', 'SQLite', 'Jest', 'OpenAPI'],
    links: [{ label: 'Source', href: `${gh}/SkillBridge-webapp` }],
  },
  {
    label: 'OS lab · Python',
    name: 'Schedulix',
    blurb:
      'A CPU scheduling simulator. Upload 1,500 generated processes and compare FCFS, SJF, SRTF and Round Robin side by side, with averages, throughput and a Gantt chart for each. The scheduling logic has its own tests.',
    stack: ['Python', 'Streamlit', 'pandas', 'pytest'],
    links: [
      { label: 'Live app', href: 'https://muthokaricky-alt-schedulix--app-qcf6ny.streamlit.app/' },
      { label: 'Source', href: `${gh}/Schedulix-` },
    ],
  },
];

// Only list what a public repo can back up: interviewers will ask.
export const stack = [
  ['Languages', ['TypeScript', 'JavaScript', 'Python', 'C#', 'Java', 'C++', 'SQL']],
  ['Front end', ['React', 'Next.js', 'React Native (Expo)', 'Vite', 'Zustand', 'HTML & CSS']],
  ['Back end & data', ['Node.js', 'Express', 'ASP.NET Core', 'Prisma', 'PostgreSQL', 'MySQL', 'SQLite']],
  ['Shipping', ['Git', 'GitHub Actions', 'Docker', 'Cloudflare', 'Render', 'Jest / Vitest', 'Figma']],
];

export const contact = [
  { label: 'Email', hint: 'muthokaricky@gmail.com', href: 'mailto:muthokaricky@gmail.com', external: false },
  { label: 'GitHub', hint: 'muthokaricky-alt', href: gh, external: true },
  { label: 'LinkedIn', hint: 'rick-kyalo', href: 'https://www.linkedin.com/in/rick-kyalo-46116a38b/', external: true },
];

// Hover an interest on the About section to preview its image. Drop files in public/anime/
// and set image: '/anime/yourfile.jpg'. Entries without an image simply have no preview.
export const interests = [
  { name: 'Anime & manga', image: '' },
  { name: 'Football' },
  { name: 'Films & series' },
  { name: 'Music' },
];

// Repos whose latest commit shows in the "Now building" strip.
export const activityRepos = [
  { name: 'Touchline', note: 'Football manager game' },
  { name: 'AniTrack', note: 'Anime & manga tracker' },
  { name: 'CampusSeat', note: 'Event seat booking' },
];
