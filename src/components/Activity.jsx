import { useEffect, useState } from 'react';
import { activityRepos } from '../data.js';
import { Sec } from './Sections.jsx';

const OWNER = 'muthokaricky-alt';
const CACHE = 'gh-activity-v1';

function timeAgo(iso) {
  const s = (Date.now() - new Date(iso).getTime()) / 1000;
  const units = [[31536000, 'y'], [2592000, 'mo'], [604800, 'w'], [86400, 'd'], [3600, 'h'], [60, 'm']];
  for (const [n, l] of units) if (s >= n) return `${Math.floor(s / n)}${l} ago`;
  return 'just now';
}

// Latest commit from each active repo, straight from GitHub's public API (no key needed).
// Cached for 10 minutes per tab to stay well inside the unauthenticated rate limit.
export default function Activity() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    let dead = false;
    try {
      const c = JSON.parse(sessionStorage.getItem(CACHE));
      if (c && Date.now() - c.t < 600000) { setItems(c.items); return; }
    } catch { /* ignore */ }

    Promise.allSettled(
      activityRepos.map(async ({ name, note }) => {
        const r = await fetch(`https://api.github.com/repos/${OWNER}/${name}/commits?per_page=1`);
        if (!r.ok) throw new Error(String(r.status));
        const [c] = await r.json();
        return { name, note, msg: c.commit.message.split('\n')[0], date: c.commit.author.date, url: c.html_url };
      })
    ).then((res) => {
      if (dead) return;
      const list = res.filter((x) => x.status === 'fulfilled').map((x) => x.value);
      if (!list.length) return;
      setItems(list);
      try { sessionStorage.setItem(CACHE, JSON.stringify({ t: Date.now(), items: list })); } catch { /* ignore */ }
    });
    return () => { dead = true; };
  }, []);

  if (!items) return null;

  return (
    <section className="now" id="now">
      <div>
        <Sec n="02" label="Now building" />
        <div className="now-grid">
          {items.map((it) => (
            <a key={it.name} href={it.url} target="_blank" rel="noopener noreferrer" data-r>
              <h4><span className="live" />{it.name}</h4>
              <p>{it.msg}</p>
              <small>{it.note} · last commit {timeAgo(it.date)}</small>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
