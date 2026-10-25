// Everything on the page lives here. Add a project by adding an entry.
const gh = 'https://github.com/muthokaricky-alt';

export const projects = [
  {
    id: 'anitrack',
    name: 'AniTrack',
    kind: 'Web app · Anime & manga · In active development',
    blurb:
      'A watchlist tracker in the spirit of MyAnimeList. Search the catalogue, log what you watch and read, score it, and see your stats. Includes a weekly airing schedule with live countdowns, and imports from Excel, Word, CSV or JSON.',
    stack: ['React 18', 'Vite', 'Express', 'PostgreSQL (Neon)', 'JWT', 'AniList GraphQL'],
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
    blurb:
      'A learning management system with three roles: students, instructors and admins. Courses move from draft to review to published, quizzes are graded on the server, and certificates are generated as PDFs on request. Auth is hand-rolled and kept deliberately small.',
    stack: ['Next.js App Router', 'Prisma', 'SQLite', 'jose JWT', 'pdf-lib', 'Docker'],
    image: `${gh}/NexusLS/raw/main/docs/screenshots/homepage.png`,
    links: [{ label: 'Source', href: `${gh}/NexusLS` }],
  },
  {
    id: 'qr-studio',
    name: 'QR Studio',
    kind: 'Browser tool · Zero dependencies',
    blurb:
      'A QR generator that runs entirely in the browser, so nothing you paste is uploaded. The encoder is my own, covering versions 1 to 40 and all four error-correction levels. Style the code, add a logo, export PNG, SVG or PDF, generate in bulk, or scan with the camera.',
    stack: ['JavaScript', 'custom QR encoder', 'Canvas', 'SVG'],
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
    blurb:
      'Built for me and my roommate. Track income and expenses by category, see spending breakdowns and monthly trends, and back everything up as CSV. Typed end to end, with unit tests on the filtering and CSV logic.',
    stack: ['React 19', 'TypeScript', 'Vite', 'Zustand', 'Recharts', 'Vitest'],
    image: `${gh}/budget-tracker/raw/main/screenshots/dashboard.png`,
    links: [{ label: 'Source', href: `${gh}/budget-tracker` }],
  },
  {
    id: 'myblock',
    name: 'MyBlock',
    kind: 'Extension · Manifest V3',
    blurb:
      'An ad blocker built from scratch as a learning project, modelled on uBlock Origin. It reads real Adblock Plus and EasyList filter syntax, hides leftover ad boxes with cosmetic filters, and has an element picker, per-site pause and a settings page.',
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
